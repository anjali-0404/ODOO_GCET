
# DAYFLOW - HR Management System

A modern, comprehensive HR management system built for streamlining employee attendance, time-off management, and workforce analytics.

## 🚀 Features

### 👤 Employee Features
- **Attendance Tracking**: Real-time check-in/check-out with visual status indicators
- **Personal Dashboard**: View attendance history, upcoming time-off, and meetings
- **Time-Off Requests**: Submit and track leave requests with approval status
- **Profile Management**: Manage personal information, documents, and security settings

### 👥 HR Features
- **Team Overview**: Monitor all employees' attendance in real-time
- **Attendance Analytics**: Visual charts for weekly/monthly trends and patterns
- **Time-Off Management**: Approve/reject leave requests with balance tracking
- **Employee Profiles**: Access comprehensive employee information including salary details and documents
- **Bulk Export**: Download attendance reports in CSV/Excel format

### 📊 Analytics Dashboard
- Weekly and monthly attendance trends
- Check-in time distribution analysis
- Team attendance heatmap
- Department-wise attendance statistics

## 🛠️ Technologies

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **UI Framework**: Shadcn UI + Radix UI
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Routing**: React Router
- **State Management**: React Context API
- **Date Handling**: date-fns
- **Icons**: Lucide React

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/anjali-0404/ODOO_GCET.git
cd people-hub

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🌐 Development Server

The development server runs on:
- Local: `http://localhost:8080/`
- Network: `http://[YOUR_IP]:8080/`

## 📁 Project Structure

```
people-hub/
├── src/
│   ├── components/       # Reusable UI components
│   │   ├── ui/          # Shadcn UI components
│   │   ├── CheckInOutCard.tsx
│   │   ├── AttendanceCalendar.tsx
│   │   └── ...
│   ├── pages/           # Page components
│   │   ├── Dashboard.tsx
│   │   ├── Attendance.tsx
│   │   ├── Employees.tsx
│   │   └── ...
│   ├── contexts/        # React Context providers
│   ├── hooks/           # Custom React hooks
│   └── lib/             # Utility functions
├── public/              # Static assets
└── package.json
```

## 🔐 User Roles

- **Employee**: Access personal attendance, time-off, and profile
- **HR**: Full access to team management, analytics, and approvals

## 👨‍💻 Development

```bash
# Run linter
npm run lint

# Build for development
npm run build:dev
```

## 📄 License

This project is part of the ODOO GCET Hackathon.

## 🤝 Contributing

Contributions are welcome! Feel free to submit issues and pull requests.

---


>>>>>>> ae566dc338734ca3515a8856c4c1f231dd4ce9dd
