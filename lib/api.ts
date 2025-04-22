import { supabase } from "./supabase"
import type { Project, ContactSubmission, Experience } from "@/types/database"

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
  // Validate that the ID is a valid UUID format
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
  if (!uuidRegex.test(id)) {
    throw new Error(`Invalid project ID format: ${id}`)
  }

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

// Experience API
export async function getExperiences() {
  try {
    // Try to order by the 'order' column
    const { data, error } = await supabase.from("experiences").select("*").order("order", { ascending: true })

    if (error) {
      throw error
    }

    return data as Experience[]
  } catch (error) {
    // If the 'order' column doesn't exist, try ordering by created_at instead
    if (error.message && error.message.includes("column experiences.order does not exist")) {
      const { data, error: secondError } = await supabase
        .from("experiences")
        .select("*")
        .order("created_at", { ascending: false })

      if (secondError) {
        console.error("Error fetching experiences:", secondError)
        throw secondError
      }

      return data.map((exp, index) => ({
        ...exp,
        order: index, // Add a virtual order property
      })) as Experience[]
    }

    console.error("Error fetching experiences:", error)
    throw error
  }
}

export async function getExperienceById(id: string) {
  // Validate that the ID is a valid UUID format
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
  if (!uuidRegex.test(id)) {
    throw new Error(`Invalid experience ID format: ${id}`)
  }

  const { data, error } = await supabase.from("experiences").select("*").eq("id", id).single()

  if (error) {
    console.error(`Error fetching experience with id ${id}:`, error)
    throw error
  }

  // If the order property doesn't exist, add a default one
  if (data && !data.hasOwnProperty("order")) {
    data.order = 0
  }

  return data as Experience
}

export async function createExperience(experience: Omit<Experience, "id" | "created_at" | "updated_at">) {
  // Remove the order property if it's not in the table schema
  const experienceData = { ...experience }

  try {
    const { data, error } = await supabase.from("experiences").insert([experienceData]).select()

    if (error) {
      throw error
    }

    return data[0] as Experience
  } catch (error) {
    // If the error is about the order column, try again without it
    if (error.message && error.message.includes("column experiences.order does not exist")) {
      // Remove the order property and try again
      const { order, ...experienceWithoutOrder } = experienceData

      const { data, error: secondError } = await supabase.from("experiences").insert([experienceWithoutOrder]).select()

      if (secondError) {
        console.error("Error creating experience:", secondError)
        throw secondError
      }

      // Add the order property back to the returned data
      return { ...data[0], order } as Experience
    }

    console.error("Error creating experience:", error)
    throw error
  }
}

export async function updateExperience(
  id: string,
  experience: Partial<Omit<Experience, "id" | "created_at" | "updated_at">>,
) {
  // Remove the order property if it's not in the table schema
  const experienceData = { ...experience, updated_at: new Date().toISOString() }

  try {
    const { data, error } = await supabase.from("experiences").update(experienceData).eq("id", id).select()

    if (error) {
      throw error
    }

    return data[0] as Experience
  } catch (error) {
    // If the error is about the order column, try again without it
    if (error.message && error.message.includes("column experiences.order does not exist")) {
      // Remove the order property and try again
      const { order, ...experienceWithoutOrder } = experienceData

      const { data, error: secondError } = await supabase
        .from("experiences")
        .update(experienceWithoutOrder)
        .eq("id", id)
        .select()

      if (secondError) {
        console.error(`Error updating experience with id ${id}:`, secondError)
        throw secondError
      }

      // Add the order property back to the returned data
      return { ...data[0], order: experience.order } as Experience
    }

    console.error(`Error updating experience with id ${id}:`, error)
    throw error
  }
}

export async function deleteExperience(id: string) {
  const { error } = await supabase.from("experiences").delete().eq("id", id)

  if (error) {
    console.error(`Error deleting experience with id ${id}:`, error)
    throw error
  }

  return true
}

export async function reorderExperiences(orderedIds: string[]) {
  try {
    const updates = orderedIds.map((id, index) => ({
      id,
      order: index,
    }))

    const { error } = await supabase.from("experiences").upsert(updates)

    if (error) {
      throw error
    }

    return true
  } catch (error) {
    // If the error is about the order column, we can't reorder
    if (error.message && error.message.includes("column experiences.order does not exist")) {
      console.error("Cannot reorder experiences: order column does not exist")
      throw new Error("The order column does not exist in the experiences table. Please add it to enable reordering.")
    }

    console.error("Error reordering experiences:", error)
    throw error
  }
}
