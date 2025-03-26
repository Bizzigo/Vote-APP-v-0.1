
import React, { useState, useEffect, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  onSearch: (value: string, useAI: boolean) => void;
  className?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ 
  searchTerm, 
  setSearchTerm, 
  onSearch, 
  className = '' 
}) => {
  const [placeholder, setPlaceholder] = useState('Search for service providers...');
  const searchTimeoutRef = useRef<number | null>(null);
  
  // Placeholder text rotation for better UX
  useEffect(() => {
    const placeholders = [
      'Search for service providers...',
      'Find IT services in Riga...',
      'Looking for construction companies?',
      'Need a graphic designer?',
      'Find transportation services...'
    ];
    
    let currentIndex = 0;
    const intervalId = setInterval(() => {
      currentIndex = (currentIndex + 1) % placeholders.length;
      setPlaceholder(placeholders[currentIndex]);
    }, 5000);
    
    return () => clearInterval(intervalId);
  }, []);
  
  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) {
        window.clearTimeout(searchTimeoutRef.current);
      }
    };
  }, []);
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchTimeoutRef.current) {
      window.clearTimeout(searchTimeoutRef.current);
      searchTimeoutRef.current = null;
    }
    onSearch(searchTerm, true);
  };
  
  // Handle clear button click
  const handleClear = () => {
    setSearchTerm('');
    onSearch('', true);
  };

  // Handle key press for instant search on Enter
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (searchTimeoutRef.current) {
        window.clearTimeout(searchTimeoutRef.current);
        searchTimeoutRef.current = null;
      }
      onSearch(searchTerm, true);
    }
  };

  // Handle input change with debounced search
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    
    // Clear any existing timeout
    if (searchTimeoutRef.current) {
      window.clearTimeout(searchTimeoutRef.current);
      searchTimeoutRef.current = null;
    }
    
    // Trigger search after a short delay if value length > 2
    if (value.length > 2) {
      searchTimeoutRef.current = window.setTimeout(() => {
        onSearch(value, true);
        searchTimeoutRef.current = null;
      }, 500);
    } else if (value.length === 0) {
      // Clear search results when input is empty
      onSearch('', true);
    }
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className={`relative flex w-full mx-auto ${className}`}
    >
      <div className="relative w-full">
        <Input
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="w-full pl-10 pr-12 h-12 text-base border border-input shadow-sm rounded-lg focus-visible:ring-primary"
          autoComplete="off"
        />
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        
        {searchTerm && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-10 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Clear search</span>
          </button>
        )}
      </div>
    </form>
  );
};

export default SearchBar;
