
import { type Database } from '@/types/database';
import { supabase } from '@/integrations/supabase/client';
import { allListings } from '@/data/mockData';

export async function getListings() {
  try {
    const { data, error } = await supabase
      .from('listings')
      .select('*')
      .eq('status', 'active')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching listings:', error);
      // Return mock data when there's a database error
      console.log('Returning mock data due to database error');
      return allListings;
    }

    return data;
  } catch (err) {
    console.error('Unexpected error fetching listings:', err);
    return allListings;
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

// Função atualizada para gerenciar banner images
export async function getBannerImages() {
  try {
    // Primeiro tentamos buscar as imagens como usuário autenticado (admin)
    const { data, error } = await supabase
      .from('banner_images')
      .select('*')
      .eq('active', true)
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

// Função para adicionar nova imagem de banner (para uso administrativo)
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

    return data[0];
  } catch (err) {
    console.error('Unexpected error adding banner image:', err);
    throw err;
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

