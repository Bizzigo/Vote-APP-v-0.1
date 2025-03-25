
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import VendorPaymentMethods from '@/components/vendor/VendorPaymentMethods';

interface VendorPaymentInfoCardProps {
  paymentMethods: {
    creditCard: boolean;
    bankTransfer: boolean;
    paypal: boolean;
    crypto: boolean;
  };
}

const VendorPaymentInfoCard: React.FC<VendorPaymentInfoCardProps> = ({ paymentMethods }) => {
  return (
    <Card>
      <CardContent className="pt-6">
        <h3 className="text-lg font-medium mb-4">Payment Methods</h3>
        <VendorPaymentMethods paymentMethods={paymentMethods} />
      </CardContent>
    </Card>
  );
};

export default VendorPaymentInfoCard;
