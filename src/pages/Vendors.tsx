
import React, { useState } from 'react';
import { mockVendors } from '@/lib/mockData';
import Layout from '@/components/Layout';
import PrelineVendorCard from '@/components/vendor/PrelineVendorCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Grid, List, SlidersHorizontal } from 'lucide-react';
import { useLanguage } from '@/providers/LanguageProvider';
import CategorySidebar from '@/components/CategorySidebar';
import DistrictFilter from '@/components/DistrictFilter';

const Vendors = () => {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);
  
  // Filter vendors based on search, category, and district
  const filteredVendors = mockVendors.filter(vendor => {
    const matchesSearch = searchQuery === '' || 
      vendor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vendor.description?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = !selectedCategory || vendor.category === selectedCategory;
    const matchesDistrict = !selectedDistrict || vendor.district === selectedDistrict;
    
    return matchesSearch && matchesCategory && matchesDistrict;
  });

  // Handle category selection
  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category === selectedCategory ? null : category);
  };

  // Handle district selection
  const handleDistrictSelect = (district: string) => {
    setSelectedDistrict(district === selectedDistrict ? null : district);
  };
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">{t("vendorsDirectory")}</h1>
        
        <div className="flex mb-6">
          <div className="relative flex-1 mr-4">
            <Input
              placeholder={t("searchVendors")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pr-10"
            />
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
          </div>
          
          <Tabs defaultValue={viewMode} onValueChange={(value) => setViewMode(value as 'grid' | 'list')} className="hidden md:flex">
            <TabsList>
              <TabsTrigger value="grid"><Grid size={18} className="mr-1" /> {t("grid")}</TabsTrigger>
              <TabsTrigger value="list"><List size={18} className="mr-1" /> {t("list")}</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/4 space-y-6">
            <div className="bg-card rounded-lg border p-4">
              <h3 className="font-medium mb-3 flex items-center">
                <SlidersHorizontal size={16} className="mr-2" />
                {t("filters")}
              </h3>
              
              <div className="space-y-6">
                <CategorySidebar onCategorySelect={handleCategorySelect} selectedCategory={selectedCategory} />
                <DistrictFilter onDistrictSelect={handleDistrictSelect} selectedDistrict={selectedDistrict} />
              </div>
            </div>
          </div>
          
          <div className="md:w-3/4">
            <div className={viewMode === 'grid' 
              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" 
              : "space-y-6"
            }>
              {filteredVendors.length > 0 ? (
                filteredVendors.map((vendor) => (
                  <PrelineVendorCard 
                    key={vendor.id}
                    vendor={vendor}
                    isGridView={viewMode === 'grid'}
                    showActions={true}
                    distance={vendor.distance ? `${vendor.distance} km` : null}
                  />
                ))
              ) : (
                <div className="col-span-full text-center py-16">
                  <p className="text-lg text-muted-foreground">{t("noVendorsFound")}</p>
                  <Button 
                    variant="outline" 
                    className="mt-4"
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory(null);
                      setSelectedDistrict(null);
                    }}
                  >
                    {t("clearFilters")}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Vendors;
