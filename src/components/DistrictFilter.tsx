
import React from 'react';
import { districts } from '@/lib/mockData';
import { Check } from 'lucide-react';

interface DistrictFilterProps {
  selectedDistricts: string[];
  setSelectedDistricts: React.Dispatch<React.SetStateAction<string[]>>;
}

const DistrictFilter: React.FC<DistrictFilterProps> = ({
  selectedDistricts,
  setSelectedDistricts,
}) => {
  const toggleDistrict = (district: string) => {
    if (selectedDistricts.includes(district)) {
      setSelectedDistricts(selectedDistricts.filter((d) => d !== district));
    } else {
      setSelectedDistricts([...selectedDistricts, district]);
    }
  };

  const selectAll = () => {
    setSelectedDistricts([...districts]);
  };

  const clearAll = () => {
    setSelectedDistricts([]);
  };

  return (
    <div className="mb-6 md:mb-0">
      <h3 className="text-lg font-medium mb-3">Filter by District</h3>
      <div className="space-y-2">
        {districts.map((district) => (
          <div
            key={district}
            className="flex items-center"
          >
            <button
              onClick={() => toggleDistrict(district)}
              className={`flex items-center space-x-2 px-3 py-2 w-full hover:bg-secondary/70 transition-colors ${
                selectedDistricts.includes(district) ? 'bg-secondary' : 'bg-transparent'
              }`}
            >
              <div className={`w-5 h-5 flex items-center justify-center border ${
                selectedDistricts.includes(district) 
                  ? 'border-primary bg-primary text-primary-foreground' 
                  : 'border-muted-foreground'
              }`}>
                {selectedDistricts.includes(district) && <Check className="h-3.5 w-3.5" />}
              </div>
              <span className="text-sm">{district} District</span>
            </button>
          </div>
        ))}
      </div>
      <div className="flex space-x-2 mt-4">
        <button
          onClick={selectAll}
          className="text-xs px-3 py-1 bg-secondary hover:bg-secondary/70 transition-colors"
        >
          Select All
        </button>
        <button
          onClick={clearAll}
          className="text-xs px-3 py-1 bg-secondary hover:bg-secondary/70 transition-colors"
        >
          Clear All
        </button>
      </div>
    </div>
  );
};

export default DistrictFilter;
