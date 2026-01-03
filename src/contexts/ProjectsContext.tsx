import { createContext, useContext, useState, ReactNode } from "react";

export interface Task {
  id: string;
  title: string;
  status: "todo" | "in-progress" | "completed";
  assignee: { name: string; avatar: string };
  dueDate: string;
  priority: "high" | "medium" | "low";
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatar: string;
  email: string;
  tasksAssigned: number;
  tasksCompleted: number;
}

export interface ProjectFile {
  id: string;
  name: string;
  type: string;
  size: string;
  uploadedBy: string;
  uploadedAt: string;
}

export interface Activity {
  id: string;
  user: { name: string; avatar: string };
  action: string;
  target: string;
  timestamp: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  status: "active" | "completed" | "on-hold" | "planning";
  progress: number;
  startDate: string;
  endDate: string;
  priority: "high" | "medium" | "low";
  budget: string;
  department: string;
  tasks: Task[];
  team: TeamMember[];
  files: ProjectFile[];
  activities: Activity[];
  tasksCompleted: number;
  totalTasks: number;
}

interface ProjectsContextType {
  projects: Project[];
  getProject: (id: string) => Project | undefined;
  updateProject: (id: string, updates: Partial<Project>) => void;
  addProject: (project: Omit<Project, "id">) => void;
  deleteProject: (id: string) => void;
  addTask: (projectId: string, task: Omit<Task, "id">) => void;
  updateTask: (projectId: string, taskId: string, updates: Partial<Task>) => void;
  deleteTask: (projectId: string, taskId: string) => void;
  toggleTaskStatus: (projectId: string, taskId: string) => void;
  addMember: (projectId: string, member: Omit<TeamMember, "tasksAssigned" | "tasksCompleted">) => void;
  removeMember: (projectId: string, memberId: string) => void;
  addFile: (projectId: string, file: Omit<ProjectFile, "id">) => void;
  deleteFile: (projectId: string, fileId: string) => void;
  availableMembers: { id: string; name: string; role: string; avatar: string; email: string }[];
}

