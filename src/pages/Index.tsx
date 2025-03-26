import React, { useState, useCallback, useEffect } from 'react';
import Layout from '@/components/Layout';
import SearchBar from '@/components/SearchBar';
import VendorCard from '@/components/vendor/VendorCard';
import { mockVendors } from '@/lib/mockData';
import { Vendor } from '@/lib/types';
import { aiSearchVendors, generateSearchSuggestions } from '@/lib/aiSearch';
import { useToast } from '@/hooks/use-toast';
import { useLocationContext } from '@/providers/LocationProvider';
import CategoryGrid from '@/components/CategoryGrid';

const Index = () => {
  const [vendors] = useState<Vendor[]>(mockVendors);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredVendors, setFilteredVendors] = useState<Vendor[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const {
    toast
  } = useToast();
  const {
    isActive,
    coordinates,
    calculateDistance
  } = useLocationContext();

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
  }, [vendors, coordinates, calculateDistance]);

  useEffect(() => {
    let timeoutId: number | undefined;
    if (hasSearched && filteredVendors.length === 0) {
      toast({
        title: "No vendors found",
        description: "Returning to home page in 5 seconds...",
        duration: 4000
      });
      timeoutId = window.setTimeout(() => {
        setHasSearched(false);
        setSearchTerm('');
      }, 5000);
    }
    return () => {
      if (timeoutId) window.clearTimeout(timeoutId);
    };
  }, [hasSearched, filteredVendors.length, toast]);

  return <Layout>
      {!hasSearched ? <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)]">
          <div className="text-center mb-12 max-w-3xl mx-auto">
            <p className="text-muted-foreground max-w-xl mt-3 animate-fade-in text-lg mx-0 my-0">
              Te ir uzticami un profesionāli pakalpojumu sniedzēji. JĀ!
            </p>
          </div>
          
          <div className="w-full max-w-xl mx-auto px-4 relative">
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} onSearch={handleSearch} className="" mainPage={true} />
            
            <div className="mt-10 mb-8 w-full">
              <h2 className="text-lg font-medium text-center mb-5">Popular Categories</h2>
              <CategoryGrid />
            </div>
          </div>
        </div> : <div className="container mx-auto px-4 sm:px-6 md:px-8 py-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Search Results</h2>
            {filteredVendors.length > 0 && <button onClick={() => {
          setHasSearched(false);
          setSearchTerm('');
        }} className="text-sm text-primary hover:text-primary/80">
                Back to Explore
              </button>}
          </div>
          
          {filteredVendors.length === 0 ? <div className="text-center py-8">
              <p className="text-muted-foreground">
                No vendors found. Try adjusting your search.
              </p>
            </div> : <div className="flex flex-col space-y-4">
              {filteredVendors.map((vendor: any, index) => <div key={vendor.id} className="animate-fade-in" style={{
          animationDelay: `${index * 50}ms`
        }}>
                  <VendorCard vendor={vendor} showContactMethods={true} distance={vendor.distanceKm ? `${vendor.distanceKm.toFixed(1)} km` : null} />
                </div>)}
            </div>}
        </div>}
    </Layout>;
};

export default Index;
