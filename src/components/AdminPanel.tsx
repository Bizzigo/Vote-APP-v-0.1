
import React, { useState } from 'react';
import { Candidate } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Edit, Trash } from 'lucide-react';
import { toast } from 'sonner';
import { placeholderImage } from '@/lib/mockData';

interface AdminPanelProps {
  candidates: Candidate[];
  setCandidates: React.Dispatch<React.SetStateAction<Candidate[]>>;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ candidates, setCandidates }) => {
  const [newCandidate, setNewCandidate] = useState<Partial<Candidate>>({
    name: '',
    photo: '',
    city: '',
    district: '',
    description: '',
  });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isFormVisible, setIsFormVisible] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewCandidate({
      ...newCandidate,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!newCandidate.name || !newCandidate.district) {
      toast.error('Name and district are required fields.');
      return;
    }

    if (editingId) {
      // Update existing candidate
      setCandidates(
        candidates.map((candidate) =>
          candidate.id === editingId
            ? { ...candidate, ...newCandidate as Candidate }
            : candidate
        )
      );
      toast.success('Candidate updated successfully!');
    } else {
      // Add new candidate
      const candidate: Candidate = {
        id: Date.now().toString(),
        name: newCandidate.name || '',
        photo: newCandidate.photo || placeholderImage,
        city: newCandidate.city || '',
        district: newCandidate.district || '',
        description: newCandidate.description || '',
        voteCount: 0,
      };
      setCandidates([...candidates, candidate]);
      toast.success('New candidate added successfully!');
    }

    // Reset form
    setNewCandidate({
      name: '',
      photo: '',
      city: '',
      district: '',
      description: '',
    });
    setEditingId(null);
    setIsFormVisible(false);
  };

  const handleEdit = (candidate: Candidate) => {
    setNewCandidate(candidate);
    setEditingId(candidate.id);
    setIsFormVisible(true);
  };

  const handleDelete = (id: string) => {
    setCandidates(candidates.filter((candidate) => candidate.id !== id));
    toast.success('Candidate deleted successfully!');
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Manage Candidates</h2>
        <Button onClick={() => setIsFormVisible(!isFormVisible)}>
          {isFormVisible ? 'Cancel' : 'Add New Candidate'}
        </Button>
      </div>

      {isFormVisible && (
        <div className="border border-border/60 p-6 animate-scale-in">
          <h3 className="text-lg font-medium mb-4">
            {editingId ? 'Edit Candidate' : 'Add New Candidate'}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Name *</label>
                <input
                  type="text"
                  name="name"
                  value={newCandidate.name || ''}
                  onChange={handleChange}
                  className="w-full bg-transparent border border-border/60 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Photo URL</label>
                <input
                  type="text"
                  name="photo"
                  value={newCandidate.photo || ''}
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
                  value={newCandidate.city || ''}
                  onChange={handleChange}
                  className="w-full bg-transparent border border-border/60 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">District *</label>
                <select
                  name="district"
                  value={newCandidate.district || ''}
                  onChange={handleChange}
                  className="w-full bg-transparent border border-border/60 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent"
                  required
                >
                  <option value="">Select District</option>
                  <option value="North">North</option>
                  <option value="South">South</option>
                  <option value="East">East</option>
                  <option value="West">West</option>
                  <option value="Central">Central</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Description</label>
              <textarea
                name="description"
                value={newCandidate.description || ''}
                onChange={handleChange}
                className="w-full bg-transparent border border-border/60 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent min-h-[100px]"
              />
            </div>
            <div className="flex justify-end">
              <Button type="submit">{editingId ? 'Update' : 'Add'} Candidate</Button>
            </div>
          </form>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="border-b border-border/60 py-3 px-4 text-left">Name</th>
              <th className="border-b border-border/60 py-3 px-4 text-left">District</th>
              <th className="border-b border-border/60 py-3 px-4 text-left">City</th>
              <th className="border-b border-border/60 py-3 px-4 text-right">Votes</th>
              <th className="border-b border-border/60 py-3 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {candidates.map((candidate) => (
              <tr key={candidate.id} className="border-b border-border/30 hover:bg-secondary/30 transition-colors">
                <td className="py-3 px-4">
                  <div className="flex items-center">
                    <div className="h-10 w-10 mr-3 overflow-hidden">
                      <img
                        src={candidate.photo || placeholderImage}
                        alt={candidate.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <span>{candidate.name}</span>
                  </div>
                </td>
                <td className="py-3 px-4">{candidate.district}</td>
                <td className="py-3 px-4">{candidate.city}</td>
                <td className="py-3 px-4 text-right">{candidate.voteCount}</td>
                <td className="py-3 px-4">
                  <div className="flex justify-center space-x-2">
                    <Button variant="outline" size="sm" onClick={() => handleEdit(candidate)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleDelete(candidate.id)}>
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
