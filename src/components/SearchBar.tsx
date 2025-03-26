
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Search, MapPin } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { useLocationContext } from '@/providers/LocationProvider';

const SearchBar = ({ 
  searchTerm, 
  setSearchTerm, 
  onSearch, 
  className = "",
  mainPage = false 
}: { 
  searchTerm?: string; 
  setSearchTerm?: React.Dispatch<React.SetStateAction<string>>; 
  onSearch?: (query: string, useLocation: boolean) => void;
  className?: string;
  mainPage?: boolean;
}) => {
  const navigate = useNavigate();
  const { isActive, toggleLocation } = useLocationContext();
  const [distanceKm, setDistanceKm] = useState<number>(10);
  
  // Local state for standalone usage (when props aren't provided)
  const [localSearchTerm, setLocalSearchTerm] = React.useState('');
  
  // Use either provided props or local state
  const term = searchTerm !== undefined ? searchTerm : localSearchTerm;
  const setTerm = setSearchTerm || setLocalSearchTerm;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (term.trim()) {
      if (onSearch) {
        // If onSearch is provided, use it (for Index.tsx)
        onSearch(term.trim(), isActive);
      } else {
        // Default behavior - navigate to search page
        navigate(`/search?q=${encodeURIComponent(term.trim())}`);
      }
    }
  };

  return (
    <div className="w-full max-w-xl">
      <form onSubmit={handleSearch} className={`w-full ${mainPage ? 'mx-auto' : ''} ${className}`}>
        <div className="relative flex items-center">
          <div className="absolute left-4 text-gray-400">
            <Search size={20} />
          </div>
          <Input
            type="text"
            placeholder="Search for local businesses..."
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            className="h-12 text-base rounded-3xl border border-gray-300 pl-12 pr-12 focus-visible:ring-gray-200 focus-visible:border-gray-300 shadow-sm hover:shadow-md transition-shadow"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleSearch(e);
              }
            }}
          />
          <div className="absolute right-4 flex items-center space-x-2">
            <MapPin 
              size={20} 
              className={`cursor-pointer transition-colors ${isActive ? 'text-primary' : 'text-gray-400'}`} 
              onClick={toggleLocation} 
            />
          </div>
        </div>
      </form>
      
      {isActive && (
        <div className="mt-4 px-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-500">Distance: {distanceKm} km</span>
            <span className="text-xs text-gray-400">Location enabled</span>
          </div>
          <Slider
            value={[distanceKm]}
            min={1}
            max={50}
            step={1}
            onValueChange={(value) => setDistanceKm(value[0])}
            className="w-full"
          />
        </div>
      )}
    </div>
  );
};

export default SearchBar;
