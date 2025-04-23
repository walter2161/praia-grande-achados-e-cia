
import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

// Define user types
type UserRole = "user" | "admin";

interface User {
  id?: string;
  username: string;
  role: UserRole;
  email?: string;
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  isAdmin: () => boolean;
  isAuthenticated: () => boolean;
}

// Create the context
const AuthContext = createContext<AuthContextType | null>(null);

// Define demo users
const DEMO_USERS = [
  { id: "1", username: "user", password: "1234", role: "user" as UserRole, email: "user@example.com" },
  { id: "2", username: "admin", password: "9764", role: "admin" as UserRole, email: "admin@example.com" },
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
    // First, attempt to login with demo users
    const foundUser = DEMO_USERS.find(
      (u) => u.username === username && u.password === password
    );

    if (foundUser) {
      const userData = {
        id: foundUser.id,
        username: foundUser.username,
        role: foundUser.role,
        email: foundUser.email,
      };
      
      // Save user to state and localStorage
      setUser(userData);
      localStorage.setItem("guiapg_user", JSON.stringify(userData));
      
      toast.success("Login realizado com sucesso!");
      return true;
    } 
    
    // If demo login fails, here you would attempt to login with the database
    // For now, just simulate a failure
    toast.error("Usuário ou senha inválidos");
    return false;
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
