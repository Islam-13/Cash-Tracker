import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://zxgiazcwkwefnppjvddr.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp4Z2lhemN3a3dlZm5wcGp2ZGRyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQzMzA5MjMsImV4cCI6MjA1OTkwNjkyM30.tZrBZeyDV1dyS2tpQ1MG0_x7JfLc2w__HWFd6GRFdqs";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
