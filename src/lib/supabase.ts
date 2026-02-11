import { createClient } from '@supabase/supabase-js'

// Supabase client for data fetching (authentication handled by Cloudflare Access)
// Note: These are PUBLIC anon keys safe for client-side use (RLS enforced on backend)
const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL || 'https://ibhjsutgxhujbjhrilwx.supabase.co'
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImliaGpzdXRneGh1amJqaHJpbHd4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjkzNzkzODgsImV4cCI6MjA4NDk1NTM4OH0.5BWyde9ozVjf9KV-se6o0g6zf2MBWlUWU6pN98KaOO4'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
