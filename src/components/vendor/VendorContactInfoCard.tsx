
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import VendorContactMethods from '@/components/vendor/VendorContactMethods';
import ContactPersonInfo from '@/components/vendor/ContactPersonInfo';

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
        <div className="flex flex-col md:flex-row md:justify-between gap-4">
          <div>
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
          </div>
          <div className="border-t md:border-t-0 md:border-l border-border/60 md:pl-6 pt-4 md:pt-0">
            <ContactPersonInfo vendorId={vendorId} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default VendorContactInfoCard;
