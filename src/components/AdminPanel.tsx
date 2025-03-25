
import React, { useState } from 'react';
import { Vendor } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Edit, Trash } from 'lucide-react';
import { toast } from 'sonner';
import { placeholderImage } from '@/lib/mockData';

interface AdminPanelProps {
  vendors: Vendor[];
  setVendors: React.Dispatch<React.SetStateAction<Vendor[]>>;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ vendors, setVendors }) => {
  const [newVendor, setNewVendor] = useState<Partial<Vendor>>({
    name: '',
    logo: '',
    city: '',
    category: '',
    description: '',
  });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isFormVisible, setIsFormVisible] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewVendor({
      ...newVendor,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!newVendor.name || !newVendor.category) {
      toast.error('Name and category are required fields.');
      return;
    }

    if (editingId) {
      // Update existing vendor
      setVendors(
        vendors.map((vendor) =>
          vendor.id === editingId
            ? { ...vendor, ...newVendor as Vendor }
            : vendor
        )
      );
      toast.success('Vendor updated successfully!');
    } else {
      // Add new vendor
      const vendor: Vendor = {
        id: Date.now().toString(),
        name: newVendor.name || '',
        logo: newVendor.logo || placeholderImage,
        city: newVendor.city || '',
        category: newVendor.category || '',
        description: newVendor.description || '',
      };
      setVendors([...vendors, vendor]);
      toast.success('New vendor added successfully!');
    }

    // Reset form
    setNewVendor({
      name: '',
      logo: '',
      city: '',
      category: '',
      description: '',
    });
    setEditingId(null);
    setIsFormVisible(false);
  };

  const handleEdit = (vendor: Vendor) => {
    setNewVendor(vendor);
    setEditingId(vendor.id);
    setIsFormVisible(true);
  };

  const handleDelete = (id: string) => {
    setVendors(vendors.filter((vendor) => vendor.id !== id));
    toast.success('Vendor deleted successfully!');
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Manage Vendors</h2>
        <Button onClick={() => setIsFormVisible(!isFormVisible)}>
          {isFormVisible ? 'Cancel' : 'Add New Vendor'}
        </Button>
      </div>

      {isFormVisible && (
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
      )}

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="border-b border-border/60 py-3 px-4 text-left">Name</th>
              <th className="border-b border-border/60 py-3 px-4 text-left">Category</th>
              <th className="border-b border-border/60 py-3 px-4 text-left">City</th>
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
                <td className="py-3 px-4">
                  <div className="flex justify-center space-x-2">
                    <Button variant="outline" size="sm" onClick={() => handleEdit(vendor)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleDelete(vendor.id)}>
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPanel;
