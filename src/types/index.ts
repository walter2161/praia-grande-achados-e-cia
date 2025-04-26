import type { Database } from './database';

export type Profile = Database['public']['Tables']['profiles']['Row'];
export type Listing = Database['public']['Tables']['listings']['Row'];

export interface SystemStatus {
  database: {
    connection: boolean;
    tables_count: number;
    users_count: number;
    listings_count: number;
    query_time: number;
  };
  api: {
    status: string;
    response_time: number;
    functions_count: number;
    avg_latency: number;
    success_rate: number;
  };
  performance: {
    memory_usage: number;
    cpu_usage: number;
    db_load: number;
    avg_response_time: number;
    active_connections: number;
    requests_per_minute: number;
  };
  errors: Array<{
    id: string;
    title: string;
    message: string;
    timestamp: string;
    severity: 'high' | 'medium' | 'low';
    location: string;
    resolved: boolean;
  }>;
  integrations: Array<{
    id: string;
    name: string;
    description: string;
    status: string;
    latency: number;
    lastChecked: string;
  }>;
}
