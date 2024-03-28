import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://sofvkbkxqsqroytedzmv.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNvZnZrYmt4cXNxcm95dGVkem12Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDcxNzc4OTcsImV4cCI6MjAyMjc1Mzg5N30.l1Rw1uIWUd9a11Yi1KRLfn8ukWVoFqRBwnZKiHceiEA";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
