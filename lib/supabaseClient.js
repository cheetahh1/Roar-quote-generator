import { createClient } from '@supabase/supabase-js'

// Lazily create the client to avoid throwing during import at build time.
// Prefer server-side env vars, fall back to NEXT_PUBLIC for client contexts.
let cachedSupabaseClient = null

export function getSupabaseClient() {
  if (cachedSupabaseClient) return cachedSupabaseClient

  const url =
    process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || ''
  const anonKey =
    process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

  if (!url || !anonKey) {
    // Do not throw at import time; surface a clear error when used.
    throw new Error(
      'Supabase configuration missing. Set SUPABASE_URL and SUPABASE_ANON_KEY (or NEXT_PUBLIC_ variants).'
    )
  }

  cachedSupabaseClient = createClient(url, anonKey)
  return cachedSupabaseClient
}

