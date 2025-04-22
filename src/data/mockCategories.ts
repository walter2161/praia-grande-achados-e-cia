
import { Category } from "@/types";
import { Car, Briefcase, House, Settings, Utensils, Package } from "lucide-react";

export const categories: (Category & { subcategories?: string[] })[] = [
  {
    id: "1",
    name: "AUTOS",
    icon: Car,
    slug: "autos",
    subcategories: [
      "Carros",
      "Motos",
      "Caminhões",
      "Peças e Acessórios",
      "Náuticos"
    ]
  },
  {
    id: "2",
    name: "EMPREGOS",
    icon: Briefcase,
    slug: "empregos",
    subcategories: [
      "Administração",
      "Vendas",
      "Serviços Gerais",
      "Saúde",
      "Educação",
      "Tecnologia",
      "Outros"
    ]
  },
  {
    id: "3",
    name: "IMÓVEIS",
    icon: House,
    slug: "imoveis",
    subcategories: [
      "Casas",
      "Apartamentos",
      "Terrenos",
      "Comercial",
      "Cobertura",
      "Studio",
      "Outros"
    ]
  },
  {
    id: "4",
    name: "SERVIÇOS",
    icon: Settings,
    slug: "servicos",
    subcategories: [
      "Residenciais",
      "Educação",
      "Beleza",
      "Saúde",
      "Informática",
      "Eventos",
      "Automotivos",
      "Outros"
    ]
  },
  {
    id: "5",
    name: "BARES & RESTAURANTES",
    icon: Utensils,
    slug: "bares-restaurantes",
    subcategories: [
      "Bares",
      "Restaurantes",
      "Lanchonetes",
      "Cafeterias",
      "Pizzarias",
      "Outros"
    ]
  },
  {
    id: "6",
    name: "ITENS",
    icon: Package,
    slug: "itens",
    subcategories: [
      "Eletrodomésticos",
      "Eletrônicos",
      "Móveis",
      "Roupas",
      "Livros",
      "Esportes",
      "Outros"
    ]
  }
];
