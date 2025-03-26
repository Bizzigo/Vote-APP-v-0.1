
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface ServicesTabProps {
  services: string[];
}

const ServicesTab: React.FC<ServicesTabProps> = ({ services }) => {
  return (
    <Card>
      <CardContent className="pt-6">
        <h3 className="text-lg font-medium mb-4">Services</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {services.map((service, index) => (
            <Card key={index}>
              <CardContent className="p-4">
                <h4 className="font-medium">{service}</h4>
                <p className="text-sm text-muted-foreground">
                  Professional {service.toLowerCase()} services tailored to your business needs.
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ServicesTab;
