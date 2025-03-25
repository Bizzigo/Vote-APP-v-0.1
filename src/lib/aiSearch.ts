
import { Vendor } from './types';

/**
 * A simple AI-powered search function that searches vendors based on query
 * This is a mock implementation that simulates AI search capabilities
 */
export const aiSearchVendors = (vendors: Vendor[], query: string): Vendor[] => {
  console.log('AI search activated for query:', query);
  
  if (!query.trim()) {
    return [...vendors].sort((a, b) => b.rating - a.rating);
  }

  // Convert search query to lowercase for case-insensitive matching
  const searchTerms = query.toLowerCase().split(' ');
  
  // Score-based ranking (simple AI simulation)
  const scoredVendors = vendors.map(vendor => {
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
      
      // Description matches (lower weight but still important)
      if (vendor.description.toLowerCase().includes(term)) {
        score += 3;
      }
    });
    
    // Boost score based on rating (0-5 additional points)
    score += vendor.rating;
    
    return { vendor, score };
  });
  
  // Sort by score (descending) and then by rating for equal scores
  const sortedResults = scoredVendors
    .filter(item => item.score > 0) // Only include results with matches
    .sort((a, b) => {
      // Primary sort by score
      if (b.score !== a.score) {
        return b.score - a.score;
      }
      // Secondary sort by rating
      return b.vendor.rating - a.vendor.rating;
    })
    .map(item => item.vendor);

  console.log(`AI search found ${sortedResults.length} results`);
  return sortedResults;
};
