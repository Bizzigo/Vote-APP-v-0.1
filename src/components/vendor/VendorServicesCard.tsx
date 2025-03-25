
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface VendorServicesCardProps {
  services: string[];
}

const VendorServicesCard: React.FC<VendorServicesCardProps> = ({ services }) => {
  return (
    <Card className="mb-8">
      <CardContent className="pt-6">
        <h3 className="text-lg font-medium mb-4">Services & Keywords</h3>
        <div className="flex flex-wrap gap-2">
          {services.map((service, index) => (
            <Badge 
              key={index} 
              className="rounded-sm px-2 py-0.5 bg-secondary"
            >
              {service}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default VendorServicesCard;
