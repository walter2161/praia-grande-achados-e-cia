
import { AutoListing } from "@/types";

export const autoListings: AutoListing[] = [
  {
    id: "auto1",
    title: "Honda Civic 2020 EXL",
    price: 92000,
    description: "Honda Civic EXL 2020 em excelente estado. Único dono, revisões em dia na concessionária.",
    images: ["/placeholder.svg"],
    location: "Boqueirão, Praia Grande",
    date: "2023-04-20",
    sellerName: "João Silva",
    sellerContact: "(13) 99999-1234",
    category: "autos",
    brand: "Honda",
    model: "Civic EXL",
    year: 2020,
    mileage: 45000,
    fuel: "Flex",
    transmission: "Automático",
    color: "Prata"
  },
  {
    id: "auto2",
    title: "Fiat Argo 2021 Drive",
    price: 62000,
    description: "Fiat Argo Drive 1.0, completo, com baixa quilometragem e em ótimo estado de conservação.",
    images: ["/placeholder.svg"],
    location: "Canto do Forte, Praia Grande",
    date: "2023-04-18",
    sellerName: "Maria Oliveira",
    sellerContact: "(13) 98888-5678",
    category: "autos",
    brand: "Fiat",
    model: "Argo Drive",
    year: 2021,
    mileage: 28000,
    fuel: "Flex",
    transmission: "Manual",
    color: "Vermelho"
  }
  // ... adicione mais autos conforme necessário
];
