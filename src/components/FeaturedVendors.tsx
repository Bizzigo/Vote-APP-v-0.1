
import React from 'react';
import { Link } from 'react-router-dom';
import { mockVendors } from '@/lib/mockData';
import PrelineVendorCard from '@/components/vendor/PrelineVendorCard';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/providers/LanguageProvider';

const FeaturedVendors = () => {
  const { t } = useLanguage();
  // Only show 3 vendors
  const featuredVendors = mockVendors.slice(0, 3);
  
  return (
    <div className="py-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">{t("featuredVendors")}</h2>
        <Link to="/vendors">
          <Button variant="ghost" className="group">
            {t("viewAll")}
            <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {featuredVendors.map((vendor, index) => (
          <div 
            key={vendor.id} 
            className="animate-fade-in" 
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <PrelineVendorCard 
              vendor={vendor}
              isGridView={true}
              showActions={true}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedVendors;
