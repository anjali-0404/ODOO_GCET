import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProjectsProvider } from "@/contexts/ProjectsContext";
import { TeamProvider } from "@/contexts/TeamContext";
import { BenefitsProvider } from "@/contexts/BenefitsContext";
import { DocumentsProvider } from "@/contexts/DocumentsContext";
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
import ProjectDetails from "./pages/ProjectDetails";
import Team from "./pages/Team";
import Notes from "./pages/Notes";
import Benefits from "./pages/Benefits";
import Documents from "./pages/Documents";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <ProjectsProvider>
        <TeamProvider>
          <BenefitsProvider>
            <DocumentsProvider>
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
                    <Route path="/dashboard/projects/:projectId" element={<ProjectDetails />} />
                    <Route path="/dashboard/team" element={<Team />} />
                    <Route path="/dashboard/notes" element={<Notes />} />
                    <Route path="/dashboard/benefits" element={<Benefits />} />
                    <Route path="/dashboard/documents" element={<Documents />} />
                    <Route path="/dashboard/settings" element={<Settings />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </BrowserRouter>
              </TooltipProvider>
            </DocumentsProvider>
          </BenefitsProvider>
        </TeamProvider>
      </ProjectsProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
