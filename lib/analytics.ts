import { supabase } from "./supabase"
import type { Analytics, AnalyticsSummary, TimeRange } from "@/types/database"
import { v4 as uuidv4 } from "uuid"
import { getServerClient } from "./supabase"

// Mock data for analytics when server environment variables aren't available
const getMockAnalyticsSummary = (timeRange: TimeRange = "all"): AnalyticsSummary => {
  return {
    totalVisitors: 1250,
    uniqueVisitors: 850,
    mobileVisitors: 650,
    desktopVisitors: 550,
    tabletVisitors: 50,
    pageViews: {
      "/": 800,
      "/about": 350,
      "/projects": 420,
      "/contact": 180,
      "/skills": 210,
    },
    dailyVisitors: Array.from({ length: 30 }, (_, i) => ({
      date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      count: Math.floor(Math.random() * 50) + 10,
    })),
    weeklyVisitors: Array.from({ length: 8 }, (_, i) => {
      const date = new Date()
      date.setDate(date.getDate() - (7 - i) * 7)
      const year = date.getFullYear()
      const weekNumber = Math.floor((date.getTime() - new Date(year, 0, 1).getTime()) / (7 * 24 * 60 * 60 * 1000)) + 1
      return {
        week: `${year}-W${weekNumber.toString().padStart(2, "0")}`,
        count: Math.floor(Math.random() * 200) + 50,
      }
    }),
    monthlyVisitors: Array.from({ length: 12 }, (_, i) => {
      const date = new Date()
      date.setMonth(date.getMonth() - (11 - i))
      const year = date.getFullYear()
      const month = date.getMonth() + 1
      return {
        month: `${year}-${month.toString().padStart(2, "0")}`,
        count: Math.floor(Math.random() * 500) + 100,
      }
    }),
  }
}

const getMockLiveVisitorCount = (): number => {
  return Math.floor(Math.random() * 10) + 1
}

// Function to track a page view
export async function trackPageView(pagePath: string) {
  try {
    // Check if we're in a browser environment
    if (typeof window === "undefined") {
      return false
    }

    // Get or create visitor ID from localStorage
    let visitorId = localStorage.getItem("visitor_id")
    if (!visitorId) {
      visitorId = uuidv4()
      localStorage.setItem("visitor_id", visitorId)
    }

    // Detect device type
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    const isTablet = /iPad|tablet|Tablet/i.test(navigator.userAgent)
    const deviceType = isTablet ? "tablet" : isMobile ? "mobile" : "desktop"

    // Get browser info
    const browser = navigator.userAgent

    // Get referrer
    const referrer = document.referrer || null

    // Insert analytics data
    await supabase.from("analytics").insert([
      {
        page_path: pagePath,
        visitor_id: visitorId,
        device_type: deviceType,
        browser,
        referrer,
      },
    ])

    return true
  } catch (error) {
    console.error("Error tracking page view:", error)
    return false
  }
}

// Function to get analytics summary
export async function getAnalyticsSummary(timeRange: TimeRange = "all"): Promise<AnalyticsSummary> {
  // Get the server client - may be null if environment variables aren't available
  const serverClient = getServerClient()

  // If server client is null, return mock data immediately
  if (!serverClient) {
    console.log("Using mock analytics data because server client is not available")
    return getMockAnalyticsSummary(timeRange)
  }

  try {
    // Calculate date range based on timeRange
    const now = new Date()
    let startDate: Date | null = null

    switch (timeRange) {
      case "day":
        startDate = new Date(now)
        startDate.setDate(now.getDate() - 1)
        break
      case "week":
        startDate = new Date(now)
        startDate.setDate(now.getDate() - 7)
        break
      case "month":
        startDate = new Date(now)
        startDate.setMonth(now.getMonth() - 1)
        break
      case "year":
        startDate = new Date(now)
        startDate.setFullYear(now.getFullYear() - 1)
        break
      case "all":
      default:
        startDate = null
        break
    }

    // Build query
    let query = serverClient.from("analytics").select("*")

    if (startDate) {
      query = query.gte("timestamp", startDate.toISOString())
    }

    const { data, error } = await query

    if (error) {
      throw error
    }

    // Process data for summary
    const analytics = data as Analytics[]

    // Count unique visitors
    const uniqueVisitorIds = new Set(analytics.map((a) => a.visitor_id))

    // Count by device type
    const mobileVisitors = analytics.filter((a) => a.device_type === "mobile").length
    const desktopVisitors = analytics.filter((a) => a.device_type === "desktop").length
    const tabletVisitors = analytics.filter((a) => a.device_type === "tablet").length

    // Count page views
    const pageViews: Record<string, number> = {}
    analytics.forEach((a) => {
      if (!pageViews[a.page_path]) {
        pageViews[a.page_path] = 0
      }
      pageViews[a.page_path]++
    })

    // Process daily, weekly, and monthly data
    const dailyVisitors: { date: string; count: number }[] = []
    const weeklyVisitors: { week: string; count: number }[] = []
    const monthlyVisitors: { month: string; count: number }[] = []

    // Process daily data
    const dailyData: Record<string, number> = {}
    analytics.forEach((a) => {
      const date = new Date(a.timestamp).toISOString().split("T")[0]
      if (!dailyData[date]) {
        dailyData[date] = 0
      }
      dailyData[date]++
    })

    Object.entries(dailyData).forEach(([date, count]) => {
      dailyVisitors.push({ date, count })
    })

    // Sort by date
    dailyVisitors.sort((a, b) => a.date.localeCompare(b.date))

    // Process weekly data
    const weeklyData: Record<string, number> = {}
    analytics.forEach((a) => {
      const date = new Date(a.timestamp)
      const year = date.getFullYear()
      const weekNumber = getWeekNumber(date)
      const week = `${year}-W${weekNumber.toString().padStart(2, "0")}`

      if (!weeklyData[week]) {
        weeklyData[week] = 0
      }
      weeklyData[week]++
    })

    Object.entries(weeklyData).forEach(([week, count]) => {
      weeklyVisitors.push({ week, count })
    })

    // Sort by week
    weeklyVisitors.sort((a, b) => a.week.localeCompare(b.week))

    // Process monthly data
    const monthlyData: Record<string, number> = {}
    analytics.forEach((a) => {
      const date = new Date(a.timestamp)
      const year = date.getFullYear()
      const month = date.getMonth() + 1
      const monthKey = `${year}-${month.toString().padStart(2, "0")}`

      if (!monthlyData[monthKey]) {
        monthlyData[monthKey] = 0
      }
      monthlyData[monthKey]++
    })

    Object.entries(monthlyData).forEach(([month, count]) => {
      monthlyVisitors.push({ month, count })
    })

    // Sort by month
    monthlyVisitors.sort((a, b) => a.month.localeCompare(b.month))

    return {
      totalVisitors: analytics.length,
      uniqueVisitors: uniqueVisitorIds.size,
      mobileVisitors,
      desktopVisitors,
      tabletVisitors,
      pageViews,
      dailyVisitors,
      weeklyVisitors,
      monthlyVisitors,
    }
  } catch (error) {
    console.error("Error getting analytics summary:", error)
    // Return mock data on error
    return getMockAnalyticsSummary(timeRange)
  }
}

