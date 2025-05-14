"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function Projects() {
  const [filter, setFilter] = useState("all")

  const projects = [
    {
      id: "1",
      title: "TOY (Toys Shop)",
      description: "Designing an immersive Toy Shop Experience",
      year: "2023",
      category: "UI/UX Design",
      image: "/placeholder.svg?height=600&width=800",
    },
    {
      id: "2",
      title: "Pet Shopping (Pet Needs)",
      description: "Creating a seamless pet supplies platform",
      year: "2023",
      category: "Mobile App",
      image: "/placeholder.svg?height=600&width=800",
    },
    {
      id: "3",
      title: "GYM (GYMFIT)",
      description: "Designing an interactive Fitness Tech Experience",
      year: "2022",
      category: "Web Design",
      image: "/placeholder.svg?height=600&width=800",
    },
  ]

  const filteredProjects = filter === "all" ? projects : projects.filter((project) => project.category === filter)

  return (
    <section id="projects" className="bg-white dark:bg-black py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
          My <span className="text-primary">Portfolio</span>
        </h2>

        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-center mb-16">
          Explore my recent web design creations and discover how we can transform your vision into reality.
        </p>

        {/* Filter buttons */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {["all", "UI/UX Design", "Mobile App", "Web Design"].map((category) => (
            <Button
              key={category}
              variant={filter === category ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter(category)}
              className="rounded-full text-xs"
            >
              {category === "all" ? "All Projects" : category}
            </Button>
          ))}
        </div>

        <div className="space-y-12 md:space-y-24">
          {filteredProjects.map((project, index) => (
            <div key={project.id} className="group">
              <div className="relative aspect-[16/9] overflow-hidden rounded-lg mb-4 md:mb-6">
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  width={1200}
                  height={675}
                  className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-col md:flex-row md:items-center justify-between">
                <div>
                  <h3 className="text-xl md:text-2xl font-bold mb-2">{project.title}</h3>
                  <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 mb-4 md:mb-0">
                    {project.description}
                  </p>
                </div>
                <div className="flex items-center">
                  <span className="text-xs md:text-sm text-gray-500 mr-4 md:mr-8">{project.year}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-full border-black dark:border-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black"
                  >
                    Explore
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
