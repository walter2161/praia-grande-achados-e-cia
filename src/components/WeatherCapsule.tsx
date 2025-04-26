
import { CloudRain, CloudSun, Sun } from "lucide-react";
import { useState, useEffect } from "react";
import { getWeatherData, type WeatherData } from "@/lib/services/weatherService";

export default function WeatherCapsule() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [weather, setWeather] = useState<WeatherData>({
    condition: "partly_cloudy",
    temperature: 25
  });
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Fetch weather initially
    fetchWeather();
    
    // Update weather every 30 minutes
    const weatherTimer = setInterval(fetchWeather, 30 * 60 * 1000);
    
    return () => clearInterval(weatherTimer);
  }, []);

  const fetchWeather = async () => {
    const data = await getWeatherData();
    setWeather(data);
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
    <div className="flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full text-sm border">
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

