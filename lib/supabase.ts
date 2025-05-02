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

// Export the server client function with better error handling
export const getServerClient = () => {
  // Check if required environment variables exist before attempting to create client
  const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY

  // If either variable is missing, return null instead of throwing an error
  if (!supabaseUrl || !supabaseServiceKey) {
    console.warn("Missing Supabase environment variables for server client - returning null")
    return null
  }

  // Only create client if we have the required variables
  try {
    return createClient(supabaseUrl, supabaseServiceKey)
  } catch (error) {
    console.error("Error creating Supabase server client:", error)
    return null
  }
}
