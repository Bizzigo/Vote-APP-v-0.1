
import React, { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import SearchBar from '@/components/SearchBar';
import { mockVendors } from '@/lib/mockData';
import { Vendor } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { useLocationContext } from '@/providers/LocationProvider';
import { useLanguage } from '@/providers/LanguageProvider';
import CategoryGrid from '@/components/CategoryGrid';
import UserProfileBadge from '@/components/UserProfileBadge';
import WeatherBadge from '@/components/WeatherBadge';

const Index = () => {
  const [vendors] = useState<Vendor[]>(mockVendors);
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();
  const { isActive } = useLocationContext();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const handleSearch = useCallback((query: string, useLocation: boolean, distanceKm?: number) => {
    console.log('Search initiated:', {
      query,
      useLocation,
      distanceKm
    });
    
    if (query.trim() === '') {
      toast({
        title: t("emptySearchTitle"),
        description: t("emptySearchDescription"),
        duration: 2000
      });
      return;
    }

    // Construct the search URL with parameters
    let searchUrl = `/vendors?q=${encodeURIComponent(query.trim())}`;
    
    // Add location parameters if location is active
    if (useLocation) {
      searchUrl += `&location=true`;
      if (distanceKm) {
        searchUrl += `&distance=${distanceKm}`;
      }
    }
    
    // Navigate to the vendors page with search parameters
    navigate(searchUrl);
    
  }, [navigate, toast, t]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)]">
        <div className="text-center mb-2 max-w-3xl mx-auto">
          <p className="text-muted-foreground max-w-xl mt-0 mb-3 animate-fade-in text-lg mx-auto">
            {t("heroText")}
          </p>
        </div>
        
        <div className="w-full max-w-xl mx-auto px-4 relative">
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
    </Layout>
  );
};

export default Index;
