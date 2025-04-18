import type React from "react"
import "./globals.css"
import ClientLayout from "./client-layout"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>UI/UX Designer Portfolio</title>
        <meta name="description" content="UI/UX Designer Portfolio" />
      </head>
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  )
}

export const metadata = {
      generator: 'v0.dev'
    };
