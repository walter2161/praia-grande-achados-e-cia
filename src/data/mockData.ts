
import { Category } from "@/types";
import { Car, Briefcase, House, Settings, Package } from "lucide-react";
import { autoListings } from "./autoListings";
import { jobListings } from "./jobListings";
import { realEstateListings } from "./realEstateListings";
import { serviceListings } from "./serviceListings";
import { baresRestaurantesListings } from "./baresRestaurantesListings";
import { itensListings } from "./itensListings";
import businessListings from "./businessListings";

export const categories: Category[] = [
  {
    id: "1",
    name: "AUTOS",
    icon: Car,
    slug: "autos",
    subcategories: ["Carros", "Motos", "Caminhões", "Barcos"],
    created_at: new Date().toISOString()
  },
  {
    id: "2",
    name: "EMPREGOS",
    icon: Briefcase,
    slug: "empregos",
    subcategories: ["CLT", "PJ", "Temporário", "Estágio"],
    created_at: new Date().toISOString()
  },
  {
    id: "3",
    name: "IMÓVEIS",
    icon: House,
    slug: "imoveis",
    subcategories: ["Apartamentos", "Casas", "Comercial", "Terrenos"],
    created_at: new Date().toISOString()
  },
  {
    id: "4",
    name: "EMPRESAS",
    icon: Settings,
    slug: "empresas",
    subcategories: [
      "Comércio Varejista",      // Lojas, mercados, etc
      "Comércio Atacadista",     // Distribuidoras, etc
      "Indústria",               // Fábricas, montadoras, etc
      "Tecnologia",              // Software, hardware, etc
      "Consultoria",             // Empresarial, financeira, etc
      "Bares & Restaurantes",    // Bares, restaurantes, lanchonetes, delivery
      "Saúde",                   // Clínicas, hospitais, etc
      "Educação",                // Escolas, cursos, etc
      "Construção Civil",        // Construtoras, empreiteiras, etc
      "Logística e Transporte",  // Transportadoras, etc
      "Turismo e Hotelaria",     // Hotéis, agências de viagem, etc
      "Agronegócio",            // Agricultura, pecuária, etc
      "Serviços Financeiros"     // Bancos, seguradoras, etc
    ],
    created_at: new Date().toISOString()
  },
  {
    id: "5",
    name: "SERVIÇOS",
    icon: Settings,
    slug: "servicos",
    subcategories: ["Domésticos", "Profissionais", "Técnicos", "Especializados"],
    created_at: new Date().toISOString()
  },
  {
    id: "7",
    name: "ITENS",
    icon: Package,
    slug: "itens",
    subcategories: ["Móveis", "Eletrônicos", "Roupas", "Outros"],
    created_at: new Date().toISOString()
  }
];

export {
  autoListings,
  jobListings,
  realEstateListings,
  serviceListings,
  baresRestaurantesListings,
  itensListings,
};

export { businessListings };

export const allListings = [
  ...autoListings,
  ...jobListings,
  ...realEstateListings,
  ...serviceListings,
  ...baresRestaurantesListings,
  ...itensListings,
  ...businessListings
];
