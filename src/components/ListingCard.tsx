
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "./ui/card";
import { Badge } from "./ui/badge";
import { formatDistanceToNow, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Listing } from "@/types";
import { categories } from "@/data/mockData";
import { MapPin } from "lucide-react";

type ListingCardProps = {
  listing: Listing;
};

// Function to format price based on type (number or string)
const formatPrice = (price: number | string) => {
  if (typeof price === "number") {
    return price.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }
  return price;
};

// Fixed path for the placeholder image - removed "/public" prefix
const DEFAULT_LISTING_IMAGE = "/lovable-uploads/28dd9cf1-2ee6-484f-bb8c-bfe3b57cc7f7.png";

const ListingCard: React.FC<ListingCardProps> = ({ listing }) => {
  const category = categories.find((cat) => cat.slug === listing.category);
  const formattedDate = formatDistanceToNow(parseISO(listing.date), {
    addSuffix: true,
    locale: ptBR,
  });

  // Determine which price to display based on listing type
  let displayPrice;
  if ("salary" in listing) {
    displayPrice = formatPrice(listing.salary);
  } else {
    displayPrice = formatPrice(listing.price);
  }

  return (
    <Link to={`/anuncio/${listing.category}/${listing.id}`}>
      <Card className="h-full overflow-hidden transition-all hover:shadow-md hover:-translate-y-1">
        <div className="relative aspect-video overflow-hidden">
          <img
            src={listing.images[0] || DEFAULT_LISTING_IMAGE}
            alt={listing.title}
            className="h-full w-full object-cover"
          />
          {category && (
            <Badge
              className="absolute top-2 right-2 bg-beach-600"
              variant="secondary"
            >
              {category.name}
            </Badge>
          )}
        </div>
        <CardContent className="p-4">
          <h3 className="text-lg font-semibold line-clamp-2">{listing.title}</h3>
          <p className="mt-2 text-xl font-bold text-beach-700">{displayPrice}</p>
          <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
            {listing.description}
          </p>
        </CardContent>
        <CardFooter className="flex justify-between p-4 pt-0 text-xs text-muted-foreground">
          <span className="flex items-center">
            <MapPin className="mr-1 h-3 w-3" /> {listing.location}
          </span>
          <span>{formattedDate}</span>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default ListingCard;
