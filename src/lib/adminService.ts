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
