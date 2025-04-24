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
    subcategories: [
      "Domésticos",
      "Reparação e Manutenção",
      "Transporte e Logística",
      "Saúde e Bem-Estar",
      "Educacionais",
      "Financeiros",
      "Jurídicos",
      "Tecnologia e TI",
      "Beleza e Estética",
      "Alimentação",
      "Eventos",
      "Segurança",
      "Consultoria Empresarial",
      "Turismo e Hospedagem",
      "Veterinários e Pet Care",
      "Comunicação",
      "Limpeza Pública e Ambiental",
      "Artísticos e Culturais",
      "Automóveis",
      "Assinatura e Streaming",
      "Imobiliários",
      "Publicidade e Marketing",
      "Recursos Humanos",
      "Contábeis",
      "Telecomunicações",
      "Design e Ilustração",
      "Engenharia e Arquitetura",
      "Fotografia e Vídeo",
      "Tradução e Interpretação",
      "Cuidados Pessoais",
      "Lavanderia",
      "Funerários",
      "Agricultura e Pecuária",
      "Entretenimento",
      "Auditoria",
      "Gestão de Resíduos",
      "Aluguel de Equipamentos",
      "Seguros",
      "Desenvolvimento Web e Apps",
      "Coaching e Mentoria",
      "Moda e Costura",
      "Impressão e Gráfica",
      "Cobrança e Recuperação de Crédito",
      "Medicina e Diagnóstico",
      "Psicológicos",
      "Assistência Social",
      "Energia e Sustentabilidade",
      "Ópticos",
      "Organização de Eventos",
      "Paisagismo"
    ]
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
