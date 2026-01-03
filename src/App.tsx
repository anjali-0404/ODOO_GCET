import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
<<<<<<< HEAD
=======
import { AuthProvider } from "@/contexts/AuthContext";
>>>>>>> ae566dc338734ca3515a8856c4c1f231dd4ce9dd
import Landing from "./pages/Landing";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
<<<<<<< HEAD
import EmployeeProfile from "./pages/EmployeeProfile";
import Attendance from "./pages/Attendance";
import TimeOff from "./pages/TimeOff";
=======
import Employees from "./pages/Employees";
import EmployeeProfile from "./pages/EmployeeProfile";
import Attendance from "./pages/Attendance";
import TimeOff from "./pages/TimeOff";
import Calendar from "./pages/Calendar";
import Projects from "./pages/Projects";
import Team from "./pages/Team";
import Notes from "./pages/Notes";
import Benefits from "./pages/Benefits";
import Documents from "./pages/Documents";
>>>>>>> ae566dc338734ca3515a8856c4c1f231dd4ce9dd
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
<<<<<<< HEAD
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/employee/:id" element={<EmployeeProfile />} />
          <Route path="/dashboard/profile" element={<EmployeeProfile />} />
          <Route path="/dashboard/attendance" element={<Attendance />} />
          <Route path="/dashboard/time-off" element={<TimeOff />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
=======
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/employees" element={<Employees />} />
            <Route path="/dashboard/employee/:id" element={<EmployeeProfile />} />
            <Route path="/dashboard/profile" element={<EmployeeProfile />} />
            <Route path="/dashboard/attendance" element={<Attendance />} />
            <Route path="/dashboard/calendar" element={<Calendar />} />
            <Route path="/dashboard/time-off" element={<TimeOff />} />
            <Route path="/dashboard/projects" element={<Projects />} />
            <Route path="/dashboard/team" element={<Team />} />
            <Route path="/dashboard/notes" element={<Notes />} />
            <Route path="/dashboard/benefits" element={<Benefits />} />
            <Route path="/dashboard/documents" element={<Documents />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
>>>>>>> ae566dc338734ca3515a8856c4c1f231dd4ce9dd
  </QueryClientProvider>
);

export default App;
