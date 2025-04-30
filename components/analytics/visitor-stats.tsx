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
  // Determine which stat to display based on the title
  let statValue = 0
  let description = ""

  switch (title) {
    case "Total Visitors":
      statValue = data.totalVisitors
      description = "Page views"
      break
    case "Unique Visitors":
      statValue = data.uniqueVisitors
      description = "Distinct users"
      break
    case "Mobile Visitors":
      statValue = data.mobileVisitors
      description = "From mobile devices"
      break
    case "Desktop Visitors":
      statValue = data.desktopVisitors
      description = "From desktop devices"
      break
    default:
      statValue = 0
      description = ""
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{statValue}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  )
}
