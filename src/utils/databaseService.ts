
import { Listing } from "@/types";

// Database configuration types
export type DatabaseConfig = {
  host: string;
  port?: number;
  username: string;
  password: string;
  database: string;
  prefix: string;
}

// Function to fetch database configuration from the config file
export const getDatabaseConfig = async (): Promise<DatabaseConfig> => {
  try {
    // In a real app, this would come from an API or config file
    // For now, we'll use localStorage or fallback to default values
    const storedConfig = localStorage.getItem('database_config');
    
    if (storedConfig) {
      return JSON.parse(storedConfig);
    }
    
    // Default fallback configuration
    return {
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'guiapg',
      prefix: 'wp_'
    };
  } catch (error) {
    console.error("Error loading database config:", error);
    throw new Error("Failed to load database configuration");
  }
};

// Main function to fetch listings from database
export const fetchListingsFromDatabase = async (categorySlug: string): Promise<{
  listings: Listing[];
  subcategories: string[];
}> => {
  try {
    // In a real application, this would be an actual API call to your backend
    // which would handle the SQL query and return the results
    const apiUrl = `/api/listings?category=${categorySlug}`;
    
    // For now, we'll simulate a fetch request
    const response = await fetch(apiUrl);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    return {
      listings: data.listings,
      subcategories: data.subcategories as string[]  // Explicitly cast to string[] to fix the type error
    };
  } catch (error) {
    console.error("Error fetching from database:", error);
    
    // For development purposes, we'll simulate data
    // In production, this would be removed and proper error handling implemented
    
    // Simulate network request delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Import mock data for development
    try {
      const { default: mockData } = await import(`@/data/${categorySlug}Listings`);
      
      // Extract unique subcategories and explicitly type as string[]
      const subcategories = [...new Set(mockData.map((item: any) => item.subcategory))].filter(Boolean) as string[];
      
      return {
        listings: mockData,
        subcategories
      };
    } catch (error) {
      console.error("Error loading mock data:", error);
      return {
        listings: [],
        subcategories: []
      };
    }
  }
};

// Function to update a listing in the database
export const updateListing = async (listing: Listing): Promise<boolean> => {
  try {
    // In a real application, this would be an API call
    const apiUrl = `/api/listings/${listing.id}`;
    
    const response = await fetch(apiUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(listing),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return true;
  } catch (error) {
    console.error("Error updating listing:", error);
    return false;
  }
};

// Function to create a new listing
export const createListing = async (listing: Omit<Listing, 'id'>): Promise<Listing | null> => {
  try {
    // In a real application, this would be an API call
    const apiUrl = `/api/listings`;
    
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(listing),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error("Error creating listing:", error);
    return null;
  }
};

// Function to delete a listing
export const deleteListing = async (id: string): Promise<boolean> => {
  try {
    // In a real application, this would be an API call
    const apiUrl = `/api/listings/${id}`;
    
    const response = await fetch(apiUrl, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return true;
  } catch (error) {
    console.error("Error deleting listing:", error);
    return false;
  }
};

// Function to fetch categories from the database
export const fetchCategories = async (): Promise<Category[]> => {
  try {
    const apiUrl = `/api/categories`;
    
    const response = await fetch(apiUrl);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error("Error fetching categories:", error);
    // Return mock data for development
    return [];
  }
};

// Type for category management
interface Category {
  id: number;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  parent_id?: number;
}

// Function to update site settings
export const updateSiteSetting = async (key: string, value: string): Promise<boolean> => {
  try {
    const apiUrl = `/api/settings/${key}`;
    
    const response = await fetch(apiUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ value }),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return true;
  } catch (error) {
    console.error(`Error updating setting ${key}:`, error);
    return false;
  }
};

// Function to fetch site settings
export const fetchSiteSettings = async (): Promise<Record<string, string>> => {
  try {
    const apiUrl = `/api/settings`;
    
    const response = await fetch(apiUrl);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error("Error fetching site settings:", error);
    return {};
  }
};
