import { createClient } from '@supabase/supabase-js';
import type { Database } from '../types/database.types';

// Support standard Vite, Next.js, and raw Supabase environment variables
const supabaseUrl =
  import.meta.env.VITE_SUPABASE_URL ||
  import.meta.env.NEXT_PUBLIC_SUPABASE_URL ||
  import.meta.env.SUPABASE_URL ||
  'https://uyfioampixaezkjsynce.supabase.co';

const supabaseAnonKey =
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  import.meta.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  import.meta.env.SUPABASE_PUBLISHABLE_KEY ||
  import.meta.env.SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV5ZmlvYW1waXhhZXpranN5bmNlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODcxMzcxNDAsImV4cCI6MjEwMjcxMzE0MH0.B7WYimox9cBYW6UzkoWhZ_bkKC8m-FOYnUn7PHVsoUk';

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
  realtime: {
    params: {
      eventsPerSecond: 10,
    },
  },
});
