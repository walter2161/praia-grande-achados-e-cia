
import { BarRestaurantListing } from "@/types";

export const baresRestaurantesListings: BarRestaurantListing[] = [
  {
    id: "bar1",
    title: "Bar do Zé - Chopp Gelado",
    price: "A partir de R$ 8",
    description: "Venha experimentar nosso famoso chopp gelado, porções variadas e ambiente descontraído.",
    images: ["/placeholder.svg"],
    location: "Boqueirão, Praia Grande",
    address: "Av. Presidente Costa e Silva, 1500, Boqueirão, Praia Grande, SP",
    latitude: -24.00618,
    longitude: -46.40705,
    date: "2023-04-24",
    sellerName: "Bar do Zé",
    sellerContact: "(13) 99900-1111",
    category: "bares-restaurantes"
  }
  // ... adicione mais bares/restaurantes conforme necessário
];
