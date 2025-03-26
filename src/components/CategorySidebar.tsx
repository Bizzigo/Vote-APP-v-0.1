
import React from 'react';
import { useLanguage } from '@/providers/LanguageProvider';
import { mockVendors } from '@/lib/mockData';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Check } from 'lucide-react';

interface CategorySidebarProps {
  onCategorySelect: (category: string) => void;
  selectedCategory: string | null;
}

const CategorySidebar = ({ onCategorySelect, selectedCategory }: CategorySidebarProps) => {
  const { t } = useLanguage();
  
  // Extract unique categories from vendors and count vendors in each category
  const categoryCounts = mockVendors.reduce((acc, vendor) => {
    const category = vendor.category;
    acc[category] = (acc[category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  // Convert to array and sort alphabetically
  const categories = Object.keys(categoryCounts).sort();
  
  return (
    <div>
      <h4 className="font-medium mb-2">{t("categories")}</h4>
      <ScrollArea className="h-60">
        <div className="space-y-1">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => onCategorySelect(category)}
              className={`w-full text-left px-2 py-1.5 rounded-md text-sm flex justify-between items-center ${
                selectedCategory === category 
                  ? 'bg-primary/10 text-primary font-medium' 
                  : 'hover:bg-secondary'
              }`}
            >
              <span className="line-clamp-1">{category}</span>
              {selectedCategory === category ? (
                <Check size={16} className="text-primary flex-shrink-0" />
              ) : (
                <span className="text-xs text-muted-foreground">{categoryCounts[category]}</span>
              )}
            </button>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default CategorySidebar;
