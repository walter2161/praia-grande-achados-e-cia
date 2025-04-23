
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

const AdminPanel = () => {
  const { isAdmin, isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState("dashboard");
  
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
      <div className="container py-8">
        <h1 className="text-3xl font-bold mb-8">Painel Administrativo</h1>
        
        <Tabs defaultValue="dashboard" className="space-y-6" onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-2 md:grid-cols-5 gap-2">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="users">Usuários</TabsTrigger>
            <TabsTrigger value="listings">Anúncios</TabsTrigger>
            <TabsTrigger value="sheets">Google Sheets</TabsTrigger>
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
                      onClick={() => setActiveTab("sheets")}
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
          
          {/* Google Sheets Integration Tab */}
          <TabsContent value="sheets">
            <div className="grid grid-cols-1 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Configuração do Google Sheets</CardTitle>
                  <CardDescription>Configure a integração com o Google Sheets como banco de dados</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="block font-medium">Google Sheets ID</label>
                      <Input placeholder="Cole o ID da sua planilha aqui" />
                      <p className="text-xs text-muted-foreground">
                        Ex: 1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="block font-medium">Chave de API do Google</label>
                      <Input type="password" placeholder="Cole sua chave de API aqui" />
                      <p className="text-xs text-muted-foreground">
                        Necessário para acesso à API do Google Sheets
                      </p>
                    </div>
                    
                    <div className="p-4 bg-muted/50 rounded-md">
                      <h3 className="font-medium mb-2">Estrutura da Planilha</h3>
                      <p className="text-sm mb-4">
                        Sua planilha deve conter as seguintes abas (planilhas):
                      </p>
                      <ul className="text-sm space-y-2">
                        <li className="flex items-center gap-2">
                          <span className="bg-green-100 text-green-800 px-2 py-0.5 rounded text-xs">
                            usuarios
                          </span>
                          <span>Armazena informações dos usuários</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded text-xs">
                            anuncios
                          </span>
                          <span>Armazena todos os anúncios</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="bg-purple-100 text-purple-800 px-2 py-0.5 rounded text-xs">
                            imagens
                          </span>
                          <span>Armazena as imagens em Base64</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded text-xs">
                            configuracoes
                          </span>
                          <span>Configurações gerais do site</span>
                        </li>
                      </ul>
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
                        <h3 className="font-medium">Conversão para Base64</h3>
                        <p className="text-sm text-muted-foreground">
                          Converter automaticamente para armazenar na planilha
                        </p>
                      </div>
                      <div className="flex items-center">
                        <span className="text-sm font-medium text-green-600 mr-2">Ativado</span>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-yellow-50 text-yellow-800 rounded-md text-sm">
                      <h4 className="font-medium mb-1">Nota:</h4>
                      <p>
                        O armazenamento de imagens em Base64 no Google Sheets pode ser ineficiente para um grande volume de dados.
                        Considere limitar o número de imagens ou utilizar uma alternativa para armazenamento de arquivos de maior escala.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Instruções de Implementação</CardTitle>
                  <CardDescription>Scripts necessários para integração completa</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-medium mb-2">1. Script para Google Apps Script</h3>
                      <p className="text-sm mb-2">Cole este script no editor de Google Apps Script da sua planilha:</p>
                      <div className="bg-muted p-3 rounded-md overflow-x-auto">
                        <pre className="text-xs">
{`/**
* API para GuíaPG - Conecta o site ao Google Sheets
*/

function doGet(e) {
  const action = e.parameter.action;
  const sheet = e.parameter.sheet;
  
  if (action === 'read') {
    return handleRead(sheet);
  } else if (action === 'write') {
    return handleWrite(sheet, e.parameter);
  }
  
  return ContentService
    .createTextOutput(JSON.stringify({ 'error': 'Invalid action' }))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  const data = JSON.parse(e.postData.contents);
  const action = data.action;
  const sheet = data.sheet;
  
  if (action === 'create') {
    return handleCreate(sheet, data);
  } else if (action === 'update') {
    return handleUpdate(sheet, data);
  } else if (action === 'delete') {
    return handleDelete(sheet, data);
  } else if (action === 'processImage') {
    return handleImageProcessing(data);
  }
  
  return ContentService
    .createTextOutput(JSON.stringify({ 'error': 'Invalid action' }))
    .setMimeType(ContentService.MimeType.JSON);
}

function handleRead(sheetName) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(sheetName);
  
  if (!sheet) {
    return ContentService
      .createTextOutput(JSON.stringify({ 'error': 'Sheet not found' }))
      .setMimeType(ContentService.MimeType.JSON);
  }
  
  const data = sheet.getDataRange().getValues();
  const headers = data[0];
  const result = [];
  
  for (let i = 1; i < data.length; i++) {
    const obj = {};
    for (let j = 0; j < headers.length; j++) {
      obj[headers[j]] = data[i][j];
    }
    result.push(obj);
  }
  
  return ContentService
    .createTextOutput(JSON.stringify(result))
    .setMimeType(ContentService.MimeType.JSON);
}

function handleCreate(sheetName, data) {
  // Implementação para criar novo registro
}

function handleUpdate(sheetName, data) {
  // Implementação para atualizar registro existente
}

function handleDelete(sheetName, data) {
  // Implementação para excluir registro
}

function handleImageProcessing(data) {
  // Implementação para processar e armazenar imagem Base64
}
`}
                        </pre>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-medium mb-2">2. Publicar como Aplicativo Web</h3>
                      <p className="text-sm mb-2">Após colar o script, siga estas etapas:</p>
                      <ol className="text-sm space-y-1 list-decimal ml-4">
                        <li>No editor de script, clique em "Implantar" &gt; "Nova implantação"</li>
                        <li>Selecione "Aplicativo da Web"</li>
                        <li>Descrição: "API GuiaPG"</li>
                        <li>Definir "Executar como" para "Eu mesmo"</li>
                        <li>Definir "Quem tem acesso" para "Qualquer pessoa"</li>
                        <li>Clique em "Implantar" e copie a URL fornecida</li>
                      </ol>
                    </div>
                    
                    <div>
                      <h3 className="font-medium mb-2">3. Configure permissões da API</h3>
                      <p className="text-sm mb-2">No Console do Google Cloud Platform:</p>
                      <ol className="text-sm space-y-1 list-decimal ml-4">
                        <li>Ative a API Google Sheets</li>
                        <li>Crie credenciais para a API</li>
                        <li>Restricione os domínios permitidos para sua URL</li>
                      </ol>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
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
