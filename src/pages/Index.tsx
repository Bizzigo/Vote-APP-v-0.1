
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
      <div className="py-8 md:py-12">
        <div className="text-center mb-10 max-w-3xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 animate-fade-in">
            Vendor Directory
          </h1>
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
                  onClick={() => {
                    setHasSearched(false);
                    setSearchTerm('');
                  }}
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
