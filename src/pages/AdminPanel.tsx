
import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const AdminPanel = () => {
  const { isAdmin, isAuthenticated } = useAuth();
  
  useEffect(() => {
    // Scroll to top on component mount
    window.scrollTo(0, 0);
  }, []);

  // If not authenticated, redirect to login
  if (!isAuthenticated()) {
    return <Navigate to="/login" />;
  }

  // If authenticated but not admin, redirect to home
  if (!isAdmin()) {
    return <Navigate to="/" />;
  }

  return (
    <MainLayout>
      <div className="container py-12">
        <h1 className="text-3xl font-bold mb-8">Painel Administrativo</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Estatísticas</CardTitle>
              <CardDescription>Visão geral do site</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>Total de Anúncios:</span>
                  <span className="font-medium">120</span>
                </div>
                <div className="flex justify-between">
                  <span>Usuários Cadastrados:</span>
                  <span className="font-medium">45</span>
                </div>
                <div className="flex justify-between">
                  <span>Visualizações Hoje:</span>
                  <span className="font-medium">312</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Ações Rápidas</CardTitle>
              <CardDescription>Gerenciamento do site</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <button className="w-full text-left p-3 border rounded hover:bg-gray-50">
                  Moderar Anúncios Pendentes
                </button>
                <button className="w-full text-left p-3 border rounded hover:bg-gray-50">
                  Gerenciar Usuários
                </button>
                <button className="w-full text-left p-3 border rounded hover:bg-gray-50">
                  Configurações do Site
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Anúncios Recentes</CardTitle>
            <CardDescription>Últimos anúncios publicados</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((item) => (
                <div key={item} className="flex justify-between border-b pb-3">
                  <div>
                    <p className="font-medium">Título do Anúncio {item}</p>
                    <p className="text-sm text-muted-foreground">Categoria: Imóveis</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="text-sm text-blue-600 hover:underline">Editar</button>
                    <button className="text-sm text-red-600 hover:underline">Remover</button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default AdminPanel;
