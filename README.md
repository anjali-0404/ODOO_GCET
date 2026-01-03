# 🧑‍💼 ODOO – HR Management System

A **modern, enterprise-grade HR Management System** built to streamline employee attendance, time-off management, analytics, and workforce operations.

🚀 Developed as part of the **ODOO GCET Hackathon** using a full-stack, production-ready architecture.

---

## 🚀 Key Features

### 👤 Employee Features
- Real-time attendance check-in / check-out
- Personal dashboard with attendance history
- Time-off request and tracking system
- Profile & document management
- Notifications and alerts

### 👥 HR & Admin Features
- Live team attendance monitoring
- Attendance analytics (weekly / monthly)
- Leave approval & balance tracking
- Employee profiles with department data
- Export reports (CSV / Excel)
- Role-based access control

### 📊 Analytics Dashboard
- Attendance trends & patterns
- Late / early arrival insights
- Department-wise statistics
- Check-in time distribution

---

## 🛠️ Technology Stack

### Frontend
- React 18.3.1
- TypeScript 5.6.2
- Vite 5.4.19
- Tailwind CSS
- Shadcn UI + Radix UI
- React Router
- Recharts
- Lucide React
- date-fns

### Backend
- Node.js
- Express.js
- PostgreSQL
- Supabase (Auth + Database)

---

## 🔐 User Roles

- **Admin** – Full system access & configuration
- **HR** – Employee management, approvals & analytics
- **Employee** – Attendance, time-off & profile access

---

## 📦 Installation & Setup

### Prerequisites
- Node.js 18+
- npm / yarn
- Git

### Clone Repository
```bash
git clone https://github.com/anjali-0404/ODOO_GCET.git
cd people-hub
```

### Frontend Setup
```bash
npm install
npm run dev
```
Frontend runs on **http://localhost:8080**

### Backend Setup
```bash
cd server
npm install
node index.js
```
Backend API runs on **http://localhost:3001**

---

## 🌱 Environment Variables

### Root `.env`
```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### `server/.env`
```env
DATABASE_URL=postgresql://user:password@localhost:5432/odoo_hr
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
PORT=3001
NODE_ENV=development
```

---

## 📁 Project Structure
```
people-hub/
├── src/        # Frontend
├── server/     # Backend
├── supabase/   # Database migrations
├── public/
└── package.json
```

---

## 🔌 API Overview

### Authentication
- POST /api/auth/login
- POST /api/auth/register
- POST /api/auth/logout

### Attendance
- GET  /api/attendance
- POST /api/attendance/checkin
- POST /api/attendance/checkout

### Time-Off
- GET  /api/timeoff
- POST /api/timeoff
- PUT  /api/timeoff/:id

---

## 🚀 Deployment

### Frontend
```bash
npm run build
```
Deploy `dist/` on **Vercel / Netlify**

### Backend
Deploy on **Railway / Render / Heroku**

> Ensure backend uses:
```js
app.listen(process.env.PORT || 3001);
```

---

## 🤝 Contributing
Contributions are welcome via issues and pull requests.

---

## 📄 License
MIT License

---

<div align="center">
Built with passion for modern HR management  
<strong>ODOO GCET Hackathon Project</strong>
</div>
