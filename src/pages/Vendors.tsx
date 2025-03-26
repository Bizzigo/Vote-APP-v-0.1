
import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { mockVendors } from '@/lib/mockData';
import { Vendor } from '@/lib/types';
import PrelineVendorCard from '@/components/vendor/PrelineVendorCard';
import { useToast } from '@/hooks/use-toast';
import SearchBar from '@/components/SearchBar';
import { aiSearchVendors } from '@/lib/aiSearch';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/providers/LanguageProvider';
import { Filter, Grid3X3, LayoutList, SlidersHorizontal } from 'lucide-react';
import CategorySidebar from '@/components/CategorySidebar';

const Vendors = () => {
  const [vendors, setVendors] = useState<Vendor[]>(mockVendors);
  const [filteredVendors, setFilteredVendors] = useState<Vendor[]>(mockVendors);
  const [searchTerm, setSearchTerm] = useState('');
  const [isGridView, setIsGridView] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const { toast } = useToast();
  const { t } = useLanguage();
  
  const handleSearch = (query: string, useLocation: boolean, distanceKm?: number) => {
    if (query.trim() === '') {
      setFilteredVendors(vendors);
      return;
    }
    
    const results = aiSearchVendors(vendors, query);
    setFilteredVendors(results);
  };
  
  const toggleView = () => {
    setIsGridView(!isGridView);
  };
  
  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Filters Sidebar (visible on larger screens or when toggled) */}
          <div className={`w-full md:w-64 flex-shrink-0 transition-all duration-300 ease-in-out ${showFilters ? 'block' : 'hidden md:block'}`}>
            <div className="sticky top-24 bg-card rounded-xl border border-border shadow-sm p-5">
              <h3 className="text-lg font-semibold mb-4">{t("filters")}</h3>
              <CategorySidebar onCategorySelect={(category) => handleSearch(category, false)} />
            </div>
          </div>
          
          {/* Main Content */}
          <div className="flex-1">
            <div className="mb-6 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">{t("allVendors")}</h1>
                <div className="flex items-center gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="md:hidden" 
                    onClick={toggleFilters}
                  >
                    <SlidersHorizontal size={18} />
                    <span className="ml-2">{t("filters")}</span>
                  </Button>
                  <Button 
                    variant={isGridView ? "default" : "outline"} 
                    size="icon" 
                    onClick={() => setIsGridView(true)}
                  >
                    <Grid3X3 size={18} />
                  </Button>
                  <Button 
                    variant={!isGridView ? "default" : "outline"} 
                    size="icon" 
                    onClick={() => setIsGridView(false)}
                  >
                    <LayoutList size={18} />
                  </Button>
                </div>
              </div>
              
              <SearchBar 
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                onSearch={handleSearch}
                className="w-full"
              />
              
              <div className="flex items-center justify-between">
                <p className="text-muted-foreground">
                  {filteredVendors.length} {filteredVendors.length === 1 ? t("vendor") : t("vendors")}
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">{t("sortBy")}:</span>
                  <select 
                    className="text-sm bg-transparent border-none focus:ring-0 cursor-pointer"
                    defaultValue="rating"
                  >
                    <option value="rating">{t("highestRated")}</option>
                    <option value="name">{t("nameAZ")}</option>
                    <option value="newest">{t("newest")}</option>
                  </select>
                </div>
              </div>
            </div>
            
            {/* Grid or List View */}
            {isGridView ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredVendors.map((vendor, index) => (
                  <div 
                    key={vendor.id} 
                    className="animate-fade-in" 
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <PrelineVendorCard 
                      vendor={vendor}
                      isGridView={true}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col space-y-4">
                {filteredVendors.map((vendor, index) => (
                  <div 
                    key={vendor.id} 
                    className="animate-fade-in" 
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <PrelineVendorCard 
                      vendor={vendor}
                      isGridView={false}
                    />
                  </div>
                ))}
              </div>
            )}
            
            {filteredVendors.length === 0 && (
              <div className="text-center py-16 border border-dashed rounded-xl bg-card/50">
                <p className="text-muted-foreground text-lg">
                  {t("noVendorsFound")}
                </p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => {
                    setSearchTerm('');
                    setFilteredVendors(vendors);
                  }}
                >
                  {t("resetFilters")}
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Vendors;
