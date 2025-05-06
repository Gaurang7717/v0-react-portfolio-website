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
import { getServerClient } from "@/lib/supabase"
import { motion } from "framer-motion"

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
  const [serverClientAvailable, setServerClientAvailable] = useState(false)
  const { toast } = useToast()

  // Check if server client is available
  useEffect(() => {
    const checkServerClient = () => {
      const serverClient = getServerClient()
      setServerClientAvailable(serverClient !== null)
    }

    checkServerClient()
  }, [])

  // Update the loadStats function to handle errors better
  async function loadStats() {
    try {
      setIsLoading(true)

      // Load projects, messages, and skills
      let projects = []
      let messages = []
      let skills = []
      let experiences = []
      let analyticsData = null

      try {
        ;[projects, messages, skills] = await Promise.all([getProjects(), getContactSubmissions(), getSkills()])
      } catch (error) {
        console.error("Failed to load basic stats:", error)
        toast({
          title: "Warning",
          description: "Some data could not be loaded. You may see partial information.",
          variant: "destructive",
        })
        // Set default empty arrays
        projects = []
        messages = []
        skills = []
      }

      // Try to load experiences, but handle the case when the table doesn't exist
      try {
        const { getExperiences } = await import("@/lib/api")
        experiences = await getExperiences()
      } catch (error) {
        console.error("Failed to load experiences:", error)
        // Experiences table might not exist yet
        experiences = []
      }

      setStats({
        totalProjects: projects.length,
        totalExperiences: experiences.length,
        totalSkills: skills.length,
        totalMessages: messages.length,
        unreadMessages: messages.filter((msg) => !msg.read).length,
      })

      // Load analytics data
      try {
        analyticsData = await getAnalyticsSummary(timeRange)
        setAnalyticsData(analyticsData)
      } catch (error) {
        console.error("Failed to load analytics data:", error)
        // Set default empty analytics data
        setAnalyticsData({
          totalVisitors: 0,
          uniqueVisitors: 0,
          mobileVisitors: 0,
          desktopVisitors: 0,
          tabletVisitors: 0,
          pageViews: {},
          dailyVisitors: [],
          weeklyVisitors: [],
          monthlyVisitors: [],
        })
      }
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

  useEffect(() => {
    loadStats()
  }, [toast, timeRange])

  // Update the handleSeedData function to handle errors better
  const handleSeedData = async () => {
    if (!serverClientAvailable) {
      toast({
        title: "Error",
        description: "Cannot seed analytics data: Server environment variables are not available.",
        variant: "destructive",
      })
      return
    }

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
        toast({
          title: "Error",
          description: "Failed to seed analytics data. Please try again later.",
          variant: "destructive",
        })
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

  // Create a default empty analytics data object if analyticsData is null
  const emptyAnalyticsData: AnalyticsSummary = {
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

  const displayData = analyticsData || emptyAnalyticsData

  return (
    <div className="p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4"
      >
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

          <Button onClick={handleSeedData} disabled={isSeeding || !serverClientAvailable}>
            {isSeeding ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Seeding Data...
              </>
            ) : (
              "Seed Test Data"
            )}
          </Button>
        </div>
      </motion.div>

      {!serverClientAvailable && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-6 p-4 bg-yellow-100 dark:bg-yellow-900/30 border border-yellow-300 dark:border-yellow-700 rounded-md text-yellow-800 dark:text-yellow-200"
        >
          <div className="flex items-start">
            <div className="flex-1">
              <p className="font-medium">Analytics using mock data</p>
              <p className="text-sm mt-1">
                Supabase environment variables are not available. Analytics data shown is simulated. To use real
                analytics, please set up the required Supabase environment variables in your project settings.
              </p>
              <div className="mt-2 text-sm">
                <p className="font-medium">Required variables:</p>
                <ul className="list-disc pl-5 mt-1 space-y-1">
                  <li>SUPABASE_URL</li>
                  <li>SUPABASE_ANON_KEY</li>
                  <li>SUPABASE_SERVICE_ROLE_KEY</li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mb-8"
      >
        <h2 className="text-xl font-semibold mb-4">Website Analytics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 300 }}>
            <LiveVisitors />
          </motion.div>

          <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 300 }}>
            <VisitorStats
              data={displayData}
              title="Total Visitors"
              icon={<Eye className="h-4 w-4 text-muted-foreground" />}
            />
          </motion.div>

          <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 300 }}>
            <VisitorStats
              data={displayData}
              title="Unique Visitors"
              icon={<Users className="h-4 w-4 text-muted-foreground" />}
            />
          </motion.div>

          <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 300 }}>
            <VisitorStats
              data={displayData}
              title="Mobile Visitors"
              icon={<Smartphone className="h-4 w-4 text-muted-foreground" />}
            />
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="lg:col-span-3"
          >
            <VisitorChart data={displayData} />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <DeviceBreakdown data={displayData} />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <PageViews data={displayData} />
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="mb-8"
      >
        <h2 className="text-xl font-semibold mb-4">Portfolio Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {[
            {
              title: "Total Projects",
              value: stats.totalProjects,
              description: "Projects in your portfolio",
              icon: <FolderKanban className="h-4 w-4 text-muted-foreground" />,
            },
            {
              title: "Work Experiences",
              value: stats.totalExperiences,
              description: "Work experiences in your portfolio",
              icon: <Briefcase className="h-4 w-4 text-muted-foreground" />,
            },
            {
              title: "Skills",
              value: stats.totalSkills,
              description: "Skills in your portfolio",
              icon: <Palette className="h-4 w-4 text-muted-foreground" />,
            },
            {
              title: "Total Messages",
              value: stats.totalMessages,
              description: "Contact form submissions",
              icon: <Mail className="h-4 w-4 text-muted-foreground" />,
            },
            {
              title: "Unread Messages",
              value: stats.unreadMessages,
              description: "Messages awaiting response",
              icon: <Eye className="h-4 w-4 text-muted-foreground" />,
            },
          ].map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
              whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
            >
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{item.title}</CardTitle>
                  {item.icon}
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{item.value}</div>
                  <p className="text-xs text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="mt-8"
      >
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              href: "/admin/projects",
              title: "Manage Projects",
              description: "Add, edit or remove portfolio projects",
              icon: <FolderKanban className="h-8 w-8 mr-4 text-primary" />,
            },
            {
              href: "/admin/experiences",
              title: "Manage Experiences",
              description: "Add, edit or remove work experiences",
              icon: <Briefcase className="h-8 w-8 mr-4 text-primary" />,
            },
            {
              href: "/admin/skills",
              title: "Manage Skills",
              description: "Add, edit or remove skills",
              icon: <Palette className="h-8 w-8 mr-4 text-primary" />,
            },
          ].map((item, index) => (
            <motion.div
              key={item.href}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.8 + index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <Link href={item.href}>
                <Card className="cursor-pointer hover:bg-accent/50 transition-colors">
                  <CardContent className="flex items-center p-6">
                    {item.icon}
                    <div>
                      <h3 className="font-medium">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
