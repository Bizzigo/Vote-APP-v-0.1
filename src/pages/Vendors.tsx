
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Layout from '@/components/Layout';
import VendorCard from '@/components/vendor/VendorCard';
import SearchBar from '@/components/SearchBar';
import DistrictFilter from '@/components/DistrictFilter';
import { Vendor } from '@/lib/types';
import { supabase } from '@/integrations/supabase/client';
import NoSearchResults from '@/components/NoSearchResults';
import { aiSearchVendors } from '@/lib/aiSearch';
import { mockVendors } from '@/lib/mockData';
import { useLocationContext } from '@/providers/LocationProvider';

const Vendors = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const queryFromUrl = queryParams.get('q') || '';
  const locationEnabled = queryParams.get('location') === 'true';
  const distanceFromUrl = queryParams.get('distance') ? parseInt(queryParams.get('distance') || '10') : undefined;

  const [searchQuery, setSearchQuery] = useState(queryFromUrl);
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);
  const { isActive, coordinates, calculateDistance } = useLocationContext();
  
  // Scroll to top when the page loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Update searchQuery when URL changes
  useEffect(() => {
    setSearchQuery(queryFromUrl);
  }, [queryFromUrl]);
  
  const { data: vendors = [], isLoading, error } = useQuery({
    queryKey: ['vendors'],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from('vendors')
          .select('*');
          
        if (error) {
          throw error;
        }
        
        return data as Vendor[];
      } catch (e) {
        console.error("Error fetching vendors:", e);
        // Fallback to mock data if there's an error
        return mockVendors;
      }
    }
  });
  
  const getFilteredVendors = () => {
    // Filter by search query
    let results = searchQuery ? aiSearchVendors(vendors, searchQuery) : vendors;
    
    // Filter by district
    if (selectedDistrict) {
      results = results.filter(vendor => vendor.city === selectedDistrict);
    }
    
    // Apply location-based filtering if enabled in the URL
    if (locationEnabled && coordinates && isActive) {
      results = results.map(vendor => {
        if (vendor.location) {
          const distance = calculateDistance(
            coordinates.lat, 
            coordinates.lng, 
            vendor.location.lat, 
            vendor.location.lng
          );
          return {
            ...vendor,
            distanceKm: distance
          };
        }
        return vendor;
      });
      
      // Filter by distance if specified
      if (distanceFromUrl) {
        results = results.filter(vendor => {
          return !vendor.distanceKm || vendor.distanceKm <= distanceFromUrl;
        });
      }
      
      // Sort by distance
      results.sort((a, b) => {
        const distA = a.distanceKm || Number.MAX_VALUE;
        const distB = b.distanceKm || Number.MAX_VALUE;
        return distA - distB;
      });
    }
    
    return results;
  };
  
  const filteredVendors = getFilteredVendors();

  const handleSearch = (query: string, useLocation: boolean, distanceKm?: number) => {
    setSearchQuery(query);
    
    // Update URL with search parameters without page reload
    const searchParams = new URLSearchParams();
    if (query) searchParams.set('q', query);
    if (useLocation) {
      searchParams.set('location', 'true');
      if (distanceKm) searchParams.set('distance', distanceKm.toString());
    }
    if (selectedDistrict) searchParams.set('district', selectedDistrict);
    
    const newUrl = `${window.location.pathname}?${searchParams.toString()}`;
    window.history.pushState({ path: newUrl }, '', newUrl);
  };

  const handleDistrictChange = (district: string | null) => {
    setSelectedDistrict(district);
    
    // Update URL with district parameter
    const searchParams = new URLSearchParams(location.search);
    if (district) {
      searchParams.set('district', district);
    } else {
      searchParams.delete('district');
    }
    
    const newUrl = `${window.location.pathname}?${searchParams.toString()}`;
    window.history.pushState({ path: newUrl }, '', newUrl);
  };

  return (
    <Layout>
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-6">
          {searchQuery ? `Search Results for "${searchQuery}"` : 'Explore Vendors'}
        </h1>
        
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="w-full md:w-2/3">
            <SearchBar 
              searchTerm={searchQuery} 
              setSearchTerm={setSearchQuery} 
              onSearch={handleSearch} 
            />
          </div>
          <div className="w-full md:w-1/3">
            <DistrictFilter 
              vendors={vendors} 
              selectedDistrict={selectedDistrict} 
              onChange={handleDistrictChange} 
            />
          </div>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : error ? (
          <div className="text-red-500 text-center">
            Error loading vendors. Please try again later.
          </div>
        ) : filteredVendors.length === 0 ? (
          <div className="text-center py-12">
            <NoSearchResults searchTerm={searchQuery} />
            <h2 className="text-2xl font-semibold mb-2">No vendors found</h2>
            <p className="text-muted-foreground">
              Try adjusting your search criteria or district filter.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVendors.map((vendor) => (
              <VendorCard 
                key={vendor.id} 
                vendor={vendor} 
                distance={vendor.distanceKm ? `${vendor.distanceKm.toFixed(1)} km` : undefined}
              />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Vendors;
