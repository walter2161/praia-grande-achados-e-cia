
import React, { useEffect, useRef } from "react";

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

// Vamos utilizar OpenStreetMap via iframe simples para evitar dependências e tokens
// O iframe monta a URL com a latitude e longitude e zoom.

const Map: React.FC<MapProps> = ({
  pins,
  height = "300px",
  initialCenter = [-24.01556, -46.41322],
  zoom = 13,
}) => {
  const mapRef = useRef<HTMLDivElement>(null);

  // Para simplificar, mostramos na URL do iframe o centro e o zoom.
  // Indicamos todos os pins no mapa usando marcadores.
  // OpenStreetMap não oferece múltiplos marcadores via URL nativo, então vamos marcar só o primeiro pin se houver.

  const center = pins.length > 0
    ? [pins[0].latitude, pins[0].longitude]
    : initialCenter;

  // Construir a URL do mapa OSM com centro e zoom
  const osmUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${center[1] - 0.05}%2C${center[0] - 0.05}%2C${center[1] + 0.05}%2C${center[0] + 0.05}&layer=mapnik&marker=${center[0]}%2C${center[1]}`;

  return (
    <div
      className="relative w-full rounded-lg shadow"
      style={{ height }}
      ref={mapRef}
    >
      <iframe
        title="Mapa OpenStreetMap"
        width="100%"
        height="100%"
        frameBorder="0"
        scrolling="no"
        src={osmUrl}
        style={{ borderRadius: "0.5rem" }}
      ></iframe>
    </div>
  );
};

export default Map;
