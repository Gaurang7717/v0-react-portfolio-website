import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getExperienceById, deleteExperience } from "@/app/actions/experience-actions"
import { ExperienceForm } from "../experience-form"

export const metadata: Metadata = {
  title: "Edit Experience",
  description: "Edit your work experience",
}

interface EditExperiencePageProps {
  params: {
    id: string
  }
}

export default async function EditExperiencePage({ params }: EditExperiencePageProps) {
  const experience = await getExperienceById(params.id)

  if (!experience) {
    notFound()
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold tracking-tight mb-6">Edit Experience</h1>
      <ExperienceForm experience={experience} onDelete={deleteExperience} />
    </div>
  )
}
