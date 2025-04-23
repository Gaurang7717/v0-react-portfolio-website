import { createClient } from "@supabase/supabase-js"

// For client-side usage
const createBrowserClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error("Missing Supabase environment variables")
  }

  return createClient(supabaseUrl, supabaseAnonKey)
}

// For server-side usage
const createServerClient = () => {
  const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error("Missing Supabase environment variables for server client")
  }

  return createClient(supabaseUrl, supabaseServiceKey)
}

// Create a singleton instance for the browser
let browserClient: ReturnType<typeof createClient> | undefined

export function getBrowserClient() {
  if (typeof window === "undefined") {
    throw new Error("getBrowserClient should only be called in the browser")
  }

  if (!browserClient) {
    browserClient = createBrowserClient()
  }

  return browserClient
}

// Export the supabase client for browser usage
export const supabase = typeof window !== "undefined" ? getBrowserClient() : createBrowserClient()

// Export the server client function
export const getServerClient = createServerClient
