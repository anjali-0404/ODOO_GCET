import express from 'express';
import pool from '../db.js';

const router = express.Router();

// Get all projects
router.get('/', async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT p.*, 
       json_agg(json_build_object('id', u.id, 'name', u.name, 'avatar', u.avatar)) FILTER (WHERE u.id IS NOT NULL) as team
       FROM projects p
       LEFT JOIN project_members pm ON p.id = pm.project_id
       LEFT JOIN users u ON pm.user_id = u.id
       GROUP BY p.id
       ORDER BY p.created_at DESC`
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
});

// Create a new project
router.post('/', async (req, res) => {
  try {
    const { name, description, status, priority, startDate, endDate, totalTasks } = req.body;
    const result = await pool.query(
      'INSERT INTO projects (name, description, status, priority, start_date, end_date, total_tasks) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [name, description, status || 'planning', priority || 'medium', startDate, endDate, totalTasks || 0]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create project' });
  }
});

// Update project
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { progress, tasksCompleted, status } = req.body;
    const result = await pool.query(
      'UPDATE projects SET progress = COALESCE($1, progress), tasks_completed = COALESCE($2, tasks_completed), status = COALESCE($3, status), updated_at = CURRENT_TIMESTAMP WHERE id = $4 RETURNING *',
      [progress, tasksCompleted, status, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update project' });
  }
});

export default router;
