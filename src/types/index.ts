
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
  icon: LucideIcon;
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
  status: 'active' | 'inactive' | 'pending' | 'rejected';
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
};
