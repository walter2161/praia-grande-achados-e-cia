
import { type Database } from '@/types/database';
import { supabase } from '@/integrations/supabase/client';
import { allListings } from '@/data/mockData';

export async function getListingsByCategory(category: string, subcategory?: string) {
  try {
    let query = supabase
      .from('listings')
      .select('*')
      .eq('category', category)
      .eq('status', 'active');

    if (subcategory) {
      query = query.eq('subcategory', subcategory);
    }

    const { data, error } = await query.order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching listings by category:', error);
      // Return filtered mock data for the specific category
      console.log(`Returning mock data for category ${category} due to database error`);
      
      // Filter mock data based on category and optional subcategory
      return allListings.filter(listing => 
        listing.category === category && 
        (!subcategory || listing.subcategory === subcategory)
      );
    }

    return data;
  } catch (err) {
    console.error('Unexpected error fetching listings by category:', err);
    return allListings.filter(listing => 
      listing.category === category && 
      (!subcategory || listing.subcategory === subcategory)
    );
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
