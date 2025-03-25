
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import VendorContactMethods from '@/components/vendor/VendorContactMethods';

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
    <Card>
      <CardContent className="pt-6">
        <h3 className="text-lg font-medium mb-4">Contact Methods</h3>
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
