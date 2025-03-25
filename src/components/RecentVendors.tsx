
import React from 'react';
import VendorCard from './VendorCard';
import { mockVendors } from '@/lib/mockData';

const RecentVendors = () => {
  // Show only the last 3 vendors
  const recentVendors = mockVendors.slice(0, 3);
  
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold mb-4">Recently Added Vendors</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {recentVendors.map((vendor) => (
          <VendorCard key={vendor.id} vendor={vendor} />
        ))}
      </div>
    </div>
  );
};

export default RecentVendors;
