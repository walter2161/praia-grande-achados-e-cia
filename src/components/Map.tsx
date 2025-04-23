
import React from "react";

type Pin = {
  latitude: number;
  longitude: number;
  title: string;
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
}: { 
  latitude: number; 
  longitude: number; 
  zoom?: number; 
  title?: string;
  category?: string;
  neighborhood?: string;
}) {
  // For services and bars/restaurants, show exact location with pin
  if (category === 'servicos' || category === 'bares-restaurantes') {
    return `https://www.google.com/maps?q=${latitude},${longitude}&z=${zoom}&output=embed`;
  }
  
  // For other categories, show the neighborhood area
  // Using the neighborhood name instead of coordinates
  return `https://www.google.com/maps?q=${encodeURIComponent(neighborhood + ', Praia Grande, SP')}&z=14&output=embed`;
}

const Map: React.FC<MapProps> = ({
  pins,
  height = "300px",
  initialCenter,
  zoom = 15,
  category,
  neighborhood = "Centro", // Default to Centro if no neighborhood provided
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
  });

  // Determine the appropriate title for the map
  let mapTitle = "Mapa";
  
  if (category === 'servicos' || category === 'bares-restaurantes') {
    // For services and restaurants, use the full address when available
    mapTitle = address ? address : centerPin.title || "Localização";
  } else {
    // For other categories, show the neighborhood
    mapTitle = `Região: ${neighborhood}`;
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
