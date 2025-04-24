import { LucideIcon } from "lucide-react";

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
  approval_status: 'pending' | 'approved' | 'rejected';
};

export type Category = {
  id: string;
  name: string;
  slug: string;
  icon: LucideIcon | string;
  subcategories?: string[];
  created_at?: string;
};

export type Listing = {
  id: string;
  user_id?: string | null;
  title: string;
  description: string | null;
  price?: number | string | null; // Changed to support both number and string
  price_description?: string | null;
  images: string[];
  location: string | null;
  address?: string | null;
  latitude?: number | null;
  longitude?: number | null;
  date: string;
  category: string;
  subcategory?: string | null;
  status?: 'active' | 'inactive' | 'pending' | 'rejected' | string;
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
  created_at?: string;
  updated_at?: string;
  // Compatibility with mock data
  sellerName?: string;
  sellerContact?: string;
  providerContact?: string;
  providerName?: string;
  companyName?: string;
  companyContact?: string;
  jobType?: string;
  propertyType?: string;
  hasGarage?: boolean;
};

// Define interfaces for mock data compatibility
export interface MockListing extends Partial<Listing> {
  id: string;
  title: string;
  images: string[];
  date: string;
  category: string;
  price?: number | string; // Changed to support both number and string
}

// Specialized listing types for mock data
export interface AutoListing extends MockListing {
  price: number;
  description: string;
  location: string;
  sellerName: string;
  sellerContact: string;
  brand: string;
  model: string;
  year: number;
  mileage: number;
  fuel: string;
  transmission: string;
  color: string;
}

export interface JobListing extends MockListing {
  salary: number;
  description: string;
  location: string;
  companyName: string;
  companyContact: string;
  jobType: string;
  education: string;
  experience: string;
  benefits: string[];
}

export interface RealEstateListing extends MockListing {
  price: number;
  description: string;
  location: string;
  sellerName: string;
  sellerContact: string;
  propertyType: string;
  size: number;
  bedrooms: number;
  bathrooms: number;
  hasGarage: boolean;
  amenities: string[];
  finalidade: string;
}

export interface ServiceListing extends MockListing {
  price: string | number; // Allow both string and number
  description: string;
  location: string;
  providerName: string;
  providerContact: string;
  serviceType: string;
  availability: string;
  experience: string;
  rating?: number;
}

export interface BarRestaurantListing extends MockListing {
  price: string | number; // Allow both string and number
  description: string;
  location: string;
  address: string;
  latitude: number;
  longitude: number;
  sellerName: string;
  sellerContact: string;
}

export interface ItemListing extends MockListing {
  price: number;
  description: string;
  location: string;
  sellerName: string;
  sellerContact: string;
}

export type FormErrors = {
  title?: string;
  price?: string;
  description?: string;
  location?: string;
  contact?: string;
};
