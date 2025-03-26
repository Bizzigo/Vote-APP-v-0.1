
import React from 'react';
import { Command, CommandItem, CommandList } from "@/components/ui/command";

interface SearchSuggestionsProps {
  suggestions: string[];
  onSelect: (suggestion: string) => void;
  visible: boolean;
}

const SearchSuggestions = ({ suggestions, onSelect, visible }: SearchSuggestionsProps) => {
  if (!visible || suggestions.length === 0) return null;

  return (
    <div className="absolute w-full mt-1 z-50">
      <Command className="rounded-lg border shadow-md bg-white">
        <CommandList>
          {suggestions.map((suggestion, index) => (
            <CommandItem
              key={index}
              onSelect={() => onSelect(suggestion)}
              className="flex items-center px-4 py-2 text-sm cursor-pointer hover:bg-gray-100"
            >
              {suggestion}
            </CommandItem>
          ))}
        </CommandList>
      </Command>
    </div>
  );
};

export default SearchSuggestions;
