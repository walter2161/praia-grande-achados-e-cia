
import { 
  AutoListing, 
  JobListing, 
  RealEstateListing, 
  ServiceListing, 
  Category,
  BarRestaurantListing,
  ItemListing,
  Listing
} from "@/types";
import { Car, Briefcase, House, Settings, Utensils, Package } from "lucide-react";

export { categories } from "./mockCategories";
export { autoListings } from "./mockAutoListings";
export { jobListings } from "./mockData/jobListings";
export { realEstateListings } from "./mockData/realEstateListings";
export { serviceListings } from "./mockData/serviceListings";
export { baresRestaurantesListings } from "./mockData/baresRestaurantesListings";
export { itensListings } from "./mockData/itensListings";

// Create and export the allListings array combining all listing types
export const allListings: Listing[] = [
  ...autoListings,
  ...jobListings,
  ...realEstateListings,
  ...serviceListings,
  ...baresRestaurantesListings,
  ...itensListings
];

