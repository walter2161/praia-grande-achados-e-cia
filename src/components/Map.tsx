
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
};

// Gera um src para o iframe do Google Maps focado no marcador principal
function generateGoogleMapsEmbedSrc({
  latitude,
  longitude,
  zoom = 15,
  title = '',
}: { latitude: number; longitude: number; zoom?: number; title?: string }) {
  // Embed padrão, funciona sem API key para view estática
  return `https://www.google.com/maps?q=${latitude},${longitude}&z=${zoom}&output=embed`;
}

const Map: React.FC<MapProps> = ({
  pins,
  height = "300px",
  initialCenter,
  zoom = 15,
}) => {
  // Usa o primeiro pin como central do mapa
  const centerPin =
    pins && pins.length > 0
      ? pins[0]
      : { latitude: -24.01556, longitude: -46.41322, title: "" };
  const mapSrc = generateGoogleMapsEmbedSrc({
    latitude: centerPin.latitude,
    longitude: centerPin.longitude,
    zoom,
    title: centerPin.title,
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
