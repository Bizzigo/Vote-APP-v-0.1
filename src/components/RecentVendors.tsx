
import React from 'react';
import { mockVendors } from '@/lib/mockData';
import { Vendor } from '@/lib/types';
import VendorCard from '@/components/vendor/VendorCard';

const RecentVendors = () => {
  // Show 5 vendors
  const recentVendors = mockVendors.slice(0, 5);
  
  return (
    <div className="container mx-auto px-4 sm:px-6 md:px-8 py-8">
      <h2 className="text-2xl font-semibold mb-4">Recently Added Vendors</h2>
      <div className="flex flex-col space-y-4">
        {recentVendors.map((vendor: Vendor, index) => (
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

export default RecentVendors;
