import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const supabaseUrl = "https://lrsekdsrgsccsmtchmhc.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxyc2VrZHNyZ3NjY3NtdGNobWhjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE0NjgwMTIsImV4cCI6MjA4NzA0NDAxMn0.L114ChIs2r7xu6gXMrhZ6uwHGpQ4Ere74mh231Ffu0U";

export const supabase = createClient(supabaseUrl, supabaseKey);