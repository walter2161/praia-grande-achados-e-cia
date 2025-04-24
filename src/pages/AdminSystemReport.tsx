import React, { useState, useEffect } from 'react';
import { getSystemStatus } from '@/lib/adminService';
import { SystemStatus } from '@/types';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { CircleDollarSign, Database, Server, Activity, PackageCheck, Bug, ClipboardList, Link2 } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const AdminSystemReport = () => {
  const [systemStatus, setSystemStatus] = useState<SystemStatus | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchSystemStatus = async () => {
      setIsLoading(true);
      try {
        const status = await getSystemStatus();
        setSystemStatus(status);
      } catch (error) {
        console.error('Failed to fetch system status:', error);
        toast({
          title: "Erro",
          description: "Falha ao carregar o relatório do sistema.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchSystemStatus();
  }, [toast]);

  if (isLoading) {
    return (
      <MainLayout>
        <div className="container py-8">
          <h1 className="text-3xl font-bold mb-4">Relatório do Sistema</h1>
          <p>Carregando...</p>
        </div>
      </MainLayout>
    );
  }

  if (!systemStatus) {
    return (
      <MainLayout>
        <div className="container py-8">
          <h1 className="text-3xl font-bold mb-4">Relatório do Sistema</h1>
          <p>Não foi possível carregar o relatório do sistema.</p>
        </div>
      </MainLayout>
    );
  }

  const severityMap: Record<string, string> = {
    low: 'muted',
    medium: 'warning',
    high: 'destructive',
  };

  return (
    <MainLayout>
      <div className="container py-8">
        <h1 className="text-3xl font-bold mb-8">Relatório do Sistema</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Database Status */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Database className="mr-2 h-4 w-4" /> Banco de Dados</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                <p><strong>Conexão:</strong> {systemStatus.database.connection ? <Badge variant="outline">Online</Badge> : <Badge variant="destructive">Offline</Badge>}</p>
                <p><strong>Tabelas:</strong> {systemStatus.database.tables_count}</p>
                <p><strong>Usuários:</strong> {systemStatus.database.users_count}</p>
                <p><strong>Anúncios:</strong> {systemStatus.database.listings_count}</p>
                <p><strong>Tempo de resposta:</strong> {systemStatus.database.query_time}ms</p>
              </div>
            </CardContent>
          </Card>

          {/* API Status */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Server className="mr-2 h-4 w-4" /> API</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                <p><strong>Status:</strong> {systemStatus.api.status === 'online' ? <Badge variant="outline">Online</Badge> : <Badge variant="destructive">Offline</Badge>}</p>
                <p><strong>Tempo de resposta:</strong> {systemStatus.api.response_time}ms</p>
                <p><strong>Funções:</strong> {systemStatus.api.functions_count}</p>
                <p><strong>Latência média:</strong> {systemStatus.api.avg_latency}ms</p>
                <p><strong>Taxa de sucesso:</strong> {systemStatus.api.success_rate}%</p>
              </div>
            </CardContent>
          </Card>

          {/* Performance Metrics */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Activity className="mr-2 h-4 w-4" /> Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                <p><strong>Uso de memória:</strong> {systemStatus.performance.memory_usage}%</p>
                <p><strong>Uso de CPU:</strong> {systemStatus.performance.cpu_usage}%</p>
                <p><strong>Carga do DB:</strong> {systemStatus.performance.db_load}%</p>
                <p><strong>Tempo médio de resposta:</strong> {systemStatus.performance.avg_response_time}ms</p>
                <p><strong>Conexões ativas:</strong> {systemStatus.performance.active_connections}</p>
                <p><strong>Requisições/min:</strong> {systemStatus.performance.requests_per_minute}</p>
              </div>
            </CardContent>
          </Card>

          {/* Integrations Status */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><PackageCheck className="mr-2 h-4 w-4" /> Integrações</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {systemStatus.integrations.map((integration, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div>
                      <p><strong>{integration.name}</strong></p>
                      <p className="text-sm text-muted-foreground">{integration.description}</p>
                    </div>
                    <Badge variant={integration.status === 'online' ? 'outline' : integration.status === 'degraded' ? 'warning' : 'destructive'}>
                      {integration.status} ({integration.latency}ms)
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Errors and Logs */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2"><Bug className="mr-2 h-5 w-5" /> Erros Recentes</h2>
          {systemStatus.errors.length > 0 ? (
            <div className="space-y-4">
              {systemStatus.errors.map((error, index) => {
                const classes = `p-4 rounded-md shadow-sm border ${
                  severityMap[error.severity] === 'destructive'
                    ? 'border-destructive text-destructive'
                    : severityMap[error.severity] === 'warning'
                      ? 'border-warning text-warning'
                      : 'border-muted text-muted-foreground'
                }`;
                return (
                  <div className={classes} key={index}>
                    <AlertTitle>{error.title}</AlertTitle>
                    <AlertDescription>{error.message}</AlertDescription>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-muted-foreground">Nenhum erro recente.</p>
          )}
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2"><ClipboardList className="mr-2 h-5 w-5" /> Logs Recentes</h2>
          {systemStatus.logs.length > 0 ? (
            <div className="space-y-2">
              {systemStatus.logs.map((log, index) => (
                <div key={index} className="p-3 rounded-md shadow-sm border border-muted">
                  <p><strong>Nível:</strong> {log.level}</p>
                  <p><strong>Mensagem:</strong> {log.message}</p>
                  <p><strong>Fonte:</strong> {log.source}</p>
                  <p><strong>Timestamp:</strong> {log.timestamp}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">Nenhum log recente.</p>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default AdminSystemReport;
