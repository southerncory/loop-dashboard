import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ibhjsutgxhujbjhrilwx.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImliaGpzdXRneGh1amJqaHJpbHd4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjkzNzkzODgsImV4cCI6MjA4NDk1NTM4OH0.5BWyde9ozVjf9KV-se6o0g6zf2MBWlUWU6pN98KaOO4'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Allowed emails for dashboard access
export const ALLOWED_EMAILS = [
  'southerncory@gmail.com',
  'cory.southern@aa.com'
]

export function isAllowedEmail(email: string): boolean {
  return ALLOWED_EMAILS.includes(email.toLowerCase())
}
