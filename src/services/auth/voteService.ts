
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { User } from '@/lib/types';

export const voteForCandidate = async (user: User | null, candidateId: string) => {
  if (!user) return { error: 'User not found' };
  
  if (user.hasVoted) {
    toast.error("Vote failed", {
      description: "You have already voted!",
    });
    return { error: 'Already voted' };
  }
  
  try {
    // Update user's voting status
    const { error } = await supabase
      .from('profiles')
      .update({
        has_voted: true,
        voted_for: candidateId
      })
      .eq('id', user.id);
      
    if (error) {
      throw error;
    }
    
    // Update candidate vote count
    const { error: candidateError } = await supabase.rpc('increment_vote_count', {
      candidate_id: candidateId
    });
    
    if (candidateError) {
      console.error('Error updating candidate vote count:', candidateError);
    }
    
    // Update local state
    const updatedUser = {
      ...user,
      hasVoted: true,
      votedFor: candidateId,
    };
    
    toast.success("Vote recorded", {
      description: "Your vote has been recorded!",
    });
    
    return { user: updatedUser, error: null };
  } catch (error) {
    console.error('Vote error:', error);
    toast.error("Vote failed", {
      description: "There was a problem recording your vote",
    });
    return { error };
  }
};
