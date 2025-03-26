
import React, { useState, useCallback, useEffect } from 'react';
import Layout from '@/components/Layout';
import SearchBar from '@/components/SearchBar';
import VendorCard from '@/components/vendor/VendorCard';
import RecentVendors from '@/components/RecentVendors';
import TopSearched from '@/components/TopSearched';
import { mockVendors } from '@/lib/mockData';
import { Vendor } from '@/lib/types';
import { aiSearchVendors } from '@/lib/aiSearch';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

const Index = () => {
  const [vendors] = useState<Vendor[]>(mockVendors);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredVendors, setFilteredVendors] = useState<Vendor[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const { toast } = useToast();

  const handleSearch = useCallback((query: string, useAI: boolean) => {
    console.log('Search initiated:', { query });
    
    if (query.trim() === '') {
      setFilteredVendors([]);
      setHasSearched(false);
      return;
    }
    
    const results = aiSearchVendors(vendors, query);
    console.log('AI search results:', results.length, 'vendors found');
    setFilteredVendors(results);
    setHasSearched(true);
  }, [vendors]);

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
      <div className="w-full bg-black py-16">
        <div className="container mx-auto px-4 sm:px-6 md:px-8">
          <div className="text-center mb-8 max-w-3xl mx-auto">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 mx-auto text-yellow-400">
              Ideālo pakalpojumu sniedzēju katalogs
            </h1>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto mt-3 animate-fade-in">
              Vienkāršākais veids, kā atrast uzticamus un kvalificētus pakalpojumu sniedzējus Latvijā
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto mt-8">
            <SearchBar 
              searchTerm={searchTerm} 
              setSearchTerm={setSearchTerm} 
              onSearch={handleSearch}
            />
          </div>
        </div>
      </div>
      
      {hasSearched && (
        <div className="container mx-auto px-4 sm:px-6 md:px-8 py-8">
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
                  <VendorCard 
                    vendor={vendor} 
                    showContactMethods={true}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      )}
      
      <div className="container mx-auto px-4 sm:px-6 md:px-8">
        {!hasSearched && (
          <>            
            <RecentVendors />
            <TopSearched />
          </>
        )}
      </div>
    </Layout>
  );
};

export default Index;
