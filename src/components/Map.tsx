
import React, { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

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
};

const Map: React.FC<MapProps> = ({
  pins,
  height = "300px",
  initialCenter = [-24.01556, -46.41322], // Praia Grande SP approx [lat, lng]
  zoom = 13,
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    // Clear previous map if any
    if (mapRef.current) {
      mapRef.current.remove();
      mapRef.current = null;
    }

    mapRef.current = L.map(mapContainer.current).setView(initialCenter, zoom);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(mapRef.current);

    pins.forEach((pin) => {
      L.marker([pin.latitude, pin.longitude])
        .addTo(mapRef.current as L.Map)
        .bindPopup(pin.title);
    });

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [pins, height, initialCenter, zoom]);

  return (
    <div className="relative w-full rounded-lg shadow" style={{ height }}>
      <div ref={mapContainer} className="w-full h-full rounded-lg" />
    </div>
  );
};

export default Map;
