
import React from 'react';
import { Link } from 'react-router-dom';
import { Vendor } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import VendorInfoBadges from '@/components/vendor/VendorInfoBadges';
import { ArrowRight } from 'lucide-react';
import { placeholderImage } from '@/lib/mockData';

interface VendorCardProps {
  vendor: Vendor;
  distance?: string | null;
  isDirty?: boolean;
}

const VendorCard: React.FC<VendorCardProps> = ({ 
  vendor, 
  distance = null,
  isDirty = false
}) => {
  const vendorNameSlug = vendor.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  
  return (
    <Card className={`overflow-hidden transition-all duration-200 ${isDirty ? 'border-primary/50' : ''}`}>
      <CardContent className="p-0">
        <Link to={`/vendor/${vendorNameSlug}`} className="flex flex-col sm:flex-row items-stretch">
          {/* Logo part */}
          <div className="relative overflow-hidden bg-muted sm:w-48 h-40 sm:h-48">
            <div className="absolute inset-0 bg-gradient-to-tr from-black/20 to-transparent z-10" />
            <Avatar className="h-full w-full rounded-none">
              <AvatarImage 
                src={vendor.logo || placeholderImage} 
                alt={vendor.name} 
                className="object-cover h-full w-full"
              />
              <AvatarFallback className="rounded-none bg-secondary h-full w-full text-4xl">{vendor.name.substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
          </div>
          
          {/* Content part */}
          <div className="p-6 flex-1 flex flex-col justify-between">
            <div>
              <h3 className="font-bold text-lg mb-2">{vendor.name}</h3>
              <VendorInfoBadges
                city={vendor.city}
                category={vendor.category}
                rating={vendor.rating}
                reviewCount={0}
                hasLursoftProfile={Math.random() > 0.5}
                jobVacancies={0}
                hasShop={false}
                isOnline={Math.random() > 0.5}
                distance={distance}
              />
            </div>
            
            <div className="mt-4 flex justify-between items-center">
              <p className="text-sm text-muted-foreground line-clamp-2">
                {vendor.description || `${vendor.name} is a leading provider of ${vendor.category} services in ${vendor.city}.`}
              </p>
              <span className="ml-4 text-primary">
                <ArrowRight size={20} />
              </span>
            </div>
          </div>
        </Link>
      </CardContent>
    </Card>
  );
};

export default VendorCard;
