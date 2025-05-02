"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import type { Experience, ExperienceFormData } from "@/types/database"
import { createExperience, updateExperience } from "@/app/actions/experience-actions"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { Trash2 } from "lucide-react"

interface ExperienceFormProps {
  experience?: Experience
  onDelete?: (id: string) => void
}

export function ExperienceForm({ experience, onDelete }: ExperienceFormProps) {
  const router = useRouter()
  const isEditing = !!experience

  const [formData, setFormData] = useState<ExperienceFormData>({
    id: experience?.id || undefined,
    title: experience?.title || "",
    company: experience?.company || "",
    location: experience?.location || "",
    description: experience?.description || [""],
    skills: experience?.skills || [""],
    order: experience?.order || 0,
    is_current: experience?.is_current || false,
    start_date: experience?.start_date || "",
    end_date: experience?.end_date || null,
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      if (isEditing) {
        await updateExperience(formData)
      } else {
        await createExperience(formData)
      }
    } catch (error) {
      console.error("Error submitting form:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // Handle checkbox changes
  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      is_current: checked,
      end_date: checked ? null : prev.end_date,
    }))
  }

  // Handle description array changes
  const handleDescriptionChange = (index: number, value: string) => {
    const newDescription = [...formData.description]
    newDescription[index] = value
    setFormData((prev) => ({ ...prev, description: newDescription }))
  }

  // Add new description field
  const addDescriptionField = () => {
    setFormData((prev) => ({
      ...prev,
      description: [...prev.description, ""],
    }))
  }

  // Remove description field
  const removeDescriptionField = (index: number) => {
    const newDescription = [...formData.description]
    newDescription.splice(index, 1)
    setFormData((prev) => ({ ...prev, description: newDescription }))
  }

  // Handle skills array changes
  const handleSkillsChange = (index: number, value: string) => {
    const newSkills = [...formData.skills]
    newSkills[index] = value
    setFormData((prev) => ({ ...prev, skills: newSkills }))
  }

  // Add new skill field
  const addSkillField = () => {
    setFormData((prev) => ({
      ...prev,
      skills: [...prev.skills, ""],
    }))
  }

  // Remove skill field
  const removeSkillField = (index: number) => {
    const newSkills = [...formData.skills]
    newSkills.splice(index, 1)
    setFormData((prev) => ({ ...prev, skills: newSkills }))
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{isEditing ? "Edit Experience" : "Add New Experience"}</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Job Title</Label>
              <Input id="title" name="title" value={formData.title} onChange={handleChange} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="company">Company</Label>
              <Input id="company" name="company" value={formData.company} onChange={handleChange} required />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input id="location" name="location" value={formData.location} onChange={handleChange} required />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="start_date">Start Date</Label>
              <Input
                id="start_date"
                name="start_date"
                type="date"
                value={formData.start_date}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="end_date">End Date</Label>
              <div className="flex flex-col space-y-2">
                <Input
                  id="end_date"
                  name="end_date"
                  type="date"
                  value={formData.end_date || ""}
                  onChange={handleChange}
                  disabled={formData.is_current}
                />
                <div className="flex items-center space-x-2">
                  <Checkbox id="is_current" checked={formData.is_current} onCheckedChange={handleCheckboxChange} />
                  <Label htmlFor="is_current" className="text-sm font-normal">
                    I currently work here
                  </Label>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="order">Display Order</Label>
            <Input id="order" name="order" type="number" value={formData.order} onChange={handleChange} required />
            <p className="text-sm text-muted-foreground">Lower numbers appear first</p>
          </div>

          <Separator />

          <div className="space-y-2">
            <Label>Description</Label>
            <p className="text-sm text-muted-foreground mb-2">
              Add bullet points describing your responsibilities and achievements
            </p>

            {formData.description.map((item, index) => (
              <div key={`desc-${index}`} className="flex items-start space-x-2 mb-2">
                <Textarea
                  value={item}
                  onChange={(e) => handleDescriptionChange(index, e.target.value)}
                  className="flex-1"
                  rows={2}
                />
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => removeDescriptionField(index)}
                  disabled={formData.description.length <= 1}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}

            <Button type="button" variant="outline" onClick={addDescriptionField} className="w-full">
              Add Description Item
            </Button>
          </div>

          <Separator />

          <div className="space-y-2">
            <Label>Skills</Label>
            <p className="text-sm text-muted-foreground mb-2">Add skills used in this role</p>

            {formData.skills.map((skill, index) => (
              <div key={`skill-${index}`} className="flex items-center space-x-2 mb-2">
                <Input value={skill} onChange={(e) => handleSkillsChange(index, e.target.value)} className="flex-1" />
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => removeSkillField(index)}
                  disabled={formData.skills.length <= 1}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}

            <Button type="button" variant="outline" onClick={addSkillField} className="w-full">
              Add Skill
            </Button>
          </div>
        </CardContent>

        <CardFooter className="flex justify-between">
          <div>
            {isEditing && onDelete && (
              <Button type="button" variant="destructive" onClick={() => onDelete(experience.id)}>
                Delete
              </Button>
            )}
          </div>
          <div className="flex space-x-2">
            <Button type="button" variant="outline" onClick={() => router.push("/admin/experiences")}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : isEditing ? "Update" : "Create"}
            </Button>
          </div>
        </CardFooter>
      </form>
    </Card>
  )
}
