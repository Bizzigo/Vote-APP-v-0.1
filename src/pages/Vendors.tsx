
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Layout from '@/components/Layout';
import VendorCard from '@/components/vendor/VendorCard';
import SearchBar from '@/components/SearchBar';
import DistrictFilter from '@/components/DistrictFilter';
import { Vendor } from '@/lib/types';
import { supabase } from '@/integrations/supabase/client';

const Vendors = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);
  
  // Scroll to top when the page loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
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
    // Navigate to dedicated search page
    if (query.trim().length > 0) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  const handleDistrictChange = (district: string | null) => {
    setSelectedDistrict(district);
  };

  return (
    <Layout>
      <div className="container mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold mb-6">Explore Vendors</h1>
        
        <div className="flex justify-center w-full my-6">
          <SearchBar 
            searchTerm={searchQuery} 
            setSearchTerm={setSearchQuery} 
            onSearch={handleSearch} 
            className="w-full max-w-xl" 
          />
        </div>
        
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="w-full">
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
            <p className="text-muted-foreground">
              Try adjusting your search criteria or district filter.
            </p>
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
