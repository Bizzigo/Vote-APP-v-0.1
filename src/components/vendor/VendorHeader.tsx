
import React from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import VendorInfoBadges from '@/components/vendor/VendorInfoBadges';
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
        </div>
      </div>
    </div>
  );
};

export default VendorHeader;
