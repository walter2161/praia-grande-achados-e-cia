
import { type Database } from '@/types/database';
import { supabase } from '@/integrations/supabase/client';
import { allListings } from '@/data/mockData';
import type { SystemStatus } from '@/types';

export async function getListings() {
  try {
    const { data, error } = await supabase
      .from('listings')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching listings:', error);
      throw error;
    }

    return data || [];
  } catch (err) {
    console.error('Unexpected error fetching listings:', err);
    return [];
  }
}

export async function getListingsByCategory(category: string) {
  try {
    const { data, error } = await supabase
      .from('listings')
      .select('*')
      .eq('category', category)
      .eq('status', 'active')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching listings by category:', error);
      // Return filtered mock data for the specific category
      console.log(`Returning mock data for category ${category} due to database error`);
      return allListings.filter(listing => listing.category === category);
    }

    return data;
  } catch (err) {
    console.error('Unexpected error fetching listings by category:', err);
    return allListings.filter(listing => listing.category === category);
  }
}

export async function getListing(id: string) {
  try {
    const { data, error } = await supabase
      .from('listings')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching listing:', error);
      // Return a mock listing with the requested ID if possible
      const mockListing = allListings.find(listing => listing.id === id);
      return mockListing || null;
    }

    return data;
  } catch (err) {
    console.error('Unexpected error fetching listing:', err);
    const mockListing = allListings.find(listing => listing.id === id);
    return mockListing || null;
  }
}

export async function getCategories() {
  try {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('name');

    if (error) {
      console.error('Error fetching categories:', error);
      // Import and return mock categories
      const { categories } = await import('@/data/mockData');
      return categories;
    }

    return data;
  } catch (err) {
    console.error('Unexpected error fetching categories:', err);
    const { categories } = await import('@/data/mockData');
    return categories;
  }
}

export async function getUserProfile(userId: string) {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();

  if (error) {
    console.error('Error fetching user profile:', error);
    return null;
  }

  return data;
}

export async function updateUserProfile(userId: string, profile: Partial<Database['public']['Tables']['profiles']['Update']>) {
  const { error } = await supabase
    .from('profiles')
    .update(profile)
    .eq('id', userId);

  if (error) {
    console.error('Error updating profile:', error);
    throw error;
  }
}

export async function createListing(listing: Database['public']['Tables']['listings']['Insert']) {
  const { data, error } = await supabase
    .from('listings')
    .insert(listing)
    .select()
    .single();

  if (error) {
    console.error('Error creating listing:', error);
    throw error;
  }

  return data;
}

export async function updateListing(id: string, listing: Partial<Database['public']['Tables']['listings']['Update']>) {
  const { error } = await supabase
    .from('listings')
    .update(listing)
    .eq('id', id);

  if (error) {
    console.error('Error updating listing:', error);
    throw error;
  }
}

export async function deleteListing(id: string) {
  const { error } = await supabase
    .from('listings')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting listing:', error);
    throw error;
  }
}

export async function getUserListings(userId: string) {
  const { data, error } = await supabase
    .from('listings')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching user listings:', error);
    return [];
  }

  return data;
}

// New functions to handle users
export async function getUsers() {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching users:', error);
      return [];
    }

    return data || [];
  } catch (err) {
    console.error('Unexpected error fetching users:', err);
    return [];
  }
}

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
  } catch (err) {
    console.error('Unexpected error deleting user:', err);
    throw err;
  }
}

export async function updateUser(userId: string, userData: Partial<Database['public']['Tables']['profiles']['Update']>) {
  try {
    const { error } = await supabase
      .from('profiles')
      .update(userData)
      .eq('id', userId);

    if (error) {
      console.error('Error updating user:', error);
      throw error;
    }
    
    return true;
  } catch (err) {
    console.error('Unexpected error updating user:', err);
    throw err;
  }
}

export async function getPendingUsers() {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('approval_status', 'pending')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching pending users:', error);
      return [];
    }

    return data || [];
  } catch (err) {
    console.error('Unexpected error fetching pending users:', err);
    return [];
  }
}

export async function approveUser(userId: string) {
  try {
    const { error } = await supabase
      .from('profiles')
      .update({ approval_status: 'approved' })
      .eq('id', userId);

    if (error) {
      console.error('Error approving user:', error);
      throw error;
    }
    
    return true;
  } catch (err) {
    console.error('Unexpected error approving user:', err);
    throw err;
  }
}

export async function rejectUser(userId: string) {
  try {
    const { error } = await supabase
      .from('profiles')
      .update({ approval_status: 'rejected' })
      .eq('id', userId);

    if (error) {
      console.error('Error rejecting user:', error);
      throw error;
    }
    
    return true;
  } catch (err) {
    console.error('Unexpected error rejecting user:', err);
    throw err;
  }
}

