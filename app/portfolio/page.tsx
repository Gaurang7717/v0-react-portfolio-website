"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useInView } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function PortfolioPage() {
  const [mounted, setMounted] = useState(false)
  const [filter, setFilter] = useState("all")

  const headerRef = useRef(null)
  const headerInView = useInView(headerRef, { once: true })

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const portfolioItems = [
    {
      id: "1",
      title: "TOY (Toys Shop)",
      description: "Designing an immersive Toy Shop Experience",
      category: "ui-ux",
      image: "/placeholder.svg?height=600&width=800",
      year: "2023",
    },
    {
      id: "2",
      title: "Pet Shopping (Pet Needs)",
      description: "Creating a seamless pet supplies platform",
      category: "mobile",
      image: "/placeholder.svg?height=600&width=800",
      year: "2023",
    },
    {
      id: "3",
      title: "GYM (GYMFIT)",
      description: "Designing an interactive Fitness Tech Experience",
      category: "web",
      image: "/placeholder.svg?height=600&width=800",
      year: "2022",
    },
    {
      id: "4",
      title: "E-commerce Dashboard",
      description: "Admin dashboard for managing online store",
      category: "ui-ux",
      image: "/placeholder.svg?height=600&width=800",
      year: "2022",
    },
    {
      id: "5",
      title: "Travel App",
      description: "Mobile application for travel enthusiasts",
      category: "mobile",
      image: "/placeholder.svg?height=600&width=800",
      year: "2021",
    },
    {
      id: "6",
      title: "Corporate Website",
      description: "Modern website for a corporate client",
      category: "web",
      image: "/placeholder.svg?height=600&width=800",
      year: "2021",
    },
  ]

  const filteredItems = filter === "all" ? portfolioItems : portfolioItems.filter((item) => item.category === filter)

  return (
    <div className="min-h-screen bg-[#f5f5f3] dark:bg-[#121212]">
      <Navbar />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div
            ref={headerRef}
            initial={{ opacity: 0, y: 50 }}
            animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">PORTFOLIO</h1>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mb-12">
              Explore my recent design work and discover how I transform ideas into engaging digital experiences.
            </p>

            <div className="flex flex-wrap gap-4">
              {["all", "ui-ux", "web", "mobile"].map((category) => (
                <motion.button
                  key={category}
                  onClick={() => setFilter(category)}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                    filter === category
                      ? "bg-black dark:bg-white text-white dark:text-black"
                      : "bg-transparent border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {category === "all"
                    ? "All Projects"
                    : category === "ui-ux"
                      ? "UI/UX Design"
                      : category === "web"
                        ? "Web Design"
                        : "Mobile Apps"}
                </motion.button>
              ))}
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="group"
              >
                <div className="overflow-hidden rounded-lg mb-4">
                  <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.title}
                      width={800}
                      height={600}
                      className="object-cover w-full aspect-[4/3]"
                    />
                  </motion.div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-xl font-bold">{item.title}</h3>
                    <span className="text-sm text-gray-500 dark:text-gray-400">{item.year}</span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{item.description}</p>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      variant="outline"
                      className="rounded-full border-black dark:border-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black"
                    >
                      View Project
                    </Button>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
