import { createClient } from '@supabase/supabase-js';
export const supabaseUrl = 'https://tcprgupktzbbsbycgqbw.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRjcHJndXBrdHpiYnNieWNncWJ3Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MTA0NDU1MiwiZXhwIjoyMDY2NjIwNTUyfQ.aDFWueeO2iHX23vn-4f3hU5TS_TDU3FYxnNlTwpb79M';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
