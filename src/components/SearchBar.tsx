
import React, { useEffect, useState, useRef } from 'react';
import { Search } from 'lucide-react';
import { 
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@/components/ui/command';
import { mockVendors } from '@/lib/mockData';

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  onSearch: (query: string, useAI: boolean) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, setSearchTerm, onSearch }) => {
  const [open, setOpen] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  // Generate search suggestions based on input
  useEffect(() => {
    if (searchTerm.trim().length >= 2) {
      // Only get suggestions from vendor keywords
      const keywordMatches = mockVendors
        .filter(vendor => vendor.keywords?.some(keyword => 
          keyword.toLowerCase().includes(searchTerm.toLowerCase())
        ))
        .flatMap(vendor => vendor.keywords || [])
        .filter(keyword => 
          keyword.toLowerCase().includes(searchTerm.toLowerCase())
        );
      
      // Remove duplicates
      const uniqueKeywords = [...new Set(keywordMatches)];
      
      // Limit to top 5 most relevant suggestions
      setSuggestions(uniqueKeywords.slice(0, 5));
      setOpen(true);
    } else {
      setSuggestions([]);
      setOpen(false);
    }
  }, [searchTerm]);

  // Effect for instant search when searchTerm has 4 or more characters
  useEffect(() => {
    if (searchTerm.trim().length >= 4) {
      const debounceTimer = setTimeout(() => {
        console.log('Instant search triggered:', { searchTerm });
        onSearch(searchTerm, true);
      }, 300); // 300ms debounce to prevent too many searches while typing

      return () => clearTimeout(debounceTimer);
    }
  }, [searchTerm, onSearch]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearch(searchTerm, true);
      setOpen(false);
    }
  };

  const handleSelectSuggestion = (suggestion: string) => {
    setSearchTerm(suggestion);
    onSearch(suggestion, true);
    setOpen(false);
    
    // Refocus the input after selection
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div className="relative max-w-lg w-full mx-auto mb-8">
      <div className="flex flex-col space-y-2">
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
            <Search className="h-5 w-5 text-muted-foreground" />
          </div>
          <input
            ref={inputRef}
            type="text"
            className={`block w-full bg-white border border-[#1877F2] pl-10 pr-4 py-3 
              focus:outline-none focus:ring-2 focus:ring-[#1877F2] focus:border-transparent 
              transition-all duration-200 rounded-none
              ${searchTerm ? 'border-2' : 'border-1'}`}
            placeholder="Search vendors by name, category, services, or keywords..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => searchTerm.trim().length >= 2 && setOpen(true)}
            onBlur={() => setTimeout(() => setOpen(false), 200)}
          />
          
          {open && suggestions.length > 0 && (
            <div className="absolute w-full mt-1 bg-white border border-gray-200 shadow-lg z-50">
              <Command className="rounded-lg border shadow-md">
                <CommandList>
                  <CommandGroup heading="Keywords">
                    {suggestions.map((suggestion) => (
                      <CommandItem
                        key={suggestion}
                        onSelect={() => handleSelectSuggestion(suggestion)}
                        className="cursor-pointer hover:bg-slate-100"
                      >
                        <Search className="mr-2 h-4 w-4" />
                        <span>{suggestion}</span>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
                <CommandEmpty>No keywords found</CommandEmpty>
              </Command>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
