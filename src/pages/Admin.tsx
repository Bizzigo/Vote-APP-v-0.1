
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import AdminPanel from '@/components/AdminPanel';
import { useAuth } from '@/hooks/useAuth';
import { mockCandidates } from '@/lib/mockData';
import { Candidate } from '@/lib/types';
import { toast } from 'sonner';

const Admin = () => {
  const { isAdmin, isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [candidates, setCandidates] = useState<Candidate[]>(mockCandidates);

  useEffect(() => {
    // Redirect non-admin users
    if (!isLoggedIn || !isAdmin) {
      toast.error('You must be logged in as an admin to view this page.');
      navigate('/login');
    }
  }, [isAdmin, isLoggedIn, navigate]);

  // Don't render anything if not admin
  if (!isAdmin) {
    return null;
  }

  return (
    <Layout>
      <div className="py-8 md:py-12">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
          <AdminPanel candidates={candidates} setCandidates={setCandidates} />
        </div>
      </div>
    </Layout>
  );
};

export default Admin;
