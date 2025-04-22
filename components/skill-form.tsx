"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Loader2, Save } from "lucide-react"
import { createSkill, updateSkill } from "@/lib/api"
import type { Skill } from "@/types/database"
import { useToast } from "@/components/ui/use-toast"
import {
  Palette,
  Framer,
  Code2,
  PenTool,
  Layers,
  Lightbulb,
  Users,
  LineChart,
  Smartphone,
  Figma,
  Database,
  Server,
  Globe,
  Monitor,
  Cpu,
  GitBranch,
  Terminal,
  Coffee,
} from "lucide-react"

type SkillFormProps = {
  skill?: Skill
  isEditing?: boolean
}

export default function SkillForm({ skill, isEditing = false }: SkillFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: skill?.name || "",
    icon: skill?.icon || "Palette",
    description: skill?.description || "",
    order: skill?.order ?? 0,
  })
  const { toast } = useToast()
  const router = useRouter()

  const availableIcons = [
    { name: "Palette", component: <Palette className="h-6 w-6" /> },
    { name: "Framer", component: <Framer className="h-6 w-6" /> },
    { name: "Code2", component: <Code2 className="h-6 w-6" /> },
    { name: "PenTool", component: <PenTool className="h-6 w-6" /> },
    { name: "Layers", component: <Layers className="h-6 w-6" /> },
    { name: "Lightbulb", component: <Lightbulb className="h-6 w-6" /> },
    { name: "Users", component: <Users className="h-6 w-6" /> },
    { name: "LineChart", component: <LineChart className="h-6 w-6" /> },
    { name: "Smartphone", component: <Smartphone className="h-6 w-6" /> },
    { name: "Figma", component: <Figma className="h-6 w-6" /> },
    { name: "Database", component: <Database className="h-6 w-6" /> },
    { name: "Server", component: <Server className="h-6 w-6" /> },
    { name: "Globe", component: <Globe className="h-6 w-6" /> },
    { name: "Monitor", component: <Monitor className="h-6 w-6" /> },
    { name: "Cpu", component: <Cpu className="h-6 w-6" /> },
    { name: "GitBranch", component: <GitBranch className="h-6 w-6" /> },
    { name: "Terminal", component: <Terminal className="h-6 w-6" /> },
    { name: "Coffee", component: <Coffee className="h-6 w-6" /> },
  ]

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleIconSelect = (iconName: string) => {
    setFormData((prev) => ({ ...prev, icon: iconName }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      setIsSubmitting(true)

      if (isEditing && skill) {
        await updateSkill(skill.id, formData)
        toast({
          title: "Success",
          description: "Skill updated successfully.",
        })
      } else {
        await createSkill(formData)
        toast({
          title: "Success",
          description: "Skill created successfully.",
        })
      }

      router.push("/admin/skills")
    } catch (error) {
      console.error("Error submitting skill:", error)
      toast({
        title: "Error",
        description: isEditing ? "Failed to update skill." : "Failed to create skill.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardContent className="p-6 space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Skill Name</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="UI Design"
              required
              disabled={isSubmitting}
            />
          </div>

          <div className="space-y-2">
            <Label>Icon</Label>
            <div className="grid grid-cols-3 sm:grid-cols-6 md:grid-cols-9 gap-2">
              {availableIcons.map((icon) => (
                <div
                  key={icon.name}
                  onClick={() => handleIconSelect(icon.name)}
                  className={`flex flex-col items-center justify-center p-3 rounded-md cursor-pointer border transition-all ${
                    formData.icon === icon.name
                      ? "border-primary bg-primary/10"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <div className="text-primary mb-1">{icon.component}</div>
                  <span className="text-xs">{icon.name}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Creating beautiful and intuitive interfaces with attention to detail"
              rows={3}
              required
              disabled={isSubmitting}
            />
          </div>

          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/admin/skills")}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> {isEditing ? "Updating..." : "Creating..."}
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" /> {isEditing ? "Update" : "Create"} Skill
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  )
}
