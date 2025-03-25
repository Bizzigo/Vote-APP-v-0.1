
import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import SearchBar from '@/components/SearchBar';
import DistrictFilter from '@/components/DistrictFilter';
import CandidateCard from '@/components/CandidateCard';
import { mockCandidates } from '@/lib/mockData';
import { Candidate } from '@/lib/types';

const Index = () => {
  const [candidates, setCandidates] = useState<Candidate[]>(mockCandidates);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDistricts, setSelectedDistricts] = useState<string[]>([
    'North', 'South', 'East', 'West', 'Central'
  ]);
  const [filteredCandidates, setFilteredCandidates] = useState<Candidate[]>(candidates);

  // Apply filters when search term, districts, or candidates change
  useEffect(() => {
    let filtered = candidates.filter((candidate) => {
      const matchesSearch =
        searchTerm === '' ||
        candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        candidate.district.toLowerCase().includes(searchTerm.toLowerCase()) ||
        candidate.description.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesDistrict =
        selectedDistricts.length === 0 || selectedDistricts.includes(candidate.district);

      return matchesSearch && matchesDistrict;
    });

    // Group candidates by district and sort by votes (ascending) within each district
    const districtGroups: Record<string, Candidate[]> = {};
    
    // First group by district
    filtered.forEach(candidate => {
      if (!districtGroups[candidate.district]) {
        districtGroups[candidate.district] = [];
      }
      districtGroups[candidate.district].push(candidate);
    });
    
    // Sort each district group by votes (ascending)
    Object.keys(districtGroups).forEach(district => {
      districtGroups[district].sort((a, b) => a.voteCount - b.voteCount);
    });
    
    // Flatten the grouped and sorted candidates
    filtered = Object.values(districtGroups).flat();

    setFilteredCandidates(filtered);
  }, [searchTerm, selectedDistricts, candidates]);

  return (
    <Layout>
      <div className="py-8 md:py-12">
        <div className="text-center mb-10 max-w-3xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 animate-fade-in">
            Election Candidates
          </h1>
          <p className="text-muted-foreground animate-fade-in animation-delay-150">
            Browse and vote for your preferred candidate. Each user can cast one vote.
            Filter by district or search for specific candidates.
          </p>
        </div>
        
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <DistrictFilter
              selectedDistricts={selectedDistricts}
              setSelectedDistricts={setSelectedDistricts}
            />
          </div>
          
          <div className="md:col-span-3">
            {filteredCandidates.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">
                  No candidates found. Try adjusting your filters.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCandidates.map((candidate, index) => (
                  <div key={candidate.id} style={{ animationDelay: `${index * 50}ms` }}>
                    <CandidateCard candidate={candidate} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
