
import React from 'react';
import VendorCard from './VendorCard';
import { mockVendors } from '@/lib/mockData';

const RecentVendors = () => {
  // Show 5 vendors instead of 3
  const recentVendors = mockVendors.slice(0, 5);
  
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold mb-4">Recently Added Vendors</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {recentVendors.map((vendor) => (
          <VendorCard key={vendor.id} vendor={vendor} />
        ))}
      </div>
    </div>
  );
};

export default RecentVendors;
