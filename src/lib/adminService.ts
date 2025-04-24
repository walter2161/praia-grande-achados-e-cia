
import { supabase } from '@/integrations/supabase/client';
import { toast } from "sonner";
import type { Profile, Listing } from '@/types';

// Users management
export async function getUsers() {
  const { data: profiles, error } = await supabase
    .from('profiles')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching users:', error);
    throw error;
  }

  return profiles;
}

export async function deleteUser(userId: string) {
  const { error } = await supabase
    .from('profiles')
    .delete()
    .eq('id', userId);

  if (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
}

export async function updateUser(userId: string, userData: Partial<Profile>) {
  // Ensure the document_type is a valid enum value if present
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
    throw error;
  }
}

// Listings management
export async function getListings() {
  const { data: listings, error } = await supabase
    .from('listings')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching listings:', error);
    throw error;
  }

  return listings;
}

export async function deleteListing(listingId: string) {
  const { error } = await supabase
    .from('listings')
    .delete()
    .eq('id', listingId);

  if (error) {
    console.error('Error deleting listing:', error);
    throw error;
  }
}

export async function updateListing(listingId: string, listingData: Partial<Listing>) {
  // Create a clean object for Supabase that handles the price field
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
      // Try to convert string to number
      const numPrice = Number(listingData.price);
      if (!isNaN(numPrice)) {
        cleanData.price = numPrice;
      }
      // If it can't be converted, don't include it
    } else {
      // It's already a number
      cleanData.price = listingData.price;
    }
  }
  
  const { error } = await supabase
    .from('listings')
    .update(cleanData)
    .eq('id', listingId);

  if (error) {
    console.error('Error updating listing:', error);
    throw error;
  }
}
