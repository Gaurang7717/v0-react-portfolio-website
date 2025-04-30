"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from "recharts"
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart"
import type { AnalyticsSummary } from "@/types/database"

interface PageViewsProps {
  data: AnalyticsSummary
}

export default function PageViews({ data }: PageViewsProps) {
  // Format data for the chart
  const chartData = Object.entries(data.pageViews)
    .map(([path, count]) => ({
      name: path === "/" ? "Home" : path.replace("/", "").charAt(0).toUpperCase() + path.replace("/", "").slice(1),
      views: count,
    }))
    .sort((a, b) => b.views - a.views)
    .slice(0, 5) // Top 5 pages

  // If there's no data, show a message
  if (chartData.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Top Pages</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[200px] flex items-center justify-center">
            <p className="text-muted-foreground">No page view data available</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Pages</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[200px]">
          <ChartContainer
            config={{
              views: {
                label: "Page Views",
                color: "hsl(var(--primary))",
              },
            }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" width={80} />
                <Tooltip content={<ChartTooltipContent />} />
                <Bar dataKey="views" fill="hsl(var(--primary))" barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  )
}
