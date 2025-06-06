
import { BusinessListing } from '@/types';

// Create a base type for our business listings with required properties
const businessListings: BusinessListing[] = [
  {
    id: '1',
    title: 'Restaurante Sabor & Arte',
    description: 'Restaurante especializado em culinária contemporânea',
    category: 'empresas',
    subcategory: 'Restaurante',
    price: 150,
    price_description: 'Preço médio por pessoa',
    images: ['/lovable-uploads/business-1.jpg'],
    location: 'Praia Grande',
    address: 'Av. Presidente Kennedy, 500',
    latitude: -23.8058,
    longitude: -46.4081,
    user_id: 'user-123',
    business_type: 'Gastronomia',
    sellerName: 'Maria Silva',
    sellerContact: '(13) 99999-8888',
    status: 'active',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    date: new Date().toISOString(),
    brand: 'Gastronomia',
    // Add null values for required properties from Listing type
    model: null,
    year: null,
    mileage: null,
    fuel: null,
    color: null,
    transmission: null,
    bedrooms: null,
    bathrooms: null,
    size: null,
    property_type: null,
    amenities: null,
    has_garage: null,
    finalidade: null,
    service_type: null,
    provider_name: null,
    provider_contact: null,
    company_name: null,
    company_contact: null,
    job_type: null,
    education: null,
    experience: null,
    benefits: null,
    availability: null,
    salary: null,
    rating: null
  },
  {
    id: '2',
    title: 'Oficina Mecânica PG',
    description: 'Serviços de manutenção e reparo automotivo',
    category: 'empresas',
    subcategory: 'Automotivo',
    price: 200,
    price_description: 'Preço médio por serviço',
    images: ['/lovable-uploads/business-2.jpg'],
    location: 'Praia Grande',
    address: 'Rua X, 321',
    latitude: -23.9876,
    longitude: -46.5432,
    user_id: 'user-456',
    business_type: 'Automotivo',
    sellerName: 'João Souza',
    sellerContact: '(13) 98888-7777',
    status: 'active',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    date: new Date().toISOString(),
    brand: 'Automotivo',
    // Add null values for required properties
    model: null,
    year: null,
    mileage: null,
    fuel: null,
    color: null,
    transmission: null,
    bedrooms: null,
    bathrooms: null,
    size: null,
    property_type: null,
    amenities: null,
    has_garage: null,
    finalidade: null,
    service_type: null,
    provider_name: null,
    provider_contact: null,
    company_name: null,
    company_contact: null,
    job_type: null,
    education: null,
    experience: null,
    benefits: null,
    availability: null,
    salary: null,
    rating: null
  },
  {
    id: '3',
    title: 'Imobiliária Sol & Mar',
    description: 'Compra, venda e aluguel de imóveis',
    category: 'empresas',
    subcategory: 'Imobiliária',
    price: 0,
    price_description: 'Sob consulta',
    images: ['/lovable-uploads/business-3.jpg'],
    location: 'Praia Grande',
    address: 'Av. Y, 654',
    latitude: -24.1234,
    longitude: -46.6789,
    user_id: 'user-789',
    business_type: 'Imobiliária',
    sellerName: 'Ana Paula',
    sellerContact: '(13) 97777-6666',
    status: 'active',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    date: new Date().toISOString(),
    brand: 'Imobiliária',
    // Add null values for required properties
    model: null,
    year: null,
    mileage: null,
    fuel: null,
    color: null,
    transmission: null,
    bedrooms: null,
    bathrooms: null,
    size: null,
    property_type: null,
    amenities: null,
    has_garage: null,
    finalidade: null,
    service_type: null,
    provider_name: null,
    provider_contact: null,
    company_name: null,
    company_contact: null,
    job_type: null,
    education: null,
    experience: null,
    benefits: null,
    availability: null,
    salary: null,
    rating: null
  },
  {
    id: '4',
    title: 'Pet Shop Amigo Fiel',
    description: 'Produtos e serviços para animais de estimação',
    category: 'empresas',
    subcategory: 'Pet Shop',
    price: 50,
    price_description: 'Preço médio por produto',
    images: ['/lovable-uploads/business-4.jpg'],
    location: 'Praia Grande',
    address: 'Rua Z, 987',
    latitude: -23.7654,
    longitude: -46.3210,
    user_id: 'user-012',
    business_type: 'Pet Shop',
    sellerName: 'Carlos Alberto',
    sellerContact: '(13) 96666-5555',
    status: 'active',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    date: new Date().toISOString(),
    brand: 'Pet Shop',
    // Add null values for required properties
    model: null,
    year: null,
    mileage: null,
    fuel: null,
    color: null,
    transmission: null,
    bedrooms: null,
    bathrooms: null,
    size: null,
    property_type: null,
    amenities: null,
    has_garage: null,
    finalidade: null,
    service_type: null,
    provider_name: null,
    provider_contact: null,
    company_name: null,
    company_contact: null,
    job_type: null,
    education: null,
    experience: null,
    benefits: null,
    availability: null,
    salary: null,
    rating: null
  },
  {
    id: '5',
    title: 'Loja de Roupas Estilo Praia',
    description: 'Moda praia e acessórios',
    category: 'empresas',
    subcategory: 'Loja de Roupas',
    price: 80,
    price_description: 'Preço médio por peça',
    images: ['/lovable-uploads/business-5.jpg'],
    location: 'Praia Grande',
    address: 'Av. W, 123',
    latitude: -24.2345,
    longitude: -46.7890,
    user_id: 'user-345',
    business_type: 'Moda',
    sellerName: 'Fernanda Costa',
    sellerContact: '(13) 95555-4444',
    status: 'active',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    date: new Date().toISOString(),
    brand: 'Moda',
    // Add null values for required properties
    model: null,
    year: null,
    mileage: null,
    fuel: null,
    color: null,
    transmission: null,
    bedrooms: null,
    bathrooms: null,
    size: null,
    property_type: null,
    amenities: null,
    has_garage: null,
    finalidade: null,
    service_type: null,
    provider_name: null,
    provider_contact: null,
    company_name: null,
    company_contact: null,
    job_type: null,
    education: null,
    experience: null,
    benefits: null,
    availability: null,
    salary: null,
    rating: null
  },
  {
    id: '6',
    title: 'Salão de Beleza Bela Vista',
    description: 'Serviços de beleza e estética',
    category: 'empresas',
    subcategory: 'Salão de Beleza',
    price: 100,
    price_description: 'Preço médio por serviço',
    images: ['/lovable-uploads/business-6.jpg'],
    location: 'Praia Grande',
    address: 'Rua V, 456',
    latitude: -23.6543,
    longitude: -46.2109,
    user_id: 'user-678',
    business_type: 'Salão de Beleza',
    sellerName: 'Patrícia Oliveira',
    sellerContact: '(13) 94444-3333',
    status: 'active',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    date: new Date().toISOString(),
    brand: 'Salão de Beleza',
    // Add null values for required properties
    model: null,
    year: null,
    mileage: null,
    fuel: null,
    color: null,
    transmission: null,
    bedrooms: null,
    bathrooms: null,
    size: null,
    property_type: null,
    amenities: null,
    has_garage: null,
    finalidade: null,
    service_type: null,
    provider_name: null,
    provider_contact: null,
    company_name: null,
    company_contact: null,
    job_type: null,
    education: null,
    experience: null,
    benefits: null,
    availability: null,
    salary: null,
    rating: null
  },
  {
    id: '7',
    title: 'Mercado Bom Preço',
    description: 'Variedade em alimentos e produtos',
    category: 'empresas',
    subcategory: 'Supermercado',
    price: 30,
    price_description: 'Preço médio por produto',
    images: ['/lovable-uploads/business-7.jpg'],
    location: 'Praia Grande',
    address: 'Av. U, 789',
    latitude: -24.3456,
    longitude: -46.9012,
    user_id: 'user-901',
    business_type: 'Mercado',
    sellerName: 'Ricardo Santos',
    sellerContact: '(13) 93333-2222',
    status: 'active',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    date: new Date().toISOString(),
    brand: 'Mercado',
    // Add null values for required properties
    model: null,
    year: null,
    mileage: null,
    fuel: null,
    color: null,
    transmission: null,
    bedrooms: null,
    bathrooms: null,
    size: null,
    property_type: null,
    amenities: null,
    has_garage: null,
    finalidade: null,
    service_type: null,
    provider_name: null,
    provider_contact: null,
    company_name: null,
    company_contact: null,
    job_type: null,
    education: null,
    experience: null,
    benefits: null,
    availability: null,
    salary: null,
    rating: null
  },
  {
    id: '8',
    title: 'Escola de Inglês Fluente',
    description: 'Cursos de inglês para todas as idades',
    category: 'empresas',
    subcategory: 'Escola de Idiomas',
    price: 250,
    price_description: 'Mensalidade',
    images: ['/lovable-uploads/business-8.jpg'],
    location: 'Praia Grande',
    address: 'Rua T, 012',
    latitude: -23.5432,
    longitude: -46.1098,
    user_id: 'user-234',
    business_type: 'Educação',
    sellerName: 'Juliana Mendes',
    sellerContact: '(13) 92222-1111',
    status: 'active',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    date: new Date().toISOString(),
    brand: 'Educação',
    // Add null values for required properties
    model: null,
    year: null,
    mileage: null,
    fuel: null,
    color: null,
    transmission: null,
    bedrooms: null,
    bathrooms: null,
    size: null,
    property_type: null,
    amenities: null,
    has_garage: null,
    finalidade: null,
    service_type: null,
    provider_name: null,
    provider_contact: null,
    company_name: null,
    company_contact: null,
    job_type: null,
    education: null,
    experience: null,
    benefits: null,
    availability: null,
    salary: null,
    rating: null
  }
];

export default businessListings;
