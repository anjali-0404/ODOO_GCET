import express from 'express';
import pool from '../db.js';

const router = express.Router();

// Get all users (team members)
router.get('/', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, name, email, role, department, position, phone, location, avatar, status, join_date FROM users ORDER BY name ASC'
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// Get user by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      'SELECT id, name, email, role, department, position, phone, location, avatar, status, join_date FROM users WHERE id = $1',
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});

// Update user profile
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
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
      [name, email, phone, location, department, position, avatar, id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update user' });
  }
});

export default router;
