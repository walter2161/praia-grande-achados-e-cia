
import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

// Define user types
type UserRole = "user" | "admin";

interface User {
  username: string;
  role: UserRole;
  email?: string; // Add email property
  id?: string; // Add id property
}

// Create the context
const AuthContext = createContext<AuthContextType | null>(null);

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  isAdmin: () => boolean;
  isAuthenticated: () => boolean;
}

// Define demo users
const DEMO_USERS = [
  { username: "user", password: "1234", role: "user" as UserRole, email: "user@example.com", id: "user_001" },
  { username: "admin", password: "9764", role: "admin" as UserRole, email: "admin@example.com", id: "admin_001" },
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  // Check for existing session on component mount
  useEffect(() => {
    const storedUser = localStorage.getItem("guiapg_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Login function
  const login = (username: string, password: string): boolean => {
    const foundUser = DEMO_USERS.find(
      (u) => u.username === username && u.password === password
    );

    if (foundUser) {
      const userData = {
        username: foundUser.username,
        role: foundUser.role,
        email: foundUser.email,
        id: foundUser.id,
      };
      
      // Save user to state and localStorage
      setUser(userData);
      localStorage.setItem("guiapg_user", JSON.stringify(userData));
      
      toast.success("Login realizado com sucesso!");
      return true;
    } else {
      toast.error("Usuário ou senha inválidos");
      return false;
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem("guiapg_user");
    toast.info("Você saiu da sua conta");
    navigate("/");
  };

  // Check if user is admin
  const isAdmin = (): boolean => {
    return user?.role === "admin";
  };

  // Check if user is authenticated
  const isAuthenticated = (): boolean => {
    return user !== null;
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAdmin, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
