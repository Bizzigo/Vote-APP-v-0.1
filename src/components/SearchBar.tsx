
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';

const SearchBar = ({ 
  searchTerm, 
  setSearchTerm, 
  onSearch, 
  className = "",
  mainPage = false 
}: { 
  searchTerm?: string; 
  setSearchTerm?: React.Dispatch<React.SetStateAction<string>>; 
  onSearch?: (query: string, useLocation: boolean) => void;
  className?: string;
  mainPage?: boolean;
}) => {
  const navigate = useNavigate();
  
  // Local state for standalone usage (when props aren't provided)
  const [localSearchTerm, setLocalSearchTerm] = React.useState('');
  
  // Use either provided props or local state
  const term = searchTerm !== undefined ? searchTerm : localSearchTerm;
  const setTerm = setSearchTerm || setLocalSearchTerm;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (term.trim()) {
      if (onSearch) {
        // If onSearch is provided, use it (for Index.tsx)
        onSearch(term.trim(), false); // Always set useLocation to false since we removed the feature
      } else {
        // Default behavior - navigate to search page
        navigate(`/search?q=${encodeURIComponent(term.trim())}`);
      }
    }
  };

  return (
    <form onSubmit={handleSearch} className={`w-full max-w-3xl ${mainPage ? 'mx-auto' : ''} ${className}`}>
      <div className="relative">
        <Input
          type="text"
          placeholder="Search for local businesses..."
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          className="h-12 text-base rounded-none border-2 border-gray-300 focus-visible:ring-primary"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              handleSearch(e);
            }
          }}
        />
      </div>
    </form>
  );
};

export default SearchBar;
