"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, FolderKanban, Mail, Eye } from "lucide-react"
import { getProjects, getContactSubmissions } from "@/lib/api"
import { useToast } from "@/components/ui/use-toast"

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(true)
  const [stats, setStats] = useState({
    totalProjects: 0,
    totalMessages: 0,
    unreadMessages: 0,
  })
  const { toast } = useToast()

  useEffect(() => {
    async function loadStats() {
      try {
        setIsLoading(true)
        const [projects, messages] = await Promise.all([getProjects(), getContactSubmissions()])

        setStats({
          totalProjects: projects.length,
          totalMessages: messages.length,
          unreadMessages: messages.filter((msg) => !msg.read).length,
        })
      } catch (error) {
        console.error("Failed to load dashboard stats:", error)
        toast({
          title: "Error",
          description: "Failed to load dashboard statistics. Please try again later.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    loadStats()
  }, [toast])

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-8rem)]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
            <FolderKanban className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalProjects}</div>
            <p className="text-xs text-muted-foreground">Projects in your portfolio</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Messages</CardTitle>
            <Mail className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalMessages}</div>
            <p className="text-xs text-muted-foreground">Contact form submissions</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unread Messages</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.unreadMessages}</div>
            <p className="text-xs text-muted-foreground">Messages awaiting response</p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="cursor-pointer hover:bg-accent/50 transition-colors">
            <CardContent className="flex items-center p-6">
              <FolderKanban className="h-8 w-8 mr-4 text-primary" />
              <div>
                <h3 className="font-medium">Manage Projects</h3>
                <p className="text-sm text-muted-foreground">Add, edit or remove portfolio projects</p>
              </div>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:bg-accent/50 transition-colors">
            <CardContent className="flex items-center p-6">
              <Mail className="h-8 w-8 mr-4 text-primary" />
              <div>
                <h3 className="font-medium">View Messages</h3>
                <p className="text-sm text-muted-foreground">Check and respond to contact submissions</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
