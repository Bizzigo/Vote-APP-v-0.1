
import React from 'react';
import { Check, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Vendor } from '@/lib/types';
import { cn } from '@/lib/utils';

interface DistrictFilterProps {
  vendors: Vendor[];
  selectedDistrict: string | null;
  onChange: (district: string | null) => void;
}

export function DistrictFilter({ vendors, selectedDistrict, onChange }: DistrictFilterProps) {
  const [open, setOpen] = React.useState(false);

  // Extract unique cities from vendors
  const districts = Array.from(new Set(
    vendors
      .map(vendor => vendor.city)
      .filter((city): city is string => !!city)
  )).sort();

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="justify-between w-full md:w-[200px]"
        >
          {selectedDistrict ? selectedDistrict : "All Districts"}
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full md:w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search district..." />
          <CommandEmpty>No district found.</CommandEmpty>
          <CommandGroup>
            <CommandItem
              onSelect={() => {
                onChange(null);
                setOpen(false);
              }}
              className="justify-between"
            >
              All Districts
              {!selectedDistrict && <Check className="h-4 w-4" />}
            </CommandItem>
            
            {districts.map((district) => (
              <CommandItem
                key={district}
                onSelect={() => {
                  onChange(district === selectedDistrict ? null : district);
                  setOpen(false);
                }}
                className="justify-between"
              >
                {district}
                {selectedDistrict === district && <Check className="h-4 w-4" />}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export default DistrictFilter;
