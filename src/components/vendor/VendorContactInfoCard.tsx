
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Phone, MessageSquare, Globe, Instagram, Facebook, ArrowRight,
  MapPin, Building2, Mail
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface VendorContactInfoCardProps {
  vendorId: string;
  contactMethods: {
    hasPhone: boolean;
    hasWhatsapp: boolean;
    hasTelegram: boolean;
    hasInstagram: boolean;
    hasFacebook: boolean;
    hasWebsite: boolean;
    hasLursoftProfile: boolean;
  };
}

const VendorContactInfoCard: React.FC<VendorContactInfoCardProps> = ({ 
  vendorId, 
  contactMethods 
}) => {
  const phoneNumber = "+371 " + Math.floor(20000000 + Math.random() * 9999999);
  const emailAddress = `contact@${vendorId.toLowerCase().replace(/[^a-z0-9]/g, '')}.com`;
  const websiteUrl = `https://www.${vendorId.toLowerCase().replace(/[^a-z0-9]/g, '')}.com`;
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center">
          <Phone className="mr-2 h-5 w-5 text-primary" />
          Contact Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {contactMethods.hasPhone && (
          <div className="flex items-start">
            <Phone className="h-5 w-5 text-muted-foreground mr-3 mt-0.5" />
            <div>
              <p className="font-medium">Phone</p>
              <p className="text-sm text-muted-foreground">{phoneNumber}</p>
            </div>
          </div>
        )}
        
        <div className="flex items-start">
          <Mail className="h-5 w-5 text-muted-foreground mr-3 mt-0.5" />
          <div>
            <p className="font-medium">Email</p>
            <p className="text-sm text-muted-foreground">{emailAddress}</p>
          </div>
        </div>
        
        {contactMethods.hasWebsite && (
          <div className="flex items-start">
            <Globe className="h-5 w-5 text-muted-foreground mr-3 mt-0.5" />
            <div>
              <p className="font-medium">Website</p>
              <a 
                href={websiteUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sm text-primary hover:underline"
              >
                {websiteUrl}
              </a>
            </div>
          </div>
        )}
        
        <div className="flex items-start">
          <MapPin className="h-5 w-5 text-muted-foreground mr-3 mt-0.5" />
          <div>
            <p className="font-medium">Address</p>
            <p className="text-sm text-muted-foreground">123 Business St., Riga, LV-1001</p>
          </div>
        </div>
        
        <div className="flex items-start">
          <Building2 className="h-5 w-5 text-muted-foreground mr-3 mt-0.5" />
          <div>
            <p className="font-medium">Business Hours</p>
            <p className="text-sm text-muted-foreground">Mon-Fri: 9:00 - 18:00</p>
            <p className="text-sm text-muted-foreground">Sat: 10:00 - 14:00</p>
          </div>
        </div>
        
        <div className="pt-2 mt-2 border-t flex items-center justify-between">
          <div className="flex space-x-2">
            {contactMethods.hasInstagram && (
              <Button variant="outline" size="icon" className="h-9 w-9 rounded-full">
                <Instagram className="h-4 w-4" />
              </Button>
            )}
            {contactMethods.hasFacebook && (
              <Button variant="outline" size="icon" className="h-9 w-9 rounded-full">
                <Facebook className="h-4 w-4" />
              </Button>
            )}
            {contactMethods.hasLursoftProfile && (
              <Button variant="outline" className="h-9 rounded-full text-xs">
                Vendor Profile
              </Button>
            )}
          </div>
          
          <div>
            <Link to="/vendor-dashboard">
              <Button variant="default" size="sm" className="flex items-center">
                Dashboard
                <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default VendorContactInfoCard;
