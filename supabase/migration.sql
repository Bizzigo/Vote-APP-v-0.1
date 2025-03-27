
-- Create a function to safely increment a candidate's vote count
CREATE OR REPLACE FUNCTION public.increment_vote_count(candidate_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE public.candidates 
  SET vote_count = vote_count + 1 
  WHERE id = candidate_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Enable realtime for user presence tracking
ALTER TABLE public.profiles REPLICA IDENTITY FULL;
ALTER PUBLICATION supabase_realtime ADD TABLE public.profiles;
