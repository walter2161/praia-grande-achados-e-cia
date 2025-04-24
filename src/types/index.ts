
export type Profile = {
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
  approval_status: 'pending' | 'approved' | 'rejected' | null;
};

export type Listing = {
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
  // Add these fields to make mock data compatible with the type
  sellerName?: string;
  sellerContact?: string;
};

export type AutoListing = Listing & {
  brand: string;
  model: string;
  year: number;
  mileage: number;
  fuel: string;
  transmission: string;
  color: string;
  subcategory: string;
  sellerName?: string;
  sellerContact?: string;
};

export type JobListing = Listing & {
  company_name: string;
  company_contact: string;
  salary: number;
  job_type: string;
  education: string;
  experience: string;
  benefits: string[];
  subcategory: string;
  companyName?: string;
  companyContact?: string;
};

export type RealEstateListing = Listing & {
  property_type: string;
  size: number;
  bedrooms: number;
  bathrooms: number;
  has_garage: boolean;
  amenities: string[];
  finalidade: string;
  subcategory: string;
  sellerName?: string;
  sellerContact?: string;
};

export type ServiceListing = Listing & {
  service_type: string;
  provider_name: string;
  provider_contact: string;
  availability: string;
  experience: string;
  rating?: number;
  subcategory: string;
  price: number | string;
};

export type BarRestaurantListing = Listing & {
  address: string;
  latitude: number;
  longitude: number;
  sellerName: string;
  sellerContact: string;
  subcategory: string;
  price: number | string;
};

export type ItemListing = Listing & {
  sellerName: string;
  sellerContact: string;
  subcategory: string;
};

export type Category = {
  id: string;
  name: string;
  slug: string;
  icon: any;
  subcategories: string[];
  created_at: string;
};

export type SystemStatus = {
  database: {
    connection: boolean;
    tables_count: number;
    users_count: number;
    listings_count: number;
    query_time: number;
  };
  api: {
    status: 'online' | 'offline';
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
    title: string;
    message: string;
    severity: 'low' | 'medium' | 'high';
    location: string;
    timestamp: string;
  }>;
  logs: Array<{
    level: 'error' | 'warning' | 'info' | 'debug';
    message: string;
    timestamp: string;
    source: string;
  }>;
  integrations: Array<{
    name: string;
    description: string;
    status: 'online' | 'offline' | 'degraded';
    latency: number;
  }>;
};

export type FormErrors = {
  [key: string]: string;
};
