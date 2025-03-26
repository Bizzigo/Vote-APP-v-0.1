
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
  const searchTerms = query.toLowerCase().split(' ').filter(term => term.length > 0);
  
  if (searchTerms.length === 0) {
    return [];
  }
  
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
      // Check for exact or partial keyword matches (highest weight)
      if (vendor.keywords && vendor.keywords.length > 0) {
        const keywordMatches = vendor.keywords.filter(keyword => 
          keyword.toLowerCase() === term || 
          keyword.toLowerCase().includes(term) ||
          term.includes(keyword.toLowerCase())
        ).length;
        
        if (keywordMatches > 0) {
          // Boost score based on the number of keyword matches
          score += keywordMatches * 10;
        }
      }
      
      // Direct matches in name (high weight)
      if (vendor.name.toLowerCase().includes(term)) {
        score += 8;
      }
      
      // Category matches (medium-high weight)
      if (vendor.category.toLowerCase().includes(term)) {
        score += 7;
      }
      
      // City matches (medium weight)
      if (vendor.city.toLowerCase().includes(term)) {
        score += 6;
      }
      
      // Description matches (medium-low weight)
      if (vendor.description.toLowerCase().includes(term)) {
        score += 4;
      }
    });
    
    // Bonus for exact matches
    searchTerms.forEach(term => {
      // Exact keyword match (highest bonus)
      if (vendor.keywords && vendor.keywords.some(k => k.toLowerCase() === term)) {
        score += 15;
      }
      
      // Exact name match
      if (vendor.name.toLowerCase() === term) {
        score += 12;
      }
    });
    
    // Apply rating as a multiplier (vendors with higher ratings get boosted)
    score = score * (1 + vendor.rating / 10);
    
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
