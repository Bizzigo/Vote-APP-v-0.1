
import React, { useState, useCallback, useEffect } from 'react';
import Layout from '@/components/Layout';
import SearchBar from '@/components/SearchBar';
import VendorCard from '@/components/vendor/VendorCard';
import RecentVendors from '@/components/RecentVendors';
import TopSearched from '@/components/TopSearched';
import CategoryCloud from '@/components/CategoryCloud';
import { mockVendors } from '@/lib/mockData';
import { Vendor } from '@/lib/types';
import { aiSearchVendors } from '@/lib/aiSearch';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [vendors] = useState<Vendor[]>(mockVendors);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredVendors, setFilteredVendors] = useState<Vendor[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const { toast } = useToast();

  // Using useCallback to memoize the search function
  const handleSearch = useCallback((query: string, useAI: boolean) => {
    console.log('Search initiated:', { query });
    
    if (query.trim() === '') {
      setFilteredVendors([]);
      setHasSearched(false);
      return;
    }
    
    // Always use AI search
    const results = aiSearchVendors(vendors, query);
    setFilteredVendors(results);
    console.log('AI search results:', results);
    
    setHasSearched(true);
  }, [vendors]);

  // Effect to reset page after 5 seconds when no results are found
  useEffect(() => {
    let timeoutId: number | undefined;
    
    if (hasSearched && filteredVendors.length === 0) {
      toast({
        title: "No vendors found",
        description: "Returning to home page in 5 seconds...",
        duration: 4000,
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

  return (
    <Layout>
      <div className="bg-[#0F172A] text-white py-16 w-full px-4 sm:px-6 md:px-8 mb-6 left-0 right-0 box-border border-b border-[#1E293B]">
        <div className="text-center mb-8 max-w-3xl mx-auto">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-4 mx-auto bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400">
            Ideālo pakalpojumu sniedzēju katalogs
          </h1>
          <p className="text-sm sm:text-base text-gray-400 max-w-xl mx-auto mt-3 animate-fade-in">
            Vienkāršākais veids, kā atrast uzticamus un kvalificētus pakalpojumu sniedzējus Latvijā
          </p>
        </div>
        
        <div className="max-w-xl mx-auto">
          <SearchBar 
            searchTerm={searchTerm} 
            setSearchTerm={setSearchTerm} 
            onSearch={handleSearch}
          />
        </div>
      </div>
      
      <div className="py-8 px-4 sm:px-6 md:px-8 w-full max-w-full">
        {!hasSearched && (
          <>
            <RecentVendors />
            <TopSearched />
            <CategoryCloud />
          </>
        )}
        
        {hasSearched && (
          <div className="mt-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">Search Results</h2>
              {filteredVendors.length > 0 && (
                <button 
                  onClick={() => {
                    setHasSearched(false);
                    setSearchTerm('');
                  }}
                  className="text-sm text-indigo-400 hover:text-indigo-300"
                >
                  Back to Explore
                </button>
              )}
            </div>
            
            {filteredVendors.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-400">
                  No vendors found. Try adjusting your search.
                </p>
              </div>
            ) : (
              <div className="flex flex-col space-y-4">
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
