
import React from 'react';
import { Link } from 'react-router-dom';
import { categories } from '@/lib/mockData';
import { cn } from '@/lib/utils';
import { HoverCard, HoverCardTrigger, HoverCardContent } from '@/components/ui/hover-card';

// Define category icons mapping - you can replace these with appropriate icons
const categoryIcons: { [key: string]: string } = {
  'Technology': '💻',
  'Finance': '💰',
  'Healthcare': '🩺',
  'Retail': '🛍️',
  'Food': '🍔',
  'Education': '📚',
  'Transportation': '🚚',
  'Energy': '⚡',
  'Entertainment': '🎬',
  'Construction': '🏗️',
};

const CategoryGrid = () => {
  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
        {categories.map((category) => (
          <HoverCard key={category} openDelay={200} closeDelay={100}>
            <HoverCardTrigger asChild>
              <Link
                to={`/category/${category.toLowerCase()}`}
                className={cn(
                  "h-24 flex flex-col items-center justify-center p-4 rounded-xl",
                  "bg-white border border-gray-200 shadow-sm transition-all duration-300",
                  "hover:shadow-md hover:border-primary/30 hover:bg-primary/5",
                  "group"
                )}
              >
                <div className="text-2xl mb-2">{categoryIcons[category] || '🔍'}</div>
                <span className="text-sm font-medium group-hover:text-primary transition-colors">
                  {category}
                </span>
              </Link>
            </HoverCardTrigger>
            <HoverCardContent className="w-64 p-4">
              <div className="space-y-2">
                <h4 className="text-sm font-semibold">{category}</h4>
                <p className="text-xs text-muted-foreground">
                  Browse local {category.toLowerCase()} providers and services in your area.
                </p>
              </div>
            </HoverCardContent>
          </HoverCard>
        ))}
      </div>
    </div>
  );
};

export default CategoryGrid;
