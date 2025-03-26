
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { categories } from '@/lib/mockData';
import { cn } from '@/lib/utils';
import { aiSearchVendors } from '@/lib/aiSearch';
import { useLocationContext } from '@/providers/LocationProvider';
import { useToast } from '@/hooks/use-toast';

const CategoryGrid = ({ 
  onCategorySelect 
}: { 
  onCategorySelect?: (category: string) => void 
}) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isActive, coordinates, calculateDistance } = useLocationContext();
  
  const handleCategoryClick = (category: string) => {
    if (onCategorySelect) {
      onCategorySelect(category);
    } else {
      // If no handler provided, navigate to category page
      navigate(`/search?category=${encodeURIComponent(category.toLowerCase())}`);
    }
    
    toast({
      title: `Searching ${category}`,
      description: "Finding the best local providers...",
      duration: 2000,
    });
  };
  
  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="flex flex-wrap gap-2 justify-center">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => handleCategoryClick(category)}
            className={cn(
              "px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200",
              "bg-background border border-input shadow-sm hover:shadow",
              "hover:bg-primary/5 hover:border-primary/50 hover:text-primary",
              "focus:outline-none focus:ring-2 focus:ring-primary/30"
            )}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryGrid;
