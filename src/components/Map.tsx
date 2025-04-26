import React from "react";
import type { LucideIcon } from "lucide-react";

type Pin = {
  latitude: number;
  longitude: number;
  title: string;
  category?: string;
  icon?: LucideIcon;
};

type MapProps = {
  pins: Pin[];
  height?: string;
  initialCenter?: [number, number];
  zoom?: number;
  category?: string;
  neighborhood?: string; // New prop for neighborhood name
  address?: string; // Adding address prop for complete location info
};

// Generate iframe src for Google Maps based on category
function generateGoogleMapsEmbedSrc({
  latitude,
  longitude,
  zoom = 15,
  title = '',
  category = '',
  neighborhood = '',
  address = '',
}: { 
  latitude: number; 
  longitude: number; 
  zoom?: number; 
  title?: string;
  category?: string;
  neighborhood?: string;
  address?: string;
}) {
  // For services and bars/restaurants, show exact location with pin and address
  if (category === 'servicos' || category === 'bares-restaurantes') {
    const locationQuery = address ? encodeURIComponent(address) : `${latitude},${longitude}`;
    return `https://www.google.com/maps?q=${locationQuery}&z=${zoom}&output=embed`;
  }
  
  // For other categories, show the neighborhood area
  // Using the neighborhood name instead of coordinates
  return `https://www.google.com/maps?q=${encodeURIComponent(neighborhood + ', Praia Grande, SP')}&z=14&output=embed`;
}

const Map: React.FC<MapProps> = ({
  pins,
  height = "300px",
  initialCenter = [-24.00857, -46.41298],
  zoom = 15,
  category,
  neighborhood = "Centro",
  address,
}) => {
  // Use the first pin as the map center if it's a service or restaurant
  const centerPin =
    pins && pins.length > 0
      ? pins[0]
      : { latitude: -24.01556, longitude: -46.41322, title: "" };

  const mapSrc = generateGoogleMapsEmbedSrc({
    latitude: centerPin.latitude,
    longitude: centerPin.longitude,
    zoom: category === 'servicos' || category === 'bares-restaurantes' ? zoom : 14,
    title: centerPin.title,
    category,
    neighborhood,
    address,  // Pass the address to the src generator function
  });

  // Update the map title based on the pin category
  let mapTitle = "Mapa";
  if (category === 'empresas') {
    mapTitle = "Empresas em Praia Grande";
  } else if (category === 'bares-restaurantes') {
    mapTitle = "Bares e Restaurantes em Praia Grande";
  }

  return (
    <div className="relative w-full rounded-lg shadow" style={{ height }}>
      <iframe
        title={mapTitle}
        src={mapSrc}
        width="100%"
        height="100%"
        className="rounded-lg border-0"
        loading="lazy"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
        style={{ minHeight: height, border: 0 }}
      />
    </div>
  );
};

export default Map;
