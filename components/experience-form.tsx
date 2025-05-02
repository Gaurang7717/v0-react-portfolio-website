"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Loader2, Save, X, Plus } from "lucide-react"
import { createExperience, updateExperience } from "@/lib/api"
import type { Experience } from "@/types/database"
import { useToast } from "@/components/ui/use-toast"

type ExperienceFormProps = {
  experience?: Experience
  isEditing?: boolean
}

export default function ExperienceForm({ experience, isEditing = false }: ExperienceFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    title: experience?.title || "",
    company: experience?.company || "",
    location: experience?.location || "",
    start_date: experience?.start_date || "",
    end_date: experience?.end_date || "",
    is_current: experience?.is_current || false,
    description: experience?.description || [""],
    skills: experience?.skills || [],
    order: experience?.order ?? 0,
  })
  const [newSkill, setNewSkill] = useState("")
  const [newDescription, setNewDescription] = useState("")
  const { toast } = useToast()
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target
    setFormData((prev) => ({ ...prev, [name]: checked }))
  }

  const handleDateChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleAddSkill = () => {
    if (newSkill.trim() && !formData.skills.includes(newSkill.trim())) {
      setFormData((prev) => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()],
      }))
      setNewSkill("")
    }
  }

  const handleRemoveSkill = (skill: string) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s !== skill),
    }))
  }

  const handleAddDescription = () => {
    if (newDescription.trim()) {
      setFormData((prev) => ({
        ...prev,
        description: [...prev.description, newDescription.trim()],
      }))
      setNewDescription("")
    }
  }

  const handleRemoveDescription = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      description: prev.description.filter((_, i) => i !== index),
    }))
  }

  const handleUpdateDescription = (index: number, value: string) => {
    setFormData((prev) => {
      const newDescription = [...prev.description]
      newDescription[index] = value
      return {
        ...prev,
        description: newDescription,
      }
    })
  }

  const formatDateForDisplay = (dateString: string) => {
    if (!dateString) return ""

    try {
      const date = new Date(dateString)
      return date.toISOString().split("T")[0]
    } catch (error) {
      return dateString
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      setIsSubmitting(true)

      // Format the period based on start_date, end_date, and is_current
      const formattedData = {
        ...formData,
        period: formData.is_current
          ? `${formatDateForDisplay(formData.start_date)} - Present`
          : `${formatDateForDisplay(formData.start_date)} - ${formatDateForDisplay(formData.end_date)}`,
      }

      if (isEditing && experience) {
        await updateExperience(experience.id, formattedData)
        toast({
          title: "Success",
          description: "Experience updated successfully.",
        })
      } else {
        await createExperience(formattedData)
        toast({
          title: "Success",
          description: "Experience created successfully.",
        })
      }

      router.push("/admin/experiences")
    } catch (error) {
      console.error("Error submitting experience:", error)
      toast({
        title: "Error",
        description: isEditing ? "Failed to update experience." : "Failed to create experience.",
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
            <Label htmlFor="title">Job Title</Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="UI/UX Designer"
              required
              disabled={isSubmitting}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="company">Company</Label>
              <Input
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="Company Name"
                required
                disabled={isSubmitting}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="City, Country"
                required
                disabled={isSubmitting}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="start_date">Start Date</Label>
              <div className="flex items-center">
                <Input
                  id="start_date"
                  name="start_date"
                  type="date"
                  value={formData.start_date}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                  className="flex-1"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="end_date">End Date</Label>
              <div className="flex items-center">
                <Input
                  id="end_date"
                  name="end_date"
                  type="date"
                  value={formData.end_date}
                  onChange={handleChange}
                  required={!formData.is_current}
                  disabled={isSubmitting || formData.is_current}
                  className="flex-1"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="is_current"
              name="is_current"
              checked={formData.is_current}
              onChange={handleCheckboxChange}
              disabled={isSubmitting}
              className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
            />
            <Label htmlFor="is_current">I currently work here</Label>
          </div>

          <div className="space-y-2">
            <Label>Description Points</Label>
            <div className="space-y-4">
              {formData.description.map((desc, index) => (
                <div key={index} className="flex gap-2">
                  <Textarea
                    value={desc}
                    onChange={(e) => handleUpdateDescription(index, e.target.value)}
                    placeholder="Description point"
                    disabled={isSubmitting}
                    className="flex-1"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => handleRemoveDescription(index)}
                    disabled={isSubmitting || formData.description.length <= 1}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <div className="flex gap-2">
                <Textarea
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  placeholder="Add new description point"
                  disabled={isSubmitting}
                  className="flex-1"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleAddDescription}
                  disabled={isSubmitting || !newDescription.trim()}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Skills</Label>
            <div className="flex flex-wrap gap-2 mb-2">
              {formData.skills.map((skill) => (
                <div
                  key={skill}
                  className="flex items-center gap-1 text-sm px-3 py-1 rounded-full bg-primary/10 text-primary"
                >
                  {skill}
                  <button
                    type="button"
                    onClick={() => handleRemoveSkill(skill)}
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
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                placeholder="Add skill"
                disabled={isSubmitting}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault()
                    handleAddSkill()
                  }
                }}
              />
              <Button
                type="button"
                variant="outline"
                onClick={handleAddSkill}
                disabled={isSubmitting || !newSkill.trim()}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/admin/experiences")}
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
                  <Save className="mr-2 h-4 w-4" /> {isEditing ? "Update" : "Create"} Experience
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  )
}
