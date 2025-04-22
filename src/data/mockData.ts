
import { Home, Car, Briefcase, Phone, Utensils, ShoppingBag } from "lucide-react";

// Restructured real estate subcategories hierarchy for imóveis
export const categories = [
  {
    id: "1",
    name: "Autos e Peças",
    icon: Car,
    slug: "autos",
    subcategories: [
      "Carros",
      "Motos",
      "Peças e Acessórios",
      "Caminhões",
      "Náutica",
      "Outros",
    ],
  },
  {
    id: "2",
    name: "Imóveis",
    icon: Home,
    slug: "imoveis",
    // 1-level deep; menu logic in UI will interpret this hierarchy
    subcategories: [
      "Venda",
      "Locação",
      "Troca",
      // The UI should nest the next types and conditions under these when rendering
    ],
    hierarchy: [
      {
        label: "Venda",
        children: [
          {
            label: "Casa",
            children: ["Usado", "Novo", "Lançamento"],
          },
          {
            label: "Apartamento",
            children: ["Usado", "Novo", "Lançamento"],
          },
          {
            label: "Terreno",
            children: ["Usado", "Novo", "Lançamento"],
          },
        ],
      },
      {
        label: "Locação",
        children: [
          {
            label: "Casa",
            children: ["Usado", "Novo", "Lançamento"],
          },
          {
            label: "Apartamento",
            children: ["Usado", "Novo", "Lançamento"],
          },
          {
            label: "Terreno",
            children: ["Usado", "Novo", "Lançamento"],
          },
        ],
      },
      {
        label: "Troca",
        children: [
          {
            label: "Casa",
            children: ["Usado", "Novo", "Lançamento"],
          },
          {
            label: "Apartamento",
            children: ["Usado", "Novo", "Lançamento"],
          },
          {
            label: "Terreno",
            children: ["Usado", "Novo", "Lançamento"],
          },
        ],
      },
    ],
  },
  {
    id: "3",
    name: "Empregos",
    icon: Briefcase,
    slug: "empregos",
    subcategories: [
      "Vagas",
      "Currículos",
      "Consultoria",
      "Recursos Humanos",
      "Estágio",
      "Trainee",
    ],
  },
  {
    id: "4",
    name: "Serviços",
    icon: Phone,
    slug: "servicos",
    subcategories: [
      "Assistência Técnica",
      "Aulas e Cursos",
      "Eventos",
      "Festas",
      "Informática",
      "Saúde e Beleza",
      "Outros",
    ],
  },
  {
    id: "5",
    name: "Bares e Restaurantes",
    icon: Utensils,
    slug: "bares-restaurantes",
    subcategories: [
      "Bares",
      "Restaurantes",
      "Lanchonetes",
      "Food Trucks",
      "Cafeterias",
      "Outros",
    ],
  },
  {
    id: "6",
    name: "Itens",
    icon: ShoppingBag,
    slug: "itens",
    subcategories: [
      "Eletrônicos",
      "Móveis",
      "Roupas",
      "Calçados",
      "Acessórios",
      "Outros",
    ],
  },
];

export const autoListingsData = [
  {
    id: "1",
    title: "Vendo Honda Civic 2020",
    price: 85000,
    description: "Carro em ótimo estado, único dono, todas as revisões feitas.",
    images: [
      "https://source.unsplash.com/random/300x200?car",
      "https://source.unsplash.com/random/300x200?car",
    ],
    location: "Praia Grande, SP",
    date: "2023-10-05",
    sellerName: "João Silva",
    sellerContact: "(13) 99999-9999",
    category: "autos",
    brand: "Honda",
    model: "Civic",
    year: 2020,
    mileage: 50000,
    fuel: "Flex",
    transmission: "Automático",
    color: "Prata",
    subcategory: "Carros",
  },
  {
    id: "2",
    title: "Yamaha XJ6 2018 - Impecável",
    price: 35000,
    description:
      "Moto muito bem conservada, baixa quilometragem, documentação OK.",
    images: [
      "https://source.unsplash.com/random/300x200?motorcycle",
      "https://source.unsplash.com/random/300x200?motorcycle",
    ],
    location: "Santos, SP",
    date: "2023-10-04",
    sellerName: "Maria Souza",
    sellerContact: "(13) 88888-8888",
    category: "autos",
    brand: "Yamaha",
    model: "XJ6",
    year: 2018,
    mileage: 20000,
    fuel: "Gasolina",
    transmission: "Manual",
    color: "Preta",
    subcategory: "Motos",
  },
];

