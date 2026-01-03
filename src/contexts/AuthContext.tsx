import { createContext, useContext, useState, ReactNode, useEffect } from "react";

export type UserRole = "employee" | "hr";

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  department?: string;
  position?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  role: UserRole | null;
  signIn: (email: string, password: string, role: UserRole) => Promise<void>;
  signOut: () => void;
  updateUser: (user: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  
  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("dayflow_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const signIn = async (email: string, password: string, role: UserRole) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    // Mock user data based on role
    const mockUser: User = role === "hr" 
      ? {
          id: "hr-001",
          name: "Sarah Johnson",
          email: email || "sarah.j@company.com",
          role: "hr",
          avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100",
          department: "Human Resources",
          position: "HR Manager",
        }
      : {
          id: "emp-001",
          name: "Sophia Williams",
          email: email || "sophia.w@company.com",
          role: "employee",
          avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100",
          department: "Design",
          position: "Senior Designer",
        };
    
    setUser(mockUser);
    localStorage.setItem("dayflow_user", JSON.stringify(mockUser));
  };

  const signOut = () => {
    setUser(null);
    localStorage.removeItem("dayflow_user");
  };

  const updateUser = (updates: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      localStorage.setItem("dayflow_user", JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        role: user?.role || null,
        signIn,
        signOut,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
