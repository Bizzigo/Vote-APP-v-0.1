
import React, { createContext, useContext, ReactNode } from 'react';
import useLocation from '@/hooks/useLocation';

interface LocationContextType {
  isActive: boolean;
  toggleLocation: () => void;
}

const LocationContext = createContext<LocationContextType | undefined>(undefined);

export const useLocationContext = (): LocationContextType => {
  const context = useContext(LocationContext);
  if (context === undefined) {
    throw new Error('useLocationContext must be used within a LocationProvider');
  }
  return context;
};

interface LocationProviderProps {
  children: ReactNode;
}

export const LocationProvider: React.FC<LocationProviderProps> = ({ children }) => {
  const locationHook = useLocation();

  return (
    <LocationContext.Provider value={locationHook}>
      {children}
    </LocationContext.Provider>
  );
};

export default LocationProvider;
