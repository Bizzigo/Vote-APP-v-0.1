
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
  isOnline?: boolean; // Made optional as we're removing this
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
  distance
}) => {
  return (
    <div className="flex items-center flex-wrap gap-2 mb-3">
      <VendorBadge
        icon={<MapPin className="h-3 w-3" />}
        label={city}
        className="whitespace-nowrap"
      />
      
      <VendorBadge
        label={category}
        scrollToId="reviews-section"
        className="whitespace-nowrap"
      />
      
      {hasLursoftProfile && (
        <VendorBadge
          icon={<ExternalLink className="h-3 w-3" />}
          label="LURSOFT"
          className="text-blue-600 hover:bg-blue-50 whitespace-nowrap"
          href="https://www.lursoft.lv"
        />
      )}
      
      {jobVacancies > 0 && (
        <VendorBadge
          icon={<Briefcase className="h-3 w-3" />}
          label={`Vakances: ${jobVacancies}`}
          className="text-purple-600 whitespace-nowrap"
          scrollToId="job-offers-section"
        />
      )}
      
      {hasShop && (
        <VendorBadge
          icon={<ShoppingBag className="h-3 w-3" />}
          label="Veikals"
          className="text-green-600 whitespace-nowrap"
          scrollToId="shop-section"
        />
      )}
      
      <VendorBadge
        icon={<Star className="h-3 w-3 text-yellow-500" />}
        label={`${rating.toFixed(1)} / ${reviewCount}`}
        className="bg-gray-600 text-white whitespace-nowrap"
        scrollToId="reviews-section"
      />
      
      {distance && (
        <VendorBadge
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
              <circle cx="12" cy="12" r="10"></circle>
              <path d="m16.2 7.8-2.3 6.1-6.1 2.3 2.3-6.1z"></path>
            </svg>
          }
          label={`${distance} km`}
          className="whitespace-nowrap"
        />
      )}
    </div>
  );
};

export default VendorInfoBadges;
