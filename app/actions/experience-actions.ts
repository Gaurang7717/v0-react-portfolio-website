"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import type { Experience, ExperienceFormData } from "@/types/database"

export async function getExperiences(): Promise<Experience[]> {
  const supabase = createClient()

  const { data, error } = await supabase.from("experiences").select("*").order("order", { ascending: true })

  if (error) {
    console.error("Error fetching experiences:", error)
    return []
  }

  return data || []
}

export async function getExperienceById(id: string): Promise<Experience | null> {
  const supabase = createClient()

  const { data, error } = await supabase.from("experiences").select("*").eq("id", id).single()

  if (error) {
    console.error("Error fetching experience:", error)
    return null
  }

  return data
}

export async function createExperience(formData: ExperienceFormData) {
  const supabase = createClient()

  // Format the period string based on start_date, end_date and is_current
  const startDate = new Date(formData.start_date)
  const startDateFormatted = startDate.toLocaleDateString("en-US", { month: "short", year: "numeric" })

  let period = startDateFormatted

  if (formData.is_current) {
    period += " - Present"
  } else if (formData.end_date) {
    const endDate = new Date(formData.end_date)
    const endDateFormatted = endDate.toLocaleDateString("en-US", { month: "short", year: "numeric" })
    period += ` - ${endDateFormatted}`
  }

  const { error } = await supabase.from("experiences").insert({
    title: formData.title,
    company: formData.company,
    location: formData.location,
    period: period,
    description: formData.description,
    skills: formData.skills,
    order: formData.order,
    is_current: formData.is_current,
    start_date: formData.start_date,
    end_date: formData.end_date,
  })

  if (error) {
    console.error("Error creating experience:", error)
    throw new Error("Failed to create experience")
  }

  revalidatePath("/admin/experiences")
  redirect("/admin/experiences")
}

export async function updateExperience(formData: ExperienceFormData) {
  const supabase = createClient()

  if (!formData.id) {
    throw new Error("Experience ID is required for update")
  }

  // Format the period string based on start_date, end_date and is_current
  const startDate = new Date(formData.start_date)
  const startDateFormatted = startDate.toLocaleDateString("en-US", { month: "short", year: "numeric" })

  let period = startDateFormatted

  if (formData.is_current) {
    period += " - Present"
  } else if (formData.end_date) {
    const endDate = new Date(formData.end_date)
    const endDateFormatted = endDate.toLocaleDateString("en-US", { month: "short", year: "numeric" })
    period += ` - ${endDateFormatted}`
  }

  const { error } = await supabase
    .from("experiences")
    .update({
      title: formData.title,
      company: formData.company,
      location: formData.location,
      period: period,
      description: formData.description,
      skills: formData.skills,
      order: formData.order,
      is_current: formData.is_current,
      start_date: formData.start_date,
      end_date: formData.end_date,
      updated_at: new Date().toISOString(),
    })
    .eq("id", formData.id)

  if (error) {
    console.error("Error updating experience:", error)
    throw new Error("Failed to update experience")
  }

  revalidatePath("/admin/experiences")
  redirect("/admin/experiences")
}

export async function deleteExperience(id: string) {
  const supabase = createClient()

  const { error } = await supabase.from("experiences").delete().eq("id", id)

  if (error) {
    console.error("Error deleting experience:", error)
    throw new Error("Failed to delete experience")
  }

  revalidatePath("/admin/experiences")
}
