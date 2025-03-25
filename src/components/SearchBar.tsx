
import React, { useEffect } from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  onSearch: (query: string, useAI: boolean) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, setSearchTerm, onSearch }) => {
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
    }
  };

  return (
    <div className="relative max-w-lg w-full mx-auto mb-8">
      <div className="flex flex-col space-y-2">
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-muted-foreground" />
          </div>
          <input
            type="text"
            className={`block w-full bg-white border border-[#1877F2] pl-10 pr-4 py-3 
              focus:outline-none focus:ring-2 focus:ring-[#1877F2] focus:border-transparent 
              transition-all duration-200 rounded-none
              ${searchTerm ? 'border-2' : 'border-1'}`}
            placeholder="Search vendors by name, category, services, or keywords..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
