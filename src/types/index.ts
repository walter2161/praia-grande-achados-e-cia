
import type { Database } from './database';
import { Car, Briefcase, House, Settings, Utensils, Package } from "lucide-react";

export type Profile = Database['public']['Tables']['profiles']['Row'] & {
  approval_status?: 'pending' | 'approved' | 'rejected';
};

// Base listing type with common properties
export type Listing = {
  id: string;
  user_id: string;
  title: string;
  description: string;
  price: number | null;
  price_description: string | null;
  images: string[];
  location: string;
  address: string | null;
  latitude: number | null;
  longitude: number | null;
  date: string;
  category: string;
  subcategory: string | null;
  status: string;
  created_at: string;
  updated_at: string;
};

export interface CategoryIcon {
  className?: string;
}

export type CategoryIconType = React.ComponentType<CategoryIcon> | string;

export interface Category {
  id: string;
  name: string;
  icon: CategoryIconType;
  slug: string;
  subcategories?: string[];
  created_at: string;
  parentCategory?: string;  // Added parentCategory as an optional property
}

export interface SystemStatus {
  database: {
    connection: boolean;
    tables_count: number;
    users_count: number;
    listings_count: number;
    query_time: number;
  };
  api: {
    status: string;
    response_time: number;
    functions_count: number;
    avg_latency: number;
    success_rate: number;
  };
  performance: {
    memory_usage: number;
    cpu_usage: number;
    db_load: number;
    avg_response_time: number;
    active_connections: number;
    requests_per_minute: number;
  };
  errors: Array<{
    id: string;
    title: string;
    message: string;
    timestamp: string;
    severity: 'high' | 'medium' | 'low';
    location: string;
    resolved: boolean;
  }>;
  integrations: Array<{
    id: string;
    name: string;
    description: string;
    status: string;
    latency: number;
    lastChecked: string;
  }>;
}

export interface FormErrors {
  [key: string]: string;
}

// Listing type extensions for different categories
export interface AutoListing extends Listing {
  sellerName?: string;
  sellerContact?: string;
  brand?: string;
  model?: string;
  year?: number;
  mileage?: number;
  fuel?: string;
  transmission?: string;
  color?: string;
  
  // Properties from other listing types marked as optional
  salary?: number | null;
  company_name?: string | null;
  company_contact?: string | null;
  job_type?: string | null;
  education?: string | null;
  experience?: string | null;
  benefits?: string[] | null;
  property_type?: string | null;
  size?: number | null;
  bedrooms?: number | null;
  bathrooms?: number | null;
  has_garage?: boolean | null;
  amenities?: string[] | null;
  finalidade?: string | null;
  service_type?: string | null;
  provider_name?: string | null;
  provider_contact?: string | null;
  availability?: string | null;
  rating?: number | null;
}

export interface JobListing extends Listing {
  sellerName?: string;
  sellerContact?: string;
  company_name?: string;
  company_contact?: string;
  job_type?: string;
  education?: string;
  experience?: string;
  benefits?: string[];
  salary?: number;
  
  // Properties from other listing types marked as optional
  brand?: string | null;
  model?: string | null;
  year?: number | null;
  mileage?: number | null;
  fuel?: string | null;
  transmission?: string | null;
  color?: string | null;
  property_type?: string | null;
  size?: number | null;
  bedrooms?: number | null;
  bathrooms?: number | null;
  has_garage?: boolean | null;
  amenities?: string[] | null;
  finalidade?: string | null;
  service_type?: string | null;
  provider_name?: string | null;
  provider_contact?: string | null;
  availability?: string | null;
  rating?: number | null;
}

export interface RealEstateListing extends Listing {
  sellerName?: string;
  sellerContact?: string;
  property_type?: string;
  size?: number;
  bedrooms?: number;
  bathrooms?: number;
  has_garage?: boolean;
  amenities?: string[];
  finalidade?: string;
  
  // Properties from other listing types marked as optional
  brand?: string | null;
  model?: string | null;
  year?: number | null;
  mileage?: number | null;
  fuel?: string | null;
  transmission?: string | null;
  color?: string | null;
  salary?: number | null;
  company_name?: string | null;
  company_contact?: string | null;
  job_type?: string | null;
  education?: string | null;
  experience?: string | null;
  benefits?: string[] | null;
  service_type?: string | null;
  provider_name?: string | null;
  provider_contact?: string | null;
  availability?: string | null;
  rating?: number | null;
}

