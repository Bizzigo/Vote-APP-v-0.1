
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { mockVendors } from '@/lib/mockData';
import { Vendor } from '@/lib/types';
import { 
  UseVendorDataReturn,
  Review
} from './vendor/types';
import {
  generateMockServices,
  generateMockJobVacancies,
  generateMockShopItems,
  generateMockReviews,
  generateRandomPaymentMethods,
  generateRandomContactMethods,
  generateRegistrationData
} from './vendor/mockData';
import {
  calculateAverageRating,
  findVendorBySlug
} from './vendor/utils';

export type { Review, UseVendorDataReturn } from './vendor/types';

export const useVendorData = (vendorSlug: string | undefined): UseVendorDataReturn => {
  const [vendor, setVendor] = useState<Vendor | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const { toast } = useToast();
  
  const [services, setServices] = useState<string[]>(generateMockServices());
  const [jobVacancies] = useState(generateMockJobVacancies());
  const [shopItems] = useState(generateMockShopItems());
  const [reviews] = useState<Review[]>(generateMockReviews());
  
  const paymentMethods = generateRandomPaymentMethods();
  const contactMethods = generateRandomContactMethods();
  
  useEffect(() => {
    const fetchVendor = () => {
      setLoading(true);
      
      if (!vendorSlug) {
        setNotFound(true);
        setLoading(false);
        return;
      }
      
      console.log("Fetching vendor with slug:", vendorSlug);
      console.log("Available vendors:", mockVendors);
      
      const foundVendor = findVendorBySlug(mockVendors, vendorSlug);
      
      if (foundVendor) {
        console.log("Found vendor:", foundVendor);
        setVendor(foundVendor);
        
        if (foundVendor.keywords && foundVendor.keywords.length > 0) {
          setServices(foundVendor.keywords);
        }
        
        toast({
          title: "Vendor loaded",
          description: `Viewing ${foundVendor.name}`
        });
      } else {
        console.log("Vendor not found");
        setNotFound(true);
        toast({
          title: "Vendor not found",
          description: "Could not find the requested vendor",
          variant: "destructive"
        });
      }
      
      setLoading(false);
    };
    
    fetchVendor();
  }, [vendorSlug, toast]);
  
  const averageRating = calculateAverageRating(reviews);
  const { registrationNumber, registrationDate } = generateRegistrationData();
  const reviewCount = reviews.length;
  const isOnline = Math.random() > 0.5;

  return {
    vendor,
    loading,
    notFound,
    services,
    jobVacancies,
    shopItems,
    reviews,
    paymentMethods,
    contactMethods,
    averageRating,
    registrationNumber,
    registrationDate,
    reviewCount,
    isOnline
  };
};
