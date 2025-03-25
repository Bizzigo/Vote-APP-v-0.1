
import React from 'react';
import { Vendor } from '@/lib/types';
import { mockVendors } from '@/lib/mockData';
import VendorCard from '@/components/VendorCard';

const TopSearched = () => {
  // In a real app, this would be based on actual search data
  const topSearched = mockVendors.slice(5, 10);
  
  return (
    <div className="my-8">
      <h2 className="text-2xl font-semibold mb-4">Top Searched Vendors</h2>
      <div className="flex flex-col space-y-4">
        {topSearched.map((vendor: Vendor, index) => (
          <div 
            key={vendor.id} 
            className="animate-fade-in" 
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <VendorCard vendor={vendor} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopSearched;
