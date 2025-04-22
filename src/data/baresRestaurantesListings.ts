
import { BarRestaurantListing } from "@/types";

export const baresRestaurantesListings: BarRestaurantListing[] = [
  {
    id: "bar1",
    title: "Quiosque Beira Mar",
    price: "Chopp a partir de R$ 10",
    description: "Ambiente descontraído na praia, petiscos e o melhor chopp gelado da orla.",
    images: ["/placeholder.svg"],
    location: "Av. Pres. Castelo Branco, Praia Grande",
    address: "Av. Pres. Castelo Branco, 3001 - Aviação, Praia Grande - SP, 11702-290",
    latitude: -24.004655,
    longitude: -46.402569,
    date: "2023-04-24",
    sellerName: "Quiosque Beira Mar",
    sellerContact: "(13) 3333-2222",
    category: "bares-restaurantes",
    subcategory: "bar"
  },
  {
    id: "bar2",
    title: "Bar do Léo",
    price: "Cerveja a partir de R$7",
    description: "Bar tradicional, ótima música ao vivo e porções fartas.",
    images: ["/placeholder.svg"],
    location: "Boqueirão, Praia Grande",
    address: "Rua Pernambuco, 501 - Boqueirão, Praia Grande - SP, 11700-150",
    latitude: -24.006618,
    longitude: -46.412002,
    date: "2023-04-26",
    sellerName: "Bar do Léo",
    sellerContact: "(13) 99800-5522",
    category: "bares-restaurantes",
    subcategory: "bar"
  },
  {
    id: "rest1",
    title: "Restaurante Terraço",
    price: "Pratos a partir de R$ 30",
    description: "Vista panorâmica e culinária variada. Perfeito para famílias.",
    images: ["/placeholder.svg"],
    location: "Canto do Forte, Praia Grande",
    address: "Av. Marechal Mallet, 1600 - Canto do Forte, Praia Grande - SP, 11700-810",
    latitude: -24.000785,
    longitude: -46.406506,
    date: "2023-04-28",
    sellerName: "Restaurante Terraço",
    sellerContact: "(13) 98765-3333",
    category: "bares-restaurantes",
    subcategory: "restaurante"
  }
  // ... adicione mais bares/restaurantes conforme necessário
];
