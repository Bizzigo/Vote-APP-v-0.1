
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Search, MapPin } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { useLocationContext } from '@/providers/LocationProvider';
import { useLanguage } from '@/providers/LanguageProvider';
import { useToast } from '@/hooks/use-toast';

const SearchBar = ({ 
  searchTerm, 
  setSearchTerm, 
  onSearch, 
  className = "",
  mainPage = false 
}: { 
  searchTerm?: string; 
  setSearchTerm?: React.Dispatch<React.SetStateAction<string>>; 
  onSearch?: (query: string, useLocation: boolean, distanceKm?: number) => void;
  className?: string;
  mainPage?: boolean;
}) => {
  const navigate = useNavigate();
  const { isActive, toggleLocation } = useLocationContext();
  const [distanceKm, setDistanceKm] = useState<number>(10);
  const inputRef = useRef<HTMLInputElement>(null);
  const { t } = useLanguage();
  const { toast } = useToast();
  
  // Local state for standalone usage (when props aren't provided)
  const [localSearchTerm, setLocalSearchTerm] = useState('');
  
  // Use either provided props or local state
  const term = searchTerm !== undefined ? searchTerm : localSearchTerm;
  const setTerm = setSearchTerm || setLocalSearchTerm;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!term.trim()) {
      // Show a toast message if the search term is empty
      toast({
        title: "Please enter a search term",
        description: "Type something to search for vendors",
        variant: "destructive",
      });
      return;
    }
    
    if (onSearch) {
      // Pass the distanceKm to the onSearch function when location is active
      onSearch(term.trim(), isActive, isActive ? distanceKm : undefined);
    } else {
      // Default behavior - navigate to search page
      navigate(`/search?q=${encodeURIComponent(term.trim())}`);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTerm(e.target.value);
    // Preserve cursor position by preventing page scroll
    if (inputRef.current) {
      const cursorPosition = inputRef.current.selectionStart;
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.selectionStart = cursorPosition;
          inputRef.current.selectionEnd = cursorPosition;
        }
      }, 0);
    }
  };

  return (
    <div className={`relative w-full ${mainPage ? 'mx-auto' : ''} ${className}`}>
      <form onSubmit={handleSearch} className="w-full">
        <div className="relative flex items-center">
          <div className="absolute left-4 text-gray-400">
            <Search size={20} />
          </div>
          <Input
            ref={inputRef}
            type="text"
            placeholder={t("searchPlaceholder")}
            value={term}
            onChange={handleInputChange}
            className="h-12 text-base rounded-3xl border border-blue-500 pl-12 pr-12 focus-visible:ring-blue-200 focus-visible:border-blue-500 shadow-sm hover:shadow-md transition-all hover:border-blue-500 hover:border-2 focus-visible:border-2"
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
              onClick={(e) => {
                e.preventDefault(); // Prevent form submission
                toggleLocation();
              }} 
            />
          </div>
        </div>
      </form>
      
      {isActive && (
        <div className="mt-4 px-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-500">{t("distance")}: {distanceKm} {t("km")}</span>
            <span className="text-xs text-gray-400">{t("distanceEnabled")}</span>
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
