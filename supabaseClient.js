<!-- PON ESTO EN index.html y dashboard.html, dentro de <head> -->
<script src="https://unpkg.com/@supabase/supabase-js@2"></script>
<script>
  // Cliente Supabase global (sin módulos, compatible iOS)
  window.supabaseClient = window.supabase.createClient(
    "https://nqokfvddbpjqrsfflntk.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5xb2tmdmRkYnBqcXJzZmZsbnRrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU2NDE5OTgsImV4cCI6MjA3MTIxNzk5OH0.A5CzSNjHJ9y012vJjDunzYMTzoxGwu6RV88OmKYOUGo"
  );
</script>
