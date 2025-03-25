
import React from 'react';
import { Vendor } from '@/lib/types';
import { placeholderImage } from '@/lib/mockData';
import { Star, Phone, MessageSquare, Globe, Mail, MapPin, ExternalLink, Briefcase, ShoppingBag, CreditCard } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useLocation } from '@/hooks/useLocation';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

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
          <Avatar className="h-24 w-24 rounded-md">
            <AvatarImage 
              src={vendor.logo || placeholderImage} 
              alt={vendor.name} 
              className="object-cover"
            />
            <AvatarFallback className="rounded-md bg-secondary">{vendor.name.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
        </div>
        
        {/* Right side - Content */}
        <div className="flex-1">
          {/* Company name */}
          <div className="mb-2">
            <h3 className="font-medium text-lg">{vendor.name}</h3>
          </div>
          
          {/* First row of badges */}
          <div className="flex items-center flex-wrap gap-2 mb-2">
            <Badge variant="secondary" className="flex items-center gap-1 text-xs">
              <MapPin className="h-3 w-3" />
              {vendor.city}
            </Badge>
            
            <Badge variant="secondary" className="text-xs">
              {vendor.category}
            </Badge>
            
            <Badge variant="secondary" className="flex items-center gap-1 text-xs">
              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
              {vendor.rating.toFixed(1)} / {reviewCount}
            </Badge>
            
            {hasLursoftProfile && (
              <a href="https://www.lursoft.lv" target="_blank" rel="noopener noreferrer">
                <Badge variant="secondary" className="flex items-center gap-1 text-xs text-blue-600 hover:bg-blue-50">
                  <ExternalLink className="h-3 w-3" />
                  LURSOFT
                </Badge>
              </a>
            )}
          </div>
          
          {/* Second row of badges - Moved Vakances and Veikals before Online status */}
          <div className="flex items-center flex-wrap gap-2 mb-3">
            {jobVacancies > 0 && (
              <a href="#vacancies" className="hover:opacity-80">
                <Badge variant="secondary" className="flex items-center gap-1 text-xs text-purple-600">
                  <Briefcase className="h-3 w-3" />
                  Vakances: {jobVacancies}
                </Badge>
              </a>
            )}
            
            {hasShop && (
              <a href="#shop" className="hover:opacity-80">
                <Badge variant="secondary" className="flex items-center gap-1 text-xs text-green-600">
                  <ShoppingBag className="h-3 w-3" />
                  Veikals
                </Badge>
              </a>
            )}
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Badge 
                    variant="secondary" 
                    className={`flex items-center gap-1 text-xs ${isOnline ? 'text-green-600' : 'text-gray-500'}`}
                  >
                    <span className={`inline-block h-2 w-2 rounded-full ${isOnline ? 'bg-green-500' : 'bg-gray-400'}`}></span>
                    {isOnline ? 'Online' : 'Offline'}
                  </Badge>
                </TooltipTrigger>
                <TooltipContent>
                  {isOnline ? 'You can send a direct message to this vendor' : 'Vendor is currently offline'}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            {locationActive && distance && (
              <Badge variant="secondary" className="flex items-center gap-1 text-xs">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="m16.2 7.8-2.3 6.1-6.1 2.3 2.3-6.1z"></path>
                </svg>
                {distance} km
              </Badge>
            )}
          </div>
          
          {/* Payment methods */}
          {(paymentMethods.creditCard || paymentMethods.bankTransfer || paymentMethods.paypal || paymentMethods.crypto) && (
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="text-xs text-muted-foreground">Maksājumi:</span>
              {paymentMethods.creditCard && (
                <Badge variant="outline" className="flex items-center gap-1 text-xs border-gray-200">
                  <CreditCard className="h-3 w-3" />
                  Kartes
                </Badge>
              )}
              {paymentMethods.bankTransfer && (
                <Badge variant="outline" className="flex items-center gap-1 text-xs border-gray-200">
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="14" x="2" y="5" rx="2" />
                    <line x1="2" x2="22" y1="10" y2="10" />
                  </svg>
                  Banka
                </Badge>
              )}
              {paymentMethods.paypal && (
                <Badge variant="outline" className="flex items-center gap-1 text-xs border-gray-200">
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M7 11V7a5 5 0 0 1 9.9-1" />
                    <path d="M8.93 13.4A1.99 1.99 0 0 1 11 15v1a2 2 0 0 1-2 2H2" />
                    <path d="M14 16.2V21" />
                    <path d="M14 7V2" />
                    <path d="M20 11V7a5 5 0 0 0-4-4.9" />
                    <path d="M20 11h-6a2 2 0 0 0-2 2v1a2 2 0 0 0 2 2h4a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2h-8" />
                  </svg>
                  PayPal
                </Badge>
              )}
              {paymentMethods.crypto && (
                <Badge variant="outline" className="flex items-center gap-1 text-xs border-gray-200">
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M8 14l3.5-3.5 1 1L16 8" />
                  </svg>
                  Kriptovalūta
                </Badge>
              )}
            </div>
          )}
          
          {/* Contact icons - only show if vendor has the contact method */}
          <div className="flex flex-wrap items-center gap-2 mt-3">
            {hasPhone && (
              <a href={`tel:+37120000000`} className="p-2 hover:bg-secondary rounded-full transition-colors" title="Call">
                <Phone className="h-4 w-4 text-gray-600" />
              </a>
            )}
            {hasWhatsapp && (
              <a href={`https://wa.me/37120000000`} className="p-2 hover:bg-secondary rounded-full transition-colors" title="WhatsApp">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#25D366" className="text-[#25D366]" viewBox="0 0 16 16">
                  <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/>
                </svg>
              </a>
            )}
            {hasTelegram && (
              <a href={`https://t.me/vendorhandle`} className="p-2 hover:bg-secondary rounded-full transition-colors" title="Telegram">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#0088cc" className="text-[#0088cc]" viewBox="0 0 16 16">
                  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.287 5.906c-.778.324-2.334.994-4.666 2.01-.378.15-.577.298-.595.442-.03.243.275.339.69.47l.175.055c.408.133.958.288 1.243.294.26.006.549-.1.868-.32 2.179-1.471 3.304-2.214 3.374-2.23.05-.012.12-.026.166.016.047.041.042.12.037.141-.03.129-1.227 1.241-1.846 1.817-.193.18-.33.307-.358.336a8.154 8.154 0 0 1-.188.186c-.38.366-.664.64.015 1.088.327.216.589.393.85.571.284.194.568.387.936.629.093.06.183.125.27.187.331.236.63.448.997.414.214-.02.435-.22.547-.82.265-1.417.786-4.486.906-5.751a1.426 1.426 0 0 0-.013-.315.337.337 0 0 0-.114-.217.526.526 0 0 0-.31-.093c-.3.005-.763.166-2.984 1.09z"/>
                </svg>
              </a>
            )}
            {hasInstagram && (
              <a href={`https://instagram.com/vendorhandle`} className="p-2 hover:bg-secondary rounded-full transition-colors" title="Instagram">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#E4405F" className="text-[#E4405F]" viewBox="0 0 16 16">
                  <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z"/>
                </svg>
              </a>
            )}
            {hasFacebook && (
              <a href={`https://facebook.com/vendorhandle`} className="p-2 hover:bg-secondary rounded-full transition-colors" title="Facebook">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#1877F2" className="text-[#1877F2]" viewBox="0 0 16 16">
                  <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"/>
                </svg>
              </a>
            )}
            {hasWebsite && (
              <a href={`https://vendorwebsite.com`} className="p-2 hover:bg-secondary rounded-full transition-colors" title="Website">
                <Globe className="h-4 w-4 text-gray-600" />
              </a>
            )}
            <button className="p-2 hover:bg-secondary rounded-full transition-colors" title="Message">
              <Mail className="h-4 w-4 text-gray-600" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorCard;
