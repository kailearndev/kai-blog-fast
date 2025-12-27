import type { Session, User } from "@supabase/supabase-js";
import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "./lib/supabase";
import toast from "react-hot-toast";

// Thêm Session vào interface để tiện lấy access_token gọi API
interface AuthState {
  session: Session | null;
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthState | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 1. Kiểm tra session ngay khi app load (thay cho đoạn check localStorage thủ công)
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setIsLoading(false);
    });

    // 2. Lắng nghe mọi thay đổi về Auth (Đăng nhập, Đăng xuất, Token thay đổi...)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      // _event có thể là: 'SIGNED_IN', 'SIGNED_OUT', 'TOKEN_REFRESHED'
      setSession(session);
      setUser(session?.user ?? null);
      setIsLoading(false);
    });

    // Cleanup khi component unmount
    return () => subscription.unsubscribe();
  }, []);

  // Hàm login giờ đơn giản hơn, không cần set state thủ công
  // Vì onAuthStateChange ở trên sẽ tự bắt sự kiện và update state
  const login = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
  };

  const logout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      toast.error("Error logging out: " + error.message);
      throw error;
    }

    // Không cần setUser(null) ở đây vì onAuthStateChange sẽ tự làm việc đó
  };

  const value = {
    session,
    user,
    isAuthenticated: !!user, // Tự động true nếu có user
    isLoading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
