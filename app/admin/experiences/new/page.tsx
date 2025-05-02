import type { Metadata } from "next"
import { ExperienceForm } from "../experience-form"

export const metadata: Metadata = {
  title: "Add Experience",
  description: "Add a new work experience to your portfolio",
}

export default function NewExperiencePage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold tracking-tight mb-6">Add New Experience</h1>
      <ExperienceForm />
    </div>
  )
}
