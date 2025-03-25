
import React from 'react';
import { Vendor } from '@/lib/types';
import { placeholderImage } from '@/lib/mockData';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useLocation } from '@/hooks/useLocation';
import VendorInfoBadges from './VendorInfoBadges';
import VendorPaymentMethods from './VendorPaymentMethods';
import VendorContactMethods from './VendorContactMethods';
import { Link } from 'react-router-dom';

interface VendorCardProps {
  vendor: Vendor;
}

const VendorCard: React.FC<VendorCardProps> = ({ vendor }) => {
  // Randomly determine if vendor is online (just for demo)
  const isOnline = React.useMemo(() => Math.random() > 0.5, [vendor.id]);
  const { locationActive, userLocation } = useLocation();

  // For demo purposes - determine if vendor has certain contact methods
  // In a real app, these would come from the vendor data
  const hasPhone = React.useMemo(() => Math.random() > 0.3, [vendor.id]);
  const hasWhatsapp = React.useMemo(() => Math.random() > 0.4, [vendor.id]);
  const hasTelegram = React.useMemo(() => Math.random() > 0.5, [vendor.id]);
  const hasInstagram = React.useMemo(() => Math.random() > 0.4, [vendor.id]);
  const hasFacebook = React.useMemo(() => Math.random() > 0.3, [vendor.id]);
  const hasWebsite = React.useMemo(() => Math.random() > 0.2, [vendor.id]);
  const hasLursoftProfile = React.useMemo(() => Math.random() > 0.5, [vendor.id]);
  
  // Demo: Job vacancies, shop, and payment methods
  const jobVacancies = React.useMemo(() => Math.random() > 0.6 ? Math.floor(Math.random() * 5) + 1 : 0, [vendor.id]);
  const hasShop = React.useMemo(() => Math.random() > 0.5, [vendor.id]);
  const paymentMethods = React.useMemo(() => {
    return {
      creditCard: Math.random() > 0.4,
      bankTransfer: Math.random() > 0.3,
      paypal: Math.random() > 0.5,
      crypto: Math.random() > 0.7
    };
  }, [vendor.id]);
  
  // Calculate distance if we have location data
  const distance = React.useMemo(() => {
    if (locationActive && userLocation && vendor.location) {
      // Haversine formula to calculate distance between two points
      const R = 6371; // Radius of the earth in km
      const dLat = deg2rad(vendor.location.lat - userLocation.latitude);
      const dLon = deg2rad(vendor.location.lng - userLocation.longitude);
      const a = 
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(deg2rad(userLocation.latitude)) * Math.cos(deg2rad(vendor.location.lat)) * 
        Math.sin(dLon/2) * Math.sin(dLon/2); 
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
      const distance = R * c; // Distance in km
      return distance.toFixed(1);
    }
    return null;
  }, [locationActive, userLocation, vendor.location]);
  
  // Helper function for distance calculation
  const deg2rad = (deg: number) => {
    return deg * (Math.PI/180);
  };
  
  // Generate random number of reviews for demo purposes
  const reviewCount = React.useMemo(() => Math.floor(Math.random() * 500) + 50, [vendor.id]);
  
  return (
    <div className="w-full bg-card animate-scale-in border border-border/40 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-primary/30 hover:translate-y-[-2px] hover:bg-secondary/10 p-4 rounded-md">
      <div className="flex items-center">
        {/* Left side - Logo with increased size and better alignment */}
        <div className="mr-6 flex flex-col items-center justify-center">
          <Link to={`/vendor/${vendor.id}`}>
            <Avatar className="h-24 w-24 rounded-md">
              <AvatarImage 
                src={vendor.logo || placeholderImage} 
                alt={vendor.name} 
                className="object-cover"
              />
              <AvatarFallback className="rounded-md bg-secondary">{vendor.name.substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
          </Link>
        </div>
        
        {/* Right side - Content */}
        <div className="flex-1">
          {/* Company name */}
          <div className="mb-2">
            <h3 className="font-medium text-lg">
              <Link to={`/vendor/${vendor.id}`} className="hover:text-primary hover:underline transition-colors">
                {vendor.name}
              </Link>
            </h3>
          </div>
          
          {/* Vendor Info Badges */}
          <VendorInfoBadges
            city={vendor.city}
            category={vendor.category}
            rating={vendor.rating}
            reviewCount={reviewCount}
            hasLursoftProfile={hasLursoftProfile}
            jobVacancies={jobVacancies}
            hasShop={hasShop}
            isOnline={isOnline}
            distance={distance}
          />
          
          {/* Payment Methods */}
          <VendorPaymentMethods paymentMethods={paymentMethods} />
          
          {/* Contact Methods */}
          <VendorContactMethods
            vendorId={vendor.id}
            hasPhone={hasPhone}
            hasWhatsapp={hasWhatsapp}
            hasTelegram={hasTelegram}
            hasInstagram={hasInstagram}
            hasFacebook={hasFacebook}
            hasWebsite={hasWebsite}
          />
        </div>
      </div>
    </div>
  );
};

export default VendorCard;
