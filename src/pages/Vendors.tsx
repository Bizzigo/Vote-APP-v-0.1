
import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import VendorCard from '@/components/vendor/VendorCard';
import SearchBar from '@/components/SearchBar';
import DistrictFilter from '@/components/DistrictFilter';
import NoSearchResults from '@/components/NoSearchResults';
import { Vendor } from '@/lib/types';
import { supabase } from '@/integrations/supabase/client';

const Vendors = () => {
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(searchParams.get('district'));
  const navigate = useNavigate();
  
  // Scroll to top when the page loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  useEffect(() => {
    // Update search query from URL parameters when they change
    const query = searchParams.get('q');
    const district = searchParams.get('district');
    
    if (query) setSearchQuery(query);
    if (district) setSelectedDistrict(district);
  }, [searchParams]);
  
  const { data: vendors = [], isLoading, error } = useQuery({
    queryKey: ['vendors'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('vendors')
        .select('*');
        
      if (error) {
        throw error;
      }
      
      return data as Vendor[];
    }
  });
  
  const filteredVendors = vendors.filter(vendor => {
    // Filter by search query
    const matchesSearch = 
      !searchQuery ||
      vendor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vendor.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vendor.keywords?.some(keyword => 
        keyword.toLowerCase().includes(searchQuery.toLowerCase())
      );
    
    // Filter by district
    const matchesDistrict = 
      !selectedDistrict || 
      vendor.city === selectedDistrict;
    
    return matchesSearch && matchesDistrict;
  });

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // Update URL params
    const newParams = new URLSearchParams(searchParams);
    if (query) {
      newParams.set('q', query);
    } else {
      newParams.delete('q');
    }
    navigate(`/vendors?${newParams.toString()}`);
  };

  const handleDistrictChange = (district: string | null) => {
    setSelectedDistrict(district);
    // Update URL params
    const newParams = new URLSearchParams(searchParams);
    if (district) {
      newParams.set('district', district);
    } else {
      newParams.delete('district');
    }
    navigate(`/vendors?${newParams.toString()}`);
  };

  return (
    <Layout>
      <div className="container mx-auto py-8">
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="w-full md:w-2/3">
            <SearchBar 
              onSearch={handleSearch} 
              initialValue={searchQuery} 
              searchTerm={searchQuery}
              setSearchTerm={setSearchQuery}
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
            <h2 className="text-2xl font-semibold mb-2">No vendors found</h2>
            <p className="text-muted-foreground mb-6">
              Try adjusting your search criteria or district filter.
            </p>
            {searchQuery && <NoSearchResults searchTerm={searchQuery} />}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVendors.map((vendor) => (
              <VendorCard key={vendor.id} vendor={vendor} />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Vendors;
