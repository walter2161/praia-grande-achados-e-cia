
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
  user_id: string | null;
  title: string;
  description: string | null;
  price: number | null;
  price_description: string | null;
  images: string[];
  location: string | null;
  address: string | null;
  latitude: number | null;
  longitude: number | null;
  date: string | null;
  category: string;
  subcategory: string | null;
  status: 'active' | 'inactive' | 'pending' | 'rejected' | string;
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
  created_at: string;
  updated_at: string;
  // Compatibility with mock data
  sellerName?: string;
  sellerContact?: string;
  providerContact?: string;
  providerName?: string;
  companyName?: string;
  companyContact?: string;
};

// Specialized listing types for mock data
export type AutoListing = Listing & {
  brand: string;
  model: string;
  year: number;
  mileage: number;
  fuel: string;
  transmission: string;
  color: string;
  sellerName: string;
  sellerContact: string;
};

export type JobListing = Listing & {
  salary: number;
  companyName: string;
  companyContact: string;
  jobType: string;
  education: string;
  experience: string;
  benefits: string[];
};

export type RealEstateListing = Listing & {
  propertyType: string;
  size: number;
  bedrooms: number;
  bathrooms: number;
  hasGarage: boolean;
  amenities: string[];
  sellerName: string;
  sellerContact: string;
  finalidade: string;
};

export type ServiceListing = Listing & {
  serviceType: string;
  providerName: string;
  providerContact: string;
  availability: string;
  experience: string;
  rating?: number;
};

export type BarRestaurantListing = Listing & {
  sellerName: string;
  sellerContact: string;
  address: string;
  latitude: number;
  longitude: number;
};

export type ItemListing = Listing & {
  sellerName: string;
  sellerContact: string;
};
