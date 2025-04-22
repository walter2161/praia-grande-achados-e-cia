
import { useState, useEffect } from "react";
import { useNavigate, Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import MainLayout from "@/components/layout/MainLayout";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get redirect URL from query parameters
  const getRedirectUrl = () => {
    const searchParams = new URLSearchParams(location.search);
    return searchParams.get("redirect") || "/";
  };
  
  // If already logged in, redirect to home or the redirect URL
  if (isAuthenticated()) {
    return <Navigate to={getRedirectUrl()} />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const success = login(username, password);
      if (success) {
        navigate(getRedirectUrl());
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="container py-16 flex justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">Entrar</CardTitle>
            <CardDescription>
              Entre com seu usuário e senha para acessar sua conta
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Usuário</Label>
                <Input
                  id="username"
                  placeholder="Digite seu usuário"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Digite sua senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="text-sm">
                <p>Demo: usuário "user" senha "1234" ou "admin" senha "9764"</p>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                type="submit"
                className="w-full bg-[#FF6600] hover:bg-[#FF6600]/90"
                disabled={isLoading}
              >
                {isLoading ? "Entrando..." : "Entrar"}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Login;
