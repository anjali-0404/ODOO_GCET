import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { api } from "@/services/api";

export type UserRole = "employee" | "hr" | "admin";

interface User {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  department?: string;
  position?: string;
  phone?: string;
  location?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  role: UserRole | null;
  signIn: (email: string, password: string, role: UserRole) => Promise<void>;
  signOut: () => void;
  updateUserProfile: (updates: Partial<User>) => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  
  // Load user from localStorage on mount and fetch from DB
  useEffect(() => {
    const storedUser = localStorage.getItem("dayflow_user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      // Fetch fresh data from database
      refreshUser(parsedUser.id);
    }
  }, []);

  const refreshUser = async (userId?: number) => {
    try {
      const id = userId || user?.id || 1;
      const userData = await api.getUser(id);
      const updatedUser = {
        id: userData.id,
        name: userData.name,
        email: userData.email,
        role: userData.role as UserRole,
        avatar: userData.avatar,
        department: userData.department,
        position: userData.position,
        phone: userData.phone,
        location: userData.location,
      };
      setUser(updatedUser);
      localStorage.setItem("dayflow_user", JSON.stringify(updatedUser));
    } catch (error) {
      console.error("Failed to refresh user data:", error);
    }
  };

  const signIn = async (email: string, password: string, role: UserRole) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    // Fetch user from database (default to user ID 1 for demo)
    try {
      const userData = await api.getUser(1);
      const loggedInUser: User = {
        id: userData.id,
        name: userData.name,
        email: userData.email,
        role: userData.role as UserRole,
        avatar: userData.avatar,
        department: userData.department,
        position: userData.position,
        phone: userData.phone,
        location: userData.location,
      };
      
      setUser(loggedInUser);
      localStorage.setItem("dayflow_user", JSON.stringify(loggedInUser));
    } catch (error) {
      console.error("Failed to fetch user:", error);
    }
  };

  const signOut = () => {
    setUser(null);
    localStorage.removeItem("dayflow_user");
  };

  const updateUserProfile = async (updates: Partial<User>) => {
    if (!user) return;
    
    try {
      // Update in database
      const updatedData = await api.updateUser(user.id, updates);
      
      // Update local state
      const updatedUser = {
        id: updatedData.id,
        name: updatedData.name,
        email: updatedData.email,
        role: updatedData.role as UserRole,
        avatar: updatedData.avatar,
        department: updatedData.department,
        position: updatedData.position,
        phone: updatedData.phone,
        location: updatedData.location,
      };
      
      setUser(updatedUser);
      localStorage.setItem("dayflow_user", JSON.stringify(updatedUser));
    } catch (error) {
      console.error("Failed to update user profile:", error);
      throw error;
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
        updateUserProfile,
        refreshUser,
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
