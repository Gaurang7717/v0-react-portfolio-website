"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/context/auth-context"
import ProtectedRoute from "@/components/protected-route"
import { Toaster } from "@/components/ui/toaster"
import { LayoutDashboard, FolderKanban, Mail, LogOut, Moon, Sun, Menu, X, User, Briefcase } from "lucide-react"
import { useTheme } from "next-themes"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const { user, signOut } = useAuth()
  const pathname = usePathname()

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  // Skip protection for login page
  if (pathname === "/admin/login") {
    return (
      <>
        {children}
        <Toaster />
      </>
    )
  }

  const navigation = [
    { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    { name: "Projects", href: "/admin/projects", icon: FolderKanban },
    { name: "Experiences", href: "/admin/experiences", icon: Briefcase },
    { name: "Messages", href: "/admin/messages", icon: Mail },
    { name: "Profile", href: "/admin/profile", icon: User },
  ]

  return (
    <ProtectedRoute>
      <div className="flex h-screen bg-background">
        {/* Sidebar for desktop */}
        <div className="hidden md:flex md:w-64 md:flex-col">
          <div className="flex flex-col flex-grow border-r border-border/40 pt-5 pb-4 bg-background/80 backdrop-blur-sm overflow-y-auto">
            <div className="flex items-center flex-shrink-0 px-4">
              <Link href="/admin/dashboard" className="text-xl font-bold tracking-tighter">
                <span className="text-primary">Design</span>Folio
              </Link>
            </div>
            <div className="mt-5 flex-1 flex flex-col">
              <nav className="flex-1 px-2 space-y-1">
                {navigation.map((item) => {
                  const isActive = pathname === item.href
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                        isActive
                          ? "bg-primary/10 text-primary"
                          : "text-foreground hover:bg-accent hover:text-accent-foreground"
                      }`}
                    >
                      <item.icon
                        className={`mr-3 h-5 w-5 ${isActive ? "text-primary" : "text-muted-foreground"}`}
                        aria-hidden="true"
                      />
                      {item.name}
                    </Link>
                  )
                })}
              </nav>
            </div>
            <div className="flex-shrink-0 flex border-t border-border/40 p-4">
              <div className="flex items-center justify-between w-full">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  aria-label="Toggle theme"
                >
                  <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                  <span className="sr-only">Toggle theme</span>
                </Button>
                <Button variant="ghost" onClick={() => signOut()} className="flex items-center">
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div className="md:hidden fixed inset-0 z-40 flex">
          <div
            className={`fixed inset-0 bg-background/80 backdrop-blur-sm transition-opacity ${
              mobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
            onClick={() => setMobileMenuOpen(false)}
          />
          <div
            className={`relative flex-1 flex flex-col max-w-xs w-full bg-background transition-transform transform ${
              mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <div className="absolute top-0 right-0 -mr-12 pt-2">
              <button
                type="button"
                className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close sidebar</span>
                <X className="h-6 w-6 text-white" aria-hidden="true" />
              </button>
            </div>
            <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
              <div className="flex-shrink-0 flex items-center px-4">
                <Link href="/admin/dashboard" className="text-xl font-bold tracking-tighter">
                  <span className="text-primary">Design</span>Folio
                </Link>
              </div>
              <nav className="mt-5 px-2 space-y-1">
                {navigation.map((item) => {
                  const isActive = pathname === item.href
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                        isActive
                          ? "bg-primary/10 text-primary"
                          : "text-foreground hover:bg-accent hover:text-accent-foreground"
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <item.icon
                        className={`mr-3 h-5 w-5 ${isActive ? "text-primary" : "text-muted-foreground"}`}
                        aria-hidden="true"
                      />
                      {item.name}
                    </Link>
                  )
                })}
              </nav>
            </div>
            <div className="flex-shrink-0 flex border-t border-border/40 p-4">
              <div className="flex items-center justify-between w-full">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  aria-label="Toggle theme"
                >
                  <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                  <span className="sr-only">Toggle theme</span>
                </Button>
                <Button variant="ghost" onClick={() => signOut()} className="flex items-center">
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile top bar */}
        <div className="md:hidden fixed top-0 left-0 right-0 z-30 flex items-center h-16 bg-background/80 backdrop-blur-sm border-b border-border/40 px-4">
          <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(true)} className="md:hidden">
            <Menu className="h-6 w-6" />
          </Button>
          <div className="flex-1 flex justify-center">
            <Link href="/admin/dashboard" className="text-xl font-bold tracking-tighter">
              <span className="text-primary">Design</span>Folio
            </Link>
          </div>
          <div className="w-6"></div> {/* Spacer for balance */}
        </div>

        {/* Main content */}
        <div className="flex flex-col flex-1 overflow-hidden">
          <main className="flex-1 relative overflow-y-auto focus:outline-none pt-16 md:pt-0">
            <div className="py-6">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">{children}</div>
            </div>
          </main>
        </div>
      </div>
      <Toaster />
    </ProtectedRoute>
  )
}
