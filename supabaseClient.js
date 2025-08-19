// supabaseClient.js
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SUPABASE_URL = "https://aewjhxdusrzluxpzmnxh.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFld2poeGR1c3J6bHV4cHptbnhoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU1MzA0NzIsImV4cCI6MjA3MTEwNjQ3Mn0.8DoJ0wjO9Z_X8f5VwsAYwWWWTfOpyX1IGEwjm4f6jhY";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true
  }
});
