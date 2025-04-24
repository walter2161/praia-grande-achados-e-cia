
import { type SystemStatus } from '@/types';

// Simulate delay for API calls
const simulateDelay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const getSystemStatus = async (): Promise<SystemStatus> => {
  try {
    // Simulate API call delay
    await simulateDelay(500);

    return {
      database: {
        connection: true,
        tables_count: 25,
        users_count: 500,
        listings_count: 2500,
        query_time: 0.025
      },
      api: {
        status: 'online',
        response_time: 0.012,
        functions_count: 120,
        avg_latency: 0.008,
        success_rate: 0.999
      },
      performance: {
        memory_usage: 0.65,
        cpu_usage: 0.22,
        db_load: 0.15,
        avg_response_time: 0.01,
        active_connections: 85,
        requests_per_minute: 1200
      },
      errors: [
        {
          title: "Database Connection Error",
          message: "Failed to establish a connection to the primary database.",
          severity: "high",
          location: "Database Service",
          timestamp: "2024-03-15T08:30:00Z"
        },
        {
          title: "API Endpoint Timeout",
          message: "One or more API endpoints are experiencing intermittent timeouts.",
          severity: "medium",
          location: "API Gateway",
          timestamp: "2024-03-15T09:15:00Z"
        },
        {
          title: "High CPU Usage",
          message: "CPU usage on the main application server is consistently above 90%.",
          severity: "medium",
          location: "Application Server",
          timestamp: "2024-03-15T10:00:00Z"
        },
        {
          title: "Memory Leak Detected",
          message: "A memory leak has been detected in the image processing service.",
          severity: "medium",
          location: "Image Processing Service",
          timestamp: "2024-03-15T10:45:00Z"
        },
        {
          title: "Failed Background Job",
          message: "A background job for generating daily reports failed to complete.",
          severity: "medium",
          location: "Background Job Scheduler",
          timestamp: "2024-03-15T11:30:00Z"
        },
        {
          title: "Slow Query Performance",
          message: "Database queries are taking longer than expected, impacting overall performance.",
          severity: "medium",
          location: "Database Service",
          timestamp: "2024-03-15T12:15:00Z"
        },
        {
          title: "Disk Space Warning",
          message: "Disk space on the logging server is running low.",
          severity: "low",
          location: "Logging Server",
          timestamp: "2024-03-15T13:00:00Z"
        },
        {
          title: "Authentication Service Unavailable",
          message: "The authentication service is temporarily unavailable.",
          severity: "high",
          location: "Authentication Service",
          timestamp: "2024-03-15T13:45:00Z"
        },
        {
          title: "Cache Server Overload",
          message: "The cache server is experiencing high load, leading to slower response times.",
          severity: "medium",
          location: "Cache Server",
          timestamp: "2024-03-15T14:30:00Z"
        },
        {
          title: "Network Latency Spike",
          message: "There has been a sudden spike in network latency between the application server and the database server.",
          severity: "medium",
          location: "Network Infrastructure",
          timestamp: "2024-03-15T15:15:00Z"
        }
      ],
      logs: [
        {
          level: "error",
          message: "Failed to connect to the database server.",
          timestamp: "2024-03-15T08:30:00Z",
          source: "Database Service"
        },
        {
          level: "warning",
          message: "API endpoint /users is experiencing intermittent timeouts.",
          timestamp: "2024-03-15T09:15:00Z",
          source: "API Gateway"
        },
        {
          level: "info",
          message: "Application server CPU usage is at 92%.",
          timestamp: "2024-03-15T10:00:00Z",
          source: "Application Server"
        },
        {
          level: "debug",
          message: "Memory usage in the image processing service is increasing.",
          timestamp: "2024-03-15T10:45:00Z",
          source: "Image Processing Service"
        },
        {
          level: "error",
          message: "Background job for generating daily reports failed with error code 500.",
          timestamp: "2024-03-15T11:30:00Z",
          source: "Background Job Scheduler"
        },
        {
          level: "warning",
          message: "Database query for fetching user profiles is taking 5 seconds.",
          timestamp: "2024-03-15T12:15:00Z",
          source: "Database Service"
        },
        {
          level: "info",
          message: "Disk space on the logging server is at 85%.",
          timestamp: "2024-03-15T13:00:00Z",
          source: "Logging Server"
        },
        {
          level: "error",
          message: "Authentication service is unavailable due to a server outage.",
          timestamp: "2024-03-15T13:45:00Z",
          source: "Authentication Service"
        },
        {
          level: "warning",
          message: "Cache server is experiencing high load, with 95% utilization.",
          timestamp: "2024-03-15T14:30:00Z",
          source: "Cache Server"
        },
        {
          level: "info",
          message: "Network latency between the application server and the database server has increased to 200ms.",
          timestamp: "2024-03-15T15:15:00Z",
          source: "Network Infrastructure"
        }
      ],
      integrations: [
        {
          name: "Supabase",
          description: "Banco de dados e autenticação",
          status: "online",
          latency: 75
        },
        {
          name: "Stripe",
          description: "Pagamentos",
          status: Math.random() > 0.8 ? "degraded" : "online",
          latency: Math.floor(Math.random() * 150) + 50
        },
        {
          name: "SendGrid",
          description: "Envio de emails",
          status: Math.random() > 0.95 ? "offline" : "online",
          latency: Math.floor(Math.random() * 200) + 100
        },
        {
          name: "Google Maps",
          description: "Mapas e geolocalização",
          status: "online",
          latency: 120
        }
      ]
    };
  } catch (error) {
    console.error("Error fetching system status:", error);
    throw error;
  }
};