export const jobListingsData = [
  {
    id: "3",
    title: "Vaga para Desenvolvedor Full Stack",
    salary: 5000,
    description:
      "Empresa contrata desenvolvedor full stack com experiência em React e Node.js.",
    images: [
      "https://source.unsplash.com/random/300x200?office",
      "https://source.unsplash.com/random/300x200?office",
    ],
    location: "São Paulo, SP",
    date: "2023-10-03",
    companyName: "Empresa XPTO",
    companyContact: "(11) 77777-7777",
    category: "empregos",
    jobType: "CLT",
    education: "Superior Completo",
    experience: "3 anos",
    benefits: ["Vale Transporte", "Vale Refeição", "Plano de Saúde"],
    subcategory: "Vagas",
  },
  {
    id: "4",
    title: "Procurando Designer Gráfico",
    salary: "A combinar",
    description:
      "Agência de marketing procura designer gráfico criativo para projetos diversos.",
    images: [
      "https://source.unsplash.com/random/300x200?design",
      "https://source.unsplash.com/random/300x200?design",
    ],
    location: "Praia Grande, SP",
    date: "2023-10-02",
    companyName: "Agência Criativa",
    companyContact: "(13) 66666-6666",
    category: "empregos",
    jobType: "Freelancer",
    education: "Técnico",
    experience: "1 ano",
    benefits: [],
    subcategory: "Freelancer",
  },
];

export const realEstateListingsData = [
  {
    id: "5",
    title: "Apartamento à Venda na Praia Grande",
    price: 350000,
    description:
      "Lindo apartamento com 2 dormitórios, vista para o mar, lazer completo.",
    images: [
      "https://source.unsplash.com/random/300x200?apartment",
      "https://source.unsplash.com/random/300x200?apartment",
    ],
    location: "Praia Grande, SP",
    date: "2023-10-01",
    sellerName: "Imobiliária Sol",
    sellerContact: "(13) 55555-5555",
    category: "imoveis",
    negotiationType: "Venda",
    propertyType: "Apartamento",
    usageType: "Usado",
    size: 70,
    bedrooms: 2,
    bathrooms: 1,
    hasGarage: true,
    amenities: ["Piscina", "Salão de Festas", "Portaria 24h"],
    subcategory: "Apartamentos",
  },
  {
    id: "6",
    title: "Casa para Alugar em Condomínio Fechado",
    price: 2000,
    description:
      "Casa com 3 dormitórios, churrasqueira, piscina, segurança 24 horas.",
    images: [
      "https://source.unsplash.com/random/300x200?house",
      "https://source.unsplash.com/random/300x200?house",
    ],
    location: "Guarujá, SP",
    date: "2023-09-30",
    sellerName: "Corretor Silva",
    sellerContact: "(13) 44444-4444",
    category: "imoveis",
    negotiationType: "Locação",
    propertyType: "Casa",
    usageType: "Usado",
    size: 120,
    bedrooms: 3,
    bathrooms: 2,
    hasGarage: true,
    amenities: ["Churrasqueira", "Piscina", "Segurança 24h"],
    subcategory: "Casas",
  },
];

