
import { type Database } from '@/types/database';
import { supabase } from '@/integrations/supabase/client';
import { allListings } from '@/data/mockData';

// Re-export the new modular functions
export { getListingsByCategory, getListing, getListings } from './supabase/listings';

// Export remaining functions
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
