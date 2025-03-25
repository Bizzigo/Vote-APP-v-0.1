
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface VendorKeywordsCardProps {
  services: string[];
}

const VendorKeywordsCard: React.FC<VendorKeywordsCardProps> = ({ services }) => {
  return (
    <Card>
      <CardContent className="pt-6">
        <h3 className="text-lg font-medium mb-4">Keywords</h3>
        <div className="flex flex-wrap gap-2">
          {services.map((service, index) => (
            <Badge 
              key={index} 
              variant="outline"
              className="rounded-sm px-2 py-0.5 bg-gray-200 text-black hover:bg-gray-300"
            >
              {service}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default VendorKeywordsCard;
