
import React from 'react';
import { Candidate } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { placeholderImage } from '@/lib/mockData';

interface CandidateCardProps {
  candidate: Candidate;
}

const CandidateCard: React.FC<CandidateCardProps> = ({ candidate }) => {
  const { user, voteForCandidate, isLoggedIn } = useAuth();
  
  const hasVoted = user?.hasVoted || false;
  const votedForThisCandidate = user?.votedFor === candidate.id;

  return (
    <div className="overflow-hidden bg-card animate-scale-in border border-border/40 shadow-sm transition-all duration-400 hover:shadow-md hover:border-border/80 group">
      <div className="relative">
        <div className="aspect-square overflow-hidden">
          <img 
            src={candidate.photo || placeholderImage}
            alt={candidate.name}
            className="w-full h-full object-cover transition-transform duration-400 group-hover:scale-[1.02]"
            loading="lazy"
          />
        </div>
        <div className="absolute bottom-3 left-3 bg-black/50 backdrop-blur-sm text-white px-3 py-1 text-xs">
          {candidate.district} District
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-medium text-lg">{candidate.name}</h3>
            <p className="text-sm text-muted-foreground">{candidate.city}</p>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-lg font-semibold">{candidate.voteCount}</span>
            <span className="text-xs text-muted-foreground">Votes</span>
          </div>
        </div>
        <p className="mt-3 text-sm leading-relaxed">{candidate.description}</p>
        <div className="mt-4">
          {isLoggedIn ? (
            <Button 
              className="w-full"
              disabled={hasVoted} 
              variant={hasVoted ? (votedForThisCandidate ? "default" : "outline") : "default"}
              onClick={() => voteForCandidate(candidate.id)}
            >
              {hasVoted 
                ? (votedForThisCandidate ? "Voted ✓" : "Already Voted") 
                : "Vote Now"}
            </Button>
          ) : (
            <Button className="w-full" variant="outline" disabled>
              Login to Vote
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CandidateCard;
