
import React from 'react';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="relative max-w-lg w-full mx-auto mb-8">
      <div className="flex">
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-muted-foreground" />
          </div>
          <input
            type="text"
            className="block w-full bg-white border border-[#1877F2] border-1 pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#1877F2] focus:border-transparent transition-all duration-200"
            placeholder="Search candidates by name, district, or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button 
          className="ml-2 bg-[#1877F2] hover:bg-[#166FE5] text-white px-4 py-3 h-auto"
        >
          ATRAST KANDIDĀTU
        </Button>
      </div>
    </div>
  );
};

export default SearchBar;
