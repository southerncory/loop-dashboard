import { createClient } from '@supabase/supabase-js'

// Supabase client for data fetching (authentication handled by Cloudflare Access)
const supabaseUrl = 'https://ibhjsutgxhujbjhrilwx.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImliaGpzdXRneGh1amJqaHJpbHd4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjkzNzkzODgsImV4cCI6MjA4NDk1NTM4OH0.5BWyde9ozVjf9KV-se6o0g6zf2MBWlUWU6pN98KaOO4'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
