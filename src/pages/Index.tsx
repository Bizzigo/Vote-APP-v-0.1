
import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import SearchBar from '@/components/SearchBar';
import VendorCard from '@/components/VendorCard';
import RecentVendors from '@/components/RecentVendors';
import TopSearched from '@/components/TopSearched';
import CategoryCloud from '@/components/CategoryCloud';
import { mockVendors } from '@/lib/mockData';
import { Vendor } from '@/lib/types';
import { aiSearchVendors } from '@/lib/aiSearch';

const Index = () => {
  const [vendors, setVendors] = useState<Vendor[]>(mockVendors);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredVendors, setFilteredVendors] = useState<Vendor[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = (query: string, useAI: boolean) => {
    console.log('Search initiated:', { query, useAI });
    
    if (useAI) {
      // Use AI-powered search
      const results = aiSearchVendors(vendors, query);
      setFilteredVendors(results);
      console.log('AI search results:', results);
    } else {
      // Use basic search
      const filtered = vendors.filter((vendor) => {
        const matchesSearch =
          query === '' ||
          vendor.name.toLowerCase().includes(query.toLowerCase()) ||
          vendor.category.toLowerCase().includes(query.toLowerCase()) ||
          vendor.description.toLowerCase().includes(query.toLowerCase()) ||
          vendor.city.toLowerCase().includes(query.toLowerCase());

        return matchesSearch;
      });
      
      // Sort by rating
      const sorted = [...filtered].sort((a, b) => b.rating - a.rating);
      setFilteredVendors(sorted);
      console.log('Basic search results:', sorted);
    }
    
    setHasSearched(true);
  };

  return (
    <Layout>
      <div className="py-8 md:py-12">
        <div className="text-center mb-10 max-w-3xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 animate-fade-in">
            Vendor Directory
          </h1>
          <p className="text-muted-foreground animate-fade-in animation-delay-150">
            Find the perfect vendors for your business needs. Search by name, category, or location.
          </p>
        </div>
        
        <SearchBar 
          searchTerm={searchTerm} 
          setSearchTerm={setSearchTerm} 
          onSearch={handleSearch}
        />
        
        {!hasSearched && (
          <>
            <RecentVendors />
            <TopSearched />
            <CategoryCloud />
          </>
        )}
        
        {hasSearched && (
          <div className="mt-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold">Search Results</h2>
              {filteredVendors.length > 0 && (
                <button 
                  onClick={() => setHasSearched(false)} 
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  Back to Explore
                </button>
              )}
            </div>
            
            {filteredVendors.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">
                  No vendors found. Try adjusting your search.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredVendors.map((vendor, index) => (
                  <div 
                    key={vendor.id} 
                    className="animate-fade-in" 
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <VendorCard vendor={vendor} />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Index;
