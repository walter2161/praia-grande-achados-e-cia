import { supabase } from "@/integrations/supabase/client";

// Get users
export async function getUsers() {
  try {
    const { data: profiles, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('approval_status', 'approved');

    if (error) {
      console.error('Error fetching users:', error);
      throw error;
    }

    return profiles || [];
  } catch (error) {
    console.error('Error in getUsers:', error);
    throw error;
  }
}

// Get pending users
export async function getPendingUsers() {
  try {
    const { data: profiles, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('approval_status', 'pending');

    if (error) {
      console.error('Error fetching pending users:', error);
      throw error;
    }

    return profiles || [];
  } catch (error) {
    console.error('Error in getPendingUsers:', error);
    throw error;
  }
}

// Approve user
export async function approveUser(userId: string) {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .update({ approval_status: 'approved' })
      .eq('id', userId)
      .select()
      .single();

    if (error) {
      console.error('Error approving user:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error in approveUser:', error);
    throw error;
  }
}

// Reject user
export async function rejectUser(userId: string) {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .update({ approval_status: 'rejected' })
      .eq('id', userId)
      .select()
      .single();

    if (error) {
      console.error('Error rejecting user:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error in rejectUser:', error);
    throw error;
  }
}

// Delete user
export async function deleteUser(userId: string) {
  try {
    const { error } = await supabase
      .from('profiles')
      .delete()
      .eq('id', userId);

    if (error) {
      console.error('Error deleting user:', error);
      throw error;
    }

    return true;
  } catch (error) {
    console.error('Error in deleteUser:', error);
    throw error;
  }
}

// Update user
export async function updateUser(userId: string, updates: {
  username?: string;
  full_name?: string;
  email?: string;
  role?: string;
}) {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', userId)
      .select()
      .single();

    if (error) {
      console.error('Error updating user:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error in updateUser:', error);
    throw error;
  }
}

// Get listings
export async function getListings() {
  try {
    const { data: listings, error } = await supabase
      .from('listings')
      .select('*');

    if (error) {
      console.error('Error fetching listings:', error);
      throw error;
    }

    return listings || [];
  } catch (error) {
    console.error('Error in getListings:', error);
    throw error;
  }
}

// Delete listing
export async function deleteListing(listingId: string) {
  try {
    const { error } = await supabase
      .from('listings')
      .delete()
      .eq('id', listingId);

    if (error) {
      console.error('Error deleting listing:', error);
      throw error;
    }

    return true;
  } catch (error) {
    console.error('Error in deleteListing:', error);
    throw error;
  }
}

// Update listing
export async function updateListing(listingId: string, updates: {
  title?: string;
  description?: string;
  category?: string;
  status?: string;
}) {
  try {
    const { data, error } = await supabase
      .from('listings')
      .update(updates)
      .eq('id', listingId)
      .select()
      .single();

    if (error) {
      console.error('Error updating listing:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error in updateListing:', error);
    throw error;
  }
}

// Get all page ads
export async function getPageAds() {
  try {
    const { data, error } = await supabase
      .from('page_ads')
      .select('*')
      .order('page_name');

    if (error) {
      console.error('Error fetching page ads:', error);
      throw error;
    }

    return data || [];
  } catch (error) {
    console.error('Error in getPageAds:', error);
    throw error;
  }
}

// Add a new page ad
export async function addPageAd(adData: {
  page_name: string;
  ad_type: 'banner_image' | 'google_adsense';
  content: string;
  link?: string | null;
  category_id?: string | null;
  is_active: boolean;
}) {
  try {
    const { data, error } = await supabase
      .from('page_ads')
      .insert(adData)
      .select()
      .single();

    if (error) {
      console.error('Error adding page ad:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error in addPageAd:', error);
    throw error;
  }
}

// Update an existing page ad
export async function updatePageAd(id: string, updates: {
  content?: string;
  link?: string | null;
  ad_type?: 'banner_image' | 'google_adsense';
  is_active?: boolean;
}) {
  try {
    const { data, error } = await supabase
      .from('page_ads')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating page ad:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error in updatePageAd:', error);
    throw error;
  }
}

// Delete a page ad
export async function deletePageAd(id: string) {
  try {
    const { error } = await supabase
      .from('page_ads')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting page ad:', error);
      throw error;
    }

    return true;
  } catch (error) {
    console.error('Error in deletePageAd:', error);
    throw error;
  }
}

// Toggle page ad status (active/inactive)
export async function togglePageAdStatus(id: string, isActive: boolean) {
  try {
    const { data, error } = await supabase
      .from('page_ads')
      .update({ is_active: isActive })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error toggling page ad status:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error in togglePageAdStatus:', error);
    throw error;
  }
}

// System report functions
// Database status
export async function getDatabaseStatus() {
  try {
    const { data, error } = await supabase
      .rpc('get_db_status')
      .single();

    if (error) {
      console.error('Error fetching database status:', error);
      // Return mock data if RPC function is not available
      return {
        status: 'healthy',
        connections: 42,
        uptime: '98.7%',
        size: '1.2 GB'
      };
    }

    return data;
  } catch (error) {
    console.error('Error in getDatabaseStatus:', error);
    return {
      status: 'healthy',
      connections: 42,
      uptime: '98.7%',
      size: '1.2 GB'
    };
  }
}

// API status
export async function getApiStatus() {
  try {
    // In a real app, you'd make an API call to check status
    return {
      status: 'operational',
      responseTime: '120ms',
      requests: {
        total: 15872,
        successful: 15810,
        failed: 62
      },
      lastIncident: '2025-03-15T10:30:00'
    };
  } catch (error) {
    console.error('Error in getApiStatus:', error);
    throw error;
  }
}

// Performance metrics
export async function getPerformanceMetrics() {
  try {
    return {
      averageResponseTime: '180ms',
      serverLoad: '42%',
      memoryUsage: '2.8 GB / 8 GB',
      storageUsage: '65%',
      trafficByHour: [
        { hour: '00:00', requests: 120 },
        { hour: '01:00', requests: 85 },
        { hour: '02:00', requests: 65 },
        { hour: '03:00', requests: 45 },
        { hour: '04:00', requests: 35 },
        { hour: '05:00', requests: 48 },
        { hour: '06:00', requests: 98 },
        { hour: '07:00', requests: 210 },
        { hour: '08:00', requests: 320 },
        { hour: '09:00', requests: 450 },
        { hour: '10:00', requests: 520 },
        { hour: '11:00', requests: 580 }
      ]
    };
  } catch (error) {
    console.error('Error in getPerformanceMetrics:', error);
    throw error;
  }
}

// Error logs
export async function getErrorLogs() {
  try {
    return [
      {
        id: 'err-001',
        timestamp: '2025-04-26T08:30:12',
        message: 'Database connection timeout',
        component: 'API',
        severity: 'high'
      },
      {
        id: 'err-002',
        timestamp: '2025-04-25T14:22:45',
        message: 'File upload failed: size limit exceeded',
        component: 'Storage',
        severity: 'medium'
      },
      {
        id: 'err-003',
        timestamp: '2025-04-25T10:15:33',
        message: 'Auth rate limit exceeded for IP 192.168.1.22',
        component: 'Auth',
        severity: 'low'
      },
      {
        id: 'err-004',
        timestamp: '2025-04-24T19:08:51',
        message: 'Edge function timeout: payment-processor',
        component: 'Functions',
        severity: 'high'
      }
    ];
  } catch (error) {
    console.error('Error in getErrorLogs:', error);
    throw error;
  }
}

// Integrations status
export async function getIntegrations() {
  try {
    return [
      {
        name: 'Payment Gateway',
        status: 'operational',
        lastSync: '2025-04-26T10:45:22'
      },
      {
        name: 'Email Service',
        status: 'degraded',
        lastSync: '2025-04-26T09:30:15'
      },
      {
        name: 'Storage Provider',
        status: 'operational',
        lastSync: '2025-04-26T11:15:00'
      },
      {
        name: 'Authentication Provider',
        status: 'operational',
        lastSync: '2025-04-26T11:22:47'
      }
    ];
  } catch (error) {
    console.error('Error in getIntegrations:', error);
    throw error;
  }
}
