
import React, { useState, useEffect } from 'react';
import { Cloud, CloudSun, Sun, CloudRain, CloudSnow, CloudLightning, CloudFog, Loader2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { useLocationContext } from '@/providers/LocationProvider';
import { useLanguage } from '@/providers/LanguageProvider';

interface WeatherData {
  main: {
    temp: number;
    humidity: number;
    feels_like: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
  }[];
  name: string;
}

const WeatherBadge: React.FC = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { isActive, coordinates } = useLocationContext();
  const { t } = useLanguage();

  useEffect(() => {
    const fetchWeather = async () => {
      if (!isActive || !coordinates) return;
      
      setLoading(true);
      setError(null);
      
      try {
        // Use OpenWeatherMap API with free tier
        const apiKey = '0de82d6d2ca7e1d4fb0a16f5c6707b2c'; // This is a public API key
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${coordinates.lat}&lon=${coordinates.lng}&units=metric&appid=${apiKey}`
        );
        
        if (!response.ok) {
          throw new Error('Failed to fetch weather data');
        }
        
        const data = await response.json();
        setWeather(data);
      } catch (err) {
        console.error('Weather fetch error:', err);
        setError('Could not load weather data');
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [isActive, coordinates]);

  const getWeatherIcon = () => {
    if (!weather) return <Cloud className="h-5 w-5" />;
    
    // Weather condition codes from OpenWeatherMap API
    const id = weather.weather[0].id;
    
    if (id >= 200 && id < 300) return <CloudLightning className="h-5 w-5" />; // Thunderstorm
    if (id >= 300 && id < 600) return <CloudRain className="h-5 w-5" />; // Drizzle and Rain
    if (id >= 600 && id < 700) return <CloudSnow className="h-5 w-5" />; // Snow
    if (id >= 700 && id < 800) return <CloudFog className="h-5 w-5" />; // Atmosphere (fog, mist)
    if (id === 800) return <Sun className="h-5 w-5" />; // Clear sky
    if (id > 800) return <CloudSun className="h-5 w-5" />; // Clouds
    
    return <Cloud className="h-5 w-5" />;
  };

  if (!isActive) {
    return null;
  }

  return (
    <Card className="p-4 w-full">
      <div className="flex flex-col space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="font-medium">Local Weather</h3>
          <Badge variant="outline" className="flex items-center space-x-1">
            {getWeatherIcon()}
            <span className="ml-1">Weather</span>
          </Badge>
        </div>

        {loading && (
          <div className="flex justify-center py-4">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
          </div>
        )}
        
        {error && (
          <div className="text-sm text-destructive text-center py-2">
            {error}
          </div>
        )}
        
        {weather && !loading && (
          <div className="grid grid-cols-2 gap-2 mt-2">
            <div className="text-center">
              <div className="text-2xl font-bold">{Math.round(weather.main.temp)}°C</div>
              <div className="text-xs text-muted-foreground">Temperature</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{Math.round(weather.main.feels_like)}°C</div>
              <div className="text-xs text-muted-foreground">Feels like</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{weather.main.humidity}%</div>
              <div className="text-xs text-muted-foreground">Humidity</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-medium truncate">{weather.name}</div>
              <div className="text-xs text-muted-foreground capitalize">{weather.weather[0].description}</div>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default WeatherBadge;
