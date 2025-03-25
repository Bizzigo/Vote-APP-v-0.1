
import React, { useState } from 'react';
import { Search, MapPin, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { toast } from 'sonner';

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  onSearch: (query: string, useAI: boolean) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, setSearchTerm, onSearch }) => {
  const [useLocation, setUseLocation] = useState(false);
  const [useAI, setUseAI] = useState(true);
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null);
  const { toast: uiToast } = useToast();

  const handleLocationToggle = (checked: boolean) => {
    setUseLocation(checked);
    
    if (checked) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setUserLocation({
              lat: position.coords.latitude,
              lng: position.coords.longitude
            });
            uiToast({
              title: "Location accessed",
              description: "Using your current location for search",
            });
          },
          (error) => {
            console.error("Error getting location:", error);
            uiToast({
              title: "Location error",
              description: "Could not access your location",
              variant: "destructive",
            });
            setUseLocation(false);
          }
        );
      } else {
        uiToast({
          title: "Location not supported",
          description: "Your browser doesn't support geolocation",
          variant: "destructive",
        });
        setUseLocation(false);
      }
    } else {
      setUserLocation(null);
    }
  };

  const handleSearch = () => {
    if (useAI) {
      toast.success('Using AI to enhance your search results', {
        description: 'Optimizing for relevance and highest ratings'
      });
    }
    onSearch(searchTerm, useAI);
  };

  return (
    <div className="relative max-w-lg w-full mx-auto mb-8">
      <div className="flex flex-col space-y-2">
        <div className="flex">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-muted-foreground" />
            </div>
            <input
              type="text"
              className="block w-full bg-white border border-[#1877F2] border-1 pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#1877F2] focus:border-transparent transition-all duration-200 rounded-none"
              placeholder="Search vendors by name, category, or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSearch();
                }
              }}
            />
          </div>
          <Button 
            className="ml-0 bg-[#1877F2] hover:bg-[#166FE5] text-white px-4 py-3 h-auto rounded-none"
            onClick={handleSearch}
          >
            ATRAST
          </Button>
        </div>
        
        <div className="flex items-center space-x-2 justify-between">
          <div className="flex items-center space-x-2">
            <Switch 
              id="location" 
              checked={useLocation}
              onCheckedChange={handleLocationToggle}
            />
            <div className="flex items-center space-x-1.5">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <label htmlFor="location" className="text-sm cursor-pointer">
                Use my current location
              </label>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Switch
              id="ai-search"
              checked={useAI}
              onCheckedChange={setUseAI}
            />
            <div className="flex items-center space-x-1.5">
              <Sparkles className="h-4 w-4 text-amber-500" />
              <label htmlFor="ai-search" className="text-sm cursor-pointer">
                AI-powered search
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