export const serviceListingsData = [
  {
    id: "7",
    title: "Aula Particular de Inglês",
    price: 50,
    description:
      "Professor particular de inglês com experiência no exterior, aulas personalizadas.",
    images: [
      "https://source.unsplash.com/random/300x200?teacher",
      "https://source.unsplash.com/random/300x200?teacher",
    ],
    location: "Santos, SP",
    date: "2023-09-29",
    providerName: "John Doe",
    providerContact: "(13) 33333-3333",
    category: "servicos",
    serviceType: "Aulas Particulares",
    availability: "Segunda a Sexta, Manhã e Tarde",
    experience: "5 anos",
    subcategory: "Aulas e Cursos",
  },
  {
    id: "8",
    title: "Manutenção de Ar Condicionado",
    price: 100,
    description:
      "Técnico especializado em manutenção e instalação de ar condicionado, atendimento rápido.",
    images: [
      "https://source.unsplash.com/random/300x200?air conditioning",
      "https://source.unsplash.com/random/300x200?air conditioning",
    ],
    location: "Praia Grande, SP",
    date: "2023-09-28",
    providerName: "José Silva",
    providerContact: "(13) 22222-2222",
    category: "servicos",
    serviceType: "Manutenção",
    availability: "Segunda a Sábado, Horário Comercial",
    experience: "10 anos",
    subcategory: "Assistência Técnica",
  },
];

export const barRestaurantListingsData = [
  {
    id: "9",
    title: "Rodízio de Pizza no Centro",
    price: 35,
    description:
      "Melhor rodízio de pizza da cidade, grande variedade de sabores, ambiente agradável.",
    images: [
      "https://source.unsplash.com/random/300x200?pizza",
      "https://source.unsplash.com/random/300x200?pizza",
    ],
    location: "Praia Grande, SP",
    address: "Av. Pres. Kennedy, 123",
    latitude: -24.005326,
    longitude: -46.419445,
    date: "2023-09-27",
    sellerName: "Pizzaria Boa Pizza",
    sellerContact: "(13) 11111-1111",
    category: "bares-restaurantes",
    subcategory: "Restaurantes",
  },
  {
    id: "10",
    title: "Happy Hour com Cerveja Gelada",
    price: "A partir de R$10",
    description:
      "Happy hour com cerveja gelada e petiscos deliciosos, música ao vivo.",
    images: [
      "https://source.unsplash.com/random/300x200?beer",
      "https://source.unsplash.com/random/300x200?beer",
    ],
    location: "Santos, SP",
    address: "Rua XV de Novembro, 456",
    latitude: -23.934555,
    longitude: -46.331433,
    date: "2023-09-26",
    sellerName: "Bar do Zé",
    sellerContact: "(13) 00000-0000",
    category: "bares-restaurantes",
    subcategory: "Bares",
  },
];

export const itemListingsData = [
  {
    id: "11",
    title: "Vendo iPhone 12 Pro Max",
    price: 5000,
    description: "iPhone 12 Pro Max 256GB, seminovo, em perfeito estado.",
    images: [
      "https://source.unsplash.com/random/300x200?iphone",
      "https://source.unsplash.com/random/300x200?iphone",
    ],
    location: "São Vicente, SP",
    date: "2023-09-25",
    sellerName: "Carlos Alberto",
    sellerContact: "(13) 98888-8888",
    category: "itens",
    subcategory: "Eletrônicos",
  },
  {
    id: "12",
    title: "Sofá Retrátil 3 Lugares",
    price: 800,
    description: "Sofá retrátil 3 lugares, novo, direto da fábrica.",
    images: [
      "https://source.unsplash.com/random/300x200?sofa",
      "https://source.unsplash.com/random/300x200?sofa",
    ],
    location: "Praia Grande, SP",
    date: "2023-09-24",
    sellerName: "Móveis Modernos",
    sellerContact: "(13) 97777-7777",
    category: "itens",
    subcategory: "Móveis",
  },
];

export const listings = [...autoListingsData, ...jobListingsData, ...realEstateListingsData, ...serviceListingsData, ...barRestaurantListingsData, ...itemListingsData];

// Export individual array variables to fix import issues
export const autoListings = autoListingsData;
export const jobListings = jobListingsData;
export const realEstateListings = realEstateListingsData;
export const serviceListings = serviceListingsData;
export const barRestaurantListings = barRestaurantListingsData;
export const itemListings = itemListingsData;
