
import React from 'react';
import { Button } from '@/components/ui/button';
import { Edit, Trash } from 'lucide-react';
import { Vendor } from '@/lib/types';
import { placeholderImage } from '@/lib/mockData';

interface VendorTableProps {
  vendors: Vendor[];
  onEdit: (vendor: Vendor) => void;
  onDelete: (id: string) => void;
}

const VendorTable: React.FC<VendorTableProps> = ({ vendors, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="border-b border-border/60 py-3 px-4 text-left">Name</th>
            <th className="border-b border-border/60 py-3 px-4 text-left">Category</th>
            <th className="border-b border-border/60 py-3 px-4 text-left">City</th>
            <th className="border-b border-border/60 py-3 px-4 text-left">Rating</th>
            <th className="border-b border-border/60 py-3 px-4 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {vendors.map((vendor) => (
            <tr key={vendor.id} className="border-b border-border/30 hover:bg-secondary/30 transition-colors">
              <td className="py-3 px-4">
                <div className="flex items-center">
                  <div className="h-10 w-10 mr-3 overflow-hidden">
                    <img
                      src={vendor.logo || placeholderImage}
                      alt={vendor.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <span>{vendor.name}</span>
                </div>
              </td>
              <td className="py-3 px-4">{vendor.category}</td>
              <td className="py-3 px-4">{vendor.city}</td>
              <td className="py-3 px-4">{vendor.rating.toFixed(1)}</td>
              <td className="py-3 px-4">
                <div className="flex justify-center space-x-2">
                  <Button variant="outline" size="sm" onClick={() => onEdit(vendor)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => onDelete(vendor.id)}>
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VendorTable;
