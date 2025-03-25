
import React, { useState } from 'react';
import { Vendor } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { placeholderImage } from '@/lib/mockData';
import VendorForm from './vendors/VendorForm';
import VendorTable from './vendors/VendorTable';

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
    rating: 0,
  });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isFormVisible, setIsFormVisible] = useState(false);

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
        rating: newVendor.rating || 0,
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
      rating: 0,
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
        <VendorForm 
          newVendor={newVendor}
          setNewVendor={setNewVendor}
          editingId={editingId}
          handleSubmit={handleSubmit}
        />
      )}

      <VendorTable 
        vendors={vendors}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default AdminPanel;
