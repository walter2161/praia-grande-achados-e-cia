import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import MainLayout from "@/components/layout/MainLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Search, User, Settings, Database, Image, Plus, Trash, Edit } from "lucide-react";
import { toast } from "sonner";
import { getUsers, deleteUser, updateUser, getListings, deleteListing, updateListing } from "@/lib/adminService";
import type { Profile, Listing } from '@/types';

const AdminPanel = () => {
  const { isAdmin, isAuthenticated } = useAuth();
  const [users, setUsers] = useState<Profile[]>([]);
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [usersData, listingsData] = await Promise.all([
        getUsers(),
        getListings()
      ]);
      // Fix type mismatch by casting profiles data
      setUsers(usersData.map(user => ({
        ...user,
        document_type: (user.document_type as 'cpf' | 'cnpj' | null),
      })) as Profile[]);
      setListings(listingsData);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Erro ao carregar dados');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (!window.confirm('Tem certeza que deseja excluir este usuário?')) return;
    
    try {
      await deleteUser(userId);
      setUsers(users.filter(user => user.id !== userId));
      toast.success('Usuário excluído com sucesso');
    } catch (error) {
      console.error('Error deleting user:', error);
      toast.error('Erro ao excluir usuário');
    }
  };

  const handleDeleteListing = async (listingId: string) => {
    if (!window.confirm('Tem certeza que deseja excluir este anúncio?')) return;
    
    try {
      await deleteListing(listingId);
      setListings(listings.filter(listing => listing.id !== listingId));
      toast.success('Anúncio excluído com sucesso');
    } catch (error) {
      console.error('Error deleting listing:', error);
      toast.error('Erro ao excluir anúncio');
    }
  };

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
      <div className="container py-8">
        <h1 className="text-3xl font-bold mb-8">Painel Administrativo</h1>
        
        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-2">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="users">Usuários</TabsTrigger>
            <TabsTrigger value="listings">Anúncios</TabsTrigger>
            <TabsTrigger value="settings">Configurações</TabsTrigger>
          </TabsList>
          
          {/* Dashboard Tab */}
          <TabsContent value="dashboard">
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
                      <span className="font-medium">{listings.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Usuários Cadastrados:</span>
                      <span className="font-medium">{users.length}</span>
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
                    <Button 
                      variant="outline" 
                      className="w-full justify-start"
                    >
                      <Edit className="mr-2 h-4 w-4" />
                      Moderar Anúncios Pendentes
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start"
                    >
                      <User className="mr-2 h-4 w-4" />
                      Gerenciar Usuários
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start"
                    >
                      <Database className="mr-2 h-4 w-4" />
                      Configurações da Planilha
                    </Button>
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
          </TabsContent>
          
          {/* Users Tab */}
          <TabsContent value="users">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Gerenciamento de Usuários</CardTitle>
                  <CardDescription>Gerencie os usuários do sistema</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center mb-4 gap-2">
                  <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Buscar usuários..."
                      className="pl-8"
                    />
                  </div>
                  <Button variant="outline">Filtrar</Button>
                </div>
                
                <div className="border rounded-md">
                  <div className="grid grid-cols-12 gap-2 p-4 font-semibold border-b bg-muted/50">
                    <div className="col-span-1">#</div>
                    <div className="col-span-3">Nome</div>
                    <div className="col-span-3">Email</div>
                    <div className="col-span-2">Tipo</div>
                    <div className="col-span-3">Ações</div>
                  </div>
                  
                  {users.map((user, index) => (
                    <div key={user.id} className="grid grid-cols-12 gap-2 p-4 border-b items-center">
                      <div className="col-span-1">{index + 1}</div>
                      <div className="col-span-3">{user.username || 'N/A'}</div>
                      <div className="col-span-3">{user.email || 'N/A'}</div>
                      <div className="col-span-2">{user.role}</div>
                      <div className="col-span-3 flex gap-2">
                        <Button size="sm" variant="outline">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="text-red-500 hover:text-red-700"
                          onClick={() => handleDeleteUser(user.id)}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Listings Tab */}
          <TabsContent value="listings">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Gerenciamento de Anúncios</CardTitle>
                  <CardDescription>Gerencie todos os anúncios do sistema</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center mb-4 gap-2">
                  <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Buscar anúncios..."
                      className="pl-8"
                    />
                  </div>
                  <Button variant="outline">Filtrar</Button>
                </div>
                
                <div className="border rounded-md">
                  <div className="grid grid-cols-12 gap-2 p-4 font-semibold border-b bg-muted/50">
                    <div className="col-span-1">#</div>
                    <div className="col-span-4">Título</div>
                    <div className="col-span-2">Categoria</div>
                    <div className="col-span-2">Status</div>
                    <div className="col-span-3">Ações</div>
                  </div>
                  
                  {listings.map((listing, index) => (
                    <div key={listing.id} className="grid grid-cols-12 gap-2 p-4 border-b items-center">
                      <div className="col-span-1">{index + 1}</div>
                      <div className="col-span-4">{listing.title}</div>
                      <div className="col-span-2">{listing.category}</div>
                      <div className="col-span-2">{listing.status}</div>
                      <div className="col-span-3 flex gap-2">
                        <Button size="sm" variant="outline">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="text-red-500 hover:text-red-700"
                          onClick={() => handleDeleteListing(listing.id)}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Settings Tab */}
          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Configurações do Site</CardTitle>
                <CardDescription>Personalize as configurações gerais do site</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="block font-medium">Nome do Site</label>
                    <Input defaultValue="GuíaPG" />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="block font-medium">Descrição do Site</label>
                    <Textarea defaultValue="Guia de anúncios e serviços da cidade de Praia Grande" />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="block font-medium">Email de Contato</label>
                    <Input defaultValue="contato@guiapg.com.br" />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="block font-medium">Telefone de Contato</label>
                    <Input defaultValue="(13) 99999-9999" />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="block font-medium">Links de Redes Sociais</label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input placeholder="Facebook URL" />
                      <Input placeholder="Instagram URL" />
                      <Input placeholder="Twitter URL" />
                      <Input placeholder="YouTube URL" />
                    </div>
                  </div>
                  
                  <Button>Salvar Configurações</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default AdminPanel;
