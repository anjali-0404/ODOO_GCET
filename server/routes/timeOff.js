import express from 'express';
import pool from '../db.js';

const router = express.Router();

// Get all time off requests
router.get('/', async (req, res) => {
  try {
    const userId = req.query.userId;
    let query = `
      SELECT t.*, u.name as user_name, u.avatar 
      FROM time_off t
      JOIN users u ON t.user_id = u.id
    `;
    let params = [];
    
    if (userId) {
      query += ' WHERE t.user_id = $1';
      params.push(userId);
    }
    
    query += ' ORDER BY t.created_at DESC';
    
    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch time off requests' });
  }
});

// Create time off request
router.post('/', async (req, res) => {
  try {
    const { userId = 1, type, startDate, endDate, days, reason } = req.body;
    const result = await pool.query(
      'INSERT INTO time_off (user_id, type, start_date, end_date, days, reason) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [userId, type, startDate, endDate, days, reason]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create time off request' });
  }
});

// Update time off status
router.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { status, approvedBy } = req.body;
    const result = await pool.query(
      'UPDATE time_off SET status = $1, approved_by = $2, updated_at = CURRENT_TIMESTAMP WHERE id = $3 RETURNING *',
      [status, approvedBy, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update time off request' });
  }
});

export default router;
