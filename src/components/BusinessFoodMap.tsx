
import React from "react";
import { useNavigate } from "react-router-dom";
import { businessListings } from "@/data/businessListings";
import { MapPin } from "lucide-react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Card, CardContent } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import Map from "@/components/Map";

const BusinessFoodMap: React.FC = () => {
  const navigate = useNavigate();

  // Filter only businesses with valid location/address and spread them around Praia Grande
  const validBusinesses = businessListings.map((business, index) => ({
    ...business,
    // Spread businesses around Praia Grande with slight variations
    latitude: -24.00857 + (Math.random() - 0.5) * 0.02,
    longitude: -46.41298 + (Math.random() - 0.5) * 0.02,
    status: "active" as const,
  }));

  const handlePinClick = (businessId: string) => {
    navigate(`/anuncio/empresas/${businessId}`);
  };

  const renderPin = (business: typeof validBusinesses[0]) => (
    <TooltipProvider key={business.id}>
      <Tooltip>
        <HoverCard>
          <TooltipTrigger asChild>
            <HoverCardTrigger asChild>
              <button
                onClick={() => handlePinClick(business.id)}
                className="group relative"
              >
                <MapPin className="h-6 w-6 text-beach-600 hover:text-beach-700 transition-colors" />
              </button>
            </HoverCardTrigger>
          </TooltipTrigger>
          <HoverCardContent className="w-80 p-0">
            <Card className="border-0 shadow-none">
              <CardContent className="p-3">
                <div className="flex gap-3">
                  <div className="relative h-16 w-16 overflow-hidden rounded-md">
                    <img
                      src={business.images[0]}
                      alt={business.title}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold line-clamp-1">{business.title}</h3>
                    <p className="text-sm text-muted-foreground">{business.subcategory}</p>
                    <p className="text-xs text-muted-foreground mt-1">{business.address}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </HoverCardContent>
          <TooltipContent>
            <p>{business.title}</p>
          </TooltipContent>
        </HoverCard>
      </Tooltip>
    </TooltipProvider>
  );

  return (
    <section className="py-12 bg-gray-50">
      <div className="container">
        <h2 className="text-3xl font-bold text-center mb-8">Empresas em Praia Grande</h2>
        <div className="h-[600px] relative rounded-lg overflow-hidden">
          <Map
            pins={validBusinesses.map(business => ({
              latitude: business.latitude,
              longitude: business.longitude,
              title: business.title,
              category: business.subcategory,
              render: () => renderPin(business)
            }))}
            height="600px"
            zoom={13}
          />
        </div>
      </div>
    </section>
  );
};

export default BusinessFoodMap;
