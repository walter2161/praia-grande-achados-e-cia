
import { ServiceListing } from "@/types";

export const serviceListings: ServiceListing[] = [
  {
    id: "service1",
    user_id: "mock-user-id",
    title: "Eletricista residencial e comercial",
    price: "A partir de R$ 100" as any,
    price_description: "A partir de R$ 100",
    description: "Serviços de instalação e manutenção elétrica para residências e comércios. Atendimento rápido e preços justos.",
    images: ["/placeholder.svg"],
    location: "Praia Grande e região",
    address: null,
    latitude: null,
    longitude: null,
    date: "2023-04-21",
    category: "servicos",
    service_type: "Serviços Residenciais",
    availability: "Segunda a Sábado, 8h às 18h",
    experience: "15 anos",
    rating: 4.8,
    subcategory: "Eletricista",
    status: "active",
    created_at: "2023-04-21",
    updated_at: "2023-04-21",
    provider_name: "Roberto Eletricista",
    provider_contact: "(13) 99999-8888",
    // Add null for required fields from Listing type
    brand: null,
    model: null,
    year: null,
    mileage: null,
    fuel: null,
    transmission: null,
    color: null,
    salary: null,
    company_name: null,
    company_contact: null,
    job_type: null,
    education: null,
    benefits: null,
    property_type: null,
    size: null,
    bedrooms: null,
    bathrooms: null,
    has_garage: null,
    amenities: null,
    finalidade: null,
  },
  {
    id: "service2",
    user_id: "mock-user-id",
    title: "Manutenção de Ar Condicionado",
    price: "Sob consulta" as any,
    price_description: "Sob consulta",
    description: "Limpeza, instalação e manutenção de ar condicionados split e janela.",
    images: ["/placeholder.svg"],
    location: "Boqueirão, Praia Grande",
    address: null,
    latitude: null,
    longitude: null,
    date: "2023-04-20",
    category: "servicos",
    service_type: "Ar Condicionado",
    availability: "Todos os dias",
    experience: "10 anos",
    rating: 4.9,
    subcategory: "Climatização",
    status: "active",
    created_at: "2023-04-20",
    updated_at: "2023-04-20",
    provider_name: "ClimaTop",
    provider_contact: "(13) 90008-1212",
    // Add null for required fields from Listing type
    brand: null,
    model: null,
    year: null,
    mileage: null,
    fuel: null,
    transmission: null,
    color: null,
    salary: null,
    company_name: null,
    company_contact: null,
    job_type: null,
    education: null,
    benefits: null,
    property_type: null,
    size: null,
    bedrooms: null,
    bathrooms: null,
    has_garage: null,
    amenities: null,
    finalidade: null,
  },
  {
    id: "service3",
    user_id: "mock-user-id",
    title: "Montagem de Móveis",
    price: "A partir de R$ 60" as any,
    price_description: "A partir de R$ 60",
    description: "Montagem e desmontagem de móveis residenciais e comerciais.",
    images: ["/placeholder.svg"],
    location: "Canto do Forte, Praia Grande",
    address: null,
    latitude: null,
    longitude: null,
    date: "2023-04-19",
    category: "servicos",
    service_type: "Montagem",
    availability: "A combinar",
    experience: "6 anos",
    rating: 4.5, // Adding missing rating
    subcategory: "Montagem de Móveis",
    status: "active",
    created_at: "2023-04-19",
    updated_at: "2023-04-19",
    provider_name: "Montador PG",
    provider_contact: "(13) 99192-2311",
    // Add null for required fields from Listing type
    brand: null,
    model: null,
    year: null,
    mileage: null,
    fuel: null,
    transmission: null,
    color: null,
    salary: null,
    company_name: null,
    company_contact: null,
    job_type: null,
    education: null,
    benefits: null,
    property_type: null,
    size: null,
    bedrooms: null,
    bathrooms: null,
    has_garage: null,
    amenities: null,
    finalidade: null,
  },
  {
    id: "service4",
    user_id: "mock-user-id",
    title: "Serviço de Jardinagem",
    price: "A partir de R$ 80" as any,
    price_description: "A partir de R$ 80",
    description: "Corte de grama, poda e paisagismo para residências, condomínios e empresas.",
    images: ["/placeholder.svg"],
    location: "Caiçara, Praia Grande",
    address: null,
    latitude: null,
    longitude: null,
    date: "2023-04-18",
    category: "servicos",
    service_type: "Jardinagem",
    availability: "Segunda a Sexta",
    experience: "9 anos",
    rating: 4.7, // Adding missing rating
    subcategory: "Jardinagem",
    status: "active",
    created_at: "2023-04-18",
    updated_at: "2023-04-18",
    provider_name: "Verdejar",
    provider_contact: "(13) 94561-0012",
    // Add null for required fields from Listing type
    brand: null,
    model: null,
    year: null,
    mileage: null,
    fuel: null,
    transmission: null,
    color: null,
    salary: null,
    company_name: null,
    company_contact: null,
    job_type: null,
    education: null,
    benefits: null,
    property_type: null,
    size: null,
    bedrooms: null,
    bathrooms: null,
    has_garage: null,
    amenities: null,
    finalidade: null,
  },
  {
    id: "service5",
    user_id: "mock-user-id",
    title: "Aulas de Inglês para Crianças",
    price: "R$ 50/hora" as any,
    price_description: "R$ 50/hora",
    description: "Professora particular com experiência. Material didático incluso.",
    images: ["/placeholder.svg"],
    location: "Guilhermina, Praia Grande",
    address: null,
    latitude: null,
    longitude: null,
    date: "2023-04-22",
    category: "servicos",
    service_type: "Aulas Particulares",
    availability: "Tarde/noite",
    experience: "12 anos",
    rating: 5.0, // Adding missing rating
    subcategory: "Educação e Idiomas",
    status: "active",
    created_at: "2023-04-22",
    updated_at: "2023-04-22",
    provider_name: "Prof. Carol",
    provider_contact: "(13) 90907-4564",
    // Add null for required fields from Listing type
    brand: null,
    model: null,
    year: null,
    mileage: null,
    fuel: null,
    transmission: null,
    color: null,
    salary: null,
    company_name: null,
    company_contact: null,
    job_type: null,
    education: null,
    benefits: null,
    property_type: null,
    size: null,
    bedrooms: null,
    bathrooms: null,
    has_garage: null,
    amenities: null,
    finalidade: null,
  },
  {
    id: "service6",
    user_id: "mock-user-id",
    title: "Serviços de Pintura Residencial",
    price: "Orçamento grátis" as any,
    price_description: "Orçamento grátis",
    description: "Pintor profissional, ambiente limpo e trabalho garantido.",
    images: ["/placeholder.svg"],
    location: "Ocian, Praia Grande",
    address: null,
    latitude: null,
    longitude: null,
    date: "2023-04-23",
    category: "servicos",
    service_type: "Pintura",
    availability: "Segunda a sábado",
    experience: "17 anos",
    rating: 4.6, // Adding missing rating
    subcategory: "Reformas e Pintura",
    status: "active",
    created_at: "2023-04-23",
    updated_at: "2023-04-23",
    provider_name: "Francisco Pinturas",
    provider_contact: "(13) 98987-1212",
    // Add null for required fields from Listing type
    brand: null,
    model: null,
    year: null,
    mileage: null,
    fuel: null,
    transmission: null,
    color: null,
    salary: null,
    company_name: null,
    company_contact: null,
    job_type: null,
    education: null,
    benefits: null,
    property_type: null,
    size: null,
    bedrooms: null,
    bathrooms: null,
    has_garage: null,
    amenities: null,
    finalidade: null,
  },
];
