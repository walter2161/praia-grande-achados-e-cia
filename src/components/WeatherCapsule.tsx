
import { CloudRain, CloudSun, Sun } from "lucide-react";
import { useState, useEffect } from "react";

export default function WeatherCapsule() {
  const [currentTime, setCurrentTime] = useState(new Date());
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  // Hardcoded weather for demo purposes
  const weather = {
    condition: "partly_cloudy", // could be sunny, partly_cloudy, or rainy
    temperature: 28
  };

  const WeatherIcon = () => {
    switch(weather.condition) {
      case "sunny":
        return <Sun className="h-5 w-5" />;
      case "rainy":
        return <CloudRain className="h-5 w-5" />;
      default:
        return <CloudSun className="h-5 w-5" />;
    }
  };

  return (
    <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-full text-sm border">
      <span className="text-muted-foreground">
        {currentTime.toLocaleTimeString('pt-BR', { 
          hour: '2-digit', 
          minute: '2-digit' 
        })}
      </span>
      <div className="flex items-center gap-1 text-[#FF6600]">
        <WeatherIcon />
        <span>{weather.temperature}°C</span>
      </div>
    </div>
  );
}
