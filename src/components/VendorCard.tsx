
import React from 'react';
import { Vendor } from '@/lib/types';
import { placeholderImage } from '@/lib/mockData';
import { Star } from 'lucide-react';

interface VendorCardProps {
  vendor: Vendor;
}

const VendorCard: React.FC<VendorCardProps> = ({ vendor }) => {
  // Randomly determine if vendor is online (just for demo)
  const isOnline = React.useMemo(() => Math.random() > 0.5, [vendor.id]);
  
  return (
    <div className="overflow-hidden bg-card animate-scale-in border border-border/40 shadow-sm transition-all duration-400 hover:shadow-md hover:border-border/80 group">
      <div className="relative">
        <div className="overflow-hidden" style={{ aspectRatio: '1/1' }}>
          <img 
            src={vendor.logo || placeholderImage}
            alt={vendor.name}
            className="w-full h-full object-cover transition-transform duration-400 group-hover:scale-[1.02]"
            loading="lazy"
          />
        </div>
        <div className="absolute bottom-2 right-2">
          <div className={`h-3 w-3 rounded-full ${isOnline ? 'bg-green-500' : 'bg-gray-400'}`}></div>
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-medium text-lg">{vendor.name}</h3>
            <div className="flex items-center space-x-2">
              <p className="text-sm text-muted-foreground">{vendor.city}</p>
              <span className="text-xs px-2 py-0.5 bg-secondary rounded-sm">
                {vendor.category}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="font-medium">{vendor.rating.toFixed(1)}</span>
          </div>
        </div>
        <p className="mt-3 text-sm leading-relaxed">{vendor.description}</p>
      </div>
    </div>
  );
};

export default VendorCard;