export interface ServiceListing extends Listing {
  sellerName?: string;
  sellerContact?: string;
  service_type?: string;
  provider_name?: string;
  provider_contact?: string;
  availability?: string;
  experience?: string;
  rating?: number;
  
  // Properties from other listing types marked as optional
  brand?: string | null;
  model?: string | null;
  year?: number | null;
  mileage?: number | null;
  fuel?: string | null;
  transmission?: string | null;
  color?: string | null;
  salary?: number | null;
  company_name?: string | null;
  company_contact?: string | null;
  job_type?: string | null;
  education?: string | null;
  benefits?: string[] | null;
  property_type?: string | null;
  size?: number | null;
  bedrooms?: number | null;
  bathrooms?: number | null;
  has_garage?: boolean | null;
  amenities?: string[] | null;
  finalidade?: string | null;
}

export interface BarRestaurantListing extends Listing {
  sellerName?: string;
  sellerContact?: string;
  
  // Properties from other listing types marked as optional
  brand?: string | null;
  model?: string | null;
  year?: number | null;
  mileage?: number | null;
  fuel?: string | null;
  transmission?: string | null;
  color?: string | null;
  salary?: number | null;
  company_name?: string | null;
  company_contact?: string | null;
  job_type?: string | null;
  education?: string | null;
  experience?: string | null;
  benefits?: string[] | null;
  property_type?: string | null;
  size?: number | null;
  bedrooms?: number | null;
  bathrooms?: number | null;
  has_garage?: boolean | null;
  amenities?: string[] | null;
  finalidade?: string | null;
  service_type?: string | null;
  provider_name?: string | null;
  provider_contact?: string | null;
  availability?: string | null;
  rating?: number | null;
}

export interface ItemListing extends Listing {
  sellerName?: string;
  sellerContact?: string;
  
  // Properties from other listing types marked as optional
  brand?: string | null;
  model?: string | null;
  year?: number | null;
  mileage?: number | null;
  fuel?: string | null;
  transmission?: string | null;
  color?: string | null;
  salary?: number | null;
  company_name?: string | null;
  company_contact?: string | null;
  job_type?: string | null;
  education?: string | null;
  experience?: string | null;
  benefits?: string[] | null;
  property_type?: string | null;
  size?: number | null;
  bedrooms?: number | null;
  bathrooms?: number | null;
  has_garage?: boolean | null;
  amenities?: string[] | null;
  finalidade?: string | null;
  service_type?: string | null;
  provider_name?: string | null;
  provider_contact?: string | null;
  availability?: string | null;
  rating?: number | null;
}

export interface BusinessListing extends Listing {
  // Business listing specific fields
  business_type?: string;
  sellerName?: string;
  sellerContact?: string;
  neighborhood?: string;
  cep?: string;
  email?: string;
  website?: string;
  phone?: string;
  whatsapp?: string;
  instagram?: string;
  facebook?: string;
  opening_hours?: string;
  payment_methods?: string[];
  features?: string[];
  capacity?: number;
  cuisine_type?: string;
  price_range?: string;
  delivery?: boolean;
  takeout?: boolean;
  menu_url?: string | null;
  rating?: number;
  review_count?: number;
  last_review_date?: string;
  featured?: boolean;
  views?: number;
  
  // Fields from other listing types
  brand?: string | null;
  model?: string | null;
  year?: number | null;
  mileage?: number | null;
  fuel?: string | null;
  transmission?: string | null;
  color?: string | null;
  property_type?: string | null;
  size?: number | null;
  bedrooms?: number | null;
  bathrooms?: number | null;
  has_garage?: boolean | null;
  amenities?: string[] | null;
  company_name?: string | null;
  company_contact?: string | null;
  job_type?: string | null;
  education?: string | null;
  experience?: string | null;
  benefits?: string[] | null;
  salary?: number | null;
  service_type?: string | null;
  provider_name?: string | null;
  provider_contact?: string | null;
  availability?: string | null;
  finalidade?: string | null;
}
