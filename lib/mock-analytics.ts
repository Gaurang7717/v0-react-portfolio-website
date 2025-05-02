import type { AnalyticsSummary, TimeRange } from "@/types/database"

// Mock data for analytics when server environment variables aren't available
export function getMockAnalyticsSummary(timeRange: TimeRange = "all"): AnalyticsSummary {
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

export function getMockLiveVisitorCount(): number {
  return Math.floor(Math.random() * 10) + 1
}
