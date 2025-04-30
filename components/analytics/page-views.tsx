"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
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
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="views" fill="var(--color-views)" barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  )
}
