
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Layout from '@/components/Layout';
import VendorCard from '@/components/vendor/VendorCard';
import SearchBar from '@/components/SearchBar';
import { useLocationContext } from '@/providers/LocationProvider';
import { useLanguage } from '@/providers/LanguageProvider';
import { useToast } from '@/hooks/use-toast';
import { aiSearchVendors } from '@/lib/aiSearch';
import { mockVendors } from '@/lib/mockData';
import MistralFallback from '@/components/MistralFallback';

const Search = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useLanguage();
  const { toast } = useToast();
  const { isActive, coordinates, calculateDistance } = useLocationContext();
  
  // Get search query from URL
  const queryParams = new URLSearchParams(location.search);
  const queryFromUrl = queryParams.get('q') || '';
  
  const [searchTerm, setSearchTerm] = useState(queryFromUrl);
  const [filteredVendors, setFilteredVendors] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  
  // Scroll to top when the page loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  useEffect(() => {
    // Update search term if URL query changes
    const query = queryParams.get('q') || '';
    setSearchTerm(query);
    
    if (query) {
      handleSearch(query, isActive);
    }
  }, [location.search]);
  
  const handleSearch = (query, useLocation = false, distanceKm = 10) => {
    if (!query.trim()) {
      setFilteredVendors([]);
      setHasSearched(false);
      return;
    }
    
    let results = aiSearchVendors(mockVendors, query);
    
    if (useLocation && coordinates) {
      results = results.map(vendor => {
        if (vendor.location) {
          const distanceKm = calculateDistance(
            coordinates.lat, 
            coordinates.lng, 
            vendor.location.lat, 
            vendor.location.lng
          );
          return { ...vendor, distanceKm };
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
    
    setFilteredVendors(results);
    setHasSearched(true);
    
    // Update URL without triggering a new search
    const newUrl = `/search?q=${encodeURIComponent(query.trim())}`;
    if (location.pathname + location.search !== newUrl) {
      navigate(newUrl, { replace: true });
    }
    
    if (results.length === 0) {
      toast({
        title: t("noVendorsFoundTitle"),
        description: t("noVendorsFound"),
        duration: 2000
      });
    }
  };
  
  return (
    <Layout>
      <div className="container mx-auto px-4 sm:px-6 md:px-8 py-8">
        <div className="flex justify-center w-full mb-8">
          <SearchBar 
            searchTerm={searchTerm} 
            setSearchTerm={setSearchTerm} 
            onSearch={handleSearch} 
            className="w-full max-w-xl" 
          />
        </div>
        
        <div className="mb-6">
          <h2 className="text-2xl font-bold">{t("searchResults")}</h2>
          {searchTerm && <p className="text-muted-foreground mt-1">{t("searchingFor")}: "{searchTerm}"</p>}
        </div>
        
        {filteredVendors.length === 0 ? (
          <div className="text-center py-4">
            <p className="text-muted-foreground mb-6">
              {t("noVendorsFound")}
            </p>
            
            <MistralFallback searchTerm={searchTerm} />
          </div>
        ) : (
          <div className="flex flex-col space-y-4">
            {filteredVendors.map((vendor, index) => (
              <div 
                key={vendor.id} 
                className="animate-fade-in" 
                style={{animationDelay: `${index * 50}ms`}}
              >
                <VendorCard 
                  vendor={vendor} 
                  showContactMethods={true} 
                  distance={vendor.distanceKm ? `${vendor.distanceKm.toFixed(1)} ${t("km")}` : null} 
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Search;
