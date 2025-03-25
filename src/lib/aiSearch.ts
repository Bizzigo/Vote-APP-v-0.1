
import { Vendor } from './types';

/**
 * An AI-powered search function that searches vendors based on exact query matches
 * This filters vendors to only include those with exact term matches
 */
export const aiSearchVendors = (vendors: Vendor[], query: string): Vendor[] => {
  console.log('AI search activated for query:', query);
  
  if (!query.trim()) {
    return [...vendors].sort((a, b) => b.rating - a.rating);
  }

  // Convert search query to lowercase for case-insensitive matching
  const searchTerms = query.toLowerCase().split(' ');
  
  // Only include vendors that have exact term matches
  const matchedVendors = vendors.filter(vendor => {
    // Check if any search term exactly matches in the vendor fields
    return searchTerms.some(term => {
      // Create an array of all searchable fields
      const vendorFields = [
        vendor.name.toLowerCase(),
        vendor.category.toLowerCase(),
        vendor.city.toLowerCase()
      ];
      
      // Check if any field contains the exact term
      return vendorFields.some(field => {
        const words = field.split(/\s+/);
        return words.includes(term);
      });
    });
  });
  
  // Score-based ranking for the matched vendors
  const scoredVendors = matchedVendors.map(vendor => {
    let score = 0;
    
    // Base scoring - check for matches in different fields
    searchTerms.forEach(term => {
      // Direct matches in name (highest weight)
      if (vendor.name.toLowerCase().includes(term)) {
        score += 10;
      }
      
      // Category matches (high weight)
      if (vendor.category.toLowerCase().includes(term)) {
        score += 8;
      }
      
      // City matches (medium weight)
      if (vendor.city.toLowerCase().includes(term)) {
        score += 5;
      }
      
      // Location information - if available
      if (vendor.location) {
        const locationString = `${vendor.location.lat},${vendor.location.lng}`;
        if (locationString.includes(term)) {
          score += 2;
        }
      }
    });
    
    // Boost score based on rating
    score += vendor.rating;
    
    return { vendor, score };
  });
  
  // Sort by score (descending) and then by rating for equal scores
  const sortedResults = scoredVendors
    .sort((a, b) => {
      // Primary sort by score
      if (b.score !== a.score) {
        return b.score - a.score;
      }
      // Secondary sort by rating
      return b.vendor.rating - a.vendor.rating;
    })
    .map(item => item.vendor);

  console.log(`AI search found ${sortedResults.length} exact match results`);
  return sortedResults;
};
