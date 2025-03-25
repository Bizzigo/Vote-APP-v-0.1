
import { useState, useEffect, createContext, useContext } from 'react';

interface LocationContextType {
  locationActive: boolean;
  userLocation: GeolocationPosition['coords'] | null;
  toggleLocation: () => void;
}

const LocationContext = createContext<LocationContextType>({
  locationActive: false,
  userLocation: null,
  toggleLocation: () => {},
});

export const LocationProvider = ({ children }: { children: React.ReactNode }) => {
  const [locationActive, setLocationActive] = useState(false);
  const [userLocation, setUserLocation] = useState<GeolocationPosition['coords'] | null>(null);

  const toggleLocation = ()  => {
    if (!locationActive) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setUserLocation(position.coords);
            setLocationActive(true);
          },
          (error) => {
            console.error("Error getting location:", error);
            setLocationActive(false);
            setUserLocation(null);
          }
        );
      }
    } else {
      setLocationActive(false);
      setUserLocation(null);
    }
  };

  return (
    <LocationContext.Provider value={{ locationActive, userLocation, toggleLocation }}>
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = () => {
  const context = useContext(LocationContext);
  if (context === undefined) {
    throw new Error('useLocation must be used within a LocationProvider');
  }
  return context;
};
