<div align="center"># odoo - HR Management System

  <h1>odoo HR Management System</h1>

  <p><strong>A modern, enterprise-grade HR management platform for streamlining workforce operations</strong></p>A modern, comprehensive HR management system built for streamlining employee attendance, time-off management, and workforce analytics.

  

  <p>## 🚀 Features

    <img src="https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React" />

    <img src="https://img.shields.io/badge/TypeScript-5.6.2-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />### 👤 Employee Features

    <img src="https://img.shields.io/badge/Vite-5.4.19-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />- **Attendance Tracking**: Real-time check-in/check-out with visual status indicators

    <img src="https://img.shields.io/badge/Supabase-Auth-3FCF8E?style=for-the-badge&logo=supabase&logoColor=white" alt="Supabase" />- **Personal Dashboard**: View attendance history, upcoming time-off, and meetings

  </p>- **Time-Off Requests**: Submit and track leave requests with approval status

</div>- **Profile Management**: Manage personal information, documents, and security settings



---### 👥 HR Features

- **Team Overview**: Monitor all employees' attendance in real-time

## Table of Contents- **Attendance Analytics**: Visual charts for weekly/monthly trends and patterns

- **Time-Off Management**: Approve/reject leave requests with balance tracking

- [Overview](#overview)- **Employee Profiles**: Access comprehensive employee information including salary details and documents

- [Key Features](#key-features)- **Bulk Export**: Download attendance reports in CSV/Excel format

- [Technology Stack](#technology-stack)

- [Getting Started](#getting-started)### 📊 Analytics Dashboard

- [Project Structure](#project-structure)- Weekly and monthly attendance trends

- [User Roles & Permissions](#user-roles--permissions)- Check-in time distribution analysis

- [API Integration](#api-integration)- Team attendance heatmap

- [Configuration](#configuration)- Department-wise attendance statistics

- [Development](#development)

- [Deployment](#deployment)## 🛠️ Technologies

- [Contributing](#contributing)

- **Frontend**: React 18 + TypeScript

---- **Build Tool**: Vite

- **UI Framework**: Shadcn UI + Radix UI

## Overview- **Styling**: Tailwind CSS

- **Charts**: Recharts

**odoo HR Management System** is a comprehensive, full-stack Human Resources platform designed to modernize workforce management. Built with cutting-edge technologies, it provides an intuitive interface for employees and powerful tools for HR administrators.- **Routing**: React Router

- **State Management**: React Context API

### What Makes It Special- **Date Handling**: date-fns

- **Icons**: Lucide React

- **Role-Based Access Control**: Separate interfaces for employees, HR, and administrators

- **Real-Time Updates**: Live attendance tracking and instant notifications## 📦 Installation

- **Modern UI/UX**: Built with Shadcn UI and Radix UI primitives for accessibility

- **Cloud-First Architecture**: Powered by Supabase for authentication and data management```bash

- **Responsive Design**: Seamless experience across desktop, tablet, and mobile devices# Clone the repository

git clone https://github.com/anjali-0404/ODOO_GCET.git

---cd people-hub



## Key Features# Install dependencies

npm install

### For Employees

# Start development server

**Attendance Management**npm run dev

- One-click check-in/check-out with timestamp tracking

- Personal attendance history with calendar view# Build for production

- Weekly and monthly attendance statisticsnpm run build

- Automated overtime calculations

# Preview production build

**Time-Off Management**npm run preview

- Submit vacation, sick leave, and unpaid leave requests```

- Track request status (pending, approved, rejected)

- View available leave balance by category## 🌐 Development Server

- Upload supporting documents (sick leave certificates)

The development server runs on:

**Personal Dashboard**- Local: `http://localhost:8080/`

- At-a-glance view of attendance status- Network: `http://[YOUR_IP]:8080/`

- Upcoming time-off and important dates

- Quick access to frequently used features## 📁 Project Structure

- Personalized notifications

```

**Profile Management**people-hub/

- Update contact information and emergency contacts├── src/

- Change password and security settings│   ├── components/       # Reusable UI components

- Manage notification preferences│   │   ├── ui/          # Shadcn UI components

- View employment history│   │   ├── CheckInOutCard.tsx

│   │   ├── AttendanceCalendar.tsx

### For HR Administrators│   │   └── ...

│   ├── pages/           # Page components

**Employee Management**│   │   ├── Dashboard.tsx

- Comprehensive employee directory│   │   ├── Attendance.tsx

- View detailed employee profiles including salary information│   │   ├── Employees.tsx

- Track employment status and department assignments│   │   └── ...

- Access employee documents and records│   ├── contexts/        # React Context providers

│   ├── hooks/           # Custom React hooks

**Approval Workflows**│   └── lib/             # Utility functions

- Review and approve/reject time-off requests├── public/              # Static assets

- Bulk approval capabilities└── package.json

- Comment and request additional documentation```

- Automated email notifications to employees

## 🔐 User Roles

**Attendance Analytics**

- Department-wise attendance reports- **Employee**: Access personal attendance, time-off, and profile

- Weekly and monthly trend analysis- **HR**: Full access to team management, analytics, and approvals

- Late arrival and early departure tracking

- Export reports in CSV/Excel format## 👨‍💻 Development



**Team Oversight**```bash

- Real-time team attendance dashboard# Run linter

- Filter by department, status, or date rangenpm run lint

- Visual charts and graphs for data insights

- Identify attendance patterns and anomalies# Build for development

npm run build:dev

### Additional Features```



**Projects & Team Collaboration**## 📄 License

- Create and manage projects with timelines

- Assign team members and track progressThis project is part of the ODOO GCET Hackathon.

- File sharing and document management

- Activity logs and team communication## 🤝 Contributing



**Benefits Administration**Contributions are welcome! Feel free to submit issues and pull requests.

- View available employee benefits

- Enroll in health insurance, retirement plans---

- Track benefit usage and eligibility

- Company policy documentation


**Documents & Resources**
- Centralized document repository
- Upload and share company policies
- Employee handbook access
- Training materials and resources

---

## Technology Stack

### Frontend

| Technology | Purpose | Version |
|------------|---------|---------|
| **React** | UI Framework | 18.3.1 |
| **TypeScript** | Type Safety | 5.6.2 |
| **Vite** | Build Tool | 5.4.19 |
| **Tailwind CSS** | Styling | 3.4.1 |
| **Shadcn UI** | Component Library | Latest |
| **Radix UI** | Headless Components | Latest |
| **React Router** | Routing | 6.29.0 |
| **Recharts** | Data Visualization | 2.15.0 |
| **Lucide React** | Icon System | 0.468.0 |
| **date-fns** | Date Utilities | 4.1.0 |

### Backend

| Technology | Purpose |
|------------|---------|
| **Node.js** | Runtime Environment |
| **Express** | Web Framework |
| **PostgreSQL** | Database |
| **Supabase** | Authentication & BaaS |

### Authentication

- **Supabase Auth** with multiple providers:
  - Email/Password authentication
  - Google OAuth 2.0
  - GitHub OAuth
  - Row Level Security (RLS) policies

---

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn package manager
- PostgreSQL 14+ (for local backend development)
- Git

### Installation

**1. Clone the repository**

```bash
git clone https://github.com/Surfing-Ninja/people-hub.git
cd people-hub
```

**2. Install frontend dependencies**

```bash
npm install
```

**3. Install backend dependencies**

```bash
cd server
npm install
cd ..
```

**4. Configure environment variables**

Create a `.env` file in the root directory:

```env
# Supabase Configuration
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Create a `.env` file in the `server` directory:

```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/odoo_hr

# Supabase (Backend)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Server Configuration
PORT=3001
NODE_ENV=development
```

**5. Set up the database**

Run the SQL migration in your Supabase SQL Editor:

```bash
cat supabase/migrations/001_create_profiles.sql
```

Or use your local PostgreSQL instance and run the backend migrations.

**6. Start the development servers**

Terminal 1 (Frontend):
```bash
npm run dev
```

Terminal 2 (Backend):
```bash
cd server
node index.js
```

**7. Access the application**

- Frontend: `http://localhost:8080`
- Backend API: `http://localhost:3001`

---

## Project Structure

```
people-hub/
│
├── src/                          # Frontend source code
│   ├── components/               # React components
│   │   ├── ui/                  # Shadcn UI components
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── dialog.tsx
│   │   │   └── ...
│   │   ├── CheckInOutCard.tsx   # Attendance widget
│   │   ├── DashboardLayout.tsx  # Main layout wrapper
│   │   ├── Sidebar.tsx          # Navigation sidebar
│   │   └── ...
│   │
│   ├── pages/                   # Page components
│   │   ├── Dashboard.tsx        # Main dashboard
│   │   ├── Attendance.tsx       # Attendance management
│   │   ├── TimeOff.tsx          # Leave management
│   │   ├── Employees.tsx        # Employee directory (HR)
│   │   ├── Projects.tsx         # Project management
│   │   ├── Team.tsx             # Team management
│   │   ├── Benefits.tsx         # Benefits administration
│   │   ├── Documents.tsx        # Document repository
│   │   ├── Settings.tsx         # User settings
│   │   └── ...
│   │
│   ├── contexts/                # React Context providers
│   │   ├── AuthContext.tsx      # Authentication state
│   │   ├── ProjectsContext.tsx  # Projects state
│   │   ├── TeamContext.tsx      # Team state
│   │   ├── BenefitsContext.tsx  # Benefits state
│   │   └── DocumentsContext.tsx # Documents state
│   │
│   ├── hooks/                   # Custom React hooks
│   │   ├── use-mobile.tsx
│   │   └── use-toast.ts
│   │
│   ├── lib/                     # Utility functions
│   │   ├── utils.ts             # Helper functions
│   │   └── supabase.ts          # Supabase client
│   │
│   ├── assets/                  # Static assets
│   ├── App.tsx                  # Root component
│   ├── main.tsx                 # Entry point
│   └── index.css                # Global styles
│
├── server/                      # Backend source code
│   ├── routes/                  # API routes
│   ├── middleware/              # Express middleware
│   ├── config/                  # Configuration files
│   ├── index.js                 # Server entry point
│   └── .env                     # Backend environment variables
│
├── supabase/                    # Supabase configuration
│   └── migrations/              # Database migrations
│       └── 001_create_profiles.sql
│
├── public/                      # Public static files
│   └── robots.txt
│
├── components.json              # Shadcn UI config
├── tailwind.config.ts           # Tailwind configuration
├── tsconfig.json                # TypeScript configuration
├── vite.config.ts               # Vite configuration
└── package.json                 # Dependencies
```

---

## User Roles & Permissions

### Role Hierarchy

```
Administrator (admin)
    ├── Full system access
    ├── Manage all users and roles
    ├── System configuration
    └── Access to all features
    
HR Manager (hr)
    ├── View all employee data
    ├── Approve/reject time-off requests
    ├── Manage attendance records
    ├── Access analytics and reports
    └── Cannot modify system settings
    
Employee (employee)
    ├── View own profile and data
    ├── Submit time-off requests
    ├── Track personal attendance
    └── Access personal documents
```

### Permission Matrix

| Feature | Employee | HR | Admin |
|---------|----------|-----|-------|
| View Own Profile | ✓ | ✓ | ✓ |
| Edit Own Profile | ✓ | ✓ | ✓ |
| View All Employees | ✗ | ✓ | ✓ |
| Submit Time-Off | ✓ | ✓ | ✓ |
| Approve Time-Off | ✗ | ✓ | ✓ |
| View Own Attendance | ✓ | ✓ | ✓ |
| View All Attendance | ✗ | ✓ | ✓ |
| Manage Projects | ✗ | ✓ | ✓ |
| Manage Benefits | ✗ | ✓ | ✓ |
| System Settings | ✗ | ✗ | ✓ |

---

## API Integration

### Backend Endpoints

#### Authentication
```
POST   /api/auth/login          # User login
POST   /api/auth/register       # User registration
POST   /api/auth/logout         # User logout
POST   /api/auth/refresh        # Refresh token
```

#### Employees
```
GET    /api/employees           # Get all employees (HR only)
GET    /api/employees/:id       # Get employee by ID
PUT    /api/employees/:id       # Update employee
DELETE /api/employees/:id       # Delete employee (Admin only)
```

#### Attendance
```
GET    /api/attendance          # Get attendance records
POST   /api/attendance/checkin  # Clock in
POST   /api/attendance/checkout # Clock out
GET    /api/attendance/stats    # Get statistics
```

#### Time-Off
```
GET    /api/timeoff             # Get time-off requests
POST   /api/timeoff             # Submit new request
PUT    /api/timeoff/:id         # Update request status
DELETE /api/timeoff/:id         # Delete request
```

### Supabase Integration

The application uses Supabase for:
- User authentication (email/password, OAuth)
- Profile data storage
- Row Level Security (RLS) policies
- Real-time subscriptions

---

## Configuration

### Supabase Setup

**1. Create a Supabase project**
- Go to https://supabase.com
- Create a new project
- Note your project URL and anon key

**2. Configure OAuth providers**

For Google OAuth:
- Google Cloud Console → APIs & Services → Credentials
- Create OAuth 2.0 Client ID
- Authorized JavaScript origins: `http://localhost:8080`, `https://your-supabase-url.supabase.co`
- Authorized redirect URIs: `https://your-supabase-url.supabase.co/auth/v1/callback`

For GitHub OAuth:
- GitHub Settings → Developer settings → OAuth Apps
- Create new OAuth App
- Authorization callback URL: `https://your-supabase-url.supabase.co/auth/v1/callback`

**3. Run database migrations**
- Open Supabase SQL Editor
- Execute the migration script in `supabase/migrations/001_create_profiles.sql`

### Environment Variables

Ensure all required environment variables are set before running the application. See `.env.example` for reference.

---

## Development

### Available Scripts

```bash
# Start development server (port 8080)
npm run dev

# Build for production
npm run build

# Build for development with source maps
npm run build:dev

# Preview production build
npm run preview

# Run ESLint
npm run lint
```

### Code Style

This project follows:
- ESLint for code quality
- TypeScript strict mode
- Prettier for code formatting (configure as needed)
- Component-driven architecture

### Adding New Features

1. Create components in `src/components/`
2. Add pages in `src/pages/`
3. Use contexts for global state
4. Follow the existing component patterns
5. Ensure TypeScript type safety

---

## Deployment

### Frontend Deployment (Vercel/Netlify)

**1. Build the application**
```bash
npm run build
```

**2. Deploy the `dist` folder**

For Vercel:
```bash
vercel --prod
```

For Netlify:
```bash
netlify deploy --prod --dir=dist
```

### Backend Deployment (Railway/Render/Heroku)

**1. Ensure all environment variables are set**

**2. Deploy using the platform CLI or Git integration**

**3. Configure the database connection string**

### Environment Variables for Production

Update your production environment with:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- Database connection strings
- OAuth client IDs and secrets

---

## Contributing

Contributions are welcome and appreciated! Here's how you can contribute:

### Reporting Issues

1. Check if the issue already exists
2. Create a detailed issue with:
   - Clear title and description
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots if applicable

### Pull Requests

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Write clean, readable code
- Add TypeScript types for new features
- Test your changes thoroughly
- Update documentation as needed
- Follow the existing code style

---

## License

This project is licensed under the MIT License. See the LICENSE file for details.

---

## Acknowledgments

- Built with React, TypeScript, and Vite
- UI components powered by Shadcn UI and Radix UI
- Authentication by Supabase
- Icons by Lucide React
- Charts by Recharts

---

## Support

For questions, issues, or feature requests:
- Open an issue on GitHub
- Check existing documentation
- Review closed issues for solutions

---

<div align="center">
  <p>Built with passion for modern HR management</p>
  <p>Made by <strong>Surfing-Ninja</strong></p>
</div>
