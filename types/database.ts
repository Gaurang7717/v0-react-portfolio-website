export type Project = {
  id: string
  title: string
  description: string
  image_url: string | null
  live_url: string | null
  github_url: string | null
  categories: string[]
  featured: boolean
  created_at: string
  updated_at: string
}

export type ContactSubmission = {
  id: string
  name: string
  email: string
  subject: string
  message: string
  read: boolean
  created_at: string
}

export type Profile = {
  id: string
  full_name: string | null
  avatar_url: string | null
  role: string
  updated_at: string
}
