
import React, { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import SearchBar from '@/components/SearchBar';
import VendorCard from '@/components/vendor/VendorCard';
import { mockVendors } from '@/lib/mockData';
import { Vendor } from '@/lib/types';
import { aiSearchVendors } from '@/lib/aiSearch';
import { useToast } from '@/hooks/use-toast';
import { useLocationContext } from '@/providers/LocationProvider';
import { useLanguage } from '@/providers/LanguageProvider';
import CategoryGrid from '@/components/CategoryGrid';
import UserProfileBadge from '@/components/UserProfileBadge';
import WeatherBadge from '@/components/WeatherBadge';

const Index = () => {
  const navigate = useNavigate();
  const [vendors] = useState<Vendor[]>(mockVendors);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredVendors, setFilteredVendors] = useState<Vendor[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const { toast } = useToast();
  const { isActive, coordinates, calculateDistance } = useLocationContext();
  const { t } = useLanguage();

  const handleSearch = useCallback((query: string, useLocation: boolean, distanceKm?: number) => {
    if (!query.trim()) {
      setFilteredVendors([]);
      setHasSearched(false);
      return;
    }
    
    // Navigate to the search page with the query
    navigate(`/search?q=${encodeURIComponent(query.trim())}`);
  }, [navigate]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      <div className="container mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-300px)]">
          <div className="text-center mb-2 max-w-3xl mx-auto">
            <p className="text-muted-foreground max-w-xl mt-0 mb-3 animate-fade-in text-lg mx-auto">
              {t("heroText")}
            </p>
          </div>
          
          <div className="w-full max-w-xl mx-auto relative">
            <SearchBar 
              searchTerm={searchTerm} 
              setSearchTerm={setSearchTerm} 
              onSearch={handleSearch} 
              className="" 
              mainPage={true} 
            />
            <div className="mt-8 w-full">
              <CategoryGrid onCategorySelect={category => handleSearch(category, isActive)} />
            </div>
            
            <div className="mt-6 mb-4">
              <UserProfileBadge className="py-2" />
            </div>
            
            <div className="mt-4 space-y-4">
              {isActive && (
                <WeatherBadge />
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
