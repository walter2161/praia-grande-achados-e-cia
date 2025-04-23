
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import MainLayout from "@/components/layout/MainLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Search, User, Settings, Database, Image, Plus, Trash, Edit, FileText, Layout, LayoutDashboard, Cog } from "lucide-react";
import { toast } from "sonner";
import { updateSiteSetting, fetchSiteSettings } from "@/utils/databaseService";

const AdminPanel = () => {
  const { isAdmin, isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [siteSettings, setSiteSettings] = useState({
    siteName: "GuíaPG",
    description: "Guia de anúncios e serviços da cidade de Praia Grande",
    contactEmail: "contato@guiapg.com.br",
    contactPhone: "(13) 99999-9999",
    facebookUrl: "",
    instagramUrl: "",
    twitterUrl: "",
    youtubeUrl: "",
    primaryColor: "#3b82f6",
    secondaryColor: "#10b981"
  });
  const [isSaving, setIsSaving] = useState(false);
  
  useEffect(() => {
    // Scroll to top on component mount
    window.scrollTo(0, 0);
    
    // Fetch site settings
    const loadSettings = async () => {
      try {
        const settings = await fetchSiteSettings();
        if (Object.keys(settings).length) {
          setSiteSettings(prev => ({
            ...prev,
            ...settings
          }));
        }
      } catch (error) {
        console.error("Error loading site settings:", error);
      }
    };
    
    loadSettings();
  }, []);

  // Handler for saving site settings
  const handleSaveSettings = async () => {
    setIsSaving(true);
    try {
      // Save each setting individually
      for (const [key, value] of Object.entries(siteSettings)) {
        await updateSiteSetting(key, value as string);
      }
      toast.success("Configurações salvas com sucesso!");
    } catch (error) {
      console.error("Error saving settings:", error);
      toast.error("Erro ao salvar configurações.");
    } finally {
      setIsSaving(false);
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
        
        <Tabs defaultValue="dashboard" className="space-y-6" onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-2 md:grid-cols-5 gap-2">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="users">Usuários</TabsTrigger>
            <TabsTrigger value="listings">Anúncios</TabsTrigger>
            <TabsTrigger value="content">Conteúdo</TabsTrigger>
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
                    <Button 
                      onClick={() => setActiveTab("listings")}
                      variant="outline" 
                      className="w-full justify-start"
                    >
                      <Edit className="mr-2 h-4 w-4" />
                      Moderar Anúncios Pendentes
                    </Button>
                    <Button 
                      onClick={() => setActiveTab("users")}
                      variant="outline" 
                      className="w-full justify-start"
                    >
                      <User className="mr-2 h-4 w-4" />
                      Gerenciar Usuários
                    </Button>
                    <Button 
                      onClick={() => setActiveTab("content")}
                      variant="outline" 
                      className="w-full justify-start"
                    >
                      <FileText className="mr-2 h-4 w-4" />
                      Editar Conteúdo do Site
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
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Novo Usuário
                </Button>
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
                    <div className="col-span-1">Status</div>
                    <div className="col-span-2">Ações</div>
                  </div>
                  
                  {[1, 2, 3, 4, 5].map((user) => (
                    <div key={user} className="grid grid-cols-12 gap-2 p-4 border-b items-center">
                      <div className="col-span-1">{user}</div>
                      <div className="col-span-3">Usuário Exemplo {user}</div>
                      <div className="col-span-3">usuario{user}@exemplo.com</div>
                      <div className="col-span-2">
                        {user === 1 ? "Admin" : "Usuário"}
                      </div>
                      <div className="col-span-1">
                        <span className={`px-2 py-1 rounded-full text-xs ${user % 3 === 0 ? "bg-yellow-100 text-yellow-800" : "bg-green-100 text-green-800"}`}>
                          {user % 3 === 0 ? "Pendente" : "Ativo"}
                        </span>
                      </div>
                      <div className="col-span-2 flex gap-2">
                        <Button size="sm" variant="outline">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline" className="text-red-500 hover:text-red-700">
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
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Novo Anúncio
                </Button>
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
                    <div className="col-span-1">Preço</div>
                    <div className="col-span-2">Data</div>
                    <div className="col-span-2">Ações</div>
                  </div>
                  
                  {[1, 2, 3, 4, 5].map((listing) => (
                    <div key={listing} className="grid grid-cols-12 gap-2 p-4 border-b items-center">
                      <div className="col-span-1">{listing}</div>
                      <div className="col-span-4">Título do Anúncio {listing}</div>
                      <div className="col-span-2">
                        {["Imóveis", "Autos", "Serviços", "Empregos", "Itens"][listing - 1]}
                      </div>
                      <div className="col-span-1">
                        R$ {(listing * 1000).toLocaleString('pt-BR')}
                      </div>
                      <div className="col-span-2">
                        {new Date().toLocaleDateString('pt-BR')}
                      </div>
                      <div className="col-span-2 flex gap-2">
                        <Button size="sm" variant="outline">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline" className="text-red-500 hover:text-red-700">
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Content Tab (New) */}
          <TabsContent value="content">
            <div className="grid grid-cols-1 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Gerenciamento de Páginas</CardTitle>
                    <CardDescription>Edite o conteúdo das páginas principais do site</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    {[
                      { title: "Página Inicial", icon: <LayoutDashboard className="h-8 w-8" /> },
                      { title: "Sobre Nós", icon: <FileText className="h-8 w-8" /> },
                      { title: "Termos de Uso", icon: <FileText className="h-8 w-8" /> },
                      { title: "Política de Privacidade", icon: <FileText className="h-8 w-8" /> },
                      { title: "Contato", icon: <FileText className="h-8 w-8" /> },
                      { title: "Planos", icon: <Layout className="h-8 w-8" /> },
                    ].map((page, index) => (
                      <Button 
                        key={index} 
                        variant="outline" 
                        className="h-24 flex flex-col items-center justify-center gap-2"
                      >
                        {page.icon}
                        <span>{page.title}</span>
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Categorias</CardTitle>
                  <CardDescription>Gerencie as categorias de anúncios</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-end mb-4">
                    <Button>
                      <Plus className="mr-2 h-4 w-4" />
                      Nova Categoria
                    </Button>
                  </div>
                  
                  <div className="border rounded-md">
                    <div className="grid grid-cols-12 gap-2 p-4 font-semibold border-b bg-muted/50">
                      <div className="col-span-1">#</div>
                      <div className="col-span-3">Nome</div>
                      <div className="col-span-4">Descrição</div>
                      <div className="col-span-2">Ícone</div>
                      <div className="col-span-2">Ações</div>
                    </div>
                    
                    {["Imóveis", "Autos", "Serviços", "Empregos", "Itens"].map((category, index) => (
                      <div key={index} className="grid grid-cols-12 gap-2 p-4 border-b items-center">
                        <div className="col-span-1">{index + 1}</div>
                        <div className="col-span-3">{category}</div>
                        <div className="col-span-4">Descrição da categoria {category}</div>
                        <div className="col-span-2">
                          <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center">
                            <span className="text-xs">Ícone</span>
                          </div>
                        </div>
                        <div className="col-span-2 flex gap-2">
                          <Button size="sm" variant="outline">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline" className="text-red-500 hover:text-red-700">
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Banners</CardTitle>
                  <CardDescription>Gerencie os banners do site</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-end mb-4">
                    <Button>
                      <Plus className="mr-2 h-4 w-4" />
                      Novo Banner
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[1, 2, 3, 4].map((banner) => (
                      <div key={banner} className="border rounded-md p-4 flex flex-col">
                        <div className="bg-gray-100 h-32 rounded mb-3 flex items-center justify-center">
                          <Image className="h-8 w-8 text-gray-400" />
                        </div>
                        <div className="mb-2">
                          <h3 className="font-medium">Banner {banner}</h3>
                          <p className="text-sm text-muted-foreground">Posição: {banner === 1 ? 'Topo' : banner === 2 ? 'Meio' : 'Rodapé'}</p>
                        </div>
                        <div className="mt-auto flex gap-2">
                          <Button size="sm" variant="outline" className="flex-1">
                            <Edit className="mr-2 h-4 w-4" />
                            Editar
                          </Button>
                          <Button size="sm" variant="outline" className="text-red-500 hover:text-red-700">
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          {/* Settings Tab */}
          <TabsContent value="settings">
            <div className="grid grid-cols-1 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Configurações do Site</CardTitle>
                  <CardDescription>Personalize as configurações gerais do site</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="block font-medium">Nome do Site</label>
                      <Input 
                        value={siteSettings.siteName} 
                        onChange={(e) => setSiteSettings({...siteSettings, siteName: e.target.value})}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="block font-medium">Descrição do Site</label>
                      <Textarea 
                        value={siteSettings.description}
                        onChange={(e) => setSiteSettings({...siteSettings, description: e.target.value})}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="block font-medium">Email de Contato</label>
                      <Input 
                        value={siteSettings.contactEmail}
                        onChange={(e) => setSiteSettings({...siteSettings, contactEmail: e.target.value})}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="block font-medium">Telefone de Contato</label>
                      <Input 
                        value={siteSettings.contactPhone}
                        onChange={(e) => setSiteSettings({...siteSettings, contactPhone: e.target.value})}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="block font-medium">Cores do Site</label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm text-muted-foreground mb-1">Cor Primária</label>
                          <div className="flex gap-2 items-center">
                            <div 
                              className="w-8 h-8 rounded border" 
                              style={{ backgroundColor: siteSettings.primaryColor }}
                            />
                            <Input 
                              type="text"
                              value={siteSettings.primaryColor}
                              onChange={(e) => setSiteSettings({...siteSettings, primaryColor: e.target.value})}
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm text-muted-foreground mb-1">Cor Secundária</label>
                          <div className="flex gap-2 items-center">
                            <div 
                              className="w-8 h-8 rounded border" 
                              style={{ backgroundColor: siteSettings.secondaryColor }}
                            />
                            <Input 
                              type="text"
                              value={siteSettings.secondaryColor}
                              onChange={(e) => setSiteSettings({...siteSettings, secondaryColor: e.target.value})}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="block font-medium">Links de Redes Sociais</label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input 
                          placeholder="Facebook URL" 
                          value={siteSettings.facebookUrl}
                          onChange={(e) => setSiteSettings({...siteSettings, facebookUrl: e.target.value})}
                        />
                        <Input 
                          placeholder="Instagram URL" 
                          value={siteSettings.instagramUrl}
                          onChange={(e) => setSiteSettings({...siteSettings, instagramUrl: e.target.value})}
                        />
                        <Input 
                          placeholder="Twitter URL" 
                          value={siteSettings.twitterUrl}
                          onChange={(e) => setSiteSettings({...siteSettings, twitterUrl: e.target.value})}
                        />
                        <Input 
                          placeholder="YouTube URL" 
                          value={siteSettings.youtubeUrl}
                          onChange={(e) => setSiteSettings({...siteSettings, youtubeUrl: e.target.value})}
                        />
                      </div>
                    </div>
                    
                    <Button onClick={handleSaveSettings} disabled={isSaving}>
                      {isSaving ? "Salvando..." : "Salvar Configurações"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Configurações do Banco de Dados</CardTitle>
                  <CardDescription>Configurações de conexão com o banco de dados</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="block font-medium">Host</label>
                      <Input defaultValue="localhost" />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="block font-medium">Usuário</label>
                        <Input defaultValue="root" />
                      </div>
                      
                      <div className="space-y-2">
                        <label className="block font-medium">Senha</label>
                        <Input type="password" defaultValue="******" />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="block font-medium">Banco de Dados</label>
                        <Input defaultValue="guiapg" />
                      </div>
                      
                      <div className="space-y-2">
                        <label className="block font-medium">Prefixo das Tabelas</label>
                        <Input defaultValue="wp_" />
                      </div>
                    </div>
                    
                    <div className="p-4 bg-yellow-50 text-yellow-800 rounded-md text-sm">
                      <h4 className="font-medium mb-1">Nota:</h4>
                      <p>
                        Alterar estas configurações pode causar problemas de conexão com o banco de dados.
                        Certifique-se de saber o que está fazendo antes de modificá-las.
                      </p>
                    </div>
                    
                    <Button>Testar Conexão</Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Processamento de Imagens</CardTitle>
                  <CardDescription>Configurações para otimização e armazenamento de imagens</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Otimização Automática</h3>
                        <p className="text-sm text-muted-foreground">
                          Redimensionar para 350x350px e 70dpi
                        </p>
                      </div>
                      <div className="flex items-center">
                        <span className="text-sm font-medium text-green-600 mr-2">Ativado</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Compressão de Imagens</h3>
                        <p className="text-sm text-muted-foreground">
                          Reduzir tamanho dos arquivos para carregamento mais rápido
                        </p>
                      </div>
                      <div className="flex items-center">
                        <span className="text-sm font-medium text-green-600 mr-2">Ativado</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Pasta de Upload</h3>
                        <p className="text-sm text-muted-foreground">
                          /public/uploads/images/
                        </p>
                      </div>
                      <Button variant="outline" size="sm">
                        Alterar
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default AdminPanel;
