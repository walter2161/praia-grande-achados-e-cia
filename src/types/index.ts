
export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: any;
  created_at: string;
  subcategories?: string[]; // Add subcategories to the Category type
}

export interface Listing {
  id: string;
  user_id: string;
  title: string;
  description: string | null;
  price: number | null;
  price_description: string | null;
  images: string[];
  location: string | null;
  address: string | null;
  latitude: number | null;
  longitude: number | null;
  date: string;
  category: string;
  subcategory: string | null;
  status: 'active' | 'inactive' | 'pending' | 'rejected';
  brand: string | null;
  model: string | null;
  year: number | null;
  mileage: number | null;
  fuel: string | null;
  transmission: string | null;
  color: string | null;
  salary: number | null;
  company_name: string | null;
  company_contact: string | null;
  job_type: string | null;
  education: string | null;
  experience: string | null;
  benefits: string[] | null;
  property_type: string | null;
  size: number | null;
  bedrooms: number | null;
  bathrooms: number | null;
  has_garage: boolean | null;
  amenities: string[] | null;
  finalidade: string | null;
  service_type: string | null;
  provider_name: string | null;
  provider_contact: string | null;
  availability: string | null;
  rating: number | null;
  created_at: string;
  updated_at: string;
  sellerName?: string;
  sellerContact?: string;
}

// Add specific listing types that extend the base Listing type
export interface AutoListing extends Listing {
  brand: string;
  model: string;
  year: number;
  mileage: number;
  fuel: string;
  transmission: string;
  color: string;
}

export interface JobListing extends Listing {
  salary: number;
  company_name: string;
  company_contact: string;
  job_type: string;
  education: string;
  experience: string;
  benefits: string[];
}

export interface RealEstateListing extends Listing {
  property_type: string;
  size: number;
  bedrooms: number;
  bathrooms: number;
  has_garage: boolean;
  amenities: string[];
  finalidade: string;
}

export interface ServiceListing extends Listing {
  service_type: string;
  provider_name: string;
  provider_contact: string;
  availability: string;
  experience: string;
  rating: number;
}

export interface ItemListing extends Listing {
  // Item-specific properties can be added here if needed
}

export interface BusinessListing extends Listing {
  company_name: string;
  // Business-specific properties
}

export interface BarRestaurantListing extends Listing {
  // Bar/Restaurant-specific properties
}

export interface Profile {
  id: string;
  username: string | null;
  document_type: 'cpf' | 'cnpj' | null;
  document_number: string | null;
  full_name: string | null;
  email: string | null;
  phone: string | null;
  address: string | null;
  city: string | null;
  state: string | null;
  zip_code: string | null;
  role: 'user' | 'admin';
  created_at: string;
  approval_status?: 'pending' | 'approved' | 'rejected';
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
    severity: string;
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

export interface Ad {
  id: string;
  content: string;
  page_name: string;
  ad_type: 'banner_image' | 'google_adsense';
  link?: string;
  is_active: boolean;
  category_id?: string;
}

// Add FormErrors type
export interface FormErrors {
  [key: string]: string;
}