// System report related functions
export async function getDatabaseStatus(): Promise<SystemStatus['database']> {
  // Mock data for database status
  return {
    connection: true,
    tables_count: 8,
    users_count: 45,
    listings_count: 287,
    query_time: 63
  };
}

export async function getApiStatus(): Promise<SystemStatus['api']> {
  // Mock data for API status
  return {
    status: 'operational',
    response_time: 128,
    functions_count: 19,
    avg_latency: 86,
    success_rate: 99.8
  };
}

export async function getPerformanceMetrics(): Promise<SystemStatus['performance']> {
  // Mock data for performance metrics
  return {
    memory_usage: 752,
    cpu_usage: 24,
    db_load: 18,
    avg_response_time: 95,
    active_connections: 12,
    requests_per_minute: 42
  };
}

export async function getErrorLogs(): Promise<SystemStatus['errors']> {
  // Mock data for error logs
  return [
    {
      id: '1',
      title: 'Database Connection Timeout',
      message: 'Database connection timed out after 30 seconds',
      timestamp: '2023-04-26T15:32:18Z',
      severity: 'high',
      location: 'src/lib/supabase.ts:125',
      resolved: false
    },
    {
      id: '2',
      title: 'Image Upload Failed',
      message: 'Failed to upload image: size exceeds limit',
      timestamp: '2023-04-26T12:21:44Z',
      severity: 'medium',
      location: 'src/lib/storage.ts:87',
      resolved: true
    },
    {
      id: '3',
      title: 'Authentication Error',
      message: 'Invalid token provided for user authentication',
      timestamp: '2023-04-25T23:14:02Z',
      severity: 'high',
      location: 'src/lib/auth.ts:213',
      resolved: false
    }
  ];
}

export async function getIntegrations(): Promise<SystemStatus['integrations']> {
  // Mock data for integrations
  return [
    {
      id: '1',
      name: 'Payment Gateway',
      description: 'Stripe payment processing integration',
      status: 'operational',
      latency: 152,
      lastChecked: '2023-04-26T16:10:23Z'
    },
    {
      id: '2',
      name: 'Email Service',
      description: 'SendGrid email delivery service',
      status: 'operational',
      latency: 205,
      lastChecked: '2023-04-26T16:10:23Z'
    },
    {
      id: '3',
      name: 'Storage Service',
      description: 'Supabase storage for media files',
      status: 'operational',
      latency: 87,
      lastChecked: '2023-04-26T16:10:23Z'
    }
  ];
}

// Updated function for getBannerImages
export async function getBannerImages() {
  try {
    // First try to fetch images as authenticated user (admin)
    const { data, error } = await supabase
      .from('banner_images')
      .select('*')
      .order('created_at');

    if (error) {
      console.error('Error fetching banner images:', error);
      return [];
    }

    return data;
  } catch (err) {
    console.error('Unexpected error fetching banner images:', err);
    return [];
  }
}

// Updated function for addBannerImage with proper return type
export async function addBannerImage(imageData: { url: string, title?: string }) {
  try {
    const { data, error } = await supabase
      .from('banner_images')
      .insert([{ 
        url: imageData.url, 
        title: imageData.title || null, 
        active: true 
      }])
      .select();

    if (error) {
      console.error('Error adding banner image:', error);
      throw error;
    }

    return { data: data[0], error: null };
  } catch (err) {
    console.error('Unexpected error adding banner image:', err);
    return { data: null, error: err };
  }
}

// Função para remover imagem de banner (para uso administrativo)
export async function removeBannerImage(id: string) {
  try {
    const { error } = await supabase
      .from('banner_images')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error removing banner image:', error);
      throw error;
    }

    return true;
  } catch (err) {
    console.error('Unexpected error removing banner image:', err);
    throw err;
  }
}

// Função para atualizar o status de uma imagem (para uso administrativo)
export async function toggleBannerImageStatus(id: string, active: boolean) {
  try {
    const { error } = await supabase
      .from('banner_images')
      .update({ 
        active, 
        updated_at: new Date().toISOString() // Fix here: Convert Date to ISO string
      })
      .eq('id', id);

    if (error) {
      console.error('Error updating banner image status:', error);
      throw error;
    }

    return true;
  } catch (err) {
    console.error('Unexpected error updating banner image status:', err);
    throw err;
  }
}

// Update the existing getRandomBannerImage function
export const getRandomBannerImage = async () => {
  const bannerImages = await getBannerImages();
  
  // If no banner images are found, fallback to the original method
  if (bannerImages.length === 0) {
    return '/lovable-uploads/239ae548-ca2d-41d4-bf2f-45fb03041253.png';
  }
  
  const randomIndex = Math.floor(Math.random() * bannerImages.length);
  return bannerImages[randomIndex].url;
};
