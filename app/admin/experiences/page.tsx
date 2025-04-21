"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Loader2, Plus, Pencil, Trash2, MoveUp, MoveDown, AlertTriangle } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

export default function ExperiencesPage() {
  const [experiences, setExperiences] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [experienceToDelete, setExperienceToDelete] = useState(null)
  const [tableExists, setTableExists] = useState(true)
  const [orderColumnExists, setOrderColumnExists] = useState(true)
  const { toast } = useToast()

  const loadExperiences = async () => {
    try {
      setIsLoading(true)
      const { getExperiences } = await import("@/lib/api")
      const data = await getExperiences()
      setExperiences(data)
      setTableExists(true)
      setOrderColumnExists(true)
    } catch (error) {
      console.error("Failed to load experiences:", error)
      if (error.message && error.message.includes("does not exist")) {
        if (error.message.includes("relation")) {
          setTableExists(false)
        } else if (error.message.includes("column experiences.order")) {
          setOrderColumnExists(false)
        }
      } else {
        toast({
          title: "Error",
          description: "Failed to load experiences. Please try again later.",
          variant: "destructive",
        })
      }
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadExperiences()
  }, [toast])

  const handleDelete = async () => {
    if (!experienceToDelete) return

    try {
      const { deleteExperience } = await import("@/lib/api")
      await deleteExperience(experienceToDelete)
      setExperiences(experiences.filter((experience) => experience.id !== experienceToDelete))
      toast({
        title: "Success",
        description: "Experience deleted successfully.",
      })
    } catch (error) {
      console.error("Failed to delete experience:", error)
      toast({
        title: "Error",
        description: "Failed to delete experience. Please try again later.",
        variant: "destructive",
      })
    } finally {
      setExperienceToDelete(null)
    }
  }

  const handleMoveUp = async (index) => {
    if (index <= 0 || !orderColumnExists) return

    try {
      const { reorderExperiences } = await import("@/lib/api")
      const newExperiences = [...experiences]
      const temp = newExperiences[index]
      newExperiences[index] = newExperiences[index - 1]
      newExperiences[index - 1] = temp

      setExperiences(newExperiences)
      await reorderExperiences(newExperiences.map((exp) => exp.id))

      toast({
        title: "Success",
        description: "Experience order updated successfully.",
      })
    } catch (error) {
      console.error("Failed to reorder experiences:", error)
      toast({
        title: "Error",
        description: error.message || "Failed to update experience order. Please try again later.",
        variant: "destructive",
      })

      if (error.message && error.message.includes("order column does not exist")) {
        setOrderColumnExists(false)
      }

      // Reload experiences to reset order
      loadExperiences()
    }
  }

  const handleMoveDown = async (index) => {
    if (index >= experiences.length - 1 || !orderColumnExists) return

    try {
      const { reorderExperiences } = await import("@/lib/api")
      const newExperiences = [...experiences]
      const temp = newExperiences[index]
      newExperiences[index] = newExperiences[index + 1]
      newExperiences[index + 1] = temp

      setExperiences(newExperiences)
      await reorderExperiences(newExperiences.map((exp) => exp.id))

      toast({
        title: "Success",
        description: "Experience order updated successfully.",
      })
    } catch (error) {
      console.error("Failed to reorder experiences:", error)
      toast({
        title: "Error",
        description: error.message || "Failed to update experience order. Please try again later.",
        variant: "destructive",
      })

      if (error.message && error.message.includes("order column does not exist")) {
        setOrderColumnExists(false)
      }

      // Reload experiences to reset order
      loadExperiences()
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-8rem)]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (!tableExists) {
    return (
      <div>
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Work Experiences</h1>
        </div>

        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <AlertTriangle className="h-12 w-12 text-amber-500 mb-4" />
              <h2 className="text-2xl font-semibold mb-2">Database Table Not Found</h2>
              <p className="text-muted-foreground mb-6 max-w-md">
                The experiences table doesn't exist in your database yet. You need to create it before you can manage
                work experiences.
              </p>
              <div className="bg-muted p-4 rounded-md mb-6 text-left overflow-auto w-full max-w-2xl">
                <pre className="text-xs">
                  {`-- Create experiences table
CREATE TABLE IF NOT EXISTS experiences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  company TEXT NOT NULL,
  location TEXT NOT NULL,
  period TEXT NOT NULL,
  description TEXT[] NOT NULL,
  skills TEXT[] NOT NULL,
  order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add RLS policies
ALTER TABLE experiences ENABLE ROW LEVEL SECURITY;

-- Create policy for authenticated users to read experiences
CREATE POLICY "Allow public read access" ON experiences
  FOR SELECT USING (true);

-- Create policy for authenticated users to insert experiences
CREATE POLICY "Allow authenticated users to insert" ON experiences
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Create policy for authenticated users to update their own experiences
CREATE POLICY "Allow authenticated users to update" ON experiences
  FOR UPDATE USING (auth.role() = 'authenticated');

-- Create policy for authenticated users to delete their own experiences
CREATE POLICY "Allow authenticated users to delete" ON experiences
  FOR DELETE USING (auth.role() = 'authenticated');`}
                </pre>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Run this SQL in your Supabase SQL Editor to create the experiences table.
              </p>
              <Button onClick={loadExperiences}>Refresh After Creating Table</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!orderColumnExists) {
    return (
      <div>
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Work Experiences</h1>
          <Button asChild>
            <Link href="/admin/experiences/new">
              <Plus className="mr-2 h-4 w-4" /> Add Experience
            </Link>
          </Button>
        </div>

        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <AlertTriangle className="h-12 w-12 text-amber-500 mb-4" />
              <h2 className="text-2xl font-semibold mb-2">Missing Order Column</h2>
              <p className="text-muted-foreground mb-6 max-w-md">
                The experiences table exists but is missing the 'order' column needed for reordering experiences.
              </p>
              <div className="bg-muted p-4 rounded-md mb-6 text-left overflow-auto w-full max-w-2xl">
                <pre className="text-xs">
                  {`-- Add order column to experiences table
ALTER TABLE experiences ADD COLUMN IF NOT EXISTS "order" INTEGER NOT NULL DEFAULT 0;`}
                </pre>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Run this SQL in your Supabase SQL Editor to add the order column.
              </p>
              <Button onClick={loadExperiences}>Refresh After Adding Column</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-0">
            {experiences.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12">
                <p className="text-muted-foreground mb-4">No experiences found</p>
                <Button asChild>
                  <Link href="/admin/experiences/new">
                    <Plus className="mr-2 h-4 w-4" /> Add Your First Experience
                  </Link>
                </Button>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead>Period</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {experiences.map((experience) => (
                    <TableRow key={experience.id}>
                      <TableCell className="font-medium">{experience.title}</TableCell>
                      <TableCell>{experience.company}</TableCell>
                      <TableCell>{experience.period}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="icon" asChild>
                            <Link href={`/admin/experiences/${experience.id}`}>
                              <Pencil className="h-4 w-4" />
                            </Link>
                          </Button>
                          <Button variant="outline" size="icon" onClick={() => setExperienceToDelete(experience.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Work Experiences</h1>
        <Button asChild>
          <Link href="/admin/experiences/new">
            <Plus className="mr-2 h-4 w-4" /> Add Experience
          </Link>
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          {experiences.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12">
              <p className="text-muted-foreground mb-4">No experiences found</p>
              <Button asChild>
                <Link href="/admin/experiences/new">
                  <Plus className="mr-2 h-4 w-4" /> Add Your First Experience
                </Link>
              </Button>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Period</TableHead>
                  <TableHead>Order</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {experiences.map((experience, index) => (
                  <TableRow key={experience.id}>
                    <TableCell className="font-medium">{experience.title}</TableCell>
                    <TableCell>{experience.company}</TableCell>
                    <TableCell>{experience.period}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleMoveUp(index)}
                          disabled={index === 0}
                        >
                          <MoveUp className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleMoveDown(index)}
                          disabled={index === experiences.length - 1}
                        >
                          <MoveDown className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="icon" asChild>
                          <Link href={`/admin/experiences/${experience.id}`}>
                            <Pencil className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button variant="outline" size="icon" onClick={() => setExperienceToDelete(experience.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <AlertDialog open={!!experienceToDelete} onOpenChange={() => setExperienceToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the experience from your portfolio.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
