
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MapPin } from 'lucide-react';
import { useLocationContext } from '@/providers/LocationProvider';

const SearchBar = ({ mainPage = false }: { mainPage?: boolean }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const { isActive, toggleLocation } = useLocationContext();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className={`w-full max-w-3xl ${mainPage ? 'mx-auto' : ''}`}>
      <div className="relative flex items-center">
        <Input
          type="text"
          placeholder="Search for local businesses..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pr-24 h-12 text-base rounded-full border-2 border-gray-200 focus-visible:ring-primary"
        />
        <div className="absolute right-1 flex space-x-1">
          <Button
            type="button"
            size="icon"
            variant={isActive ? "default" : "outline"}
            onClick={toggleLocation}
            className="h-10 w-10 rounded-full"
            title={isActive ? "Location active" : "Use my location"}
          >
            <MapPin className={`h-5 w-5 ${isActive ? "text-white" : "text-gray-500"}`} />
          </Button>
          <Button type="submit" className="rounded-full px-4">
            Search
          </Button>
        </div>
      </div>
    </form>
  );
};

export default SearchBar;
