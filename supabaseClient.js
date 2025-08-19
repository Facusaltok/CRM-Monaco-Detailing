// supabaseClient.js
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

export const supabase = createClient(
  "https://nqokfvddbpjqrsfflntk.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5xb2tmdmRkYnBqcXJzZmZsbnRrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU2NDE5OTgsImV4cCI6MjA3MTIxNzk5OH0.A5CzSNjHJ9y012vJjDunzYMTzoxGwu6RV88OmKYOUGo"
);
