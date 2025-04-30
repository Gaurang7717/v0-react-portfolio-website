"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart, Line } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import type { AnalyticsSummary } from "@/types/database"

interface VisitorChartProps {
  data: AnalyticsSummary
}

export default function VisitorChart({ data }: VisitorChartProps) {
  const [view, setView] = useState<"daily" | "weekly" | "monthly">("daily")

  // Format data for the selected view
  const chartData =
    view === "daily"
      ? data.dailyVisitors.map((item) => ({
          name: new Date(item.date).toLocaleDateString(undefined, { month: "short", day: "numeric" }),
          visitors: item.count,
        }))
      : view === "weekly"
        ? data.weeklyVisitors.map((item) => ({
            name: item.week,
            visitors: item.count,
          }))
        : data.monthlyVisitors.map((item) => {
            const [year, month] = item.month.split("-")
            return {
              name: new Date(Number.parseInt(year), Number.parseInt(month) - 1, 1).toLocaleDateString(undefined, {
                month: "short",
                year: "numeric",
              }),
              visitors: item.count,
            }
          })

  return (
    <Card className="col-span-3">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle>Visitor Traffic</CardTitle>
        <Tabs defaultValue="daily" value={view} onValueChange={(v) => setView(v as any)}>
          <TabsList>
            <TabsTrigger value="daily">Daily</TabsTrigger>
            <TabsTrigger value="weekly">Weekly</TabsTrigger>
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="h-[300px]">
          <ChartContainer
            config={{
              visitors: {
                label: "Visitors",
                color: "hsl(var(--primary))",
              },
            }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line
                  type="monotone"
                  dataKey="visitors"
                  stroke="var(--color-visitors)"
                  strokeWidth={2}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  )
}
