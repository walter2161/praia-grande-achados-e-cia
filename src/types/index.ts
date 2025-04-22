
import { LucideIcon } from "lucide-react";

export type Category = {
  id: string;
  name: string;
  icon: LucideIcon;
  slug: string;
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
};

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
  propertyType: string;
  size: number;
  bedrooms: number;
  bathrooms: number;
  hasGarage: boolean;
  amenities: string[];
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
};

export type Listing = AutoListing | JobListing | RealEstateListing | ServiceListing;
