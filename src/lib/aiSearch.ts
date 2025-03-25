
import { Vendor } from './types';

/**
 * An AI-powered search function that searches vendors based on query matches
 * This filters vendors to include those with matches in name, category, city, and keywords
 */
export const aiSearchVendors = (vendors: Vendor[], query: string): Vendor[] => {
  console.log('AI search activated for query:', query);
  
  if (!query.trim()) {
    return [...vendors].sort((a, b) => b.rating - a.rating);
  }

  // Convert search query to lowercase for case-insensitive matching
  const searchTerms = query.toLowerCase().split(' ');
  
  // Include vendors that have matches in any searchable field
  const matchedVendors = vendors.filter(vendor => {
    // Check if any search term matches in the vendor fields
    return searchTerms.some(term => {
      // Create an array of all searchable fields
      const vendorFields = [
        vendor.name.toLowerCase(),
        vendor.category.toLowerCase(),
        vendor.city.toLowerCase(),
        vendor.description.toLowerCase()
      ];
      
      // Add keywords to searchable fields if they exist
      if (vendor.keywords && vendor.keywords.length > 0) {
        vendorFields.push(...vendor.keywords.map(keyword => keyword.toLowerCase()));
      }
      
      // Check if any field contains the term
      return vendorFields.some(field => field.includes(term));
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
      
      // Description matches (low-medium weight)
      if (vendor.description.toLowerCase().includes(term)) {
        score += 4;
      }
      
      // Keyword matches (high weight)
      if (vendor.keywords && vendor.keywords.length > 0) {
        vendor.keywords.forEach(keyword => {
          if (keyword.toLowerCase().includes(term)) {
            score += 7; // High importance for keyword matches
          }
        });
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

  console.log(`AI search found ${sortedResults.length} results with keyword matching`);
  return sortedResults;
};
