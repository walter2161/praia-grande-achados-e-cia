
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

const formatPrice = (price: number | string) => {
  if (typeof price === "number") {
    return price.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }
  return price;
};

const ListingCard: React.FC<ListingCardProps> = ({ listing }) => {
  const category = categories.find((cat) => cat.slug === listing.category);
  const formattedDate = formatDistanceToNow(parseISO(listing.date), {
    addSuffix: true,
    locale: ptBR,
  });

  let displayPrice;
  if ("salary" in listing) {
    displayPrice = formatPrice(listing.salary);
  } else {
    displayPrice = formatPrice(listing.price);
  }

  console.log('Placeholder image path:', "/lovable-uploads/389511f0-a13a-4a75-bf54-d91d60c4a762.png");

  return (
    <Link to={`/anuncio/${listing.category}/${listing.id}`}>
      <Card className="h-full overflow-hidden transition-all hover:shadow-md hover:-translate-y-1">
        <div className="relative aspect-video overflow-hidden bg-gray-100">
          <img
            src={listing.images[0] || "/lovable-uploads/389511f0-a13a-4a75-bf54-d91d60c4a762.png"}
            alt={listing.title}
            className="h-full w-full object-cover"
            loading="lazy"
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
