
import { BusinessListing } from "@/types";

export const businessListings: BusinessListing[] = [
  {
    id: "business-1",
    title: "Restaurante Sabor do Mar",
    description: "Restaurante especializado em frutos do mar com vista para o oceano",
    price: 0,
    price_description: "Consulte cardápio",
    category: "empresas",
    subcategory: "Bares & Restaurantes",
    images: [
      "/lovable-uploads/8b19a879-d092-4f91-b356-9a3930d28679.png"
    ],
    location: "Praia Grande, SP",
    address: "Av. Presidente Costa e Silva, 1200",
    date: new Date(2025, 3, 15).toISOString(),
    business_type: "Restaurante",
    sellerName: "Carlos Silva",
    sellerContact: "(13) 99999-8888"
  },
  {
    id: "business-2",
    title: "Bar do Zeca",
    description: "Bar tradicional com petiscos e música ao vivo aos finais de semana",
    price: 0,
    price_description: "Consulte cardápio",
    category: "empresas",
    subcategory: "Bares & Restaurantes",
    images: [
      "/lovable-uploads/2151e1d2-70c1-4782-a130-b2ffd11fd0cc.png"
    ],
    location: "Praia Grande, SP",
    address: "Rua das Palmeiras, 450",
    date: new Date(2025, 3, 12).toISOString(),
    business_type: "Bar",
    sellerName: "José Oliveira",
    sellerContact: "(13) 99777-6666"
  },
  {
    id: "business-3",
    title: "Mercado São Pedro",
    description: "Supermercado com produtos frescos e preços acessíveis",
    price: 0,
    price_description: "Diversos preços",
    category: "empresas",
    subcategory: "Comércio Varejista",
    images: [
      "/lovable-uploads/845a4676-320a-4747-8f03-6ab8347d8498.png"
    ],
    location: "Praia Grande, SP",
    address: "Av. Presidente Kennedy, 2500",
    date: new Date(2025, 3, 10).toISOString(),
    business_type: "Supermercado",
    sellerName: "Pedro Mendes",
    sellerContact: "(13) 99555-4444"
  },
  {
    id: "business-4",
    title: "Clínica Saúde Total",
    description: "Clínica médica com diversas especialidades e exames",
    price: 0,
    price_description: "Consulte valores",
    category: "empresas",
    subcategory: "Saúde",
    images: [
      "/lovable-uploads/0e6f8666-69f8-472a-870d-080218866663.png"
    ],
    location: "Praia Grande, SP",
    address: "Rua dos Girassóis, 780",
    date: new Date(2025, 3, 8).toISOString(),
    business_type: "Clínica Médica",
    sellerName: "Ana Soares",
    sellerContact: "(13) 99333-2222"
  },
  {
    id: "business-5",
    title: "TechSoft Soluções",
    description: "Empresa de desenvolvimento de software e suporte em TI",
    price: 0,
    price_description: "Sob consulta",
    category: "empresas",
    subcategory: "Tecnologia",
    images: [
      "/lovable-uploads/5f7b8b03-3150-4e7b-a80f-1bda2a724c84.png"
    ],
    location: "Praia Grande, SP",
    address: "Av. Brasil, 1020",
    date: new Date(2025, 3, 5).toISOString(),
    business_type: "Empresa de Tecnologia",
    sellerName: "Rafael Costa",
    sellerContact: "(13) 99111-0000"
  }
];
