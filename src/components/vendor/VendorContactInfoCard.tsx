
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import VendorContactMethods from '@/components/vendor/VendorContactMethods';
import { Headphones } from 'lucide-react';

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

const VendorContactInfoCard: React.FC<VendorContactInfoCardProps> = ({ vendorId, contactMethods }) => {
  return (
    <Card className="overflow-hidden border-border/50 hover:border-primary/30 transition-colors duration-300">
      <CardContent className="pt-6">
        <div className="flex items-center gap-2 mb-5 pb-3 border-b border-border/30">
          <Headphones className="text-primary h-5 w-5" />
          <h3 className="text-lg font-medium">Contact Methods</h3>
        </div>
        <VendorContactMethods
          vendorId={vendorId}
          hasPhone={contactMethods.hasPhone}
          hasWhatsapp={contactMethods.hasWhatsapp}
          hasTelegram={contactMethods.hasTelegram}
          hasInstagram={contactMethods.hasInstagram}
          hasFacebook={contactMethods.hasFacebook}
          hasWebsite={contactMethods.hasWebsite}
        />
      </CardContent>
    </Card>
  );
};

export default VendorContactInfoCard;
