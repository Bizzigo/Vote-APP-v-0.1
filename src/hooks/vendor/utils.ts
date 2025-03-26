
import { Review } from './types';

export const calculateAverageRating = (reviews: Review[]): number => {
  return reviews.length === 0 ? 0 : 
    reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
};

export const getVendorSlugFromName = (name: string): string => {
  return name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
};

export const findVendorBySlug = (
  vendors: import('@/lib/types').Vendor[], 
  vendorSlug: string | undefined
): import('@/lib/types').Vendor | null => {
  if (!vendorSlug) return null;
  
  let foundVendor = vendors.find(v => v.id === vendorSlug);
  
  if (!foundVendor) {
    foundVendor = vendors.find(v => {
      const vendorNameSlug = getVendorSlugFromName(v.name);
      return vendorNameSlug === vendorSlug;
    });
  }
  
  return foundVendor || null;
};
