
import { RealEstateListing } from "@/types";

export const realEstateListings: RealEstateListing[] = [
  {
    id: "realestate1",
    title: "Apartamento 2 dormitórios a 100m da praia",
    price: 280000,
    description: "Lindo apartamento com 2 dormitórios, sala ampla, cozinha planejada e uma vaga de garagem. Localização privilegiada.",
    images: ["/placeholder.svg"],
    location: "Guilhermina, Praia Grande",
    date: "2023-04-22",
    sellerName: "Imobiliária Litoral",
    sellerContact: "(13) 3456-7891",
    category: "imoveis",
    propertyType: "Apartamento",
    size: 65,
    bedrooms: 2,
    bathrooms: 1,
    hasGarage: true,
    amenities: ["Piscina", "Salão de Festas", "Portaria 24h"]
  }
  // ... adicione mais imóveis conforme necessário
];
