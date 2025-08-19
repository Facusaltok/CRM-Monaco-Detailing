// supabaseClient.js
import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";

export const supabase = createClient(
  "https://aewjhxdusrzluxpzmnxh.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFld2poeGR1c3J6bHV4cHptbnhoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU1MzA0NzIsImV4cCI6MjA3MTEwNjQ3Mn0.8DoJ0wjO9Z_X8f5VwsAYwWWWTfOpyX1IGEwjm4f6jhY"
);
