import { supabase } from "./supabase"

export type ContactFormData = {
  name: string
  email: string
  subject: string
  message: string
}

/**
 * Submit contact form data directly to Supabase from the client
 * This is a fallback for when the API route is not available
 */
export async function submitContactFormDirectly(formData: ContactFormData): Promise<boolean> {
  try {
    // Try to insert the data directly using the client-side Supabase instance
    const { error } = await supabase.from("contact_submissions").insert([
      {
        name: formData.name,
        email: formData.email,
        subject: formData.subject || "Contact Form Submission",
        message: formData.message,
        read: false,
      },
    ])

    if (error) {
      console.error("Error submitting contact form directly:", error)
      return false
    }

    return true
  } catch (error) {
    console.error("Error in direct contact form submission:", error)
    return false
  }
}

/**
 * Simulate a successful form submission for preview environments
 */
export function simulateContactFormSubmission(formData: ContactFormData): Promise<boolean> {
  return new Promise((resolve) => {
    // Simulate network delay
    setTimeout(() => {
      console.log("Contact form submission simulated:", formData)
      resolve(true)
    }, 1000)
  })
}
