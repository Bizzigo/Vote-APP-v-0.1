
import React from 'react';
import { Link } from 'react-router-dom';
import { Vendor } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import VendorInfoBadges from '@/components/vendor/VendorInfoBadges';
import VendorContactMethods from '@/components/vendor/VendorContactMethods';
import { ArrowRight, Star, Phone } from 'lucide-react';
import { placeholderImage } from '@/lib/mockData';

interface VendorCardProps {
  vendor: Vendor;
  distance?: string | null;
  isDirty?: boolean;
  showContactMethods?: boolean;
}

const VendorCard: React.FC<VendorCardProps> = ({ 
  vendor, 
  distance = null,
  isDirty = false,
  showContactMethods = true
}) => {
  const vendorNameSlug = vendor.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  
  // Define contact methods - always have phone true to show phone number
  const contactMethodsAvailable = {
    hasPhone: true, // Always show phone
    hasWhatsapp: Math.random() > 0.4,
    hasTelegram: Math.random() > 0.5,
    hasInstagram: Math.random() > 0.4,
    hasFacebook: Math.random() > 0.3,
    hasWebsite: Math.random() > 0.2,
    hasLursoftProfile: Math.random() > 0.5,
  };
  
  // Generate a random number of reviews
  const reviewCount = Math.floor(10 + Math.random() * 500);
  
  return (
    <Card className={`overflow-hidden transition-all duration-200 ${isDirty ? 'border-primary/50' : ''}`}>
      <CardContent className="p-0">
        <Link to={`/vendor/${vendorNameSlug}`} className="flex flex-col sm:flex-row items-stretch">
          {/* Logo part - increased size and improved fitting */}
          <div className="relative overflow-hidden bg-muted sm:w-56 flex-shrink-0" style={{ height: '180px' }}>
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
                reviewCount={reviewCount}
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
            
            {showContactMethods && (
              <div className="mt-3 pt-3 border-t">
                <VendorContactMethods
                  vendorId={vendor.id}
                  hasPhone={contactMethodsAvailable.hasPhone}
                  hasWhatsapp={contactMethodsAvailable.hasWhatsapp}
                  hasTelegram={contactMethodsAvailable.hasTelegram}
                  hasInstagram={contactMethodsAvailable.hasInstagram}
                  hasFacebook={contactMethodsAvailable.hasFacebook}
                  hasWebsite={contactMethodsAvailable.hasWebsite}
                />
              </div>
            )}
          </div>
        </Link>
      </CardContent>
    </Card>
  );
};

export default VendorCard;
