"use client"

import { useState } from "react"
import Link from "next/link"
import type { Experience } from "@/types/database"
import { deleteExperience } from "@/app/actions/experience-actions"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Edit, Trash2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

interface ExperienceListProps {
  experiences: Experience[]
}

export function ExperienceList({ experiences }: ExperienceListProps) {
  const { toast } = useToast()
  const [items, setItems] = useState(experiences)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const handleDelete = async (id: string) => {
    setDeletingId(id)

    try {
      await deleteExperience(id)
      setItems(items.filter((item) => item.id !== id))
      toast({
        title: "Experience deleted",
        description: "The experience has been successfully deleted.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete the experience. Please try again.",
        variant: "destructive",
      })
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <div className="grid gap-6">
      {items.map((experience) => (
        <Card key={experience.id}>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle>{experience.title}</CardTitle>
                <CardDescription>
                  {experience.company} • {experience.location}
                </CardDescription>
              </div>
              {experience.is_current && (
                <Badge variant="outline" className="ml-2">
                  Current
                </Badge>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium mb-1">Period</h4>
                <p className="text-sm text-muted-foreground">{experience.period}</p>
              </div>

              <div>
                <h4 className="text-sm font-medium mb-1">Description</h4>
                <ul className="list-disc pl-5 space-y-1">
                  {experience.description.map((item, index) => (
                    <li key={index} className="text-sm text-muted-foreground">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-sm font-medium mb-1">Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {experience.skills.map((skill, index) => (
                    <Badge key={index} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end space-x-2">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline" size="icon">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete the experience and remove it from your
                    portfolio.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => handleDelete(experience.id)}
                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  >
                    {deletingId === experience.id ? "Deleting..." : "Delete"}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            <Button variant="outline" size="icon" asChild>
              <Link href={`/admin/experiences/${experience.id}`}>
                <Edit className="h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
