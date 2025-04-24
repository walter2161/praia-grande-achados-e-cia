
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

export async function getPendingUsers() {
  const { data: profiles, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('approval_status', 'pending')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching pending users:', error);
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

export async function getPendingListings() {
  const { data: listings, error } = await supabase
    .from('listings')
    .select('*, profiles(username, email)')
    .eq('status', 'pending')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching pending listings:', error);
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
    throw error;
  }
}
