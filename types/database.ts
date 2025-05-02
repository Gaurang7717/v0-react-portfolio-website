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

export interface Experience {
  id: string
  title: string
  company: string
  location: string
  period: string
  description: string[]
  skills: string[]
  order: number
  created_at: string
  updated_at: string
  is_current: boolean
  start_date: string | null
  end_date: string | null
}

export interface ExperienceFormData {
  id?: string
  title: string
  company: string
  location: string
  description: string[]
  skills: string[]
  order: number
  is_current: boolean
  start_date: string
  end_date: string | null
}

export type Skill = {
  id: string
  name: string
  icon: string
  description: string
  order: number
  created_at: string
  updated_at: string
}

export type Education = {
  id: string
  degree: string
  institution: string
  location: string
  year: string
  description: string | null
  order: number
  created_at: string
  updated_at: string
}

export type Certification = {
  id: string
  title: string
  issuer: string
  date: string
  description: string | null
  order: number
  created_at: string
  updated_at: string
}

export type Language = {
  id: string
  name: string
  proficiency: string
  order: number
  created_at: string
  updated_at: string
}

export type Hobby = {
  id: string
  name: string
  icon: string
  order: number
  created_at: string
  updated_at: string
}

export type Analytics = {
  id: string
  page_path: string
  visitor_id: string
  device_type: string
  browser: string | null
  country: string | null
  referrer: string | null
  timestamp: string
}

export type AnalyticsSummary = {
  totalVisitors: number
  uniqueVisitors: number
  mobileVisitors: number
  desktopVisitors: number
  tabletVisitors: number
  pageViews: Record<string, number>
  dailyVisitors: { date: string; count: number }[]
  weeklyVisitors: { week: string; count: number }[]
  monthlyVisitors: { month: string; count: number }[]
}

export type TimeRange = "day" | "week" | "month" | "year" | "all"
