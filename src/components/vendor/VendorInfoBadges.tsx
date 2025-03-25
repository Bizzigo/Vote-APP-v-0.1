
import React from 'react';
import { MapPin, Star, ExternalLink, Briefcase, ShoppingBag } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import VendorBadge from './VendorBadge';

interface VendorInfoBadgesProps {
  city: string;
  category: string;
  rating: number;
  reviewCount: number;
  hasLursoftProfile: boolean;
  jobVacancies: number;
  hasShop: boolean;
  isOnline: boolean;
  distance: string | null;
}

const VendorInfoBadges: React.FC<VendorInfoBadgesProps> = ({
  city,
  category,
  rating,
  reviewCount,
  hasLursoftProfile,
  jobVacancies,
  hasShop,
  isOnline,
  distance
}) => {
  return (
    <div className="flex items-center flex-wrap gap-2 mb-3">
      <VendorBadge
        icon={<MapPin className="h-3 w-3" />}
        label={city}
      />
      
      <VendorBadge
        label={category}
        scrollToId="reviews-section"
      />
      
      {hasLursoftProfile && (
        <VendorBadge
          icon={<ExternalLink className="h-3 w-3" />}
          label="LURSOFT"
          className="text-blue-600 hover:bg-blue-50"
          href="https://www.lursoft.lv"
        />
      )}
      
      {jobVacancies > 0 && (
        <VendorBadge
          icon={<Briefcase className="h-3 w-3" />}
          label={`Vakances: ${jobVacancies}`}
          className="text-purple-600"
          scrollToId="job-offers-section"
        />
      )}
      
      {hasShop && (
        <VendorBadge
          icon={<ShoppingBag className="h-3 w-3" />}
          label="Veikals"
          className="text-green-600"
          scrollToId="shop-section"
        />
      )}
      
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div>
              <VendorBadge
                icon={<span className={`inline-block h-2 w-2 rounded-full ${isOnline ? 'bg-green-500' : 'bg-gray-400'}`}></span>}
                label={isOnline ? 'Online' : 'Offline'}
                className={isOnline ? 'text-green-600' : 'text-gray-500'}
              />
            </div>
          </TooltipTrigger>
          <TooltipContent>
            {isOnline ? 'You can send a direct message to this vendor' : 'Vendor is currently offline'}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      
      {distance && (
        <VendorBadge
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
              <circle cx="12" cy="12" r="10"></circle>
              <path d="m16.2 7.8-2.3 6.1-6.1 2.3 2.3-6.1z"></path>
            </svg>
          }
          label={`${distance} km`}
        />
      )}
    </div>
  );
};

export default VendorInfoBadges;
