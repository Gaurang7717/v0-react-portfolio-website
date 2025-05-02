"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Activity } from "lucide-react"
import { getLiveVisitorCount } from "@/lib/analytics"

export default function LiveVisitors() {
  const [liveCount, setLiveCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    const fetchLiveCount = async () => {
      try {
        setLoading(true)
        setError(false)
        const count = await getLiveVisitorCount()
        setLiveCount(count)
      } catch (error) {
        console.error("Error fetching live visitor count:", error)
        setError(true)
        // Set a default value when there's an error
        setLiveCount(0)
      } finally {
        setLoading(false)
      }
    }

    // Fetch initially
    fetchLiveCount()

    // Set up interval to fetch every 30 seconds
    const interval = setInterval(fetchLiveCount, 30000)

    return () => clearInterval(interval)
  }, [])

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">Live Visitors</CardTitle>
        <Activity className={`h-4 w-4 text-primary ${!error && "animate-pulse"}`} />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{loading ? "..." : liveCount}</div>
        <p className="text-xs text-muted-foreground">Active in the last 5 minutes</p>
      </CardContent>
    </Card>
  )
}
