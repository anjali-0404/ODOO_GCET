# People Hub Backend API

Backend API for the People Hub HR Management System built with Node.js, Express, and PostgreSQL.

## Prerequisites

- Node.js (v18 or higher)
- PostgreSQL (v14 or higher)
- npm or yarn

## Installation

1. Install dependencies:
```bash
cd server
npm install
```

2. Create PostgreSQL database:
```bash
# Login to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE people_hub;

# Exit psql
\q
```

3. Configure environment variables:
```bash
# Copy .env.example to .env
cp .env.example .env

# Edit .env with your database credentials
# DATABASE_URL=postgresql://username:password@localhost:5432/people_hub
```

4. Run database setup:
```bash
npm run setup
```

## Running the Server

### Development mode (with auto-reload):
```bash
npm run dev
```

### Production mode:
```bash
npm start
```

The server will start on http://localhost:3001

## API Endpoints

### Notes
- `GET /api/notes` - Get all notes
- `POST /api/notes` - Create a note
- `PUT /api/notes/:id` - Update a note
- `PATCH /api/notes/:id/pin` - Toggle pin status
- `DELETE /api/notes/:id` - Delete a note

### Documents
- `GET /api/documents` - Get all documents
- `POST /api/documents` - Upload a document
- `DELETE /api/documents/:id` - Delete a document

### Projects
- `GET /api/projects` - Get all projects
- `POST /api/projects` - Create a project
- `PUT /api/projects/:id` - Update a project

### Events (Calendar)
- `GET /api/events` - Get all events
- `POST /api/events` - Create an event
- `DELETE /api/events/:id` - Delete an event

### Attendance
- `GET /api/attendance` - Get attendance records
- `POST /api/attendance/check-in` - Check in
- `POST /api/attendance/check-out` - Check out

### Time Off
- `GET /api/time-off` - Get time off requests
- `POST /api/time-off` - Create time off request
- `PATCH /api/time-off/:id` - Update request status

### Benefits
- `GET /api/benefits` - Get enrolled benefits
- `POST /api/benefits` - Enroll in a benefit
- `DELETE /api/benefits/:id` - Unenroll from a benefit

### Users
- `GET /api/users` - Get all users (team members)
- `GET /api/users/:id` - Get user by ID

## Database Schema

The database includes the following tables:
- `users` - User accounts and profiles
- `notes` - Personal notes
- `documents` - Document management
- `projects` - Project tracking
- `project_members` - Project team assignments
- `events` - Calendar events
- `attendance` - Attendance records
- `time_off` - Time off requests
- `benefits` - Benefits enrollment

## Development

The server uses:
- Express.js for the REST API
- PostgreSQL for the database
- pg (node-postgres) for database connection
- CORS for cross-origin requests
- dotenv for environment variables
