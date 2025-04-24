
import { supabase } from '@/integrations/supabase/client';
import { toast } from "sonner";
import type { Profile, Listing } from '@/types';

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
    throw error;
  }
}
