import express from 'express';
import pool from '../db.js';

const router = express.Router();

// Get all events
router.get('/', async (req, res) => {
  try {
    const userId = req.query.userId || 1;
    const result = await pool.query(
      'SELECT * FROM events WHERE user_id = $1 ORDER BY start_time ASC',
      [userId]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch events' });
  }
});

// Create a new event
router.post('/', async (req, res) => {
  try {
    const { userId = 1, title, description, eventType, startTime, endTime, location, attendees } = req.body;
    const result = await pool.query(
      'INSERT INTO events (user_id, title, description, event_type, start_time, end_time, location, attendees) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
      [userId, title, description, eventType, startTime, endTime, location, attendees]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create event' });
  }
});

// Delete an event
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM events WHERE id = $1', [id]);
    res.json({ message: 'Event deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete event' });
  }
});

export default router;
