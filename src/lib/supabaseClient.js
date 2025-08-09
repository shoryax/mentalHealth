import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://wvsonkxtvyyrrhxafczf.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind2c29ua3h0dnl5cnJoeGFmY3pmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEwOTAwODQsImV4cCI6MjA2NjY2NjA4NH0.p94IZzWJwGLtxP_r8atsIzN8jtvEjcO6P6sR73bQV1k';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);