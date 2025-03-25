
import React from 'react';
import { Button } from '@/components/ui/button';
import { Vendor } from '@/lib/types';
import { toast } from 'sonner';

interface VendorFormProps {
  newVendor: Partial<Vendor>;
  setNewVendor: React.Dispatch<React.SetStateAction<Partial<Vendor>>>;
  editingId: string | null;
  handleSubmit: (e: React.FormEvent) => void;
}

const VendorForm: React.FC<VendorFormProps> = ({
  newVendor,
  setNewVendor,
  editingId,
  handleSubmit,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewVendor({
      ...newVendor,
      [name]: name === 'rating' ? parseFloat(value) : value,
    });
  };

  return (
    <div className="border border-border/60 p-6 animate-scale-in">
      <h3 className="text-lg font-medium mb-4">
        {editingId ? 'Edit Vendor' : 'Add New Vendor'}
      </h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name *</label>
            <input
              type="text"
              name="name"
              value={newVendor.name || ''}
              onChange={handleChange}
              className="w-full bg-transparent border border-border/60 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Logo URL</label>
            <input
              type="text"
              name="logo"
              value={newVendor.logo || ''}
              onChange={handleChange}
              className="w-full bg-transparent border border-border/60 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent"
              placeholder="Image URL (leave empty for placeholder)"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">City</label>
            <input
              type="text"
              name="city"
              value={newVendor.city || ''}
              onChange={handleChange}
              className="w-full bg-transparent border border-border/60 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Category *</label>
            <select
              name="category"
              value={newVendor.category || ''}
              onChange={handleChange}
              className="w-full bg-transparent border border-border/60 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent"
              required
            >
              <option value="">Select Category</option>
              <option value="Technology">Technology</option>
              <option value="Finance">Finance</option>
              <option value="Healthcare">Healthcare</option>
              <option value="Retail">Retail</option>
              <option value="Food">Food</option>
              <option value="Education">Education</option>
              <option value="Transportation">Transportation</option>
              <option value="Energy">Energy</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Construction">Construction</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Rating *</label>
            <input
              type="number"
              name="rating"
              value={newVendor.rating || 0}
              onChange={handleChange}
              min="0"
              max="5"
              step="0.1"
              className="w-full bg-transparent border border-border/60 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent"
              required
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            name="description"
            value={newVendor.description || ''}
            onChange={handleChange}
            className="w-full bg-transparent border border-border/60 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent min-h-[100px]"
          />
        </div>
        <div className="flex justify-end">
          <Button type="submit">{editingId ? 'Update' : 'Add'} Vendor</Button>
        </div>
      </form>
    </div>
  );
};

export default VendorForm;
