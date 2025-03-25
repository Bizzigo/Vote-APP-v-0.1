
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Vendor } from '@/lib/types';

interface VendorDescriptionCardProps {
  vendor: Vendor;
}

const VendorDescriptionCard: React.FC<VendorDescriptionCardProps> = ({ vendor }) => {
  return (
    <Card className="mb-8">
      <CardContent className="pt-6">
        <h3 className="text-lg font-medium mb-4">About {vendor.name}</h3>
        <p className="text-muted-foreground">
          {vendor.description || 
            `${vendor.name} is a leading provider in the ${vendor.category} sector, 
            based in ${vendor.city}. With years of experience and a dedication to quality, 
            we provide exceptional services to our clients. Our team of experts is committed 
            to delivering innovative solutions that meet the unique needs of each customer.`}
        </p>
      </CardContent>
    </Card>
  );
};

export default VendorDescriptionCard;
