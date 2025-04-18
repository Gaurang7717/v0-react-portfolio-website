"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Loader2 } from "lucide-react"
import ProjectForm from "@/components/project-form"
import { getProjectById } from "@/lib/api"
import type { Project } from "@/types/database"
import { useToast } from "@/components/ui/use-toast"

export default function EditProjectPage() {
  const [project, setProject] = useState<Project | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const params = useParams()
  const { toast } = useToast()
  const projectId = params.id as string

  useEffect(() => {
    async function loadProject() {
      try {
        setIsLoading(true)
        const data = await getProjectById(projectId)
        setProject(data)
      } catch (error) {
        console.error("Failed to load project:", error)
        toast({
          title: "Error",
          description: "Failed to load project. Please try again later.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    if (projectId) {
      loadProject()
    }
  }, [projectId, toast])

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-8rem)]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (!project) {
    return (
      <div className="text-center py-12">
        <h1 className="text-3xl font-bold mb-4">Project Not Found</h1>
        <p className="text-muted-foreground">The project you're looking for doesn't exist or has been removed.</p>
      </div>
    )
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Edit Project</h1>
      <ProjectForm project={project} isEditing />
    </div>
  )
}
