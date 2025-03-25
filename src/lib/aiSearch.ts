
import { Vendor } from './types';

// This would ideally connect to a real AI service
// For demo purposes, we'll simulate AI-powered search with keyword extraction and relevance scoring
export const aiSearchVendors = (vendors: Vendor[], query: string): Vendor[] => {
  if (!query.trim()) {
    return vendors.sort((a, b) => b.rating - a.rating);
  }

  // Extract meaningful keywords from the search query
  const keywords = extractKeywords(query);
  console.log("AI extracted keywords:", keywords);

  // Score vendors based on keyword matches and rating
  const scoredVendors = vendors.map(vendor => {
    const keywordScore = calculateKeywordScore(vendor, keywords);
    const ratingWeight = 0.4; // 40% weight to rating
    const keywordWeight = 0.6; // 60% weight to keyword relevance
    
    // Combined score (normalized)
    const combinedScore = (keywordScore * keywordWeight) + ((vendor.rating / 5) * ratingWeight);
    
    return {
      vendor,
      score: combinedScore
    };
  });

  // Sort by score (descending) and return the vendors
  return scoredVendors
    .sort((a, b) => b.score - a.score)
    .map(item => item.vendor);
};

// Simulate keyword extraction with a basic algorithm
const extractKeywords = (query: string): string[] => {
  // Remove common stop words
  const stopWords = ['the', 'and', 'a', 'an', 'in', 'on', 'at', 'for', 'to', 'with', 'by', 'is', 'are'];
  
  // Split the query, filter out stop words, and convert to lowercase
  return query
    .toLowerCase()
    .split(' ')
    .filter(word => word.length > 2 && !stopWords.includes(word))
    .map(word => word.trim());
};

// Calculate how relevant a vendor is to the keywords
const calculateKeywordScore = (vendor: Vendor, keywords: string[]): number => {
  if (keywords.length === 0) return 0;
  
  // Fields to search in
  const fieldsToSearch = [
    { name: 'name', weight: 3 },
    { name: 'category', weight: 2.5 },
    { name: 'description', weight: 1.5 },
    { name: 'city', weight: 1 }
  ];
  
  let totalScore = 0;
  let matches = 0;

  keywords.forEach(keyword => {
    fieldsToSearch.forEach(field => {
      // @ts-ignore - We know these fields exist
      const value = (vendor[field.name] || '').toLowerCase();
      
      if (value.includes(keyword)) {
        // Add weighted score based on the field importance
        totalScore += field.weight;
        matches++;
      }
    });
  });
  
  // Normalize score between 0 and 1
  const maxPossibleScore = keywords.length * fieldsToSearch.reduce((sum, field) => sum + field.weight, 0);
  return totalScore / maxPossibleScore;
};
