
import { useState, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';

export const useLocation = () => {
  const [isActive, setIsActive] = useState(false);
  const { toast } = useToast();

  const toggleLocation = useCallback(() => {
    if (!isActive) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
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
      toast({
        title: "Location disabled",
        description: "No longer using your location",
      });
    }
  }, [isActive, toast]);

  return { isActive, toggleLocation };
};

export default useLocation;
