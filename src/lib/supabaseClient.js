import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Debug logging (will appear in Vercel build logs)
if (typeof window === 'undefined') {
  console.log('Supabase URL:', supabaseUrl ? 'Set ✓' : 'Missing ✗');
  console.log('Supabase Key:', supabaseAnonKey ? 'Set ✓' : 'Missing ✗');
}

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase credentials!');
  console.error('URL:', supabaseUrl);
  console.error('Key:', supabaseAnonKey ? 'exists' : 'missing');
}

export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-key'
);