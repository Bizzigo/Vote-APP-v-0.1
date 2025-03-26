
import React from 'react';
import VendorDescriptionCard from '@/components/vendor/VendorDescriptionCard';
import VendorContactInfoCard from '@/components/vendor/VendorContactInfoCard';
import VendorPaymentInfoCard from '@/components/vendor/VendorPaymentInfoCard';
import VendorKeywordsCard from '@/components/vendor/VendorKeywordsCard';
import VendorServiceTabs from '@/components/vendor/VendorServiceTabs';
import { Vendor } from '@/lib/types';

interface VendorProfileGridProps {
  vendor: Vendor;
  services: string[];
  jobVacancies: {
    id: number;
    title: string;
    location: string;
    type: string;
  }[];
  shopItems: {
    id: number;
    name: string;
    price: string;
    description: string;
  }[];
  reviews: {
    id: number;
    author: string;
    date: string;
    rating: number;
    comment: string;
  }[];
  contactMethods: {
    hasPhone: boolean;
    hasWhatsapp: boolean;
    hasTelegram: boolean;
    hasInstagram: boolean;
    hasFacebook: boolean;
    hasWebsite: boolean;
    hasLursoftProfile: boolean;
  };
  paymentMethods: {
    creditCard: boolean;
    bankTransfer: boolean;
    paypal: boolean;
    crypto: boolean;
  };
  reviewsSectionRef: React.RefObject<HTMLDivElement>;
}

const VendorProfileGrid: React.FC<VendorProfileGridProps> = ({
  vendor,
  services,
  jobVacancies,
  shopItems,
  reviews,
  contactMethods,
  paymentMethods,
  reviewsSectionRef
}) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="md:col-span-2">
          <VendorDescriptionCard vendor={vendor} />
        </div>
        <div>
          <VendorContactInfoCard vendorId={vendor.id} contactMethods={contactMethods} />
        </div>
      </div>

      <div className="mb-6">
        <VendorServiceTabs
          services={services}
          jobVacancies={jobVacancies}
          shopItems={shopItems}
          reviews={reviews}
          ref={reviewsSectionRef}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <VendorPaymentInfoCard paymentMethods={paymentMethods} />
        <VendorKeywordsCard services={services} />
      </div>
    </>
  );
};

export default VendorProfileGrid;
