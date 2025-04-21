"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"
import ExperienceForm from "@/components/experience-form"
import { getExperienceById } from "@/lib/api"
import type { Experience } from "@/types/database"
import { useToast } from "@/components/ui/use-toast"

export default function EditExperiencePage() {
  const [experience, setExperience] = useState<Experience | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const experienceId = params.id as string

  useEffect(() => {
    // If the ID is "new", redirect to the dedicated new experience page
    if (experienceId === "new") {
      router.push("/admin/experiences/new")
      return
    }

    async function loadExperience() {
      try {
        setIsLoading(true)
        const data = await getExperienceById(experienceId)
        setExperience(data)
      } catch (error) {
        console.error("Failed to load experience:", error)
        toast({
          title: "Error",
          description: "Failed to load experience. Please try again later.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    if (experienceId && experienceId !== "new") {
      loadExperience()
    }
  }, [experienceId, toast, router])

  // If we're redirecting to the new page, show a loading state
  if (experienceId === "new") {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-8rem)]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-8rem)]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (!experience) {
    return (
      <div className="text-center py-12">
        <h1 className="text-3xl font-bold mb-4">Experience Not Found</h1>
        <p className="text-muted-foreground">The experience you're looking for doesn't exist or has been removed.</p>
      </div>
    )
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Edit Experience</h1>
      <ExperienceForm experience={experience} isEditing />
    </div>
  )
}
