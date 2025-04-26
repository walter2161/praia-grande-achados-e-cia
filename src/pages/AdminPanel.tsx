import { useEffect, useState } from "react";
import { Navigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import MainLayout from "@/components/layout/MainLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Search, User, Settings, Database, Image as ImageIcon, Plus, Trash, Edit, Activity, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { getUsers, deleteUser, updateUser, getListings, deleteListing, updateListing, getPendingUsers, approveUser, rejectUser } from "@/lib/adminService";
import { addBannerImage, removeBannerImage, toggleBannerImageStatus, getBannerImages } from "@/lib/supabase";
import type { Profile, Listing } from '@/types';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { supabase } from "@/integrations/supabase/client";
import { Image } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const AdminPanel = () => {
  const { isAdmin, isAuthenticated } = useAuth();
  const [users, setUsers] = useState<Profile[]>([]);
  const [pendingUsers, setPendingUsers] = useState<Profile[]>([]);
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [bannerImages, setBannerImages] = useState<Array<{id: string, url: string, title: string | null, active: boolean}>>([]);
  const [bannerUrl, setBannerUrl] = useState("");
  const [bannerTitle, setBannerTitle] = useState("");
  const [addingBanner, setAddingBanner] = useState(false);

  useEffect(() => {
    fetchData();
    fetchBannerImages();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [usersData, pendingUsersData, listingsData] = await Promise.all([
        getUsers(),
        getPendingUsers(),
        getListings()
      ]);
      
      // Fix type mismatch by casting profiles data
      setUsers(usersData.map(user => ({
        ...user,
        document_type: (user.document_type as 'cpf' | 'cnpj' | null),
      })) as Profile[]);
      
      setPendingUsers(pendingUsersData.map(user => ({
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

  const fetchBannerImages = async () => {
    try {
      const data = await getBannerImages();
      setBannerImages(data);
    } catch (error) {
      console.error('Erro ao buscar imagens de banner:', error);
      toast.error('Erro ao carregar banners');
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

  const handleApproveUser = async (userId: string) => {
    try {
      await approveUser(userId);
      // Move user from pending to approved list
      const approvedUser = pendingUsers.find(user => user.id === userId);
      if (approvedUser) {
        setPendingUsers(pendingUsers.filter(user => user.id !== userId));
        setUsers([...users, {...approvedUser, approval_status: 'approved'}]);
      }
      toast.success('Usuário aprovado com sucesso');
    } catch (error) {
      console.error('Error approving user:', error);
      toast.error('Erro ao aprovar usuário');
    }
  };

  const handleRejectUser = async (userId: string) => {
    try {
      await rejectUser(userId);
      setPendingUsers(pendingUsers.filter(user => user.id !== userId));
      toast.success('Usuário rejeitado com sucesso');
    } catch (error) {
      console.error('Error rejecting user:', error);
      toast.error('Erro ao rejeitar usuário');
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

  const handleAddBannerImage = async () => {
    if (!bannerUrl.trim()) {
      toast.error('Por favor, insira uma URL válida');
      return;
    }

    try {
      setAddingBanner(true);
      const result = await addBannerImage({
        url: bannerUrl,
        title: bannerTitle || undefined
      });
      
      if (result.error) {
        console.error('Erro ao adicionar banner:', result.error);
        if (result.error.message?.includes('policy')) {
          toast.error('Você não tem permissão para adicionar banners. Apenas administradores podem gerenciar banners.');
        } else {
          toast.error('Erro ao adicionar banner. Por favor, tente novamente.');
        }
        return;
      }
      
      toast.success('Banner adicionado com sucesso');
      setBannerUrl('');
      setBannerTitle('');
      fetchBannerImages();
    } catch (error) {
      console.error('Erro ao adicionar banner:', error);
      toast.error('Erro ao adicionar banner. Por favor, tente novamente.');
    } finally {
      setAddingBanner(false);
    }
  };

  const handleRemoveBannerImage = async (id: string) => {
    try {
      await removeBannerImage(id);
      toast.success('Banner removido com sucesso');
      fetchBannerImages();
    } catch (error) {
      console.error('Erro ao remover banner:', error);
      toast.error('Erro ao remover banner');
    }
  };

  const handleToggleBannerStatus = async (id: string, currentActive: boolean) => {
    try {
      await toggleBannerImageStatus(id, !currentActive);
      toast.success(`Banner ${!currentActive ? 'ativado' : 'desativado'} com sucesso`);
      fetchBannerImages();
    } catch (error) {
      console.error('Erro ao alterar status do banner:', error);
      toast.error('Erro ao alterar status do banner');
    }
  };

  const filteredUsers = users.filter(user => 
    user.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (user.full_name && user.full_name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

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
          <TabsList className="grid grid-cols-2 md:grid-cols-5 gap-2">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="users">Usuários</TabsTrigger>
            <TabsTrigger value="listings">Anúncios</TabsTrigger>
            <TabsTrigger value="settings">Configurações</TabsTrigger>
            <TabsTrigger value="banner-management">Banners</TabsTrigger>
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
                      <span>Usuários Pendentes:</span>
                      <span className="font-medium">{pendingUsers.length}</span>
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
                      onClick={() => document.getElementById('pendingUsersSection')?.scrollIntoView({ behavior: 'smooth' })}
                    >
                      <User className="mr-2 h-4 w-4" />
                      Aprovar Usuários Pendentes
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start"
                    >
                      <Edit className="mr-2 h-4 w-4" />
                      Moderar Anúncios Pendentes
                    </Button>
                    <Link to="/admin/system-report">
                      <Button 
                        variant="outline" 
                        className="w-full justify-start"
                      >
                        <Activity className="mr-2 h-4 w-4" />
                        Relatório do Sistema
                      </Button>
                    </Link>
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
            
            <Card className="mb-8" id="pendingUsersSection">
              <CardHeader>
                <CardTitle>Usuários Pendentes</CardTitle>
                <CardDescription>Usuários aguardando aprovação</CardDescription>
              </CardHeader>
              <CardContent>
                {pendingUsers.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Nome</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Documento</TableHead>
                        <TableHead>Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {pendingUsers.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell>{user.username || 'N/A'}</TableCell>
                          <TableCell>{user.email || 'N/A'}</TableCell>
                          <TableCell>
                            {user.document_type && user.document_number
                              ? `${user.document_type.toUpperCase()}: ${user.document_number}`
                              : 'N/A'}
                          </TableCell>
                          <TableCell className="flex gap-2">
                            <Button size="sm" variant="outline" onClick={() => handleApproveUser(user.id)}>
                              Aprovar
                            </Button>
                            <Button size="sm" variant="outline" className="text-red-500" onClick={() => handleRejectUser(user.id)}>
                              Rejeitar
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <p className="text-muted-foreground">Não há usuários pendentes</p>
                )}
              </CardContent>
            </Card>
            
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Anúncios Recentes</CardTitle>
                <CardDescription>Últimos anúncios publicados</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {listings.slice(0, 3).map((listing) => (
                    <div key={listing.id} className="flex justify-between border-b pb-3">
                      <div>
                        <p className="font-medium">{listing.title}</p>
                        <p className="text-sm text-muted-foreground">Categoria: {listing.category}</p>
                      </div>
                      <div className="flex gap-2">
                        <button className="text-sm text-blue-600 hover:underline">Editar</button>
                        <button 
                          className="text-sm text-red-600 hover:underline"
                          onClick={() => handleDeleteListing(listing.id)}
                        >
                          Remover
                        </button>
                      </div>
                    </div>
                  ))}
                  
                  {listings.length === 0 && (
                    <p className="text-muted-foreground">Não há anúncios recentes</p>
                  )}
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
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <Button variant="outline" onClick={() => setSearchTerm("")}>Limpar</Button>
                </div>
                
                <div className="border rounded-md">
                  <div className="grid grid-cols-12 gap-2 p-4 font-semibold border-b bg-muted/50">
                    <div className="col-span-1">#</div>
                    <div className="col-span-3">Nome</div>
                    <div className="col-span-3">Email</div>
                    <div className="col-span-2">Tipo</div>
                    <div className="col-span-3">Ações</div>
                  </div>
                  
                  {filteredUsers.map((user, index) => (
                    <div key={user.id} className="grid grid-cols-12 gap-2 p-4 border-b items-center">
                      <div className="col-span-1">{index + 1}</div>
                      <div className="col-span-3">{user.username || user.full_name || 'N/A'}</div>
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
                  
                  {filteredUsers.length === 0 && (
                    <div className="p-4 text-center text-muted-foreground">
                      Nenhum usuário encontrado
                    </div>
                  )}
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

          {/* Banner Management Tab */}
          <TabsContent value="banner-management">
            <Card>
              <CardHeader>
                <CardTitle>Gerenciamento de Banners</CardTitle>
                <CardDescription>Adicione ou remova imagens de banner do site</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="md:col-span-2">
                      <Input 
                        placeholder="URL da imagem do banner" 
                        value={bannerUrl}
                        onChange={(e) => setBannerUrl(e.target.value)}
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Você pode usar URLs de imagens externas ou imagens carregadas no sistema
                      </p>
                    </div>
                    <div>
                      <Input 
                        placeholder="Título do banner (opcional)" 
                        value={bannerTitle}
                        onChange={(e) => setBannerTitle(e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <Button 
                    onClick={handleAddBannerImage}
                    disabled={addingBanner || !bannerUrl.trim()}
                    className="w-full md:w-auto"
                  >
                    {addingBanner ? 'Adicionando...' : (
                      <>
                        <Plus className="mr-2 h-4 w-4" /> Adicionar Banner
                      </>
                    )}
                  </Button>
                  
                  <div className="mt-8">
                    <h3 className="text-lg font-medium mb-4">Banners Cadastrados</h3>
                    {bannerImages.length > 0 ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {bannerImages.map((image) => (
                          <div key={image.id} className="relative border rounded-md overflow-hidden">
                            <div className="aspect-[16/9] bg-gray-100 relative">
                              <img 
                                src={image.url} 
                                alt={image.title || 'Banner'} 
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  e.currentTarget.src = '/lovable-uploads/239ae548-ca2d-41d4-bf2f-45fb03041253.png';
                                  e.currentTarget.className = 'w-full h-full object-cover opacity-50';
                                }}
                              />
                              <div className="absolute top-2 right-2 flex space-x-1">
                                <Badge variant={image.active ? "default" : "secondary"}>
                                  {image.active ? "Ativo" : "Inativo"}
                                </Badge>
                              </div>
                            </div>
                            <div className="p-3">
                              <p className="font-medium truncate">{image.title || "Sem título"}</p>
                              <p className="text-xs text-muted-foreground truncate">{image.url}</p>
                              <div className="flex space-x-2 mt-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleToggleBannerStatus(image.id, image.active)}
                                >
                                  {image.active ? (
                                    <>
                                      <EyeOff className="h-4 w-4 mr-1" /> Desativar
                                    </>
                                  ) : (
                                    <>
                                      <Eye className="h-4 w-4 mr-1" /> Ativar
                                    </>
                                  )}
                                </Button>
                                <Button 
                                  variant="destructive" 
                                  size="sm"
                                  onClick={() => handleRemoveBannerImage(image.id)}
                                >
                                  <Trash className="h-4 w-4 mr-1" /> Excluir
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-muted-foreground text-center py-8">
                        Nenhum banner cadastrado
                      </p>
                    )}
                  </div>
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
