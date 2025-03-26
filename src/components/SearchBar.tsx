
import React, { useEffect, useState, useRef } from 'react';
import { Search, Command } from 'lucide-react';
import { 
  Command as CommandPrimitive,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@/components/ui/command';
import { mockVendors } from '@/lib/mockData';
import { useIsMobile } from '@/hooks/use-mobile';

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  onSearch: (query: string, useAI: boolean) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, setSearchTerm, onSearch }) => {
  const [open, setOpen] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const isMobile = useIsMobile();

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
    <div className="relative w-full mx-auto">
      <div className="flex items-center group">
        <div className="relative flex-grow rounded-lg overflow-hidden shadow-lg focus-within:ring-2 focus-within:ring-indigo-400 focus-within:ring-opacity-50">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none z-10">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none z-10">
            <kbd className="hidden sm:inline-flex h-5 items-center gap-1 rounded border bg-[#1E293B] px-1.5 font-mono text-xs text-gray-400">
              <span className="text-xs">⌘</span>K
            </kbd>
          </div>
          <input
            ref={inputRef}
            type="text"
            className="block w-full bg-[#1E293B] pl-12 pr-12 py-4 
              focus:outline-none border-none
              transition-all duration-200 rounded-lg text-white placeholder:text-gray-400
              text-base"
            placeholder="sāc meklēt, piemēram, homeopāts rīgā..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => searchTerm.trim().length >= 2 && setOpen(true)}
            onBlur={() => setTimeout(() => setOpen(false), 200)}
          />
        </div>
      </div>
      
      {open && suggestions.length > 0 && (
        <div className="absolute w-full mt-2 bg-[#1E293B] border border-[#2D3A54] rounded-lg shadow-xl z-50">
          <CommandPrimitive className="rounded-lg">
            <CommandList>
              <CommandGroup heading="Keywords">
                {suggestions.map((suggestion) => (
                  <CommandItem
                    key={suggestion}
                    onSelect={() => handleSelectSuggestion(suggestion)}
                    className="cursor-pointer hover:bg-[#2D3A54] text-gray-200"
                  >
                    <Search className="mr-2 h-4 w-4 text-indigo-400" />
                    <span>{suggestion}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
            <CommandEmpty className="py-4 text-center text-gray-400">No keywords found</CommandEmpty>
          </CommandPrimitive>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
