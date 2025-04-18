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
import { Loader2, Plus, Pencil, Trash2 } from "lucide-react"
import { getProjects, deleteProject } from "@/lib/api"
import type { Project } from "@/types/database"
import { useToast } from "@/components/ui/use-toast"

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [projectToDelete, setProjectToDelete] = useState<string | null>(null)
  const { toast } = useToast()

  const loadProjects = async () => {
    try {
      setIsLoading(true)
      const data = await getProjects()
      setProjects(data)
    } catch (error) {
      console.error("Failed to load projects:", error)
      toast({
        title: "Error",
        description: "Failed to load projects. Please try again later.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadProjects()
  }, [toast])

  const handleDelete = async () => {
    if (!projectToDelete) return

    try {
      await deleteProject(projectToDelete)
      setProjects(projects.filter((project) => project.id !== projectToDelete))
      toast({
        title: "Success",
        description: "Project deleted successfully.",
      })
    } catch (error) {
      console.error("Failed to delete project:", error)
      toast({
        title: "Error",
        description: "Failed to delete project. Please try again later.",
        variant: "destructive",
      })
    } finally {
      setProjectToDelete(null)
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-8rem)]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Projects</h1>
        <Button asChild>
          <Link href="/admin/projects/new">
            <Plus className="mr-2 h-4 w-4" /> Add Project
          </Link>
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          {projects.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12">
              <p className="text-muted-foreground mb-4">No projects found</p>
              <Button asChild>
                <Link href="/admin/projects/new">
                  <Plus className="mr-2 h-4 w-4" /> Add Your First Project
                </Link>
              </Button>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Categories</TableHead>
                  <TableHead>Featured</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {projects.map((project) => (
                  <TableRow key={project.id}>
                    <TableCell className="font-medium">{project.title}</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {project.categories.map((category) => (
                          <span
                            key={`${project.id}-${category}`}
                            className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary"
                          >
                            {category}
                          </span>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>{project.featured ? "Yes" : "No"}</TableCell>
                    <TableCell>{new Date(project.created_at).toLocaleDateString()}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="icon" asChild>
                          <Link href={`/admin/projects/${project.id}`}>
                            <Pencil className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button variant="outline" size="icon" onClick={() => setProjectToDelete(project.id)}>
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

      <AlertDialog open={!!projectToDelete} onOpenChange={() => setProjectToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the project from your portfolio.
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
