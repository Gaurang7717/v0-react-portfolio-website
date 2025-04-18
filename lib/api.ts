import { supabase } from "./supabase"
import type { Project, ContactSubmission } from "@/types/database"

// Projects API
export async function getProjects() {
  const { data, error } = await supabase.from("projects").select("*").order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching projects:", error)
    throw error
  }

  return data as Project[]
}

export async function getProjectById(id: string) {
  const { data, error } = await supabase.from("projects").select("*").eq("id", id).single()

  if (error) {
    console.error(`Error fetching project with id ${id}:`, error)
    throw error
  }

  return data as Project
}

export async function createProject(project: Omit<Project, "id" | "created_at" | "updated_at">) {
  const { data, error } = await supabase.from("projects").insert([project]).select()

  if (error) {
    console.error("Error creating project:", error)
    throw error
  }

  return data[0] as Project
}

export async function updateProject(id: string, project: Partial<Omit<Project, "id" | "created_at" | "updated_at">>) {
  const { data, error } = await supabase
    .from("projects")
    .update({ ...project, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select()

  if (error) {
    console.error(`Error updating project with id ${id}:`, error)
    throw error
  }

  return data[0] as Project
}

export async function deleteProject(id: string) {
  const { error } = await supabase.from("projects").delete().eq("id", id)

  if (error) {
    console.error(`Error deleting project with id ${id}:`, error)
    throw error
  }

  return true
}

// Contact Submissions API
export async function submitContactForm(submission: Omit<ContactSubmission, "id" | "read" | "created_at">) {
  const { data, error } = await supabase.from("contact_submissions").insert([submission]).select()

  if (error) {
    console.error("Error submitting contact form:", error)
    throw error
  }

  return data[0] as ContactSubmission
}

export async function getContactSubmissions() {
  const { data, error } = await supabase
    .from("contact_submissions")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching contact submissions:", error)
    throw error
  }

  return data as ContactSubmission[]
}

export async function markContactSubmissionAsRead(id: string, read = true) {
  const { data, error } = await supabase.from("contact_submissions").update({ read }).eq("id", id).select()

  if (error) {
    console.error(`Error updating contact submission with id ${id}:`, error)
    throw error
  }

  return data[0] as ContactSubmission
}

export async function deleteContactSubmission(id: string) {
  const { error } = await supabase.from("contact_submissions").delete().eq("id", id)

  if (error) {
    console.error(`Error deleting contact submission with id ${id}:`, error)
    throw error
  }

  return true
}
