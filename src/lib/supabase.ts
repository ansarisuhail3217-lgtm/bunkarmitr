import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = "https://hwprnmhpbcjobgoqzebk.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh3cHJubWhwYmNqb2Jnb3F6ZWJrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIwMDk1MTMsImV4cCI6MjA4NzU4NTUxM30.J-eft0_V2CzRbr8VwbS0vSaPAwZTsOYJwG0A--xBbrA";

export const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
