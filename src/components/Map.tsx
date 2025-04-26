
import React from "react";
import type { LucideIcon } from "lucide-react";

type Pin = {
  latitude: number;
  longitude: number;
  title: string;
  category?: string;
  icon?: LucideIcon;
  render?: () => React.ReactNode;
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
  const markers = address 
    ? `&q=${encodeURIComponent(address)}`
    : `&q=${latitude},${longitude}`;
    
  return `https://www.google.com/maps/embed/v1/place?key=YOUR_GOOGLE_MAPS_API_KEY${markers}&zoom=${zoom}`;
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
  // Use the first pin's location or provided center
  const centerPin = pins[0] || { latitude: initialCenter[0], longitude: initialCenter[1] };
  
  const mapSrc = generateGoogleMapsEmbedSrc({
    latitude: centerPin.latitude,
    longitude: centerPin.longitude,
    zoom,
    category,
    neighborhood,
    address,
  });

  let mapTitle = neighborhood ? `Mapa de ${neighborhood}` : "Mapa";
  if (category) {
    mapTitle = `${category} em ${neighborhood}`;
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
      {pins.map((pin, index) => (
        pin.render?.() || (
          <div
            key={`pin-${index}`}
            className="absolute"
            style={{
              left: `${((pin.longitude - (initialCenter[1] - zoom/2)) / zoom) * 100}%`,
              top: `${((pin.latitude - (initialCenter[0] - zoom/2)) / zoom) * 100}%`,
              transform: 'translate(-50%, -50%)'
            }}
          >
            <div className="w-6 h-6 bg-beach-600 rounded-full flex items-center justify-center text-white cursor-pointer hover:bg-beach-700 transition-colors">
              {pin.title.charAt(0)}
            </div>
          </div>
        )
      ))}
    </div>
  );
};

export default Map;
