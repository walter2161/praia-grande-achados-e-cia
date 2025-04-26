
import type { Database } from './database';
import { Car, Briefcase, House, Settings, Utensils, Package } from "lucide-react";

export type Profile = Database['public']['Tables']['profiles']['Row'] & {
  approval_status?: 'pending' | 'approved' | 'rejected';
};

export type Listing = Database['public']['Tables']['listings']['Row'];

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
}

export interface JobListing extends Listing {
  sellerName?: string;
  sellerContact?: string;
}

export interface RealEstateListing extends Listing {
  sellerName?: string;
  sellerContact?: string;
}

export interface ServiceListing extends Listing {
  sellerName?: string;
  sellerContact?: string;
}

export interface BarRestaurantListing extends Listing {
  sellerName?: string;
  sellerContact?: string;
}

export interface ItemListing extends Listing {
  sellerName?: string;
  sellerContact?: string;
}

export interface BusinessListing extends Listing {
  business_type?: string;
  sellerName?: string;
  sellerContact?: string;
}
