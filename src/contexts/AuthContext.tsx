import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { User as SupabaseUser, Session } from "@supabase/supabase-js";

export type UserRole = "employee" | "hr" | "admin";

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  department?: string;
  position?: string;
  phone?: string;
  location?: string;
  status?: string;
  joinDate?: string;
}

interface AuthContextType {
  user: User | null;
  supabaseUser: SupabaseUser | null;
  session: Session | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  role: UserRole | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (name: string, email: string, password: string, role?: UserRole) => Promise<void>;
  signOut: () => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signInWithGithub: () => Promise<void>;
  updateUserProfile: (updates: Partial<User>) => Promise<void>;
  changePassword: (newPassword: string) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [supabaseUser, setSupabaseUser] = useState<SupabaseUser | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const mapSupabaseUser = (supaUser: SupabaseUser, metadata?: any): User => {
    return {
      id: supaUser.id,
      name: metadata?.name || supaUser.user_metadata?.full_name || supaUser.email?.split("@")[0] || "User",
      email: supaUser.email || "",
      role: (metadata?.role || supaUser.user_metadata?.role || "employee") as UserRole,
      avatar: metadata?.avatar || supaUser.user_metadata?.avatar_url,
      department: metadata?.department || supaUser.user_metadata?.department,
      position: metadata?.position || supaUser.user_metadata?.position,
      phone: metadata?.phone || supaUser.user_metadata?.phone,
      location: metadata?.location || supaUser.user_metadata?.location,
      status: metadata?.status || "active",
      joinDate: supaUser.created_at,
    };
  };

  const fetchUserProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();
      if (error && error.code !== "PGRST116") {
        console.error("Error fetching profile:", error);
      }
      return data;
    } catch (error) {
      console.error("Error fetching profile:", error);
      return null;
    }
  };

  const upsertUserProfile = async (userId: string, profileData: Partial<User>) => {
    try {
      const { error } = await supabase.from("profiles").upsert({
        id: userId,
        name: profileData.name,
        email: profileData.email,
        role: profileData.role || "employee",
        avatar: profileData.avatar,
        department: profileData.department,
        position: profileData.position,
        phone: profileData.phone,
        location: profileData.location,
        status: profileData.status || "active",
        updated_at: new Date().toISOString(),
      });
      if (error) {
        console.error("Error upserting profile:", error);
      }
    } catch (error) {
      console.error("Error upserting profile:", error);
    }
  };

  const refreshUser = async () => {
    if (!supabaseUser) return;
    const profile = await fetchUserProfile(supabaseUser.id);
    const mappedUser = mapSupabaseUser(supabaseUser, profile);
    setUser(mappedUser);
    localStorage.setItem("odoo_user", JSON.stringify(mappedUser));
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setSupabaseUser(session?.user ?? null);
      if (session?.user) {
        fetchUserProfile(session.user.id).then((profile) => {
          const mappedUser = mapSupabaseUser(session.user, profile);
          setUser(mappedUser);
          localStorage.setItem("odoo_user", JSON.stringify(mappedUser));
        });
      }
      setIsLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("Auth state changed:", event, session?.user?.email);
      setSession(session);
      setSupabaseUser(session?.user ?? null);
      if (session?.user) {
        const profile = await fetchUserProfile(session.user.id);
        const mappedUser = mapSupabaseUser(session.user, profile);
        setUser(mappedUser);
        localStorage.setItem("odoo_user", JSON.stringify(mappedUser));
      } else {
        setUser(null);
        localStorage.removeItem("odoo_user");
      }
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw new Error(error.message);
    if (data.user) {
      const profile = await fetchUserProfile(data.user.id);
      const mappedUser = mapSupabaseUser(data.user, profile);
      setUser(mappedUser);
    }
  };

  const signUp = async (name: string, email: string, password: string, role: UserRole = "employee") => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: name, role: role } },
    });
    if (error) throw new Error(error.message);
    if (data.user) {
      await upsertUserProfile(data.user.id, { id: data.user.id, name, email, role, status: "active" });
      const mappedUser = mapSupabaseUser(data.user, { name, role });
      setUser(mappedUser);
    }
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw new Error(error.message);
    setUser(null);
    setSupabaseUser(null);
    setSession(null);
    localStorage.removeItem("odoo_user");
  };

  const signInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: window.location.origin + "/dashboard" },
    });
    if (error) throw new Error(error.message);
  };

  const signInWithGithub = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "github",
      options: { redirectTo: window.location.origin + "/dashboard" },
    });
    if (error) throw new Error(error.message);
  };

  const updateUserProfile = async (updates: Partial<User>) => {
    if (!supabaseUser) throw new Error("No user logged in");
    const { error: authError } = await supabase.auth.updateUser({
      data: { full_name: updates.name, avatar_url: updates.avatar, ...updates },
    });
    if (authError) throw new Error(authError.message);
    await upsertUserProfile(supabaseUser.id, updates);
    await refreshUser();
  };

  const changePassword = async (newPassword: string) => {
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    if (error) throw new Error(error.message);
  };

  const resetPassword = async (email: string) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: window.location.origin + "/reset-password",
    });
    if (error) throw new Error(error.message);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        supabaseUser,
        session,
        isAuthenticated: !!user && !!session,
        isLoading,
        role: user?.role || null,
        signIn,
        signUp,
        signOut,
        signInWithGoogle,
        signInWithGithub,
        updateUserProfile,
        changePassword,
        resetPassword,
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
