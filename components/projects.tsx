"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github, Loader2 } from "lucide-react"
import { getProjects } from "@/lib/api"
import type { Project } from "@/types/database"
import { useToast } from "@/components/ui/use-toast"

export default function Projects() {
  const [filter, setFilter] = useState("all")
  const [projects, setProjects] = useState<Project[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  const categories = [
    { id: "all", name: "All" },
    { id: "ui", name: "UI Design" },
    { id: "ux", name: "UX Design" },
    { id: "web", name: "Web Design" },
    { id: "mobile", name: "Mobile App" },
  ]

  useEffect(() => {
    async function loadProjects() {
      try {
        setIsLoading(true)
        const data = await getProjects()
        setProjects(data)
      } catch (error) {
        console.error("Failed to load projects:", error)
        toast({
          title: "Error",
          description: "Failed to load projects. Please try again later.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    loadProjects()
  }, [toast])

  const filteredProjects =
    filter === "all" ? projects : projects.filter((project) => project.categories.includes(filter))

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

      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : filteredProjects.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-muted-foreground">No projects found.</p>
        </div>
      ) : (
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
                    src={project.image_url || "/placeholder.svg?height=600&width=800"}
                    alt={project.title}
                    width={800}
                    height={600}
                    className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {project.live_url && (
                      <Button size="icon" variant="secondary" asChild>
                        <a href={project.live_url} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-5 w-5" />
                        </a>
                      </Button>
                    )}
                    {project.github_url && (
                      <Button size="icon" variant="secondary" asChild>
                        <a href={project.github_url} target="_blank" rel="noopener noreferrer">
                          <Github className="h-5 w-5" />
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.categories.map((cat) => (
                      <span
                        key={`${project.id}-${cat}`}
                        className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary"
                      >
                        {categories.find((c) => c.id === cat)?.name || cat}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  )
}
