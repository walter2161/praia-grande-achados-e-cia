
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
  icon: string;
  created_at?: string;
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
  brand?: string;
  model?: string;
  year?: number;
  mileage?: number;
  fuel?: string;
  transmission?: string;
  color?: string;
  salary?: number;
  company_name?: string;
  company_contact?: string;
  job_type?: string;
  education?: string;
  experience?: string;
  benefits?: string[];
  property_type?: string;
  size?: number;
  bedrooms?: number;
  bathrooms?: number;
  has_garage?: boolean;
  amenities?: string[];
  finalidade?: string;
  service_type?: string;
  provider_name?: string;
  provider_contact?: string;
  availability?: string;
  rating?: number;
  created_at: string;
  updated_at: string;
};
