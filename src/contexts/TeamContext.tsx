import { createContext, useContext, useState, ReactNode } from "react";

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  department: string;
  email: string;
  phone: string;
  location: string;
  avatar: string;
  status: "available" | "busy" | "away" | "offline";
  joinDate: string;
  skills: string[];
}

interface TeamContextType {
  members: TeamMember[];
  addMember: (member: Omit<TeamMember, "id">) => void;
  updateMember: (id: string, updates: Partial<TeamMember>) => void;
  deleteMember: (id: string) => void;
  getMember: (id: string) => TeamMember | undefined;
}

const initialMembers: TeamMember[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    role: "Engineering Manager",
    department: "Engineering",
    email: "sarah.johnson@company.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    status: "available",
    joinDate: "Jan 2024",
    skills: ["Leadership", "React", "Node.js"],
  },
  {
    id: "2",
    name: "Michael Chen",
    role: "Senior Developer",
    department: "Engineering",
    email: "michael.chen@company.com",
    phone: "+1 (555) 234-5678",
    location: "New York, NY",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
    status: "busy",
    joinDate: "Mar 2023",
    skills: ["TypeScript", "Python", "AWS"],
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    role: "HR Manager",
    department: "Human Resources",
    email: "emily.rodriguez@company.com",
    phone: "+1 (555) 345-6789",
    location: "Austin, TX",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
    status: "available",
    joinDate: "Jun 2022",
    skills: ["Recruiting", "Employee Relations", "HR Systems"],
  },
  {
    id: "4",
    name: "David Kim",
    role: "Product Designer",
    department: "Design",
    email: "david.kim@company.com",
    phone: "+1 (555) 456-7890",
    location: "Seattle, WA",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
    status: "away",
    joinDate: "Sep 2023",
    skills: ["UI/UX", "Figma", "Design Systems"],
  },
  {
    id: "5",
    name: "Lisa Wang",
    role: "Marketing Director",
    department: "Marketing",
    email: "lisa.wang@company.com",
    phone: "+1 (555) 567-8901",
    location: "Los Angeles, CA",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa",
    status: "available",
    joinDate: "Feb 2023",
    skills: ["Digital Marketing", "SEO", "Content Strategy"],
  },
  {
    id: "6",
    name: "James Wilson",
    role: "DevOps Engineer",
    department: "Engineering",
    email: "james.wilson@company.com",
    phone: "+1 (555) 678-9012",
    location: "Boston, MA",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=James",
    status: "available",
    joinDate: "Nov 2022",
    skills: ["Docker", "Kubernetes", "CI/CD"],
  },
];

const TeamContext = createContext<TeamContextType | undefined>(undefined);

export function TeamProvider({ children }: { children: ReactNode }) {
  const [members, setMembers] = useState<TeamMember[]>(initialMembers);

  const addMember = (member: Omit<TeamMember, "id">) => {
    const newMember: TeamMember = {
      ...member,
      id: `tm${Date.now()}`,
    };
    setMembers(prev => [...prev, newMember]);
  };

  const updateMember = (id: string, updates: Partial<TeamMember>) => {
    setMembers(prev => prev.map(m => m.id === id ? { ...m, ...updates } : m));
  };

  const deleteMember = (id: string) => {
    setMembers(prev => prev.filter(m => m.id !== id));
  };

  const getMember = (id: string) => members.find(m => m.id === id);

  return (
    <TeamContext.Provider value={{ members, addMember, updateMember, deleteMember, getMember }}>
      {children}
    </TeamContext.Provider>
  );
}

export function useTeam() {
  const context = useContext(TeamContext);
  if (!context) {
    throw new Error("useTeam must be used within a TeamProvider");
  }
  return context;
}
