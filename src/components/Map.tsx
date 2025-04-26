
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
  neighborhood?: string;
  address?: string;
};

// Generate iframe src for Google Maps based on parameters
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
  // If address is provided, use it directly for a more accurate location
  if (address) {
    return `https://www.google.com/maps?q=${encodeURIComponent(address)}&z=${zoom}&output=embed`;
  }
  
  // If it's a category view, use neighborhood name if available
  if (category && neighborhood) {
    return `https://www.google.com/maps?q=${encodeURIComponent(neighborhood + ', SP, Brasil')}&z=${zoom}&output=embed`;
  }
  
  // Default to coordinates
  return `https://www.google.com/maps?q=${latitude},${longitude}&z=${zoom}&output=embed`;
}

const Map: React.FC<MapProps> = ({
  pins,
  height = "300px",
  initialCenter = [-24.00857, -46.41298], // Default is Praia Grande center
  zoom = 15,
  category,
  neighborhood = "Praia Grande",
  address,
}) => {
  // Use the provided address or coordinates to center the map
  const mapSrc = address 
    ? generateGoogleMapsEmbedSrc({
        latitude: initialCenter[0],
        longitude: initialCenter[1],
        zoom,
        category,
        neighborhood,
        address,
      })
    : generateGoogleMapsEmbedSrc({
        latitude: initialCenter[0],
        longitude: initialCenter[1],
        zoom,
        category,
        neighborhood,
      });

  // Update the map title based on the category
  let mapTitle = neighborhood ? `Mapa de ${neighborhood}` : "Mapa";
  if (category === 'empresas') {
    mapTitle = `Empresas em ${neighborhood || 'Praia Grande'}`;
  } else if (category === 'bares-restaurantes' || (category === 'empresas' && pins.some(pin => pin.category === 'Bares e Restaurantes'))) {
    mapTitle = `Estabelecimentos em ${neighborhood || 'Praia Grande'}`;
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
