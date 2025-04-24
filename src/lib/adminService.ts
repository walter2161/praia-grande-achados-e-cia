import { supabase } from '@/integrations/supabase/client';
import { toast } from "sonner";
import type { Profile, Listing, SystemStatus } from '@/types';

// Users management
export async function getUsers() {
  // Usuário admin tem acesso a todos os perfis devido às políticas RLS
  const { data: profiles, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('approval_status', 'approved') // Only get approved users
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching users:', error);
    toast.error('Erro ao buscar usuários: ' + error.message);
    throw error;
  }

  return profiles;
}

export async function getPendingUsers() {
  const { data: profiles, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('approval_status', 'pending')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching pending users:', error);
    toast.error('Erro ao buscar usuários pendentes: ' + error.message);
    throw error;
  }

  return profiles;
}

export async function approveUser(userId: string) {
  const { error } = await supabase
    .from('profiles')
    .update({ approval_status: 'approved' })
    .eq('id', userId);

  if (error) {
    console.error('Error approving user:', error);
    toast.error('Erro ao aprovar usuário: ' + error.message);
    throw error;
  }
}

export async function rejectUser(userId: string) {
  const { error } = await supabase
    .from('profiles')
    .update({ approval_status: 'rejected' })
    .eq('id', userId);

  if (error) {
    console.error('Error rejecting user:', error);
    toast.error('Erro ao rejeitar usuário: ' + error.message);
    throw error;
  }
}

export async function deleteUser(userId: string) {
  const { error } = await supabase
    .from('profiles')
    .delete()
    .eq('id', userId);

  if (error) {
    console.error('Error deleting user:', error);
    toast.error('Erro ao excluir usuário: ' + error.message);
    throw error;
  }
}

export async function updateUser(userId: string, userData: Partial<Profile>) {
  if (userData.document_type && 
      userData.document_type !== 'cpf' && 
      userData.document_type !== 'cnpj') {
    userData.document_type = null;
  }

  const { error } = await supabase
    .from('profiles')
    .update(userData)
    .eq('id', userId);

  if (error) {
    console.error('Error updating user:', error);
    toast.error('Erro ao atualizar usuário: ' + error.message);
    throw error;
  }
}

// Listings management
export async function getListings() {
  // Usuário admin tem acesso a todos os anúncios devido às políticas RLS
  const { data: listings, error } = await supabase
    .from('listings')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching listings:', error);
    toast.error('Erro ao buscar anúncios: ' + error.message);
    throw error;
  }

  return listings;
}

export async function getPendingListings() {
  const { data: listings, error } = await supabase
    .from('listings')
    .select('*, profiles(username, email)')
    .eq('status', 'pending')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching pending listings:', error);
    toast.error('Erro ao buscar anúncios pendentes: ' + error.message);
    throw error;
  }

  return listings;
}

export async function approveListing(listingId: string) {
  const { error } = await supabase
    .from('listings')
    .update({ status: 'active' })
    .eq('id', listingId);

  if (error) {
    console.error('Error approving listing:', error);
    toast.error('Erro ao aprovar anúncio: ' + error.message);
    throw error;
  }
}

export async function rejectListing(listingId: string) {
  const { error } = await supabase
    .from('listings')
    .update({ status: 'rejected' })
    .eq('id', listingId);

  if (error) {
    console.error('Error rejecting listing:', error);
    toast.error('Erro ao rejeitar anúncio: ' + error.message);
    throw error;
  }
}

export async function deleteListing(listingId: string) {
  const { error } = await supabase
    .from('listings')
    .delete()
    .eq('id', listingId);

  if (error) {
    console.error('Error deleting listing:', error);
    toast.error('Erro ao excluir anúncio: ' + error.message);
    throw error;
  }
}

export async function updateListing(listingId: string, listingData: Partial<Listing>) {
  const cleanData: Record<string, any> = {};
  
  // Copy all fields except price
  Object.keys(listingData).forEach(key => {
    if (key !== 'price') {
      cleanData[key] = listingData[key as keyof Partial<Listing>];
    }
  });
  
  // Handle price separately with type conversion
  if (listingData.price !== undefined) {
    if (typeof listingData.price === 'string') {
      const numPrice = Number(listingData.price);
      if (!isNaN(numPrice)) {
        cleanData.price = numPrice;
      }
    } else {
      cleanData.price = listingData.price;
    }
  }
  
  const { error } = await supabase
    .from('listings')
    .update(cleanData)
    .eq('id', listingId);

  if (error) {
    console.error('Error updating listing:', error);
    toast.error('Erro ao atualizar anúncio: ' + error.message);
  }
}

