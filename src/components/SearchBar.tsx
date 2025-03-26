
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

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
        onSearch(term.trim(), false);
      } else {
        // Default behavior - navigate to search page
        navigate(`/search?q=${encodeURIComponent(term.trim())}`);
      }
    }
  };

  return (
    <form onSubmit={handleSearch} className={`w-full max-w-xl ${mainPage ? 'mx-auto' : ''} ${className}`}>
      <div className="relative flex items-center">
        <div className="absolute left-4 text-gray-400">
          <Search size={20} />
        </div>
        <Input
          type="text"
          placeholder="Search for local businesses..."
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          className="h-12 text-base rounded-3xl border border-gray-300 pl-12 pr-4 focus-visible:ring-gray-200 focus-visible:border-gray-300 shadow-sm hover:shadow-md transition-shadow"
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
