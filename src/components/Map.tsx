
import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

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

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN || ""; // Espera variável no .env

const Map: React.FC<MapProps> = ({
  pins,
  height = "300px",
  initialCenter = [-46.41322, -24.01556], // Praia Grande SP aprox.
  zoom = 13,
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapContainer.current || !MAPBOX_TOKEN) return;

    mapboxgl.accessToken = MAPBOX_TOKEN;
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: initialCenter,
      zoom: zoom,
      attributionControl: false,
    });

    // Adiciona os pins
    pins.forEach((pin) => {
      new mapboxgl.Marker()
        .setLngLat([pin.longitude, pin.latitude])
        .setPopup(new mapboxgl.Popup({ offset: 25 }).setText(pin.title))
        .addTo(map);
    });

    return () => map.remove();
  }, [pins]);

  return (
    <div className="relative w-full" style={{ height }}>
      {!MAPBOX_TOKEN && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/80">
          <span className="text-red-600 text-sm">Insira sua VITE_MAPBOX_TOKEN no .env para visualizar o mapa.</span>
        </div>
      )}
      <div ref={mapContainer} className="w-full h-full rounded-lg shadow" />
    </div>
  );
};

export default Map;
