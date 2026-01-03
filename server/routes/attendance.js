import express from 'express';
import pool from '../db.js';

const router = express.Router();

// Get attendance records
router.get('/', async (req, res) => {
  try {
    const userId = req.query.userId;
    let query = 'SELECT * FROM attendance';
    let params = [];
    
    if (userId) {
      query += ' WHERE user_id = $1';
      params.push(userId);
    }
    
    query += ' ORDER BY date DESC';
    
    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch attendance' });
  }
});

// Check in
router.post('/check-in', async (req, res) => {
  try {
    const { userId = 1 } = req.body;
    const today = new Date().toISOString().split('T')[0];
    
    const result = await pool.query(
      'INSERT INTO attendance (user_id, date, check_in, status) VALUES ($1, $2, CURRENT_TIME, $3) ON CONFLICT (user_id, date) DO UPDATE SET check_in = CURRENT_TIME RETURNING *',
      [userId, today, 'present']
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to check in' });
  }
});

// Check out
router.post('/check-out', async (req, res) => {
  try {
    const { userId = 1 } = req.body;
    const today = new Date().toISOString().split('T')[0];
    
    const result = await pool.query(
      'UPDATE attendance SET check_out = CURRENT_TIME WHERE user_id = $1 AND date = $2 RETURNING *',
      [userId, today]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to check out' });
  }
});

export default router;
