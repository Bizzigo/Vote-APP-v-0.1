
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
        // Use a working API key for OpenWeatherMap
        const apiKey = '1b2d9eca14f2aaabba370a5e1e7d4b0c'; // Updated API key
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
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {getWeatherIcon()}
          <span className="text-2xl font-bold">
            {weather && !loading ? Math.round(weather.main.temp) : '--'}°C
          </span>
        </div>
        {weather && !loading && (
          <div className="text-sm text-muted-foreground">
            {weather.name}
          </div>
        )}
      </div>

      {loading && (
        <div className="flex justify-center py-2">
          <Loader2 className="h-5 w-5 animate-spin text-primary" />
        </div>
      )}
      
      {error && (
        <div className="text-sm text-destructive text-center py-1">
          {error}
        </div>
      )}
    </Card>
  );
};

export default WeatherBadge;
