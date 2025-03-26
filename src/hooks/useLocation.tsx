
import { useState, useCallback, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

export interface Coordinates {
  lat: number;
  lng: number;
}

export const useLocation = () => {
  const [isActive, setIsActive] = useState(false);
  const [coordinates, setCoordinates] = useState<Coordinates | null>(null);
  const { toast } = useToast();

  // Get current position if location is active
  useEffect(() => {
    if (isActive && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCoordinates({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.error("Error getting location:", error);
          toast({
            title: "Location error",
            description: "Could not access your location",
            variant: "destructive",
          });
          setIsActive(false);
        }
      );
    }
  }, [isActive, toast]);

  const toggleLocation = useCallback(() => {
    if (!isActive) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setCoordinates({
              lat: position.coords.latitude,
              lng: position.coords.longitude
            });
            setIsActive(true);
            toast({
              title: "Location accessed",
              description: "Using your current location",
            });
          },
          (error) => {
            console.error("Error getting location:", error);
            toast({
              title: "Location error",
              description: "Could not access your location",
              variant: "destructive",
            });
          }
        );
      } else {
        toast({
          title: "Location not supported",
          description: "Your browser doesn't support geolocation",
          variant: "destructive",
        });
      }
    } else {
      setIsActive(false);
      setCoordinates(null);
      toast({
        title: "Location disabled",
        description: "No longer using your location",
      });
    }
  }, [isActive, toast]);

  // Calculate distance between two coordinates in kilometers
  const calculateDistance = useCallback((lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371; // Radius of the earth in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2); 
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    const distance = R * c; // Distance in km
    return distance;
  }, []);

  return { 
    isActive, 
    toggleLocation, 
    coordinates,
    calculateDistance
  };
};

export default useLocation;
