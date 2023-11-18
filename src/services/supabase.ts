import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://nrccltrdiqysnixakfna.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5yY2NsdHJkaXF5c25peGFrZm5hIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDAxNTE1NjgsImV4cCI6MjAxNTcyNzU2OH0.crKU8cZ74VNy-X7g2OcTXEDY0E1DrpbRX6M_2FNKXto";
const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;
