
import React, { useState, useCallback, useEffect } from 'react';
import Layout from '@/components/Layout';
import SearchBar from '@/components/SearchBar';
import SearchHeader from '@/components/SearchHeader';
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
import NoSearchResults from '@/components/NoSearchResults';

const Index = () => {
  const [vendors] = useState<Vendor[]>(mockVendors);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredVendors, setFilteredVendors] = useState<Vendor[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [showNoResults, setShowNoResults] = useState(false);
  const { toast } = useToast();
  const { isActive, coordinates, calculateDistance } = useLocationContext();
  const { t } = useLanguage();

  const handleSearch = useCallback((query: string, useLocation: boolean, distanceKm?: number) => {
    console.log('Search initiated:', {
      query,
      useLocation,
      distanceKm
    });
    if (query.trim() === '') {
      setFilteredVendors([]);
      setHasSearched(false);
      setShowNoResults(false);
      return;
    }

    let results = aiSearchVendors(vendors, query);

    if (useLocation && coordinates) {
      results = results.map(vendor => {
        if (vendor.location) {
          const distanceKm = calculateDistance(coordinates.lat, coordinates.lng, vendor.location.lat, vendor.location.lng);
          return {
            ...vendor,
            distanceKm
          };
        }
        return vendor;
      });

      if (distanceKm) {
        results = results.filter(vendor => {
          return !vendor.distanceKm || vendor.distanceKm <= distanceKm;
        });
      }

      results.sort((a, b) => {
        const distA = a.distanceKm || Number.MAX_VALUE;
        const distB = b.distanceKm || Number.MAX_VALUE;
        return distA - distB;
      });
    }
    console.log('Search results:', results.length, 'vendors found');
    setFilteredVendors(results);
    setHasSearched(true);
    setShowNoResults(results.length === 0);
  }, [vendors, coordinates, calculateDistance]);

  useEffect(() => {
    if (hasSearched && filteredVendors.length === 0) {
      toast({
        title: t("noVendorsFoundTitle"),
        description: t("noVendorsFound"),
        duration: 2000
      });
    }
  }, [hasSearched, filteredVendors.length, toast, t]);

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
          {showNoResults && (
            <div className="mb-4 text-center">
              <NoSearchResults searchTerm={searchTerm} />
            </div>
          )}
          
          <SearchBar 
            searchTerm={searchTerm} 
            setSearchTerm={setSearchTerm} 
            onSearch={handleSearch} 
            className="" 
            mainPage={true} 
          />
          
          {hasSearched && filteredVendors.length > 0 ? (
            <div className="flex flex-col space-y-4 mt-6">
              {filteredVendors.map((vendor: any, index) => (
                <div 
                  key={vendor.id} 
                  className="animate-fade-in" 
                  style={{animationDelay: `${index * 50}ms`}}
                >
                  <VendorCard 
                    vendor={vendor} 
                    showContactMethods={true} 
                    distance={vendor.distanceKm ? `${vendor.distanceKm.toFixed(1)} ${t("km")}` : null} 
                  />
                </div>
              ))}
            </div>
          ) : (
            <>
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
            </>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Index;
