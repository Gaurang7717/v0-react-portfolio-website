"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Loader2, Save, X, Plus } from "lucide-react"
import { createProject, updateProject } from "@/lib/api"
import type { Project } from "@/types/database"
import { useToast } from "@/components/ui/use-toast"

type ProjectFormProps = {
  project?: Project
  isEditing?: boolean
}

export default function ProjectForm({ project, isEditing = false }: ProjectFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    title: project?.title || "",
    description: project?.description || "",
    image_url: project?.image_url || "",
    live_url: project?.live_url || "",
    github_url: project?.github_url || "",
    categories: project?.categories || [],
    featured: project?.featured || false,
  })
  const [newCategory, setNewCategory] = useState("")
  const { toast } = useToast()
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, featured: checked }))
  }

  const handleAddCategory = () => {
    if (newCategory.trim() && !formData.categories.includes(newCategory.trim())) {
      setFormData((prev) => ({
        ...prev,
        categories: [...prev.categories, newCategory.trim()],
      }))
      setNewCategory("")
    }
  }

  const handleRemoveCategory = (category: string) => {
    setFormData((prev) => ({
      ...prev,
      categories: prev.categories.filter((c) => c !== category),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      setIsSubmitting(true)

      if (isEditing && project) {
        await updateProject(project.id, formData)
        toast({
          title: "Success",
          description: "Project updated successfully.",
        })
      } else {
        await createProject(formData)
        toast({
          title: "Success",
          description: "Project created successfully.",
        })
      }

      router.push("/admin/projects")
    } catch (error) {
      console.error("Error submitting project:", error)
      toast({
        title: "Error",
        description: isEditing ? "Failed to update project." : "Failed to create project.",
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
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Project Title"
              required
              disabled={isSubmitting}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Project Description"
              rows={5}
              required
              disabled={isSubmitting}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="image_url">Image URL</Label>
            <Input
              id="image_url"
              name="image_url"
              value={formData.image_url || ""}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
              disabled={isSubmitting}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="live_url">Live URL</Label>
              <Input
                id="live_url"
                name="live_url"
                value={formData.live_url || ""}
                onChange={handleChange}
                placeholder="https://example.com"
                disabled={isSubmitting}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="github_url">GitHub URL</Label>
              <Input
                id="github_url"
                name="github_url"
                value={formData.github_url || ""}
                onChange={handleChange}
                placeholder="https://github.com/username/repo"
                disabled={isSubmitting}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Categories</Label>
            <div className="flex flex-wrap gap-2 mb-2">
              {formData.categories.map((category) => (
                <div
                  key={category}
                  className="flex items-center gap-1 text-sm px-3 py-1 rounded-full bg-primary/10 text-primary"
                >
                  {category}
                  <button
                    type="button"
                    onClick={() => handleRemoveCategory(category)}
                    className="text-primary hover:text-primary/70"
                    disabled={isSubmitting}
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                placeholder="Add category"
                disabled={isSubmitting}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault()
                    handleAddCategory()
                  }
                }}
              />
              <Button
                type="button"
                variant="outline"
                onClick={handleAddCategory}
                disabled={isSubmitting || !newCategory.trim()}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="featured"
              checked={formData.featured}
              onCheckedChange={handleCheckboxChange}
              disabled={isSubmitting}
            />
            <Label htmlFor="featured">Featured Project</Label>
          </div>

          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/admin/projects")}
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
                  <Save className="mr-2 h-4 w-4" /> {isEditing ? "Update" : "Create"} Project
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  )
}