// Helper function to get week number
function getWeekNumber(date: Date): number {
  const firstDayOfYear = new Date(date.getFullYear(), 0, 1)
  const pastDaysOfYear = (date.getTime() - firstDayOfYear.getTime()) / 86400000
  return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7)
}

// Function to get live visitor count (last 5 minutes)
export async function getLiveVisitorCount(): Promise<number> {
  // Get the server client - may be null if environment variables aren't available
  const serverClient = getServerClient()

  // If server client is null, return mock data immediately
  if (!serverClient) {
    return getMockLiveVisitorCount()
  }

  try {
    // Calculate 5 minutes ago
    const fiveMinutesAgo = new Date()
    fiveMinutesAgo.setMinutes(fiveMinutesAgo.getMinutes() - 5)

    // Get unique visitors in the last 5 minutes
    const { data, error } = await serverClient
      .from("analytics")
      .select("visitor_id")
      .gte("timestamp", fiveMinutesAgo.toISOString())

    if (error) {
      throw error
    }

    // Count unique visitors
    const uniqueVisitorIds = new Set(data.map((a) => a.visitor_id))
    return uniqueVisitorIds.size
  } catch (error) {
    console.error("Error getting live visitor count:", error)
    return getMockLiveVisitorCount()
  }
}

// Function to seed analytics data for testing
export async function seedAnalyticsData(days = 30): Promise<boolean> {
  // Get the server client - may be null if environment variables aren't available
  const serverClient = getServerClient()

  // If server client is null, return false immediately
  if (!serverClient) {
    console.warn("Cannot seed analytics data: Server client not available")
    return false
  }

  try {
    // Generate random visitor IDs
    const visitorIds = Array.from({ length: 50 }, () => uuidv4())

    // Generate random page paths
    const pagePaths = ["/", "/about", "/projects", "/contact", "/skills", "/experience"]

    // Generate random device types
    const deviceTypes = ["mobile", "desktop", "tablet"]

    // Generate random browsers
    const browsers = [
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.1 Safari/605.1.15",
      "Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1",
      "Mozilla/5.0 (iPad; CPU OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1",
      "Mozilla/5.0 (Linux; Android 11; SM-G991B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.120 Mobile Safari/537.36",
    ]

    // Generate random countries
    const countries = ["US", "UK", "CA", "IN", "AU", "DE", "FR", "JP", "BR", "MX"]

    // Generate random referrers
    const referrers = [
      "https://www.google.com",
      "https://www.bing.com",
      "https://www.facebook.com",
      "https://www.twitter.com",
      "https://www.linkedin.com",
      "https://www.instagram.com",
      "",
    ]

    // Generate random analytics data
    const analyticsData = []

    // Generate data for each day
    for (let i = 0; i < days; i++) {
      const date = new Date()
      date.setDate(date.getDate() - i)

      // Generate random number of entries for this day (10-50)
      const entriesCount = Math.floor(Math.random() * 41) + 10

      for (let j = 0; j < entriesCount; j++) {
        // Generate random time within the day
        const timestamp = new Date(date)
        timestamp.setHours(Math.floor(Math.random() * 24))
        timestamp.setMinutes(Math.floor(Math.random() * 60))
        timestamp.setSeconds(Math.floor(Math.random() * 60))

        analyticsData.push({
          page_path: pagePaths[Math.floor(Math.random() * pagePaths.length)],
          visitor_id: visitorIds[Math.floor(Math.random() * visitorIds.length)],
          device_type: deviceTypes[Math.floor(Math.random() * deviceTypes.length)],
          browser: browsers[Math.floor(Math.random() * browsers.length)],
          country: countries[Math.floor(Math.random() * countries.length)],
          referrer: referrers[Math.floor(Math.random() * referrers.length)],
          timestamp: timestamp.toISOString(),
        })
      }
    }

    // Insert data in batches of 100
    const batchSize = 100
    for (let i = 0; i < analyticsData.length; i += batchSize) {
      const batch = analyticsData.slice(i, i + batchSize)
      const { error } = await serverClient.from("analytics").insert(batch)

      if (error) {
        throw error
      }
    }

    return true
  } catch (error) {
    console.error("Error seeding analytics data:", error)
    return false
  }
}
