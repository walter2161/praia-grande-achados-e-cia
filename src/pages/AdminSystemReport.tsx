
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { RefreshCw, Database, Server, AlertTriangle, CheckCircle, Activity } from "lucide-react";
import { toast } from "sonner";
import { getSystemStatus } from "@/lib/adminService";
import type { SystemStatus } from '@/types';

const AdminSystemReport = () => {
  const { isAdmin, isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [systemStatus, setSystemStatus] = useState<SystemStatus | null>(null);

  useEffect(() => {
    fetchSystemStatus();
  }, []);

  const fetchSystemStatus = async () => {
    setLoading(true);
    try {
      const status = await getSystemStatus();
      setSystemStatus(status);
      setLastUpdated(new Date());
      toast.success("Relatório do sistema atualizado com sucesso");
    } catch (error) {
      console.error('Error fetching system status:', error);
      toast.error('Falha ao carregar dados do sistema. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleScan = async () => {
    setScanning(true);
    toast.info("Escaneando o sistema...", { duration: 2000 });
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate scan process
      await fetchSystemStatus();
      toast.success("Escaneamento completo!");
    } catch (error) {
      console.error('Error during scan:', error);
      toast.error('Falha no escaneamento. Tente novamente.');
    } finally {
      setScanning(false);
    }
  };

  // Calculate health status
  const calculateHealth = (status: SystemStatus) => {
    if (!status) return { score: 0, label: "Desconhecido", color: "bg-gray-400" };
    
    const errorCount = status.errors.length;
    const dbHealth = status.database.connection ? 100 : 0;
    const apiHealth = status.api.response_time < 500 ? 100 : 
                    (status.api.response_time < 1000 ? 70 : 40);
    
    const score = Math.floor((100 - errorCount * 10 + dbHealth + apiHealth) / 3);
    
    if (score > 80) return { score, label: "Saudável", color: "bg-green-500" };
    if (score > 60) return { score, label: "Bom", color: "bg-emerald-400" };
    if (score > 40) return { score, label: "Atenção", color: "bg-yellow-400" };
    if (score > 20) return { score, label: "Crítico", color: "bg-orange-500" };
    return { score, label: "Emergência", color: "bg-red-500" };
  };

  const health = systemStatus ? calculateHealth(systemStatus) : { score: 0, label: "Desconhecido", color: "bg-gray-400" };

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
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Relatório do Sistema</h1>
            <p className="text-muted-foreground">
              Monitoramento de status e diagnóstico do backend
            </p>
          </div>
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <span className="text-sm text-muted-foreground">
              Última atualização: {lastUpdated ? lastUpdated.toLocaleString('pt-BR') : 'Nunca'}
            </span>
            <Button 
              onClick={handleScan} 
              disabled={scanning || loading}
              className="flex gap-2 items-center"
            >
              <RefreshCw className={`h-4 w-4 ${scanning ? 'animate-spin' : ''}`} />
              {scanning ? 'Escaneando...' : 'Escanear Agora'}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Status do Sistema</CardTitle>
              <CardDescription>Saúde geral do aplicativo</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center text-center">
                <div className={`w-24 h-24 rounded-full flex items-center justify-center text-white text-2xl font-bold ${health.color}`}>
                  {health.score}%
                </div>
                <div className="mt-4 font-semibold">{health.label}</div>
                <Progress value={health.score} className="w-full mt-4" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Banco de Dados</CardTitle>
              <CardDescription>Status da conexão</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Conexão:</span>
                  <span className={`font-medium flex items-center gap-1 ${systemStatus?.database.connection ? 'text-green-500' : 'text-red-500'}`}>
                    {systemStatus?.database.connection ? 
                      <><CheckCircle className="h-4 w-4" /> Conectado</> : 
                      <><AlertTriangle className="h-4 w-4" /> Desconectado</>}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Tabelas:</span>
                  <span className="font-medium">{systemStatus?.database.tables_count || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span>Usuários:</span>
                  <span className="font-medium">{systemStatus?.database.users_count || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span>Anúncios:</span>
                  <span className="font-medium">{systemStatus?.database.listings_count || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tempo de resposta:</span>
                  <span className="font-medium">{systemStatus?.database.query_time || 0}ms</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">API e Serviços</CardTitle>
              <CardDescription>Performance dos endpoints</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Status:</span>
                  <span className={`font-medium flex items-center gap-1 ${systemStatus?.api.status === 'online' ? 'text-green-500' : 'text-red-500'}`}>
                    {systemStatus?.api.status === 'online' ? 
                      <><CheckCircle className="h-4 w-4" /> Online</> : 
                      <><AlertTriangle className="h-4 w-4" /> Offline</>}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Tempo de resposta:</span>
                  <span className="font-medium">{systemStatus?.api.response_time || 0}ms</span>
                </div>
                <div className="flex justify-between">
                  <span>Funções ativas:</span>
                  <span className="font-medium">{systemStatus?.api.functions_count || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span>Latência média:</span>
                  <span className="font-medium">{systemStatus?.api.avg_latency || 0}ms</span>
                </div>
                <div className="flex justify-between">
                  <span>Sucesso nas requests:</span>
                  <span className="font-medium">{systemStatus?.api.success_rate || 0}%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="errors" className="space-y-6">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-2">
            <TabsTrigger value="errors">Erros e Alertas</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="logs">Logs do Sistema</TabsTrigger>
            <TabsTrigger value="integrations">Integrações</TabsTrigger>
          </TabsList>

          <TabsContent value="errors">
            <Card>
              <CardHeader>
                <CardTitle>Erros e Alertas</CardTitle>
                <CardDescription>Problemas detectados no sistema</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {systemStatus?.errors && systemStatus.errors.length > 0 ? (
                  systemStatus.errors.map((error, index) => (
                    <Alert key={index} variant={error.severity === 'high' ? 'destructive' : error.severity === 'medium' ? 'warning' : 'default'}>
                      <AlertTriangle className="h-4 w-4" />
                      <AlertTitle className="flex items-center gap-2">
                        {error.title}
                        <span className={`text-xs px-2 py-0.5 rounded-full ${
                          error.severity === 'high' ? 'bg-red-100 text-red-800' : 
                          error.severity === 'medium' ? 'bg-yellow-100 text-yellow-800' : 
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {error.severity}
                        </span>
                      </AlertTitle>
                      <AlertDescription>
                        <div className="mt-2">
                          <p>{error.message}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            Local: {error.location} • Data: {new Date(error.timestamp).toLocaleString('pt-BR')}
                          </p>
                        </div>
                      </AlertDescription>
                    </Alert>
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <CheckCircle className="h-12 w-12 text-green-500 mb-4" />
                    <h3 className="text-lg font-medium">Nenhum erro detectado</h3>
                    <p className="text-muted-foreground mt-2">
                      O sistema está operando normalmente sem problemas reportados.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="performance">
            <Card>
              <CardHeader>
                <CardTitle>Métricas de Performance</CardTitle>
                <CardDescription>Desempenho e velocidade do sistema</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="font-medium">Memória</span>
                      <span>{systemStatus?.performance.memory_usage || 0}%</span>
                    </div>
                    <Progress value={systemStatus?.performance.memory_usage || 0} className="h-2" />
                  </div>

                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="font-medium">CPU</span>
                      <span>{systemStatus?.performance.cpu_usage || 0}%</span>
                    </div>
                    <Progress value={systemStatus?.performance.cpu_usage || 0} className="h-2" />
                  </div>

                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="font-medium">Banco de Dados</span>
                      <span>{systemStatus?.performance.db_load || 0}%</span>
                    </div>
                    <Progress value={systemStatus?.performance.db_load || 0} className="h-2" />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
                    <div className="bg-muted rounded-md p-4">
                      <div className="text-sm font-medium">Tempo médio de resposta</div>
                      <div className="text-2xl font-bold mt-2">{systemStatus?.performance.avg_response_time || 0}ms</div>
                    </div>
                    <div className="bg-muted rounded-md p-4">
                      <div className="text-sm font-medium">Conexões ativas</div>
                      <div className="text-2xl font-bold mt-2">{systemStatus?.performance.active_connections || 0}</div>
                    </div>
                    <div className="bg-muted rounded-md p-4">
                      <div className="text-sm font-medium">Requisições por minuto</div>
                      <div className="text-2xl font-bold mt-2">{systemStatus?.performance.requests_per_minute || 0}</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="logs">
            <Card>
              <CardHeader>
                <CardTitle>Logs do Sistema</CardTitle>
                <CardDescription>Registros recentes de atividades</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border rounded-md overflow-hidden">
                  <div className="bg-muted px-4 py-2 font-mono text-sm border-b">
                    Últimos 10 logs do sistema
                  </div>
                  <div className="max-h-[300px] overflow-y-auto">
                    {systemStatus?.logs && systemStatus.logs.length > 0 ? (
                      systemStatus.logs.map((log, index) => (
                        <div key={index} className={`px-4 py-2 text-sm border-b ${
                          log.level === 'error' ? 'bg-red-50' : 
                          log.level === 'warning' ? 'bg-yellow-50' : 
                          'bg-white'
                        }`}>
                          <div className="flex items-start">
                            <span className={`inline-block w-16 font-semibold ${
                              log.level === 'error' ? 'text-red-600' : 
                              log.level === 'warning' ? 'text-yellow-600' : 
                              log.level === 'info' ? 'text-blue-600' : 'text-green-600'
                            }`}>
                              [{log.level}]
                            </span>
                            <span className="flex-1">{log.message}</span>
                          </div>
                          <div className="mt-1 text-xs text-muted-foreground">
                            {new Date(log.timestamp).toLocaleString('pt-BR')} • {log.source}
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="px-4 py-8 text-center text-muted-foreground">
                        Nenhum log disponível
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="integrations">
            <Card>
              <CardHeader>
                <CardTitle>Integrações</CardTitle>
                <CardDescription>Status dos serviços externos conectados</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {systemStatus?.integrations && systemStatus.integrations.length > 0 ? (
                    systemStatus.integrations.map((integration, index) => (
                      <div key={index} className="flex items-center justify-between border-b pb-3 last:border-0">
                        <div className="flex items-center gap-3">
                          <div className={`w-3 h-3 rounded-full ${
                            integration.status === 'online' ? 'bg-green-500' : 
                            integration.status === 'degraded' ? 'bg-yellow-500' : 
                            'bg-red-500'
                          }`}></div>
                          <div>
                            <div className="font-medium">{integration.name}</div>
                            <div className="text-sm text-muted-foreground">
                              {integration.description}
                            </div>
                          </div>
                        </div>
                        <div>
                          <div className="text-sm">
                            <span className={`${
                              integration.status === 'online' ? 'text-green-600' : 
                              integration.status === 'degraded' ? 'text-yellow-600' : 
                              'text-red-600'
                            }`}>
                              {integration.status === 'online' ? 'Online' : 
                              integration.status === 'degraded' ? 'Degradado' : 
                              'Offline'}
                            </span>
                            <span className="text-muted-foreground"> • {integration.latency}ms</span>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-6 text-muted-foreground">
                      Nenhuma integração configurada
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default AdminSystemReport;
