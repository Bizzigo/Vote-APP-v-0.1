
import React from 'react';
import { Vendor } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { placeholderImage } from '@/lib/mockData';

interface VendorCardProps {
  vendor: Vendor;
}

const VendorCard: React.FC<VendorCardProps> = ({ vendor }) => {
  return (
    <div className="overflow-hidden bg-card animate-scale-in border border-border/40 shadow-sm transition-all duration-400 hover:shadow-md hover:border-border/80 group">
      <div className="relative">
        <div className="aspect-square overflow-hidden">
          <img 
            src={vendor.logo || placeholderImage}
            alt={vendor.name}
            className="w-full h-full object-cover transition-transform duration-400 group-hover:scale-[1.02]"
            loading="lazy"
          />
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-medium text-lg">{vendor.name}</h3>
            <p className="text-sm text-muted-foreground">{vendor.city}</p>
          </div>
        </div>
        <p className="mt-3 text-sm leading-relaxed">{vendor.description}</p>
      </div>
    </div>
  );
};

export default VendorCard;
