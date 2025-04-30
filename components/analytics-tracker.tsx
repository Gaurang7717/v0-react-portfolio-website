"use client"

import { useEffect, useRef } from "react"
import { usePathname } from "next/navigation"
import { trackPageView } from "@/lib/analytics"

export default function AnalyticsTracker() {
  const pathname = usePathname()
  const lastPathRef = useRef<string | null>(null)

  useEffect(() => {
    // Only track if the path has changed
    if (pathname !== lastPathRef.current) {
      try {
        trackPageView(pathname)
        lastPathRef.current = pathname
      } catch (error) {
        console.error("Error tracking page view:", error)
        // Don't update lastPathRef so we can try again on the next render
      }
    }
  }, [pathname])

  // This component doesn't render anything
  return null
}