// Specific request functions for AdminSystemReport.tsx
export const getDatabaseStatus = async (): Promise<SystemStatus['database']> => {
  const status = await getSystemStatus();
  return status.database;
};

export const getApiStatus = async (): Promise<SystemStatus['api']> => {
  const status = await getSystemStatus();
  return status.api;
};

export const getPerformanceMetrics = async (): Promise<SystemStatus['performance']> => {
  const status = await getSystemStatus();
  return status.performance;
};

export const getErrorLogs = async (): Promise<SystemStatus['errors']> => {
  const status = await getSystemStatus();
  return status.errors;
};

// Update the getIntegrations function to properly handle the readonly array
export const getIntegrations = async (): Promise<SystemStatus['integrations']> => {
  try {
    // Simulate API call delay
    await simulateDelay(600);

    // Return as non-readonly array
    return [
      {
        name: "Supabase",
        description: "Banco de dados e autenticação",
        status: "online",
        latency: 75
      },
      {
        name: "Stripe",
        description: "Pagamentos",
        status: Math.random() > 0.8 ? "degraded" : "online",
        latency: Math.floor(Math.random() * 150) + 50
      },
      {
        name: "SendGrid",
        description: "Envio de emails",
        status: Math.random() > 0.95 ? "offline" : "online",
        latency: Math.floor(Math.random() * 200) + 100
      },
      {
        name: "Google Maps",
        description: "Mapas e geolocalização",
        status: "online",
        latency: 120
      }
    ];
  } catch (error) {
    console.error("Error fetching integrations data:", error);
    return [];
  }
};

// Functions for AdminPanel.tsx
export const getUsers = async () => {
  await simulateDelay(500);
  return [];
};

export const deleteUser = async (id: string) => {
  await simulateDelay(300);
  return true;
};

export const updateUser = async (id: string, data: any) => {
  await simulateDelay(300);
  return { id, ...data };
};

export const getListings = async () => {
  await simulateDelay(500);
  return [];
};

export const deleteListing = async (id: string) => {
  await simulateDelay(300);
  return true;
};

export const updateListing = async (id: string, data: any) => {
  await simulateDelay(300);
  return { id, ...data };
};

export const getPendingUsers = async () => {
  await simulateDelay(500);
  return [];
};

export const approveUser = async (id: string) => {
  await simulateDelay(300);
  return { id, approval_status: 'approved' };
};

export const rejectUser = async (id: string) => {
  await simulateDelay(300);
  return { id, approval_status: 'rejected' };
};
