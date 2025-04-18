"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github } from "lucide-react"

export default function Projects() {
  const [filter, setFilter] = useState("all")

  const categories = [
    { id: "all", name: "All" },
    { id: "ui", name: "UI Design" },
    { id: "ux", name: "UX Design" },
    { id: "web", name: "Web Design" },
    { id: "mobile", name: "Mobile App" },
  ]

  const projects = [
    {
      id: 1,
      title: "E-commerce Redesign",
      category: ["ui", "ux", "web"],
      image: "/placeholder.svg?height=600&width=800",
      description:
        "A complete redesign of an e-commerce platform focusing on improving the user experience and conversion rates.",
      link: "#",
      github: "#",
    },
    {
      id: 2,
      title: "Finance Mobile App",
      category: ["ui", "ux", "mobile"],
      image: "/placeholder.svg?height=600&width=800",
      description: "A mobile banking application designed to simplify financial management for users.",
      link: "#",
      github: "#",
    },
    {
      id: 3,
      title: "Travel Booking Platform",
      category: ["ui", "web"],
      image: "/placeholder.svg?height=600&width=800",
      description: "A travel booking website with an intuitive interface for finding and booking accommodations.",
      link: "#",
      github: "#",
    },
    {
      id: 4,
      title: "Health Tracking App",
      category: ["ux", "mobile"],
      image: "/placeholder.svg?height=600&width=800",
      description: "A health and fitness tracking application with data visualization and goal setting features.",
      link: "#",
      github: "#",
    },
    {
      id: 5,
      title: "Creative Portfolio",
      category: ["ui", "web"],
      image: "/placeholder.svg?height=600&width=800",
      description: "A portfolio website for a creative professional with a focus on showcasing their work.",
      link: "#",
      github: "#",
    },
    {
      id: 6,
      title: "Food Delivery App",
      category: ["ui", "ux", "mobile"],
      image: "/placeholder.svg?height=600&width=800",
      description: "A food delivery application with a seamless ordering process and real-time tracking.",
      link: "#",
      github: "#",
    },
  ]

  const filteredProjects = filter === "all" ? projects : projects.filter((project) => project.category.includes(filter))

  return (
    <div className="container mx-auto">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="text-3xl md:text-4xl font-bold text-center mb-16"
      >
        My <span className="text-primary">Projects</span>
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        viewport={{ once: true }}
        className="flex flex-wrap justify-center gap-3 mb-12"
      >
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={filter === category.id ? "default" : "outline"}
            onClick={() => setFilter(category.id)}
            className="rounded-full"
          >
            {category.name}
          </Button>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence mode="wait">
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
              className="group relative overflow-hidden rounded-xl border border-border/40 bg-background/80 backdrop-blur-sm hover:border-primary/40 transition-colors duration-300"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  width={800}
                  height={600}
                  className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Button size="icon" variant="secondary" asChild>
                    <a href={project.link} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-5 w-5" />
                    </a>
                  </Button>
                  <Button size="icon" variant="secondary" asChild>
                    <a href={project.github} target="_blank" rel="noopener noreferrer">
                      <Github className="h-5 w-5" />
                    </a>
                  </Button>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                <p className="text-muted-foreground text-sm mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.category.map((cat) => (
                    <span
                      key={`${project.id}-${cat}`}
                      className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary"
                    >
                      {categories.find((c) => c.id === cat)?.name}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}
