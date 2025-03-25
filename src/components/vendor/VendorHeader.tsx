
import React from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import VendorInfoBadges from '@/components/vendor/VendorInfoBadges';
import { Star } from 'lucide-react';
import { Vendor } from '@/lib/types';
import { placeholderImage } from '@/lib/mockData';

interface VendorHeaderProps {
  vendor: Vendor;
  registrationNumber: string;
  registrationDate: string;
  reviewCount: number;
  hasLursoftProfile: boolean;
  jobVacancies: number;
  hasShop: boolean;
  isOnline: boolean;
  onRatingClick: () => void;
}

const VendorHeader: React.FC<VendorHeaderProps> = ({
  vendor,
  registrationNumber,
  registrationDate,
  reviewCount,
  hasLursoftProfile,
  jobVacancies,
  hasShop,
  isOnline,
  onRatingClick
}) => {
  return (
    <div className="w-full bg-card animate-scale-in border border-border/40 shadow-sm p-6 rounded-md mb-8">
      <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
        {/* Vendor logo */}
        <Avatar className="h-32 w-32 rounded-md">
          <AvatarImage 
            src={vendor.logo || placeholderImage} 
            alt={vendor.name} 
            className="object-cover"
          />
          <AvatarFallback className="rounded-md bg-secondary text-2xl">{vendor.name.substring(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        
        {/* Vendor info */}
        <div className="flex flex-col gap-3">
          <h1 className="text-3xl font-bold">{vendor.name}</h1>
          
          <div className="flex flex-wrap gap-2 items-center">
            <Badge variant="outline" className="rounded-sm px-2 py-0.5 bg-secondary/50">
              Reg. Nr: {registrationNumber}
            </Badge>
            <Badge variant="outline" className="rounded-sm px-2 py-0.5 bg-secondary/50">
              Since: {registrationDate}
            </Badge>
          </div>
          
          <div className="mt-1">
            <VendorInfoBadges
              city={vendor.city}
              category={vendor.category}
              rating={vendor.rating}
              reviewCount={reviewCount}
              hasLursoftProfile={hasLursoftProfile}
              jobVacancies={jobVacancies}
              hasShop={hasShop}
              isOnline={isOnline}
              distance={null}
            />
          </div>
          
          {/* Clickable rating area - removed the rating text but kept the stars */}
          <div 
            className="flex items-center gap-2 mt-1 cursor-pointer hover:opacity-80 transition-opacity"
            onClick={onRatingClick}
          >
            <div className="flex">
              {[1, 2, 3, 4, 5].map((_, index) => (
                <Star 
                  key={index} 
                  className={`h-4 w-4 ${index < Math.floor(vendor.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorHeader;
