import express from 'express';
import bcrypt from 'bcryptjs';
import pool from '../db.js';
import { generateToken, authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Sign Up
router.post('/signup', async (req, res) => {
  try {
    const { name, email, password, role = 'employee' } = req.body;

    // Check if user already exists
    const existingUser = await pool.query(
      'SELECT id FROM users WHERE email = $1',
      [email]
    );

    if (existingUser.rows.length > 0) {
      return res.status(400).json({ error: 'User already exists with this email' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const result = await pool.query(
      `INSERT INTO users (name, email, password, role, status, join_date)
       VALUES ($1, $2, $3, $4, 'active', CURRENT_DATE)
       RETURNING id, name, email, role, department, position, phone, location, avatar, status, join_date`,
      [name, email, hashedPassword, role]
    );

    const user = result.rows[0];
    const token = generateToken(user);

    res.status(201).json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        department: user.department,
        position: user.position,
        phone: user.phone,
        location: user.location,
        avatar: user.avatar,
        status: user.status,
        joinDate: user.join_date
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create user' });
  }
});

// Sign In
router.post('/signin', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const result = await pool.query(
      'SELECT id, name, email, password, role, department, position, phone, location, avatar, status, join_date FROM users WHERE email = $1',
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const user = result.rows[0];

    // Check password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = generateToken(user);

    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        department: user.department,
        position: user.position,
        phone: user.phone,
        location: user.location,
        avatar: user.avatar,
        status: user.status,
        joinDate: user.join_date
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to sign in' });
  }
});

// Get current user (protected route)
router.get('/me', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, name, email, role, department, position, phone, location, avatar, status, join_date FROM users WHERE id = $1',
      [req.user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const user = result.rows[0];
    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      department: user.department,
      position: user.position,
      phone: user.phone,
      location: user.location,
      avatar: user.avatar,
      status: user.status,
      joinDate: user.join_date
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});

// Change password (protected route)
router.put('/change-password', authenticateToken, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    // Get user with password
    const result = await pool.query(
      'SELECT id, password FROM users WHERE id = $1',
      [req.user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const user = result.rows[0];

    // Verify current password
    const isValidPassword = await bcrypt.compare(currentPassword, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Current password is incorrect' });
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update password
    await pool.query(
      'UPDATE users SET password = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2',
      [hashedPassword, req.user.id]
    );

    res.json({ message: 'Password updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to change password' });
  }
});

// Update profile (protected route)
router.put('/profile', authenticateToken, async (req, res) => {
  try {
    const { name, email, phone, location, department, position, avatar } = req.body;

    const result = await pool.query(
      `UPDATE users 
       SET name = COALESCE($1, name),
           email = COALESCE($2, email),
           phone = COALESCE($3, phone),
           location = COALESCE($4, location),
           department = COALESCE($5, department),
           position = COALESCE($6, position),
           avatar = COALESCE($7, avatar),
           updated_at = CURRENT_TIMESTAMP
       WHERE id = $8
       RETURNING id, name, email, role, department, position, phone, location, avatar, status, join_date`,
      [name, email, phone, location, department, position, avatar, req.user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const user = result.rows[0];
    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      department: user.department,
      position: user.position,
      phone: user.phone,
      location: user.location,
      avatar: user.avatar,
      status: user.status,
      joinDate: user.join_date
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update profile' });
  }
});

// Delete account (protected route)
router.delete('/account', authenticateToken, async (req, res) => {
  try {
    const { password } = req.body;

    // Get user with password
    const result = await pool.query(
      'SELECT id, password FROM users WHERE id = $1',
      [req.user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const user = result.rows[0];

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Password is incorrect' });
    }

    // Delete user
    await pool.query('DELETE FROM users WHERE id = $1', [req.user.id]);

    res.json({ message: 'Account deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete account' });
  }
});

export default router;
