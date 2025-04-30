"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"
import type { AnalyticsSummary } from "@/types/database"
import { Smartphone, Monitor, Tablet } from "lucide-react"

interface DeviceBreakdownProps {
  data: AnalyticsSummary
}

export default function DeviceBreakdown({ data }: DeviceBreakdownProps) {
  const chartData = [
    { name: "Desktop", value: data.desktopVisitors, icon: <Monitor className="h-4 w-4" /> },
    { name: "Mobile", value: data.mobileVisitors, icon: <Smartphone className="h-4 w-4" /> },
    { name: "Tablet", value: data.tabletVisitors, icon: <Tablet className="h-4 w-4" /> },
  ]

  const COLORS = ["hsl(var(--primary))", "hsl(var(--secondary))", "hsl(var(--accent))"]

  const totalVisitors = data.desktopVisitors + data.mobileVisitors + data.tabletVisitors

  // If there's no data, show a message
  if (totalVisitors === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Device Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[200px] flex items-center justify-center">
            <p className="text-muted-foreground">No device data available</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Device Breakdown</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={chartData} cx="50%" cy="50%" labelLine={false} outerRadius={80} fill="#8884d8" dataKey="value">
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload
                    return (
                      <div className="rounded-lg border bg-background p-2 shadow-sm">
                        <div className="flex items-center">
                          {data.icon}
                          <span className="ml-2 font-semibold">{data.name}</span>
                        </div>
                        <div className="mt-1 text-sm">
                          {data.value} visitors ({Math.round((data.value / totalVisitors) * 100)}%)
                        </div>
                      </div>
                    )
                  }
                  return null
                }}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
