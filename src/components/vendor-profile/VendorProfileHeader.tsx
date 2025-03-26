
import React from 'react';
import SearchHeader from '@/components/SearchHeader';

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
    <SearchHeader
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
      handleSearch={handleSearch}
    />
  );
};

export default VendorProfileHeader;
