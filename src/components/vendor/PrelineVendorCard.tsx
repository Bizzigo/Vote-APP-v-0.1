
import React from 'react';
import { Link } from 'react-router-dom';
import { Vendor } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import VendorInfoBadges from '@/components/vendor/VendorInfoBadges';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Button } from '@/components/ui/button';
import { Star, MapPin, Building, Phone, MessageSquare } from 'lucide-react';
import { placeholderImage } from '@/lib/mockData';
import { Badge } from '@/components/ui/badge';

interface PrelineVendorCardProps {
  vendor: Vendor;
  isGridView?: boolean;
  showActions?: boolean;
  distance?: string | null;
}

const PrelineVendorCard: React.FC<PrelineVendorCardProps> = ({ 
  vendor, 
  isGridView = true,
  showActions = true,
  distance = null
}) => {
  const vendorNameSlug = vendor.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  
  // Generate a random number of reviews
  const reviewCount = Math.floor(10 + Math.random() * 500);
  
  if (isGridView) {
    return (
      <Card className="overflow-hidden transition-all duration-200 hover:shadow-md group h-full">
        <CardContent className="p-0 flex flex-col h-full">
          <div className="relative">
            <AspectRatio ratio={16/9}>
              <img 
                src={vendor.logo || placeholderImage} 
                alt={vendor.name}
                className="object-cover w-full h-full"
              />
            </AspectRatio>
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            {distance && (
              <Badge className="absolute top-3 right-3 bg-black/70 text-white">
                {distance}
              </Badge>
            )}
          </div>
          
          <div className="p-5 flex-1 flex flex-col">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="font-bold text-lg line-clamp-1">{vendor.name}</h3>
              <div className="flex items-center gap-1">
                <Star size={16} className="text-yellow-500 fill-yellow-500" />
                <span className="text-sm font-medium">{vendor.rating.toFixed(1)}</span>
              </div>
            </div>
            
            <div className="flex items-center text-sm text-muted-foreground mb-3">
              <MapPin size={14} className="mr-1" />
              <span>{vendor.city}</span>
            </div>
            
            <p className="text-sm text-muted-foreground line-clamp-2 mb-4 flex-1">
              {vendor.description || `${vendor.name} is a leading provider of ${vendor.category} services in ${vendor.city}.`}
            </p>
            
            {showActions && (
              <div className="pt-3 border-t flex justify-between mt-auto">
                <Link to={`/vendor/${vendorNameSlug}`}>
                  <Button variant="outline" size="sm">View Profile</Button>
                </Link>
                <Button variant="outline" size="icon" className="h-8 w-8">
                  <Phone size={14} />
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }
  
  // List view
  return (
    <Card className="overflow-hidden transition-all duration-200 hover:shadow-md">
      <CardContent className="p-0">
        <div className="flex flex-col sm:flex-row">
          <div className="relative sm:w-48 flex-shrink-0">
            <AspectRatio ratio={1/1} className="sm:h-full">
              <img 
                src={vendor.logo || placeholderImage} 
                alt={vendor.name}
                className="object-cover w-full h-full"
              />
            </AspectRatio>
            {distance && (
              <Badge className="absolute top-3 right-3 bg-black/70 text-white">
                {distance}
              </Badge>
            )}
          </div>
          
          <div className="p-5 flex-1 flex flex-col">
            <div className="mb-2 flex items-center justify-between">
              <h3 className="font-bold text-lg">{vendor.name}</h3>
              <div className="flex items-center gap-1">
                <Star size={16} className="text-yellow-500 fill-yellow-500" />
                <span className="text-sm font-medium">{vendor.rating.toFixed(1)}</span>
                <span className="text-xs text-muted-foreground">({reviewCount})</span>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-3 text-sm text-muted-foreground mb-3">
              <div className="flex items-center">
                <MapPin size={14} className="mr-1" />
                <span>{vendor.city}</span>
              </div>
              <div className="flex items-center">
                <Building size={14} className="mr-1" />
                <span>{vendor.category}</span>
              </div>
            </div>
            
            <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
              {vendor.description || `${vendor.name} is a leading provider of ${vendor.category} services in ${vendor.city}.`}
            </p>
            
            {showActions && (
              <div className="pt-3 border-t flex gap-2 mt-auto">
                <Link to={`/vendor/${vendorNameSlug}`} className="flex-1">
                  <Button variant="default" size="sm" className="w-full">View Profile</Button>
                </Link>
                <Button variant="outline" size="sm">
                  <Phone size={14} className="mr-2" />
                  Contact
                </Button>
                <Button variant="outline" size="icon" className="h-8 w-8">
                  <MessageSquare size={14} />
                </Button>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PrelineVendorCard;
