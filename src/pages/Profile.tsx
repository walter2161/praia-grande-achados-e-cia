
import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const Profile = () => {
  const { profile, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Scroll to top on component mount
    window.scrollTo(0, 0);
  }, []);

  // If not authenticated, redirect to login
  if (!isAuthenticated()) {
    return <Navigate to="/login" />;
  }

  return (
    <MainLayout>
      <div className="container py-12">
        <h1 className="text-3xl font-bold mb-8">Meu Perfil</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Informações da Conta</CardTitle>
                <CardDescription>Seus dados de acesso</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Usuário</p>
                    <p className="font-medium">{profile?.username}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Tipo de Conta</p>
                    <p className="font-medium capitalize">{profile?.role}</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={logout}
                >
                  Sair da Conta
                </Button>
              </CardFooter>
            </Card>
          </div>
          
          <div className="md:col-span-2">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Meus Anúncios</CardTitle>
                <CardDescription>Anúncios que você publicou</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  <p>Você ainda não possui anúncios publicados.</p>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full bg-[#FF6600] hover:bg-[#FF6600]/90"
                  onClick={() => navigate("/criar-anuncio")}
                >
                  Criar Novo Anúncio
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Anúncios Favoritos</CardTitle>
                <CardDescription>Anúncios que você salvou</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  <p>Você ainda não possui anúncios favoritos.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Profile;
