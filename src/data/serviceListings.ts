
import { ServiceListing } from "@/types";

export const serviceListings: ServiceListing[] = [
  {
    id: "service1",
    title: "Eletricista residencial e comercial",
    price: "A partir de R$ 100",
    description: "Serviços de instalação e manutenção elétrica para residências e comércios. Atendimento rápido e preços justos.",
    images: ["/placeholder.svg"],
    location: "Praia Grande e região",
    date: "2023-04-21",
    providerName: "Roberto Eletricista",
    providerContact: "(13) 99999-8888",
    category: "servicos",
    serviceType: "Serviços Residenciais",
    availability: "Segunda a Sábado, 8h às 18h",
    experience: "15 anos",
    rating: 4.8
  }
  // ... adicione mais serviços conforme necessário
];
