import express from 'express';
import pool from '../db.js';

const router = express.Router();

// Get all benefits for a user
router.get('/', async (req, res) => {
  try {
    const userId = req.query.userId || 1;
    const result = await pool.query(
      'SELECT * FROM benefits WHERE user_id = $1 ORDER BY enrolled_date DESC',
      [userId]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch benefits' });
  }
});

// Enroll in a benefit
router.post('/', async (req, res) => {
  try {
    const { userId = 1, benefitName, category, value, coverage } = req.body;
    const result = await pool.query(
      'INSERT INTO benefits (user_id, benefit_name, category, value, coverage) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [userId, benefitName, category, value, coverage]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to enroll in benefit' });
  }
});

// Unenroll from a benefit
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM benefits WHERE id = $1', [id]);
    res.json({ message: 'Unenrolled from benefit successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to unenroll from benefit' });
  }
});

export default router;
