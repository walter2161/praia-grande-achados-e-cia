
import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import type { User, Session } from '@supabase/supabase-js';
import type { Profile } from '@/types';

// Credenciais do admin criptografadas em base64
const ADMIN_CREDENTIALS = {
  email: "d3BAbGVkbWt0LmNvbQ==", // wp@ledmkt.com em base64
  password: "OTc2NDMxODUyQFd0", // 976431852@Wt em base64
};

interface AuthContextType {
  user: User | null;
  profile: Profile | null;
  session: Session | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  isAdmin: () => boolean;
  isAuthenticated: () => boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isAdminUser, setIsAdminUser] = useState(false);
  const navigate = useNavigate();

  // Função para decodificar base64
  const decodeBase64 = (str: string) => {
    try {
      return atob(str);
    } catch {
      return "";
    }
  };

  // Verifica se as credenciais são do admin
  const checkAdminCredentials = (email: string, password: string) => {
    const decodedEmail = decodeBase64(ADMIN_CREDENTIALS.email);
    const decodedPassword = decodeBase64(ADMIN_CREDENTIALS.password);
    return email === decodedEmail && password === decodedPassword;
  };

  const login = async (email: string, password: string) => {
    try {
      // Verifica primeiro se são as credenciais do admin
      if (checkAdminCredentials(email, password)) {
        setIsAdminUser(true);
        setUser({ email } as User);
        setProfile({ email, role: 'admin', username: 'admin' } as Profile);
        toast.success("Login de administrador realizado com sucesso!");
        return;
      }

      // Se não for admin, tenta login normal no Supabase
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      if (data && data.user) {
        toast.success("Login realizado com sucesso!");
      }
    } catch (error: any) {
      console.error("Error during login:", error);
      toast.error(error.message || "Erro ao fazer login");
      throw error;
    }
  };

  const logout = async () => {
    try {
      if (isAdminUser) {
        setIsAdminUser(false);
        setUser(null);
        setProfile(null);
        setSession(null);
      } else {
        await supabase.auth.signOut();
      }
      toast.info("Você saiu da sua conta");
      navigate("/");
    } catch (error: any) {
      console.error("Error during logout:", error);
      toast.error(error.message || "Erro ao sair da conta");
    }
  };

  const isAdmin = (): boolean => {
    return isAdminUser || profile?.role === 'admin';
  };

  const isAuthenticated = (): boolean => {
    return !!session || isAdminUser;
  };

  // Mantém a sessão do Supabase para usuários normais
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (!isAdminUser) {
          setSession(session);
          setUser(session?.user ?? null);
          
          if (session?.user) {
            const { data: profile } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', session.user.id)
              .single();
            
            if (profile) {
              setProfile(profile as Profile);
            }
          } else {
            setProfile(null);
          }
        }
      }
    );

    // Check current session
    if (!isAdminUser) {
      supabase.auth.getSession().then(({ data: { session } }) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single()
            .then(({ data: profile }) => {
              if (profile) {
                setProfile(profile as Profile);
              }
            });
        }
      });
    }

    return () => {
      subscription.unsubscribe();
    };
  }, [isAdminUser]);

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        profile,
        session,
        login, 
        logout, 
        isAdmin, 
        isAuthenticated 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
