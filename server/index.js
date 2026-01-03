import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import notesRoutes from './routes/notes.js';
import documentsRoutes from './routes/documents.js';
import projectsRoutes from './routes/projects.js';
import eventsRoutes from './routes/events.js';
import attendanceRoutes from './routes/attendance.js';
import timeOffRoutes from './routes/timeOff.js';
import benefitsRoutes from './routes/benefits.js';
import usersRoutes from './routes/users.js';
import authRoutes from './routes/auth.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/notes', notesRoutes);
app.use('/api/documents', documentsRoutes);
app.use('/api/projects', projectsRoutes);
app.use('/api/events', eventsRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/time-off', timeOffRoutes);
app.use('/api/benefits', benefitsRoutes);
app.use('/api/users', usersRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
