
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
import { Briefcase, Building, Coffee, Construction, Hammer, Laptop, ServerCog, Shirt, Truck, Wrench } from 'lucide-react';

const categories = [
  { name: 'IT Services', count: 247, icon: Laptop, slug: 'it-services' },
  { name: 'Construction', count: 184, icon: Construction, slug: 'construction' },
  { name: 'Manufacturing', count: 156, icon: Wrench, slug: 'manufacturing' },
  { name: 'Retail', count: 132, icon: Shirt, slug: 'retail' },
  { name: 'Transportation', count: 117, icon: Truck, slug: 'transportation' },
  { name: 'Business Services', count: 104, icon: Briefcase, slug: 'business-services' },
  { name: 'Food & Beverage', count: 93, icon: Coffee, slug: 'food-beverage' },
  { name: 'Technical Services', count: 86, icon: ServerCog, slug: 'technical-services' },
  { name: 'Craftsmanship', count: 74, icon: Hammer, slug: 'craftsmanship' },
  { name: 'Corporate Services', count: 68, icon: Building, slug: 'corporate-services' },
];

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
    
    // Use AI search on the vendors array
    const results = aiSearchVendors(vendors, query);
    console.log('AI search results:', results.length, 'vendors found');
    setFilteredVendors(results);
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
      {/* Hero Section - Full width with no horizontal borders */}
      <div className="w-full hero-gradient py-16">
        <div className="container mx-auto px-4 sm:px-6 md:px-8">
          <div className="text-center mb-8 max-w-3xl mx-auto">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 mx-auto text-white">
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
      
      {/* Search Results Section - Moved above categories */}
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
                  <VendorCard vendor={vendor} />
                </div>
              ))}
            </div>
          )}
        </div>
      )}
      
      {/* Categories Grid - Below search results */}
      <div className="container mx-auto px-4 sm:px-6 md:px-8 py-12">
        <h2 className="text-2xl font-bold mb-6">Popular Categories</h2>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {categories.map((category) => (
            <Link 
              key={category.slug}
              to={`/category/${category.slug}`}
              className="flex items-center justify-between p-4 bg-card rounded-lg border border-border hover:border-accent/50 transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-2 rounded-full">
                  <category.icon className="h-5 w-5 text-primary" />
                </div>
                <span>{category.name}</span>
              </div>
              <Badge variant="outline" className="text-xs font-normal">
                {category.count}
              </Badge>
            </Link>
          ))}
        </div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 md:px-8 py-8 w-full max-w-full">
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
