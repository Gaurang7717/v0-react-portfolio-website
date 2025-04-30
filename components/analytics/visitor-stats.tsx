"use client"

import type React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { AnalyticsSummary } from "@/types/database"

interface VisitorStatsProps {
  data: AnalyticsSummary
  title: string
  icon: React.ReactNode
}

export default function VisitorStats({ data, title, icon }: VisitorStatsProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {title === "Total Visitors"
            ? data.totalVisitors
            : title === "Unique Visitors"
              ? data.uniqueVisitors
              : title === "Mobile Visitors"
                ? data.mobileVisitors
                : data.desktopVisitors}
        </div>
        <p className="text-xs text-muted-foreground">
          {title === "Total Visitors"
            ? "Page views"
            : title === "Unique Visitors"
              ? "Distinct users"
              : title === "Mobile Visitors"
                ? "From mobile devices"
                : "From desktop devices"}
        </p>
      </CardContent>
    </Card>
  )
}
