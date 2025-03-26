
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
import { CheckCircle2, Clock, TrendingUp } from 'lucide-react';

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
      <div className="relative py-16 px-4 sm:px-6 md:px-8 mb-12 rounded-xl bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/10">
        <div className="text-center mb-8 max-w-3xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 mx-auto">
            Ideālo pakalpojumu sniedzēju katalogs
          </h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto mt-3 animate-fade-in">
            Vienkāršākais veids, kā atrast uzticamus un kvalificētus pakalpojumu sniedzējus Latvijā
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <SearchBar 
            searchTerm={searchTerm} 
            setSearchTerm={setSearchTerm} 
            onSearch={handleSearch}
          />
        </div>
      </div>
      
      <div className="py-8 w-full max-w-full">
        {!hasSearched && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="bg-card border rounded-lg p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                  </div>
                  <h2 className="font-medium text-lg">Verified Providers</h2>
                </div>
                <p className="text-muted-foreground text-sm">
                  All service providers in our directory are vetted and verified for quality and reliability.
                </p>
              </div>
              
              <div className="bg-card border rounded-lg p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <TrendingUp className="h-5 w-5 text-primary" />
                  </div>
                  <h2 className="font-medium text-lg">Top Rated</h2>
                </div>
                <p className="text-muted-foreground text-sm">
                  Discover service providers with high satisfaction ratings from real customers.
                </p>
              </div>
              
              <div className="bg-card border rounded-lg p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <h2 className="font-medium text-lg">Quick Response</h2>
                </div>
                <p className="text-muted-foreground text-sm">
                  Our service providers are committed to responding to your inquiries within 24 hours.
                </p>
              </div>
            </div>
            
            <RecentVendors />
            <TopSearched />
            <CategoryCloud />
          </>
        )}
        
        {hasSearched && (
          <div className="mt-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Search Results</h2>
              {filteredVendors.length > 0 && (
                <button 
                  onClick={() => {
                    setHasSearched(false);
                    setSearchTerm('');
                  }}
                  className="text-sm text-primary hover:text-primary/80"
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
