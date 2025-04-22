
import { Category } from "@/types";
import { Car, Briefcase, House, Settings, Utensils, Package } from "lucide-react";
import { autoListings } from "./autoListings";
import { jobListings } from "./jobListings";
import { realEstateListings } from "./realEstateListings";
import { serviceListings } from "./serviceListings";
import { baresRestaurantesListings } from "./baresRestaurantesListings";
import { itensListings } from "./itensListings";

export const categories: (Category & { subcategories?: string[] })[] = [
  {
    id: "1",
    name: "AUTOS",
    icon: Car,
    slug: "autos"
  },
  {
    id: "2",
    name: "EMPREGOS",
    icon: Briefcase,
    slug: "empregos"
  },
  {
    id: "3",
    name: "IMÓVEIS",
    icon: House,
    slug: "imoveis"
  },
  {
    id: "4",
    name: "SERVIÇOS",
    icon: Settings,
    slug: "servicos"
  },
  {
    id: "5",
    name: "BARES & RESTAURANTES",
    icon: Utensils,
    slug: "bares-restaurantes"
  },
  {
    id: "6",
    name: "ITENS",
    icon: Package,
    slug: "itens"
  }
];

export {
  autoListings,
  jobListings,
  realEstateListings,
  serviceListings,
  baresRestaurantesListings,
  itensListings
};

export const allListings = [
  ...autoListings,
  ...jobListings,
  ...realEstateListings,
  ...serviceListings,
  ...baresRestaurantesListings,
  ...itensListings
];
