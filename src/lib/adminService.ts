
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
  // Convert string price to number if it's a string but represents a valid number
  if (typeof listingData.price === 'string' && !isNaN(Number(listingData.price))) {
    listingData = {
      ...listingData,
      price: Number(listingData.price)
    };
  } else if (typeof listingData.price === 'string') {
    // If price is a string that can't be converted to a number, remove it to avoid type errors
    const { price, ...restData } = listingData;
    listingData = restData;
  }
  
  const { error } = await supabase
    .from('listings')
    .update(listingData)
    .eq('id', listingId);

  if (error) {
    console.error('Error updating listing:', error);
    throw error;
  }
}
