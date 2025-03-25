
import React from 'react';
import { categories } from '@/lib/mockData';

const CategoryCloud = () => {
  return (
    <div className="my-8">
      <h2 className="text-2xl font-semibold mb-4">All Categories</h2>
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <div 
            key={category} 
            className="px-3 py-1.5 bg-accent text-accent-foreground rounded-full text-sm hover:bg-accent/80 cursor-pointer transition-colors"
          >
            {category}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryCloud;
