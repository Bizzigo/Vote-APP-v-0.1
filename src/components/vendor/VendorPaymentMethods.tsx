
import React from 'react';
import { CreditCard } from 'lucide-react';
import VendorBadge from './VendorBadge';

interface PaymentMethodsType {
  creditCard: boolean;
  bankTransfer: boolean;
  paypal: boolean;
  crypto: boolean;
}

interface VendorPaymentMethodsProps {
  paymentMethods: PaymentMethodsType;
}

const VendorPaymentMethods: React.FC<VendorPaymentMethodsProps> = ({ paymentMethods }) => {
  const { creditCard, bankTransfer, paypal, crypto } = paymentMethods;
  
  if (!creditCard && !bankTransfer && !paypal && !crypto) {
    return null;
  }
  
  return (
    <div className="flex flex-wrap items-center gap-2 mb-3">
      {creditCard && (
        <VendorBadge
          variant="outline"
          icon={<CreditCard className="h-3 w-3" />}
          label="Kartes"
        />
      )}
      
      {bankTransfer && (
        <VendorBadge
          variant="outline"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect width="20" height="14" x="2" y="5" rx="2" />
              <line x1="2" x2="22" y1="10" y2="10" />
            </svg>
          }
          label="Banka"
        />
      )}
      
      {paypal && (
        <VendorBadge
          variant="outline"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 11V7a5 5 0 0 1 9.9-1" />
              <path d="M8.93 13.4A1.99 1.99 0 0 1 11 15v1a2 2 0 0 1-2 2H2" />
              <path d="M14 16.2V21" />
              <path d="M14 7V2" />
              <path d="M20 11V7a5 5 0 0 0-4-4.9" />
              <path d="M20 11h-6a2 2 0 0 0-2 2v1a2 2 0 0 0 2 2h4a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2h-8" />
            </svg>
          }
          label="PayPal"
        />
      )}
      
      {crypto && (
        <VendorBadge
          variant="outline"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <path d="M8 14l3.5-3.5 1 1L16 8" />
            </svg>
          }
          label="Kriptovalūta"
        />
      )}
    </div>
  );
};

export default VendorPaymentMethods;
