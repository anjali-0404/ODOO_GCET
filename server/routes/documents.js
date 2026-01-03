import express from 'express';
import pool from '../db.js';

const router = express.Router();

// Get all documents for a user
router.get('/', async (req, res) => {
  try {
    const userId = req.query.userId || 1;
    const result = await pool.query(
      'SELECT * FROM documents WHERE user_id = $1 ORDER BY created_at DESC',
      [userId]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch documents' });
  }
});

// Upload a new document
router.post('/', async (req, res) => {
  try {
    const { userId = 1, name, type, category, size, filePath, uploadedBy } = req.body;
    const result = await pool.query(
      'INSERT INTO documents (user_id, name, type, category, size, file_path, uploaded_by) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [userId, name, type, category, size, filePath, uploadedBy]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to upload document' });
  }
});

// Delete a document
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM documents WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Document not found' });
    }
    res.json({ message: 'Document deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete document' });
  }
});

export default router;
