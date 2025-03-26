
import React, { useState, useCallback, useEffect } from 'react';
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

const Index = () => {
  const [vendors] = useState<Vendor[]>(mockVendors);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredVendors, setFilteredVendors] = useState<Vendor[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
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
      return;
    }

    // Get base search results from AI search
    let results = aiSearchVendors(vendors, query);

    // Add distance calculations if location is active
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

      // Filter by maximum distance if a distance limit is set
      if (distanceKm) {
        results = results.filter(vendor => {
          // Keep vendors with a distance less than or equal to the specified maximum
          // or vendors without location data
          return !vendor.distanceKm || vendor.distanceKm <= distanceKm;
        });
      }

      // Sort by distance if location filtering is active
      results.sort((a, b) => {
        const distA = a.distanceKm || Number.MAX_VALUE;
        const distB = b.distanceKm || Number.MAX_VALUE;
        return distA - distB;
      });
    }
    console.log('Search results:', results.length, 'vendors found');
    setFilteredVendors(results);
    setHasSearched(true);
  }, [vendors, coordinates, calculateDistance]);

  useEffect(() => {
    let timeoutId: number | undefined;
    if (hasSearched && filteredVendors.length === 0) {
      toast({
        title: t("noVendorsFoundTitle"),
        description: t("returningToHome"),
        duration: 2000
      });
      timeoutId = window.setTimeout(() => {
        setHasSearched(false);
        setSearchTerm('');
      }, 3000);
    }
    return () => {
      if (timeoutId) window.clearTimeout(timeoutId);
    };
  }, [hasSearched, filteredVendors.length, toast, t]);

  // Make sure we scroll to top when the page loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      {!hasSearched ? (
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
          </div>
        </div>
      ) : (
        <div className="container mx-auto px-4 sm:px-6 md:px-8 py-8">
          <div className="flex justify-center w-full mb-8">
            <SearchBar 
              searchTerm={searchTerm} 
              setSearchTerm={setSearchTerm} 
              onSearch={handleSearch} 
              className="w-full max-w-xl" 
            />
          </div>
          
          <div className="mb-6">
            <h2 className="text-2xl font-bold">{t("searchResults")}</h2>
          </div>
          
          {filteredVendors.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">
                {t("noVendorsFound")}
              </p>
            </div>
          ) : (
            <div className="flex flex-col space-y-4">
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
          )}
        </div>
      )}
    </Layout>
  );
};

export default Index;
