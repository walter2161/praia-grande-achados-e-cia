import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getDatabaseStatus, getApiStatus, getPerformanceMetrics, getErrorLogs, getIntegrations } from "@/lib/adminService";
import { SystemStatus } from '@/types';
import { Skeleton } from "@/components/ui/skeleton";

const AdminSystemReport: React.FC = () => {
  const [databaseStatus, setDatabaseStatus] = useState<SystemStatus['database'] | null>(null);
  const [apiStatus, setApiStatus] = useState<SystemStatus['api'] | null>(null);
  const [performanceMetrics, setPerformanceMetrics] = useState<SystemStatus['performance'] | null>(null);
  const [errorLogs, setErrorLogs] = useState<SystemStatus['errors']>([])
  const [integrations, setIntegrations] = useState<SystemStatus['integrations']>([])
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const dbStatus = await getDatabaseStatus();
        const api = await getApiStatus();
        const performance = await getPerformanceMetrics();
        const errors = await getErrorLogs();
        const integrationsData = await getIntegrations();

        setDatabaseStatus(dbStatus);
        setApiStatus(api);
        setPerformanceMetrics(performance);
        setErrorLogs(errors);
        setIntegrations(integrationsData);
      } catch (error) {
        console.error("Failed to fetch system report data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getVariantForSeverity = (severity: string): "default" | "destructive" | "warning" => {
    switch (severity) {
      case 'high':
        return 'destructive';
      case 'medium':
        return 'warning' as any; // Type assertion to fix the error
      default:
        return 'default';
    }
  };

  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold mb-8">System Report</h1>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle><Skeleton className="h-6 w-32" /></CardTitle>
            </CardHeader>
            <CardContent>
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle><Skeleton className="h-6 w-32" /></CardTitle>
            </CardHeader>
            <CardContent>
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle><Skeleton className="h-6 w-32" /></CardTitle>
            </CardHeader>
            <CardContent>
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Database Status</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Connection: {databaseStatus?.connection ? 'Online' : 'Offline'}</p>
              <p>Tables Count: {databaseStatus?.tables_count}</p>
              <p>Users Count: {databaseStatus?.users_count}</p>
              <p>Listings Count: {databaseStatus?.listings_count}</p>
              <p>Query Time: {databaseStatus?.query_time}ms</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>API Status</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Status: {apiStatus?.status}</p>
              <p>Response Time: {apiStatus?.response_time}ms</p>
              <p>Functions Count: {apiStatus?.functions_count}</p>
              <p>Average Latency: {apiStatus?.avg_latency}ms</p>
              <p>Success Rate: {apiStatus?.success_rate}%</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Performance Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Memory Usage: {performanceMetrics?.memory_usage} MB</p>
              <p>CPU Usage: {performanceMetrics?.cpu_usage}%</p>
              <p>DB Load: {performanceMetrics?.db_load}%</p>
              <p>Average Response Time: {performanceMetrics?.avg_response_time}ms</p>
              <p>Active Connections: {performanceMetrics?.active_connections}</p>
              <p>Requests per Minute: {performanceMetrics?.requests_per_minute}</p>
            </CardContent>
          </Card>
        </div>
      )}

      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-4">Error Logs</h2>
        <ScrollArea className="rounded-md border h-[300px] w-full">
          <div className="p-4">
            {errorLogs.length > 0 ? (
              errorLogs.map((log, index) => (
                <div key={index} className="mb-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">{log.title}</h3>
                    <Badge variant={getVariantForSeverity(log.severity)}>{log.severity}</Badge>
                  </div>
                  <p className="text-muted-foreground">{log.message}</p>
                  <p className="text-sm text-muted-foreground">Location: {log.location}</p>
                  <p className="text-sm text-muted-foreground">Timestamp: {log.timestamp}</p>
                </div>
              ))
            ) : (
              <p className="text-muted-foreground">No errors reported.</p>
            )}
          </div>
        </ScrollArea>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-4">Integrations</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {integrations.map((integration, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>{integration.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{integration.description}</p>
                <p>Status: {integration.status}</p>
                <p>Latency: {integration.latency}ms</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminSystemReport;
