
import React from 'react';
import SearchBar from '@/components/SearchBar';

interface SearchHeaderProps {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  handleSearch: (query: string, useLocation: boolean, distanceKm?: number) => void;
}

const SearchHeader: React.FC<SearchHeaderProps> = ({
  searchTerm,
  setSearchTerm,
  handleSearch
}) => {
  return (
    <div className="container mx-auto px-4 sm:px-6 md:px-8 py-6">
      <div className="flex justify-center w-full">
        <SearchBar 
          searchTerm={searchTerm} 
          setSearchTerm={setSearchTerm} 
          onSearch={handleSearch} 
          className="w-full max-w-xl" 
        />
      </div>
    </div>
  );
};

export default SearchHeader;
