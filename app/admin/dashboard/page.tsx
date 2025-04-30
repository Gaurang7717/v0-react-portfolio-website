"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, FolderKanban, Mail, Eye, Briefcase, Palette, Users, Smartphone } from "lucide-react"
import { getProjects, getContactSubmissions, getSkills } from "@/lib/api"
import { getAnalyticsSummary, seedAnalyticsData } from "@/lib/analytics"
import { useToast } from "@/components/ui/use-toast"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { AnalyticsSummary, TimeRange } from "@/types/database"
import VisitorChart from "@/components/analytics/visitor-chart"
import DeviceBreakdown from "@/components/analytics/device-breakdown"
import PageViews from "@/components/analytics/page-views"
import LiveVisitors from "@/components/analytics/live-visitors"
import VisitorStats from "@/components/analytics/visitor-stats"

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(true)
  const [stats, setStats] = useState({
    totalProjects: 0,
    totalExperiences: 0,
    totalSkills: 0,
    totalMessages: 0,
    unreadMessages: 0,
  })
  const [analyticsData, setAnalyticsData] = useState<AnalyticsSummary | null>(null)
  const [timeRange, setTimeRange] = useState<TimeRange>("month")
  const [isSeeding, setIsSeeding] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    async function loadStats() {
      try {
        setIsLoading(true)

        // Load projects, messages, and skills
        const [projects, messages, skills] = await Promise.all([getProjects(), getContactSubmissions(), getSkills()])

        // Try to load experiences, but handle the case when the table doesn't exist
        let experiences = []
        try {
          const { getExperiences } = await import("@/lib/api")
          experiences = await getExperiences()
        } catch (error) {
          console.error("Failed to load experiences:", error)
          // Experiences table might not exist yet
        }

        setStats({
          totalProjects: projects.length,
          totalExperiences: experiences.length,
          totalSkills: skills.length,
          totalMessages: messages.length,
          unreadMessages: messages.filter((msg) => !msg.read).length,
        })

        // Load analytics data
        const analytics = await getAnalyticsSummary(timeRange)
        setAnalyticsData(analytics)
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
  }, [toast, timeRange])

  const handleSeedData = async () => {
    try {
      setIsSeeding(true)
      const success = await seedAnalyticsData(30) // Seed 30 days of data

      if (success) {
        toast({
          title: "Success",
          description: "Analytics data has been seeded successfully.",
        })

        // Reload analytics data
        const analytics = await getAnalyticsSummary(timeRange)
        setAnalyticsData(analytics)
      } else {
        throw new Error("Failed to seed analytics data")
      }
    } catch (error) {
      console.error("Error seeding analytics data:", error)
      toast({
        title: "Error",
        description: "Failed to seed analytics data. Please try again later.",
        variant: "destructive",
      })
    } finally {
      setIsSeeding(false)
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
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold">Dashboard</h1>

        <div className="flex flex-col sm:flex-row gap-4">
          <Select value={timeRange} onValueChange={(value) => setTimeRange(value as TimeRange)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="day">Last 24 Hours</SelectItem>
              <SelectItem value="week">Last 7 Days</SelectItem>
              <SelectItem value="month">Last 30 Days</SelectItem>
              <SelectItem value="year">Last Year</SelectItem>
              <SelectItem value="all">All Time</SelectItem>
            </SelectContent>
          </Select>

          <Button onClick={handleSeedData} disabled={isSeeding}>
            {isSeeding ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Seeding Data...
              </>
            ) : (
              "Seed Test Data"
            )}
          </Button>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Website Analytics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          <LiveVisitors />

          <VisitorStats
            data={
              analyticsData || {
                totalVisitors: 0,
                uniqueVisitors: 0,
                mobileVisitors: 0,
                desktopVisitors: 0,
                tabletVisitors: 0,
                pageViews: {},
                dailyVisitors: [],
                weeklyVisitors: [],
                monthlyVisitors: [],
              }
            }
            title="Total Visitors"
            icon={<Eye className="h-4 w-4 text-muted-foreground" />}
          />

          <VisitorStats
            data={
              analyticsData || {
                totalVisitors: 0,
                uniqueVisitors: 0,
                mobileVisitors: 0,
                desktopVisitors: 0,
                tabletVisitors: 0,
                pageViews: {},
                dailyVisitors: [],
                weeklyVisitors: [],
                monthlyVisitors: [],
              }
            }
            title="Unique Visitors"
            icon={<Users className="h-4 w-4 text-muted-foreground" />}
          />

          <VisitorStats
            data={
              analyticsData || {
                totalVisitors: 0,
                uniqueVisitors: 0,
                mobileVisitors: 0,
                desktopVisitors: 0,
                tabletVisitors: 0,
                pageViews: {},
                dailyVisitors: [],
                weeklyVisitors: [],
                monthlyVisitors: [],
              }
            }
            title="Mobile Visitors"
            icon={<Smartphone className="h-4 w-4 text-muted-foreground" />}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
          {analyticsData && (
            <>
              <VisitorChart data={analyticsData} />
              <DeviceBreakdown data={analyticsData} />
              <PageViews data={analyticsData} />
            </>
          )}
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Portfolio Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
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
              <CardTitle className="text-sm font-medium">Work Experiences</CardTitle>
              <Briefcase className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalExperiences}</div>
              <p className="text-xs text-muted-foreground">Work experiences in your portfolio</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Skills</CardTitle>
              <Palette className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalSkills}</div>
              <p className="text-xs text-muted-foreground">Skills in your portfolio</p>
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
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link href="/admin/projects">
            <Card className="cursor-pointer hover:bg-accent/50 transition-colors">
              <CardContent className="flex items-center p-6">
                <FolderKanban className="h-8 w-8 mr-4 text-primary" />
                <div>
                  <h3 className="font-medium">Manage Projects</h3>
                  <p className="text-sm text-muted-foreground">Add, edit or remove portfolio projects</p>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/admin/experiences">
            <Card className="cursor-pointer hover:bg-accent/50 transition-colors">
              <CardContent className="flex items-center p-6">
                <Briefcase className="h-8 w-8 mr-4 text-primary" />
                <div>
                  <h3 className="font-medium">Manage Experiences</h3>
                  <p className="text-sm text-muted-foreground">Add, edit or remove work experiences</p>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/admin/skills">
            <Card className="cursor-pointer hover:bg-accent/50 transition-colors">
              <CardContent className="flex items-center p-6">
                <Palette className="h-8 w-8 mr-4 text-primary" />
                <div>
                  <h3 className="font-medium">Manage Skills</h3>
                  <p className="text-sm text-muted-foreground">Add, edit or remove skills</p>
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  )
}
