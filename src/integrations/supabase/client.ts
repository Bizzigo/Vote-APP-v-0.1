// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://zplutcnbzroafxguvlbq.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpwbHV0Y25ienJvYWZ4Z3V2bGJxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI2NTM3NzEsImV4cCI6MjA1ODIyOTc3MX0.Xo7k-L_0Ykj6l6n4KeJ4JDPl6XGheoHuubSakDBeeQ8";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);