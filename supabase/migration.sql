
-- Create a function to safely increment a candidate's vote count
CREATE OR REPLACE FUNCTION public.increment_vote_count(candidate_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE public.candidates 
  SET vote_count = vote_count + 1 
  WHERE id = candidate_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
