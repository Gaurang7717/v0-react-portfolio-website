"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Loader2 } from "lucide-react"
import SkillForm from "@/components/skill-form"
import { getSkillById } from "@/lib/api"
import type { Skill } from "@/types/database"
import { useToast } from "@/components/ui/use-toast"

export default function EditSkillPage() {
  const [skill, setSkill] = useState<Skill | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const params = useParams()
  const { toast } = useToast()
  const skillId = params.id as string
  const isNew = skillId === "new"

  useEffect(() => {
    async function loadSkill() {
      if (isNew) {
        setIsLoading(false)
        return
      }
      try {
        setIsLoading(true)
        const data = await getSkillById(skillId)
        setSkill(data)
      } catch (error) {
        console.error("Failed to load skill:", error)
        toast({
          title: "Error",
          description: "Failed to load skill. Please try again later.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    loadSkill()
  }, [skillId, toast, isNew])

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-8rem)]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (isNew) {
    return (
      <div>
        <h1 className="text-3xl font-bold mb-8">Add New Skill</h1>
        <SkillForm />
      </div>
    )
  }

  if (!skill) {
    return (
      <div className="text-center py-12">
        <h1 className="text-3xl font-bold mb-4">Skill Not Found</h1>
        <p className="text-muted-foreground">The skill you're looking for doesn't exist or has been removed.</p>
      </div>
    )
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Edit Skill</h1>
      <SkillForm skill={skill} isEditing />
    </div>
  )
}
