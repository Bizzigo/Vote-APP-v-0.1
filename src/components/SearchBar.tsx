
import React, { useEffect } from 'react';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  onSearch: (query: string, useAI: boolean) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, setSearchTerm, onSearch }) => {
  const handleSearch = () => {
    console.log('Search button clicked:', { searchTerm });
    onSearch(searchTerm, true);
  };

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
        <p className="text-xs text-muted-foreground px-2">
          Search by vendor name, category, city, or description. Type at least 4 characters for instant results.
        </p>
      </div>
    </div>
  );
};

export default SearchBar;
