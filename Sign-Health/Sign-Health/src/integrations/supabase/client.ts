
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://ahimikdtsevicgcvcazj.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFoaW1pa2R0c2V2aWNnY3ZjYXpqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc5OTQ1OTcsImV4cCI6MjA2MzU3MDU5N30.H4te0S23jei-VV5bgMPi8Fp7t6wDJCfCo7CuBuhE_Jw";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  }
});
