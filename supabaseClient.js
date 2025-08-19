// supabaseClient.js
// ESM directo desde CDN (no hace falta otro <script> en el HTML)
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SUPABASE_URL = "https://nqokfvddbpjqrsfflntk.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5xb2tmdmRkYnBqcXJzZmZsbnRrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU2NDE5OTgsImV4cCI6MjA3MTIxNzk5OH0.A5CzSNjHJ9y012vJjDunzYMTzoxGwu6RV88OmKYOUGo";

// Exporta el cliente para usarlo en index.html y el resto de páginas
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
