import { LucideIcon } from "lucide-react";

export type Category = {
  id: string;
  name: string;
  icon: LucideIcon;
  slug: string;
  subcategories?: string[];
};

export type AutoListing = {
  id: string;
  title: string;
  price: number;
  description: string;
  images: string[];
  location: string;
  date: string;
  sellerName: string;
  sellerContact: string;
  category: "autos";
  brand: string;
  model: string;
  year: number;
  mileage: number;
  fuel: string;
  transmission: string;
  color: string;
  subcategory?: string;
};

export type JobListing = {
  id: string;
  title: string;
  salary: number | string;
  description: string;
  images: string[];
  location: string;
  date: string;
  companyName: string;
  companyContact: string;
  category: "empregos";
  jobType: string;
  education: string;
  experience: string;
  benefits: string[];
  subcategory?: string;
};

export type RealEstateSubSubcategory = "Usado" | "Novo" | "Lançamento";
export type RealEstateSubcategoryType = "Casa" | "Apartamento" | "Terreno";
export type RealEstateNegotiationType = "Venda" | "Locação" | "Troca";

// Updated RealEstateListing
export type RealEstateListing = {
  id: string;
  title: string;
  price: number;
  description: string;
  images: string[];
  location: string;
  date: string;
  sellerName: string;
  sellerContact: string;
  category: "imoveis";
  negotiationType: RealEstateNegotiationType;
  propertyType: RealEstateSubcategoryType;
  usageType: RealEstateSubSubcategory;
  size: number;
  bedrooms: number;
  bathrooms: number;
  hasGarage: boolean;
  amenities: string[];
  subcategory?: string;
};

export type ServiceListing = {
  id: string;
  title: string;
  price: number | string;
  description: string;
  images: string[];
  location: string;
  date: string;
  providerName: string;
  providerContact: string;
  category: "servicos";
  serviceType: string;
  availability: string;
  experience: string;
  rating?: number;
  subcategory?: string;
};

export type BarRestaurantListing = {
  id: string;
  title: string;
  price: string | number;
  description: string;
  images: string[];
  location: string;
  address: string; // NOVO: campo de endereço
  latitude: number; // NOVO: coordenada para o mapa
  longitude: number; // NOVO: coordenada para o mapa
  date: string;
  sellerName: string;
  sellerContact: string;
  category: "bares-restaurantes";
  subcategory: string;
};

export type ItemListing = {
  id: string;
  title: string;
  price: number | string;
  description: string;
  images: string[];
  location: string;
  date: string;
  sellerName: string;
  sellerContact: string;
  category: "itens";
  subcategory: string;
};

export type Listing = AutoListing | JobListing | RealEstateListing | ServiceListing | BarRestaurantListing | ItemListing;