// System monitoring
export async function getSystemStatus(): Promise<SystemStatus> {
  try {
    // Start current time to measure database response time
    const startTime = performance.now();
    
    // Fetch data for status reporting
    const [
      profilesResult,
      pendingUsersResult,
      listingsResult,
      categoriesResult,
    ] = await Promise.all([
      supabase.from('profiles').select('count').single(),
      supabase.from('profiles').select('count').eq('approval_status', 'pending').single(),
      supabase.from('listings').select('count').single(),
      supabase.from('categories').select('count').single(),
    ]);
    
    // Calculate query response time
    const queryTime = Math.round(performance.now() - startTime);
    
    // Check for any errors in the responses
    const dbErrors = [];
    
    if (profilesResult.error) dbErrors.push({
      title: 'Erro na tabela de perfis',
      message: profilesResult.error.message,
      severity: 'medium',
      location: 'Database/Profiles',
      timestamp: new Date().toISOString()
    });
    
    if (pendingUsersResult.error) dbErrors.push({
      title: 'Erro na consulta de usuários pendentes',
      message: pendingUsersResult.error.message,
      severity: 'low',
      location: 'Database/PendingUsers',
      timestamp: new Date().toISOString()
    });
    
    if (listingsResult.error) dbErrors.push({
      title: 'Erro na tabela de anúncios',
      message: listingsResult.error.message,
      severity: 'medium',
      location: 'Database/Listings',
      timestamp: new Date().toISOString()
    });
    
    if (categoriesResult.error) dbErrors.push({
      title: 'Erro na tabela de categorias',
      message: categoriesResult.error.message,
      severity: 'low',
      location: 'Database/Categories',
      timestamp: new Date().toISOString()
    });
    
    // Create random logs for demonstration
    const logMessages = [
      'Usuário autenticado com sucesso',
      'Novo anúncio criado',
      'Requisição de recuperação de senha',
      'Falha de autenticação',
      'Arquivo de imagem carregado',
      'Tentativa de acesso não autorizado',
      'Usuário atualizou perfil',
      'Anúncio removido',
      'Categoria adicionada',
      'Email enviado com sucesso'
    ];
    
    const logLevels: ('error' | 'warning' | 'info' | 'debug')[] = ['error', 'warning', 'info', 'debug'];
    const logSources = ['Auth', 'Database', 'Storage', 'API', 'System'];
    
    const logs = Array.from({ length: 10 }, (_, i) => {
      const timestamp = new Date();
      timestamp.setMinutes(timestamp.getMinutes() - Math.floor(Math.random() * 60));
      
      return {
        level: logLevels[Math.floor(Math.random() * logLevels.length)],
        message: logMessages[Math.floor(Math.random() * logMessages.length)],
        timestamp: timestamp.toISOString(),
        source: logSources[Math.floor(Math.random() * logSources.length)]
      };
    }).sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    
    // Mock API status (in a real app, this would be actual API status checks)
    const apiResponseTime = Math.floor(Math.random() * 300) + 50; // 50-350ms
    const apiSuccessRate = Math.floor(Math.random() * 5) + 95; // 95-100%
    
    // Performance metrics (these would come from real monitoring in production)
    const memoryUsage = Math.floor(Math.random() * 30) + 20; // 20-50%
    const cpuUsage = Math.floor(Math.random() * 25) + 10; // 10-35%
    const dbLoad = Math.floor(Math.random() * 40) + 5; // 5-45%
    
    // Mock integrations (in a real app, these would check actual service statuses)
    const integrations = [
      {
        name: 'Supabase',
        description: 'Banco de dados e autenticação',
        status: 'online',
        latency: Math.floor(Math.random() * 100) + 20
      },
      {
        name: 'Stripe',
        description: 'Pagamentos',
        status: Math.random() > 0.9 ? 'degraded' : 'online',
        latency: Math.floor(Math.random() * 200) + 50
      },
      {
        name: 'SendGrid',
        description: 'Envio de emails',
        status: Math.random() > 0.95 ? 'offline' : 'online',
        latency: Math.floor(Math.random() * 150) + 40
      },
      {
        name: 'Mapbox',
        description: 'Serviços de mapas',
        status: 'online',
        latency: Math.floor(Math.random() * 80) + 30
      }
    ] as const;
    
    // Prepare the complete system status
    const systemStatus: SystemStatus = {
      database: {
        connection: true,
        tables_count: 4, // Profiles, Listings, Categories, etc.
        users_count: profilesResult.data?.count || 0,
        listings_count: listingsResult.data?.count || 0,
        query_time: queryTime
      },
      api: {
        status: 'online',
        response_time: apiResponseTime,
        functions_count: 8, // Example count of edge functions
        avg_latency: Math.floor(Math.random() * 100) + 50,
        success_rate: apiSuccessRate
      },
      performance: {
        memory_usage: memoryUsage,
        cpu_usage: cpuUsage,
        db_load: dbLoad,
        avg_response_time: apiResponseTime,
        active_connections: Math.floor(Math.random() * 25) + 5,
        requests_per_minute: Math.floor(Math.random() * 100) + 10
      },
      errors: dbErrors,
      logs,
      integrations: integrations as SystemStatus['integrations']
    };

    return systemStatus;
  } catch (error) {
    console.error('Error generating system status:', error);
    toast.error('Erro ao gerar relatório do sistema');
    
    // Return a minimal error status
    return {
      database: {
        connection: false,
        tables_count: 0,
        users_count: 0,
        listings_count: 0,
        query_time: 0
      },
      api: {
        status: 'offline',
        response_time: 0,
        functions_count: 0,
        avg_latency: 0,
        success_rate: 0
      },
      performance: {
        memory_usage: 0,
        cpu_usage: 0,
        db_load: 0,
        avg_response_time: 0,
        active_connections: 0,
        requests_per_minute: 0
      },
      errors: [{
        title: 'Erro do Sistema',
        message: error instanceof Error ? error.message : 'Erro desconhecido',
        severity: 'high',
        location: 'System',
        timestamp: new Date().toISOString()
      }],
      logs: [],
      integrations: []
    };
  }
}
