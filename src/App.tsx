import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Landing from "./pages/Landing";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
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
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
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
  </QueryClientProvider>
);

export default App;
