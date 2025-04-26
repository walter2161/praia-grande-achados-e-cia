
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

const Map: React.FC<MapProps> = ({
  pins,
  height = "300px",
  initialCenter = [-24.00857, -46.41298], // Default is Praia Grande center
  zoom = 15,
  category,
  neighborhood = "Praia Grande",
  address,
}) => {
  // Filter out pins with invalid coordinates
  const validPins = pins.filter(pin => 
    typeof pin.latitude === 'number' && 
    !isNaN(pin.latitude) && 
    typeof pin.longitude === 'number' && 
    !isNaN(pin.longitude)
  );
  
  // Use the first valid pin's location or provided center
  const centerPin = validPins.length > 0 
    ? validPins[0] 
    : { latitude: initialCenter[0], longitude: initialCenter[1] };
  
  // Create a static map URL using OpenStreetMap
  const getStaticMapUrl = () => {
    // Calculate the bounding box for the map to show all pins
    // Default to a reasonable view if no valid pins
    let minLat = centerPin.latitude - 0.01;
    let maxLat = centerPin.latitude + 0.01;
    let minLng = centerPin.longitude - 0.02;
    let maxLng = centerPin.longitude + 0.02;
    
    if (validPins.length > 1) {
      // Calculate the bounding box that contains all pins
      minLat = Math.min(...validPins.map(pin => pin.latitude)) - 0.005;
      maxLat = Math.max(...validPins.map(pin => pin.latitude)) + 0.005;
      minLng = Math.min(...validPins.map(pin => pin.longitude)) - 0.005;
      maxLng = Math.max(...validPins.map(pin => pin.longitude)) + 0.005;
    }
    
    // Return an iframe source for OpenStreetMap
    return `https://www.openstreetmap.org/export/embed.html?bbox=${minLng},${minLat},${maxLng},${maxLat}&layer=mapnik`;
  };

  let mapTitle = neighborhood ? `Mapa de ${neighborhood}` : "Mapa";
  if (category) {
    mapTitle = `${category} em ${neighborhood}`;
  }

  return (
    <div className="relative w-full rounded-lg shadow" style={{ height }}>
      {/* Map iframe using OpenStreetMap (no API key needed) */}
      <iframe
        title={mapTitle}
        src={getStaticMapUrl()}
        width="100%"
        height="100%"
        className="rounded-lg border-0"
        loading="lazy"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
        style={{ minHeight: height, border: 0 }}
      />
      
      {/* Render pins on top of the map */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="relative w-full h-full">
          {validPins.map((pin, index) => (
            pin.render?.() || (
              <div
                key={`pin-${index}`}
                className="absolute pointer-events-auto"
                style={{
                  // These calculations are approximate and may need adjustment
                  left: `calc(50% + ${(pin.longitude - centerPin.longitude) * 5000}px)`,
                  top: `calc(50% - ${(pin.latitude - centerPin.latitude) * 7000}px)`,
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
      </div>
    </div>
  );
};

export default Map;
