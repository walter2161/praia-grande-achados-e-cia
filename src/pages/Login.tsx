
import { useState } from "react";
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
  const [regUsername, setRegUsername] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regPassword2, setRegPassword2] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [registering, setRegistering] = useState(false);
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

  // Fake user register - this is just for demo/test usage (would not persist)
  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      if (regPassword !== regPassword2) {
        // Shadcn padrão: window.alert pode ser substituído por toast se desejar
        window.alert("As senhas não coincidem.");
        setIsLoading(false);
        return;
      }
      // Salvar "usuário" (modo local/demo)
      const users = JSON.parse(localStorage.getItem("demo_users") || "[]");
      if (users.find((u: any) => u.username === regUsername)) {
        window.alert("Usuário já existe.");
        setIsLoading(false);
        return;
      }
      users.push({
        username: regUsername,
        password: regPassword
      });
      localStorage.setItem("demo_users", JSON.stringify(users));
      window.alert("Usuário criado! Faça login.");
      setRegistering(false);
      setIsLoading(false);
    }, 800);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Inclui usuários locais fictícios (qualquer um pode logar após cadastrar)
    const demoUsers = JSON.parse(localStorage.getItem("demo_users") || "[]");
    const foundUser = demoUsers.find((u: any) => u.username === username && u.password === password);
    if (foundUser) {
      // Salva como usuário autenticado padrão (só username, papel "user")
      localStorage.setItem("guiapg_user", JSON.stringify({ username: foundUser.username, role: "user" }));
      window.location.reload();
      setIsLoading(false);
      return;
    }

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
            <CardTitle className="text-2xl font-bold">
              {registering ? "Criar Conta" : "Entrar"}
            </CardTitle>
            <CardDescription>
              {registering 
                ? "Preencha os campos para criar sua conta." 
                : "Entre com seu usuário e senha para acessar sua conta"}
            </CardDescription>
          </CardHeader>
          {registering ? (
            <form onSubmit={handleRegister}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="reg-username">Usuário</Label>
                  <Input
                    id="reg-username"
                    placeholder="Escolha um usuário"
                    value={regUsername}
                    onChange={(e) => setRegUsername(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reg-password">Senha</Label>
                  <Input
                    id="reg-password"
                    type="password"
                    placeholder="Digite a senha"
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reg-password2">Confirme a senha</Label>
                  <Input
                    id="reg-password2"
                    type="password"
                    placeholder="Confirme a senha"
                    value={regPassword2}
                    onChange={(e) => setRegPassword2(e.target.value)}
                    required
                  />
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-2">
                <Button
                  type="submit"
                  className="w-full bg-[#FF6600] hover:bg-[#FF6600]/90"
                  disabled={isLoading}
                >
                  {isLoading ? "Criando..." : "Criar Conta"}
                </Button>
                <Button
                  type="button"
                  className="w-full"
                  variant="ghost"
                  onClick={() => setRegistering(false)}
                >
                  Já tem conta? Entrar
                </Button>
              </CardFooter>
            </form>
          ) : (
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
              </CardContent>
              <CardFooter className="flex flex-col gap-2">
                <Button
                  type="submit"
                  className="w-full bg-[#FF6600] hover:bg-[#FF6600]/90"
                  disabled={isLoading}
                >
                  {isLoading ? "Entrando..." : "Entrar"}
                </Button>
                <Button
                  type="button"
                  className="w-full"
                  variant="ghost"
                  onClick={() => setRegistering(true)}
                >
                  Criar Conta
                </Button>
              </CardFooter>
            </form>
          )}
        </Card>
      </div>
    </MainLayout>
  );
};

export default Login;
