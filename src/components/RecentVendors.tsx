
import React from 'react';
import { mockVendors } from '@/lib/mockData';

const RecentVendors = () => {
  // Show 5 vendors
  const recentVendors = mockVendors.slice(0, 5);
  
  return (
    <div className="my-8">
      <h2 className="text-2xl font-semibold mb-4">Recently Added Vendors</h2>
      <div className="bg-card border border-border/40 rounded-md overflow-hidden">
        {recentVendors.map((vendor, index) => (
          <div 
            key={vendor.id} 
            className={`p-4 flex items-center gap-4 ${
              index !== recentVendors.length - 1 ? "border-b border-border/40" : ""
            }`}
          >
            <div className="w-12 h-12 bg-muted rounded-md overflow-hidden flex-shrink-0">
              <img 
                src={vendor.logo} 
                alt={vendor.name} 
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h3 className="font-medium">{vendor.name}</h3>
              <p className="text-sm text-muted-foreground">{vendor.category}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentVendors;
