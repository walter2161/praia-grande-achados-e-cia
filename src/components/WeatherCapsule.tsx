
import { CloudRain, CloudSun, Sun } from "lucide-react";
import { useState, useEffect } from "react";
import { getWeatherData, type WeatherData } from "@/lib/services/weatherService";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

export default function WeatherCapsule() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [weather, setWeather] = useState<WeatherData>({
    condition: "partly_cloudy",
    temperature: 25
  });
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Fetch weather initially
    fetchWeather();
    
    // Update weather every 5 minutes
    const weatherTimer = setInterval(fetchWeather, 5 * 60 * 1000);
    
    return () => clearInterval(weatherTimer);
  }, []);

  const fetchWeather = async () => {
    setLoading(true);
    try {
      const data = await getWeatherData();
      setWeather(data);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch weather:', error);
      toast({
        title: "Erro na previsão",
        description: "Não foi possível atualizar a previsão do tempo",
        variant: "destructive"
      });
      setLoading(false);
    }
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

  const getWeatherConditionText = (condition: WeatherData["condition"]) => {
    switch (condition) {
      case "sunny":
        return "Ensolarado";
      case "rainy":
        return "Chuvoso";
      case "partly_cloudy":
        return "Parcialmente Nublado";
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full text-sm border cursor-pointer hover:bg-white/20 transition-colors">
          <span className="text-muted-foreground">
            {currentTime.toLocaleTimeString('pt-BR', { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </span>
          <div className="flex items-center gap-1 text-[#FF6600]">
            {loading ? (
              <div className="h-5 w-5 animate-pulse rounded-full bg-muted"></div>
            ) : (
              <WeatherIcon />
            )}
            <span>{weather.temperature}°C</span>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogTitle>Previsão do Tempo - Praia Grande</DialogTitle>
        <DialogDescription>
          Informações atualizadas de temperatura e condições climáticas.
        </DialogDescription>
        <div className="flex flex-col gap-6 p-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Praia Grande</h3>
            <span className="text-muted-foreground">
              {currentTime.toLocaleTimeString('pt-BR', {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
              })}
            </span>
          </div>
          
          {loading ? (
            <div className="flex justify-center">
              <div className="h-16 w-16 animate-pulse rounded-full bg-muted"></div>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-center gap-4">
                <WeatherIcon />
                <span className="text-4xl font-bold">{weather.temperature}°C</span>
              </div>
              
              <div className="text-center text-muted-foreground">
                {getWeatherConditionText(weather.condition)}
              </div>
            </>
          )}
          
          <div className="text-xs text-center text-muted-foreground mt-4">
            Última atualização: {new Date().toLocaleTimeString('pt-BR')}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
