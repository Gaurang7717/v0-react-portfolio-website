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
import { getSkills, deleteSkill, reorderSkills } from "@/lib/api"
import type { Skill } from "@/types/database"
import { useToast } from "@/components/ui/use-toast"
import * as LucideIcons from "lucide-react"

export default function SkillsPage() {
  const [skills, setSkills] = useState<Skill[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [skillToDelete, setSkillToDelete] = useState<string | null>(null)
  const [tableExists, setTableExists] = useState(true)
  const { toast } = useToast()

  const loadSkills = async () => {
    try {
      setIsLoading(true)
      const data = await getSkills()
      setSkills(data)
      setTableExists(true)
    } catch (error) {
      console.error("Failed to load skills:", error)
      if (error.message && error.message.includes('relation "skills" does not exist')) {
        setTableExists(false)
      } else {
        toast({
          title: "Error",
          description: "Failed to load skills. Please try again later.",
          variant: "destructive",
        })
      }
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadSkills()
  }, [toast])

  const handleDelete = async () => {
    if (!skillToDelete) return

    try {
      await deleteSkill(skillToDelete)
      setSkills(skills.filter((skill) => skill.id !== skillToDelete))
      toast({
        title: "Success",
        description: "Skill deleted successfully.",
      })
    } catch (error) {
      console.error("Failed to delete skill:", error)
      toast({
        title: "Error",
        description: "Failed to delete skill. Please try again later.",
        variant: "destructive",
      })
    } finally {
      setSkillToDelete(null)
    }
  }

  const handleMoveUp = async (index: number) => {
    if (index <= 0) return

    try {
      const newSkills = [...skills]
      const temp = newSkills[index]
      newSkills[index] = newSkills[index - 1]
      newSkills[index - 1] = temp

      setSkills(newSkills)
      await reorderSkills(newSkills.map((skill) => skill.id))

      toast({
        title: "Success",
        description: "Skill order updated successfully.",
      })
    } catch (error) {
      console.error("Failed to reorder skills:", error)
      toast({
        title: "Error",
        description: "Failed to update skill order. Please try again later.",
        variant: "destructive",
      })
      // Reload skills to reset order
      loadSkills()
    }
  }

  const handleMoveDown = async (index: number) => {
    if (index >= skills.length - 1) return

    try {
      const newSkills = [...skills]
      const temp = newSkills[index]
      newSkills[index] = newSkills[index + 1]
      newSkills[index + 1] = temp

      setSkills(newSkills)
      await reorderSkills(newSkills.map((skill) => skill.id))

      toast({
        title: "Success",
        description: "Skill order updated successfully.",
      })
    } catch (error) {
      console.error("Failed to reorder skills:", error)
      toast({
        title: "Error",
        description: "Failed to update skill order. Please try again later.",
        variant: "destructive",
      })
      // Reload skills to reset order
      loadSkills()
    }
  }

  const renderIcon = (iconName: string) => {
    const Icon = LucideIcons[iconName]
    return Icon ? <Icon className="h-5 w-5 text-primary" /> : null
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
          <h1 className="text-3xl font-bold">Skills</h1>
        </div>

        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <AlertTriangle className="h-12 w-12 text-amber-500 mb-4" />
              <h2 className="text-2xl font-semibold mb-2">Database Table Not Found</h2>
              <p className="text-muted-foreground mb-6 max-w-md">
                The skills table doesn't exist in your database yet. You need to create it before you can manage skills.
              </p>
              <div className="bg-muted p-4 rounded-md mb-6 text-left overflow-auto w-full max-w-2xl">
                <pre className="text-xs">
                  {`-- Create skills table
CREATE TABLE IF NOT EXISTS skills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  icon TEXT NOT NULL,
  description TEXT NOT NULL,
  "order" INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add RLS policies
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;

-- Create policy for authenticated users to read skills
CREATE POLICY "Allow public read access" ON skills
  FOR SELECT USING (true);

-- Create policy for authenticated users to insert skills
CREATE POLICY "Allow authenticated users to insert" ON skills
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Create policy for authenticated users to update their own skills
CREATE POLICY "Allow authenticated users to update" ON skills
  FOR UPDATE USING (auth.role() = 'authenticated');

-- Create policy for authenticated users to delete their own skills
CREATE POLICY "Allow authenticated users to delete" ON skills
  FOR DELETE USING (auth.role() = 'authenticated');`}
                </pre>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Run this SQL in your Supabase SQL Editor to create the skills table.
              </p>
              <Button onClick={loadSkills}>Refresh After Creating Table</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Skills</h1>
        <Button asChild>
          <Link href="/admin/skills/new">
            <Plus className="mr-2 h-4 w-4" /> Add Skill
          </Link>
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          {skills.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12">
              <p className="text-muted-foreground mb-4">No skills found</p>
              <Button asChild>
                <Link href="/admin/skills/new">
                  <Plus className="mr-2 h-4 w-4" /> Add Your First Skill
                </Link>
              </Button>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Icon</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead className="hidden md:table-cell">Description</TableHead>
                  <TableHead>Order</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {skills.map((skill, index) => (
                  <TableRow key={skill.id}>
                    <TableCell>
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
                        {renderIcon(skill.icon)}
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{skill.name}</TableCell>
                    <TableCell className="hidden md:table-cell max-w-xs truncate">{skill.description}</TableCell>
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
                          disabled={index === skills.length - 1}
                        >
                          <MoveDown className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="icon" asChild>
                          <Link href={`/admin/skills/${skill.id}`}>
                            <Pencil className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button variant="outline" size="icon" onClick={() => setSkillToDelete(skill.id)}>
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

      <AlertDialog open={!!skillToDelete} onOpenChange={() => setSkillToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the skill from your portfolio.
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
