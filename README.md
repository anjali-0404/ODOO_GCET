
```md
# 🧑‍💼 ODOO – HR Management System

A **modern, enterprise-grade HR Management System** built to streamline employee attendance, time-off management, analytics, and workforce operations.

🚀 Developed as part of the **ODOO GCET Hackathon** using a full-stack, production-ready architecture.

---

## 🚀 Key Features

### 👤 Employee Features
- **Attendance Tracking** – Real-time check-in / check-out
- **Personal Dashboard** – Attendance history & upcoming leaves
- **Time-Off Requests** – Apply, track, and manage leave requests
- **Profile Management** – Personal details, documents & security
- **Notifications** – Important alerts & reminders

### 👥 HR & Admin Features
- **Team Overview** – Live employee attendance monitoring
- **Attendance Analytics** – Weekly / monthly trend analysis
- **Leave Management** – Approve / reject leave requests
- **Employee Profiles** – Salary, documents & department data
- **Bulk Export** – Attendance reports in CSV / Excel
- **Role-Based Access Control**

### 📊 Analytics Dashboard
- Attendance trends
- Late & early arrival insights
- Department-wise heatmaps
- Check-in time distribution

---

## 🛠️ Technology Stack

### Frontend
| Technology | Purpose | Version |
|----------|--------|--------|
| React | UI Framework | 18.3.1 |
| TypeScript | Type Safety | 5.6.2 |
| Vite | Build Tool | 5.4.19 |
| Tailwind CSS | Styling | 3.4.1 |
| Shadcn UI | UI Components | Latest |
| Radix UI | Accessibility | Latest |
| React Router | Routing | 6.29.0 |
| Recharts | Charts | 2.15.0 |
| Lucide React | Icons | 0.468.0 |
| date-fns | Date Utilities | 4.1.0 |

### Backend
- Node.js  
- Express.js  
- PostgreSQL  
- Supabase (Auth + Database)

---

## 🔐 User Roles & Permissions

### Role Hierarchy
```

Admin
├── Full system access
├── User & role management
└── System configuration

HR
├── Attendance & leave approvals
├── Employee management
└── Analytics access

Employee
├── Personal attendance
├── Time-off requests
└── Profile management

````

---

## 📦 Installation & Setup

### Prerequisites
- Node.js 18+
- npm / yarn
- Git

---

### 1️⃣ Clone Repository
```bash
git clone https://github.com/anjali-0404/ODOO_GCET.git
cd people-hub
````

---

### 2️⃣ Frontend Setup

```bash
npm install
npm run dev
```

🌐 Frontend → [http://localhost:8080](http://localhost:8080)

---

### 3️⃣ Backend Setup

```bash
cd server
npm install
node index.js
```

🌐 Backend API → [http://localhost:3001](http://localhost:3001)

---

### 4️⃣ Environment Variables

#### Root `.env`

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

#### `server/.env`

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
├── src/                  # Frontend source
│   ├── components/
│   ├── pages/
│   ├── contexts/
│   ├── hooks/
│   ├── lib/
│   └── assets/
├── server/               # Backend source
│   ├── routes/
│   ├── middleware/
│   ├── config/
│   └── index.js
├── supabase/
│   └── migrations/
├── public/
└── package.json
```

---

## 🔌 API Endpoints

### Authentication

```
POST /api/auth/login
POST /api/auth/register
POST /api/auth/logout
```

### Attendance

```
GET  /api/attendance
POST /api/attendance/checkin
POST /api/attendance/checkout
```

### Time-Off

```
GET  /api/timeoff
POST /api/timeoff
PUT  /api/timeoff/:id
```

---

## 🚀 Deployment

### Frontend

* Vercel
* Netlify

```bash
npm run build
```

Deploy the `dist/` folder.

---

### Backend

* Railway
* Render
* Heroku

⚠️ Ensure backend listens on:

```js
app.listen(process.env.PORT || 3001);
```

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit changes
4. Open a Pull Request

---

## 📄 License

MIT License

---

<div align="center">
  <strong>Built with passion for modern HR management</strong><br/>
  ODOO GCET Hackathon Project
</div>
```

---

