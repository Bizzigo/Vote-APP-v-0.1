
import React, { forwardRef, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, MessageSquare, Plus, X } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from '@/components/ui/dialog';

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
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  
  // Generate star rating display
  const renderStars = (rating: number, clickable = false, review?: Review) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star 
          key={`full-${i}`} 
          className={`h-4 w-4 fill-yellow-400 text-yellow-400 ${clickable ? 'cursor-pointer' : ''}`}
          onClick={clickable && review ? () => setSelectedReview(review) : undefined}
        />
      );
    }
    
    if (hasHalfStar) {
      stars.push(
        <Star 
          key="half" 
          className={`h-4 w-4 fill-yellow-400 text-yellow-400 opacity-50 ${clickable ? 'cursor-pointer' : ''}`}
          onClick={clickable && review ? () => setSelectedReview(review) : undefined}
        />
      );
    }
    
    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Star 
          key={`empty-${i}`} 
          className={`h-4 w-4 text-gray-300 ${clickable ? 'cursor-pointer' : ''}`}
          onClick={clickable && review ? () => setSelectedReview(review) : undefined}
        />
      );
    }
    
    return stars;
  };

  return (
    <div className="space-y-6">
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
                        <div className="flex items-center cursor-pointer" onClick={() => setSelectedReview(review)}>
                          {renderStars(review.rating, true, review)}
                        </div>
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
      
      {/* Reviews Detail Dialog */}
      <Dialog open={!!selectedReview} onOpenChange={(open) => !open && setSelectedReview(null)}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="flex justify-between items-center">
              <span>Review Details</span>
              <DialogClose asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 p-0">
                  <X className="h-4 w-4" />
                </Button>
              </DialogClose>
            </DialogTitle>
          </DialogHeader>
          
          {selectedReview && (
            <div className="space-y-4 pt-2">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-lg">{selectedReview.author}</h3>
                  <p className="text-sm text-muted-foreground">{selectedReview.date}</p>
                </div>
                <div className="flex">
                  {renderStars(selectedReview.rating)}
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Comment:</h4>
                <p className="text-base">{selectedReview.comment}</p>
              </div>
              
              {/* You could add more details here like photos, seller response, etc. */}
              <div className="border-t pt-4 mt-4">
                <h4 className="font-medium mb-2">Vendor Response:</h4>
                <p className="text-sm italic text-muted-foreground">
                  Thank you for your feedback! We appreciate your business and are always looking to improve our services.
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
      
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
