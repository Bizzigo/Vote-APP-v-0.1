
import React, { forwardRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, MessageSquare, Plus } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Service {
  name: string;
  description?: string;
}

interface JobVacancy {
  id: number;
  title: string;
  location: string;
  type: string;
}

interface ShopItem {
  id: number;
  name: string;
  description: string;
  price: string;
}

interface Review {
  id: number;
  author: string;
  date: string;
  rating: number;
  comment: string;
}

interface VendorServiceTabsProps {
  services: string[];
  jobVacancies: JobVacancy[];
  shopItems: ShopItem[];
  reviews?: Review[];
}

const VendorServiceTabs = forwardRef<HTMLDivElement, VendorServiceTabsProps>(({
  services,
  jobVacancies,
  shopItems,
  reviews = [],
}, ref) => {
  // Generate star rating display
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`full-${i}`} className="h-4 w-4 fill-yellow-400 text-yellow-400" />);
    }
    
    if (hasHalfStar) {
      stars.push(<Star key="half" className="h-4 w-4 fill-yellow-400 text-yellow-400 opacity-50" />);
    }
    
    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="h-4 w-4 text-gray-300" />);
    }
    
    return stars;
  };

  return (
    <div className="space-y-6">
      {/* Keywords Card */}
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
      
      {/* Services Block */}
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
      
      {/* Reviews Block */}
      <Card id="reviews-section" ref={ref}>
        <CardContent className="pt-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Reviews ({reviews.length})</h3>
            <Button size="sm" className="gap-1">
              <Plus size={16} />
              Add Review
            </Button>
          </div>
          
          {reviews.length > 0 ? (
            <ScrollArea className="h-[300px] rounded-md border p-4">
              <div className="space-y-4">
                {reviews.map(review => (
                  <Card key={review.id}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-medium">{review.author}</h4>
                          <p className="text-xs text-muted-foreground">{review.date}</p>
                        </div>
                        <div className="flex items-center">{renderStars(review.rating)}</div>
                      </div>
                      <p className="text-sm">{review.comment}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          ) : (
            <div className="text-center py-8 space-y-3 bg-muted/20 rounded-md">
              <MessageSquare className="mx-auto h-8 w-8 text-muted-foreground/50" />
              <p className="text-muted-foreground">No reviews yet. Be the first to add a review!</p>
            </div>
          )}
        </CardContent>
      </Card>
      
      {/* Jobs Block */}
      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-medium mb-4">Job Offers ({jobVacancies.length})</h3>
          {jobVacancies.length > 0 ? (
            <div className="space-y-4">
              {jobVacancies.map(job => (
                <Card key={job.id}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">{job.title}</h4>
                        <p className="text-sm text-muted-foreground">
                          {job.location} · {job.type}
                        </p>
                      </div>
                      <Badge className="rounded-sm">Apply</Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">No job openings available at the moment.</p>
          )}
        </CardContent>
      </Card>
      
      {/* Shop Block */}
      <Card>
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
    </div>
  );
});

VendorServiceTabs.displayName = 'VendorServiceTabs';

export default VendorServiceTabs;
