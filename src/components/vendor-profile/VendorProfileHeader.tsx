
import React from 'react';
import SearchBar from '@/components/SearchBar';

interface VendorProfileHeaderProps {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  handleSearch: (query: string, useLocation: boolean, distanceKm?: number) => void;
}

const VendorProfileHeader: React.FC<VendorProfileHeaderProps> = ({
  searchTerm,
  setSearchTerm,
  handleSearch
}) => {
  return (
    <div className="flex justify-center w-full mb-8">
      <SearchBar 
        searchTerm={searchTerm} 
        setSearchTerm={setSearchTerm} 
        onSearch={handleSearch} 
        className="w-full max-w-xl" 
      />
    </div>
  );
};

export default VendorProfileHeader;
