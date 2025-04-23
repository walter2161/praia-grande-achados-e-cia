
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
};

// Generate iframe src for Google Maps focused on the main pin
function generateGoogleMapsEmbedSrc({
  latitude,
  longitude,
  zoom = 15,
  title = '',
  category = '',
}: { 
  latitude: number; 
  longitude: number; 
  zoom?: number; 
  title?: string;
  category?: string;
}) {
  // For services and bars/restaurants, show exact location
  if (category === 'servicos' || category === 'bares-restaurantes') {
    return `https://www.google.com/maps?q=${latitude},${longitude}&z=${zoom}&output=embed`;
  }
  
  // For other categories, use a lower zoom level to only show neighborhood
  return `https://www.google.com/maps?q=${latitude},${longitude}&z=13&output=embed`;
}

const Map: React.FC<MapProps> = ({
  pins,
  height = "300px",
  initialCenter,
  zoom = 15,
  category,
}) => {
  // Use the first pin as the map center
  const centerPin =
    pins && pins.length > 0
      ? pins[0]
      : { latitude: -24.01556, longitude: -46.41322, title: "" };

  const mapSrc = generateGoogleMapsEmbedSrc({
    latitude: centerPin.latitude,
    longitude: centerPin.longitude,
    zoom: category === 'servicos' || category === 'bares-restaurantes' ? zoom : 13,
    title: centerPin.title,
    category,
  });

  return (
    <div className="relative w-full rounded-lg shadow" style={{ height }}>
      <iframe
        title={centerPin.title || "Mapa"}
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
