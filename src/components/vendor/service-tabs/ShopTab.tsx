
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface ShopItem {
  id: number;
  name: string;
  description: string;
  price: string;
}

interface ShopTabProps {
  shopItems: ShopItem[];
}

const ShopTab: React.FC<ShopTabProps> = ({ shopItems }) => {
  return (
    <Card id="shop-section">
      <CardContent className="pt-6">
        <h3 className="text-lg font-medium mb-4">Shop ({shopItems.length})</h3>
        {shopItems.length > 0 ? (
          <div className="space-y-4">
            {shopItems.map(item => (
              <Card key={item.id}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">{item.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span className="font-medium">{item.price}</span>
                      <Badge className="rounded-sm">Buy Now</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">No products available in the shop.</p>
        )}
      </CardContent>
    </Card>
  );
};

export default ShopTab;
