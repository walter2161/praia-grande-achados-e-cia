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
