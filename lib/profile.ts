import { supabase } from "./supabase"
import type { Profile } from "@/types/database"

export async function createProfile(userId: string, profile: Partial<Omit<Profile, "id" | "updated_at">>) {
  const { data, error } = await supabase
    .from("profiles")
    .insert([{ id: userId, ...profile }])
    .select()

  if (error) {
    console.error("Error creating profile:", error)
    throw error
  }

  return data[0] as Profile
}

export async function getProfile(userId: string) {
  const { data, error } = await supabase.from("profiles").select("*").eq("id", userId).single()

  if (error && error.code !== "PGRST116") {
    // PGRST116 is the error code for "no rows returned"
    console.error(`Error fetching profile for user ${userId}:`, error)
    throw error
  }

  return data as Profile | null
}

export async function updateProfile(userId: string, profile: Partial<Omit<Profile, "id" | "updated_at">>) {
  const { data, error } = await supabase
    .from("profiles")
    .update({ ...profile, updated_at: new Date().toISOString() })
    .eq("id", userId)
    .select()

  if (error) {
    console.error(`Error updating profile for user ${userId}:`, error)
    throw error
  }

  return data[0] as Profile
}
