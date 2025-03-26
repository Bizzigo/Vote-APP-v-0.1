
import React from 'react';
import { useLanguage } from '@/providers/LanguageProvider';
import { mockVendors } from '@/lib/mockData';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Check } from 'lucide-react';

interface DistrictFilterProps {
  onDistrictSelect: (district: string) => void;
  selectedDistrict: string | null;
}

const DistrictFilter = ({ onDistrictSelect, selectedDistrict }: DistrictFilterProps) => {
  const { t } = useLanguage();
  
  // Extract unique districts from vendors and count vendors in each district
  const districtCounts = mockVendors.reduce((acc, vendor) => {
    if (vendor.district) {
      acc[vendor.district] = (acc[vendor.district] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);
  
  // Convert to array and sort alphabetically
  const districts = Object.keys(districtCounts).sort();
  
  return (
    <div>
      <h4 className="font-medium mb-2">{t("districts")}</h4>
      <ScrollArea className="h-40">
        <div className="space-y-1">
          {districts.map((district) => (
            <button
              key={district}
              onClick={() => onDistrictSelect(district)}
              className={`w-full text-left px-2 py-1.5 rounded-md text-sm flex justify-between items-center ${
                selectedDistrict === district 
                  ? 'bg-primary/10 text-primary font-medium' 
                  : 'hover:bg-secondary'
              }`}
            >
              <span className="line-clamp-1">{district}</span>
              {selectedDistrict === district ? (
                <Check size={16} className="text-primary flex-shrink-0" />
              ) : (
                <span className="text-xs text-muted-foreground">{districtCounts[district]}</span>
              )}
            </button>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default DistrictFilter;
