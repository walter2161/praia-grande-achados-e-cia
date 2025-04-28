
// Using OpenWeatherMap API for weather data
const PRAIA_GRANDE_LAT = -24.0083;
const PRAIA_GRANDE_LON = -46.4121;
const API_KEY = "f20baaec273a934a5dae1a333f72173a"; // OpenWeatherMap API key

export interface WeatherData {
  condition: "sunny" | "partly_cloudy" | "rainy";
  temperature: number;
}

export async function getWeatherData(): Promise<WeatherData> {
  try {
    console.log("Fetching weather data...");
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${PRAIA_GRANDE_LAT}&lon=${PRAIA_GRANDE_LON}&appid=${API_KEY}&units=metric`
    );
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error("Weather API error:", errorData);
      throw new Error(`Weather API request failed: ${errorData.message || response.statusText}`);
    }

    const data = await response.json();
    console.log("Weather data received:", data);
    
    // Convert OpenWeatherMap conditions to our app's conditions
    const weatherId = data.weather[0].id;
    let condition: WeatherData['condition'] = "partly_cloudy";
    
    // Clear sky (800) and few clouds (801)
    if (weatherId === 800) {
      condition = "sunny";
    } 
    // Rain (500-531)
    else if (weatherId >= 500 && weatherId <= 531) {
      condition = "rainy";
    }
    // Partly cloudy (everything else)
    
    return {
      condition,
      temperature: Math.round(data.main.temp)
    };
  } catch (error) {
    console.error('Error fetching weather:', error);
    // Provide fallback weather data when API fails
    return {
      condition: "partly_cloudy",
      temperature: 25
    };
  }
}
