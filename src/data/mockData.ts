
import { Category } from "@/types";
import { Car, Briefcase, House, Settings, Utensils, Package } from "lucide-react";
import { autoListings } from "./autoListings";
import { jobListings } from "./jobListings";
import { realEstateListings } from "./realEstateListings";
import { serviceListings } from "./serviceListings";
import { baresRestaurantesListings } from "./baresRestaurantesListings";
import { itensListings } from "./itensListings";

export const categories: Category[] = [
  {
    id: "1",
    name: "AUTOS",
    icon: Car,
    slug: "autos",
    subcategories: ["Carros", "Motos", "Caminhões", "Barcos"]
  },
  {
    id: "2",
    name: "EMPREGOS",
    icon: Briefcase,
    slug: "empregos",
    subcategories: ["CLT", "PJ", "Temporário", "Estágio"]
  },
  {
    id: "3",
    name: "IMÓVEIS",
    icon: House,
    slug: "imoveis",
    subcategories: ["Apartamentos", "Casas", "Comercial", "Terrenos"]
  },
  {
    id: "4",
    name: "SERVIÇOS",
    icon: Settings,
    slug: "servicos",
    subcategories: ["Reformas", "Limpeza", "Educação", "Saúde"]
  },
  {
    id: "5",
    name: "BARES & RESTAURANTES",
    icon: Utensils,
    slug: "bares-restaurantes",
    subcategories: ["Bares", "Restaurantes", "Lanchonetes", "Delivery"]
  },
  {
    id: "6",
    name: "ITENS",
    icon: Package,
    slug: "itens",
    subcategories: ["Móveis", "Eletrônicos", "Roupas", "Outros"]
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
