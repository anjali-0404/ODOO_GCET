import express from 'express';
import pool from '../db.js';

const router = express.Router();

// Get all notes for a user
router.get('/', async (req, res) => {
  try {
    const userId = req.query.userId || 1; // Default to user 1 for now
    const result = await pool.query(
      'SELECT * FROM notes WHERE user_id = $1 ORDER BY is_pinned DESC, updated_at DESC',
      [userId]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch notes' });
  }
});

// Create a new note
router.post('/', async (req, res) => {
  try {
    const { userId = 1, title, content, category, color } = req.body;
    const result = await pool.query(
      'INSERT INTO notes (user_id, title, content, category, color) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [userId, title, content, category, color || 'bg-yellow-100']
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create note' });
  }
});

// Update a note
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, category, color, isPinned } = req.body;
    const result = await pool.query(
      'UPDATE notes SET title = COALESCE($1, title), content = COALESCE($2, content), category = COALESCE($3, category), color = COALESCE($4, color), is_pinned = COALESCE($5, is_pinned), updated_at = CURRENT_TIMESTAMP WHERE id = $6 RETURNING *',
      [title, content, category, color, isPinned, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Note not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update note' });
  }
});

// Toggle pin status
router.patch('/:id/pin', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      'UPDATE notes SET is_pinned = NOT is_pinned, updated_at = CURRENT_TIMESTAMP WHERE id = $1 RETURNING *',
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Note not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to toggle pin' });
  }
});

// Delete a note
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM notes WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Note not found' });
    }
    res.json({ message: 'Note deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete note' });
  }
});

export default router;
