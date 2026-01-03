# DAYFLOW - HR Management System - Setup Guide

Complete guide to set up the People Hub HR Management System with PostgreSQL database.

## Prerequisites

- Node.js (v18 or higher)
- PostgreSQL (v14 or higher)
- npm

## Step-by-Step Setup

### 1. Install PostgreSQL

#### macOS (using Homebrew):
```bash
brew install postgresql@14
brew services start postgresql@14
```

#### Ubuntu/Debian:
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
```

#### Windows:
Download and install from [PostgreSQL Official Website](https://www.postgresql.org/download/windows/)

### 2. Create Database

```bash
# Login to PostgreSQL (default user is 'postgres')
psql -U postgres

# Create the database
CREATE DATABASE people_hub;

# Create a user (optional, or use existing postgres user)
CREATE USER your_username WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE people_hub TO your_username;

# Exit
\q
```

### 3. Setup Backend

```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Configure environment variables
cp .env.example .env

# Edit .env file with your database credentials
# DATABASE_URL=postgresql://postgres:your_password@localhost:5432/people_hub

# Run database setup (creates tables and sample data)
npm run setup
```

### 4. Setup Frontend

```bash
# Navigate back to root directory
cd ..

# Install frontend dependencies (if not already installed)
npm install

# The frontend .env is already configured
```

### 5. Run the Application

You'll need TWO terminal windows:

#### Terminal 1 - Backend API:
```bash
cd server
npm run dev
```
Server will run on http://localhost:3001

#### Terminal 2 - Frontend:
```bash
npm run dev
```
Frontend will run on http://localhost:8080

### 6. Access the Application

Open your browser and go to: http://localhost:8080

## Sample Login Credentials

After running `npm run setup`, these users are available:

- **Employee**: john@company.com
- **HR Manager**: jane@company.com  
- **Admin**: admin@company.com

*Note: Default password is `password123` (you'll need to hash this in production)*

## Features Now Working

✅ **Notes**: Create, edit, delete, pin/unpin notes
✅ **Documents**: Upload, view, delete documents  
✅ **Projects**: Create projects, track progress
✅ **Calendar**: Add events, meetings, holidays
✅ **Attendance**: Check in/out, view history
✅ **Time Off**: Request time off, approve/reject
✅ **Benefits**: Enroll/unenroll from benefits
✅ **Team**: View team members

## Troubleshooting

### Database connection error:
```bash
# Check if PostgreSQL is running
brew services list  # macOS
sudo systemctl status postgresql  # Linux

# Check connection
psql -U postgres -d people_hub
```

### Port already in use:
```bash
# Backend (port 3001)
# Change PORT in server/.env

# Frontend (port 8080)  
# Change in vite.config.ts
```

### Can't connect to API:
- Make sure backend is running on port 3001
- Check browser console for CORS errors
- Verify VITE_API_URL in frontend .env

## Database Schema

The database includes these tables:
- `users` - User accounts
- `notes` - Personal notes
- `documents` - File management
- `projects` - Project tracking
- `project_members` - Team assignments
- `events` - Calendar events
- `attendance` - Check in/out records
- `time_off` - Leave requests
- `benefits` - Benefits enrollment

## API Endpoints

All endpoints are prefixed with `/api`:

- Notes: `/api/notes`
- Documents: `/api/documents`
- Projects: `/api/projects`
- Events: `/api/events`
- Attendance: `/api/attendance`
- Time Off: `/api/time-off`
- Benefits: `/api/benefits`
- Users: `/api/users`

## Tech Stack

**Frontend:**
- React 18 + TypeScript
- Vite
- Tailwind CSS
- Shadcn UI

**Backend:**
- Node.js + Express
- PostgreSQL
- node-postgres (pg)

## Next Steps

1. Test all features by creating notes, projects, etc.
2. Customize the database schema if needed
3. Add authentication (JWT tokens)
4. Deploy to production

## Support

For issues or questions, check the documentation in `/server/README.md`
