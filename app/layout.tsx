import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import ClientLayout from "./client-layout"
import AnalyticsTracker from "@/components/analytics-tracker"
import { Suspense } from "react"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Gaurang Dumaniya | UI/UX Designer",
  description: "Portfolio of Gaurang Dumaniya, a UI/UX and Brand Designer based in Ahmedabad, India.",
    generator: 'v0.dev'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ClientLayout>
          <Suspense>
            <AnalyticsTracker />
            {children}
          </Suspense>
        </ClientLayout>
      </body>
    </html>
  )
}