const initialProjects: Project[] = [
  {
    id: "1",
    name: "Website Redesign",
    description: "Complete overhaul of company website with modern UI/UX. This project aims to improve user experience, increase conversion rates, and establish a stronger brand presence online.",
    status: "active",
    progress: 25,
    startDate: "2026-01-01",
    endDate: "2026-03-15",
    priority: "high",
    budget: "$50,000",
    department: "Engineering",
    tasksCompleted: 1,
    totalTasks: 4,
    tasks: [
      { id: "t1", title: "Design homepage mockups", status: "completed", assignee: { name: "Jane Smith", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jane" }, dueDate: "Jan 15, 2026", priority: "high" },
      { id: "t2", title: "Implement responsive navigation", status: "in-progress", assignee: { name: "John Doe", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John" }, dueDate: "Jan 20, 2026", priority: "high" },
      { id: "t3", title: "Develop product catalog page", status: "todo", assignee: { name: "Mike Wilson", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike" }, dueDate: "Jan 25, 2026", priority: "medium" },
      { id: "t4", title: "Setup analytics tracking", status: "todo", assignee: { name: "John Doe", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John" }, dueDate: "Feb 1, 2026", priority: "medium" },
    ],
    team: [
      { id: "1", name: "John Doe", role: "Lead Developer", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John", email: "john@company.com", tasksAssigned: 2, tasksCompleted: 0 },
      { id: "2", name: "Jane Smith", role: "UI/UX Designer", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jane", email: "jane@company.com", tasksAssigned: 1, tasksCompleted: 1 },
      { id: "3", name: "Mike Wilson", role: "Frontend Developer", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike", email: "mike@company.com", tasksAssigned: 1, tasksCompleted: 0 },
    ],
    files: [
      { id: "f1", name: "Homepage_Design_Final.fig", type: "Figma", size: "2.3 MB", uploadedBy: "Jane Smith", uploadedAt: "Jan 10, 2026" },
      { id: "f2", name: "Brand_Guidelines.pdf", type: "PDF", size: "1.8 MB", uploadedBy: "John Doe", uploadedAt: "Jan 5, 2026" },
    ],
    activities: [
      { id: "a1", user: { name: "Jane Smith", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jane" }, action: "completed task", target: "Design homepage mockups", timestamp: "2 hours ago" },
      { id: "a2", user: { name: "Jane Smith", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jane" }, action: "uploaded file", target: "Homepage_Design_Final.fig", timestamp: "5 hours ago" },
    ],
  },
  {
    id: "2",
    name: "Mobile App Development",
    description: "Native mobile application for iOS and Android platforms",
    status: "active",
    progress: 67,
    startDate: "2025-12-15",
    endDate: "2026-04-30",
    priority: "high",
    budget: "$80,000",
    department: "Engineering",
    tasksCompleted: 2,
    totalTasks: 3,
    tasks: [
      { id: "t1", title: "Setup React Native project", status: "completed", assignee: { name: "Sarah Johnson", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah" }, dueDate: "Dec 20, 2025", priority: "high" },
      { id: "t2", title: "Design app wireframes", status: "completed", assignee: { name: "Tom Brown", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Tom" }, dueDate: "Dec 25, 2025", priority: "high" },
      { id: "t3", title: "Implement authentication", status: "in-progress", assignee: { name: "Sarah Johnson", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah" }, dueDate: "Jan 10, 2026", priority: "high" },
    ],
    team: [
      { id: "1", name: "Sarah Johnson", role: "Mobile Developer", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah", email: "sarah@company.com", tasksAssigned: 2, tasksCompleted: 1 },
      { id: "2", name: "Tom Brown", role: "Designer", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Tom", email: "tom@company.com", tasksAssigned: 1, tasksCompleted: 1 },
    ],
    files: [],
    activities: [],
  },
  {
    id: "3",
    name: "HR System Integration",
    description: "Integrate new HRIS with existing payroll and attendance systems",
    status: "active",
    progress: 67,
    startDate: "2025-11-01",
    endDate: "2026-01-31",
    priority: "medium",
    budget: "$30,000",
    department: "IT",
    tasksCompleted: 2,
    totalTasks: 3,
    tasks: [
      { id: "t1", title: "API integration setup", status: "completed", assignee: { name: "Emily Davis", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily" }, dueDate: "Nov 15, 2025", priority: "high" },
      { id: "t2", title: "Data migration", status: "completed", assignee: { name: "Chris Lee", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Chris" }, dueDate: "Dec 1, 2025", priority: "high" },
      { id: "t3", title: "Testing & QA", status: "in-progress", assignee: { name: "Alex Kim", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex" }, dueDate: "Jan 15, 2026", priority: "medium" },
    ],
    team: [
      { id: "1", name: "Emily Davis", role: "Backend Developer", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily", email: "emily@company.com", tasksAssigned: 1, tasksCompleted: 1 },
      { id: "2", name: "Chris Lee", role: "Data Engineer", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Chris", email: "chris@company.com", tasksAssigned: 1, tasksCompleted: 1 },
      { id: "3", name: "Alex Kim", role: "QA Engineer", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex", email: "alex@company.com", tasksAssigned: 1, tasksCompleted: 0 },
    ],
    files: [],
    activities: [],
  },
  {
    id: "4",
    name: "Marketing Campaign Q1",
    description: "Launch new product marketing campaign across all channels",
    status: "planning",
    progress: 0,
    startDate: "2026-01-10",
    endDate: "2026-03-31",
    priority: "medium",
    budget: "$25,000",
    department: "Marketing",
    tasksCompleted: 0,
    totalTasks: 1,
    tasks: [
      { id: "t1", title: "Define campaign strategy", status: "todo", assignee: { name: "Lisa Wang", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa" }, dueDate: "Jan 15, 2026", priority: "high" },
    ],
    team: [
      { id: "1", name: "Lisa Wang", role: "Marketing Manager", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa", email: "lisa@company.com", tasksAssigned: 1, tasksCompleted: 0 },
    ],
    files: [],
    activities: [],
  },
  {
    id: "5",
    name: "Security Audit 2025",
    description: "Comprehensive security assessment and vulnerability testing",
    status: "completed",
    progress: 100,
    startDate: "2025-10-01",
    endDate: "2025-12-31",
    priority: "high",
    budget: "$40,000",
    department: "Security",
    tasksCompleted: 3,
    totalTasks: 3,
    tasks: [
      { id: "t1", title: "Vulnerability scanning", status: "completed", assignee: { name: "David Miller", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David" }, dueDate: "Oct 15, 2025", priority: "high" },
      { id: "t2", title: "Penetration testing", status: "completed", assignee: { name: "Rachel Green", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rachel" }, dueDate: "Nov 15, 2025", priority: "high" },
      { id: "t3", title: "Final report", status: "completed", assignee: { name: "David Miller", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David" }, dueDate: "Dec 20, 2025", priority: "high" },
    ],
    team: [
      { id: "1", name: "David Miller", role: "Security Analyst", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David", email: "david@company.com", tasksAssigned: 2, tasksCompleted: 2 },
      { id: "2", name: "Rachel Green", role: "Security Engineer", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rachel", email: "rachel@company.com", tasksAssigned: 1, tasksCompleted: 1 },
    ],
    files: [],
    activities: [],
  },
  {
    id: "6",
    name: "Office Renovation",
    description: "Modernize office space with new furniture and equipment",
    status: "on-hold",
    progress: 50,
    startDate: "2025-12-01",
    endDate: "2026-02-28",
    priority: "low",
    budget: "$60,000",
    department: "Operations",
    tasksCompleted: 1,
    totalTasks: 2,
    tasks: [
      { id: "t1", title: "Space planning", status: "completed", assignee: { name: "Kevin Park", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Kevin" }, dueDate: "Dec 10, 2025", priority: "medium" },
      { id: "t2", title: "Vendor selection", status: "todo", assignee: { name: "Kevin Park", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Kevin" }, dueDate: "Dec 20, 2025", priority: "medium" },
    ],
    team: [
      { id: "1", name: "Kevin Park", role: "Facilities Manager", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Kevin", email: "kevin@company.com", tasksAssigned: 2, tasksCompleted: 1 },
    ],
    files: [],
    activities: [],
  },
];

const availableMembers = [
  { id: "m1", name: "David Miller", role: "Developer", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David", email: "david@company.com" },
  { id: "m2", name: "Rachel Green", role: "Designer", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rachel", email: "rachel@company.com" },
  { id: "m3", name: "Kevin Park", role: "Project Manager", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Kevin", email: "kevin@company.com" },
  { id: "m4", name: "Lisa Wang", role: "Marketing", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa", email: "lisa@company.com" },
  { id: "m5", name: "Tom Brown", role: "Designer", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Tom", email: "tom@company.com" },
  { id: "m6", name: "Sarah Johnson", role: "Developer", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah", email: "sarah@company.com" },
];

const ProjectsContext = createContext<ProjectsContextType | undefined>(undefined);

export function ProjectsProvider({ children }: { children: ReactNode }) {
  const [projects, setProjects] = useState<Project[]>(initialProjects);

  const recalculateProgress = (tasks: Task[]): { progress: number; tasksCompleted: number; totalTasks: number } => {
    const completed = tasks.filter(t => t.status === "completed").length;
    const total = tasks.length;
    const progress = total > 0 ? Math.round((completed / total) * 100) : 0;
    return { progress, tasksCompleted: completed, totalTasks: total };
  };

  const getProject = (id: string) => projects.find(p => p.id === id);

  const updateProject = (id: string, updates: Partial<Project>) => {
    setProjects(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
  };

  const addProject = (project: Omit<Project, "id">) => {
    const newProject: Project = {
      ...project,
      id: `p${Date.now()}`,
    };
    setProjects(prev => [...prev, newProject]);
  };

  const deleteProject = (id: string) => {
    setProjects(prev => prev.filter(p => p.id !== id));
  };

  const addTask = (projectId: string, task: Omit<Task, "id">) => {
    setProjects(prev => prev.map(p => {
      if (p.id === projectId) {
        const newTask: Task = { ...task, id: `t${Date.now()}` };
        const newTasks = [...p.tasks, newTask];
        const stats = recalculateProgress(newTasks);
        return { ...p, tasks: newTasks, ...stats };
      }
      return p;
    }));
  };

  const updateTask = (projectId: string, taskId: string, updates: Partial<Task>) => {
    setProjects(prev => prev.map(p => {
      if (p.id === projectId) {
        const newTasks = p.tasks.map(t => t.id === taskId ? { ...t, ...updates } : t);
        const stats = recalculateProgress(newTasks);
        return { ...p, tasks: newTasks, ...stats };
      }
      return p;
    }));
  };

  const deleteTask = (projectId: string, taskId: string) => {
    setProjects(prev => prev.map(p => {
      if (p.id === projectId) {
        const newTasks = p.tasks.filter(t => t.id !== taskId);
        const stats = recalculateProgress(newTasks);
        return { ...p, tasks: newTasks, ...stats };
      }
      return p;
    }));
  };

  const toggleTaskStatus = (projectId: string, taskId: string) => {
    setProjects(prev => prev.map(p => {
      if (p.id === projectId) {
        const newTasks = p.tasks.map(t => {
          if (t.id === taskId) {
            const newStatus = t.status === "completed" ? "todo" : "completed";
            return { ...t, status: newStatus as Task["status"] };
          }
          return t;
        });
        const stats = recalculateProgress(newTasks);
        return { ...p, tasks: newTasks, ...stats };
      }
      return p;
    }));
  };

  const addMember = (projectId: string, member: Omit<TeamMember, "tasksAssigned" | "tasksCompleted">) => {
    setProjects(prev => prev.map(p => {
      if (p.id === projectId) {
        const newMember: TeamMember = { ...member, tasksAssigned: 0, tasksCompleted: 0 };
        return { ...p, team: [...p.team, newMember] };
      }
      return p;
    }));
  };

  const removeMember = (projectId: string, memberId: string) => {
    setProjects(prev => prev.map(p => {
      if (p.id === projectId) {
        return { ...p, team: p.team.filter(m => m.id !== memberId) };
      }
      return p;
    }));
  };

  const addFile = (projectId: string, file: Omit<ProjectFile, "id">) => {
    setProjects(prev => prev.map(p => {
      if (p.id === projectId) {
        const newFile: ProjectFile = { ...file, id: `f${Date.now()}` };
        return { ...p, files: [...p.files, newFile] };
      }
      return p;
    }));
  };

  const deleteFile = (projectId: string, fileId: string) => {
    setProjects(prev => prev.map(p => {
      if (p.id === projectId) {
        return { ...p, files: p.files.filter(f => f.id !== fileId) };
      }
      return p;
    }));
  };

  return (
    <ProjectsContext.Provider value={{
      projects,
      getProject,
      updateProject,
      addProject,
      deleteProject,
      addTask,
      updateTask,
      deleteTask,
      toggleTaskStatus,
      addMember,
      removeMember,
      addFile,
      deleteFile,
      availableMembers,
    }}>
      {children}
    </ProjectsContext.Provider>
  );
}

export function useProjects() {
  const context = useContext(ProjectsContext);
  if (!context) {
    throw new Error("useProjects must be used within a ProjectsProvider");
  }
  return context;
}
