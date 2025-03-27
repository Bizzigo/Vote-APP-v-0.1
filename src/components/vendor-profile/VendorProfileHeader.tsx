
import React from 'react';
import { useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();
  
  const onSearch = (query: string, useLocation: boolean, distanceKm?: number) => {
    if (handleSearch) {
      handleSearch(query, useLocation, distanceKm);
    } else {
      navigate(`/vendors?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <div className="flex justify-center w-full mb-8">
      <SearchBar 
        searchTerm={searchTerm} 
        setSearchTerm={setSearchTerm} 
        onSearch={onSearch} 
        className="w-full max-w-xl" 
      />
    </div>
  );
};

export default VendorProfileHeader;
