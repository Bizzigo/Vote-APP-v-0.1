
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from '@/components/ui/dialog';
import { MessageSquare, Plus, Star, X } from 'lucide-react';
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from '@/components/ui/pagination';

interface Review {
  id: number;
  author: string;
  date: string;
  rating: number;
  comment: string;
}

interface ReviewsTabProps {
  reviews: Review[];
}

const REVIEWS_PER_PAGE = 5;

const ReviewsTab = React.forwardRef<HTMLDivElement, ReviewsTabProps>(({ reviews }, ref) => {
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [reviewPage, setReviewPage] = useState(1);
  
  // Calculate pagination values
  const totalReviews = reviews.length;
  const totalPages = Math.ceil(totalReviews / REVIEWS_PER_PAGE);
  const startIndex = (reviewPage - 1) * REVIEWS_PER_PAGE;
  const displayedReviews = reviews.slice(startIndex, startIndex + REVIEWS_PER_PAGE);
  
  // Handle page changes
  const handlePrevPage = () => {
    if (reviewPage > 1) {
      setReviewPage(reviewPage - 1);
    }
  };
  
  const handleNextPage = () => {
    if (reviewPage < totalPages) {
      setReviewPage(reviewPage + 1);
    }
  };
  
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
    <>
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
            <div>
              <div className="space-y-4">
                {displayedReviews.map(review => (
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
              
              {totalPages > 1 && (
                <div className="mt-4">
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious 
                          onClick={handlePrevPage} 
                          className={reviewPage <= 1 ? "pointer-events-none opacity-50" : "cursor-pointer hover:bg-gray-200"}
                        />
                      </PaginationItem>
                      
                      {Array.from({ length: totalPages }).map((_, index) => (
                        <PaginationItem key={index}>
                          <PaginationLink
                            isActive={reviewPage === index + 1}
                            onClick={() => setReviewPage(index + 1)}
                            className="rounded-sm hover:bg-gray-200"
                          >
                            {index + 1}
                          </PaginationLink>
                        </PaginationItem>
                      ))}
                      
                      <PaginationItem>
                        <PaginationNext 
                          onClick={handleNextPage} 
                          className={reviewPage >= totalPages ? "pointer-events-none opacity-50" : "cursor-pointer hover:bg-gray-200"}
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              )}
            </div>
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
    </>
  );
});

ReviewsTab.displayName = 'ReviewsTab';

export default ReviewsTab;
