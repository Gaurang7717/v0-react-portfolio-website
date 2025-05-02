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

  return (
    <div className="bg-white dark:bg-black py-24">
      <div className="container mx-auto px-4 md:px-8">
        <h2 className="text-4xl md:text-5xl font-bold mb-16">PORTFOLIO</h2>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mb-16">
          Explore my recent web design creations and discover how we can transform your vision into reality.
        </p>

        <div className="space-y-24">
          {projects.map((project) => (
            <div key={project.id} className="group">
              <div className="relative aspect-[16/9] overflow-hidden rounded-lg mb-6">
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
                  <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{project.description}</p>
                </div>
                <div className="flex items-center mt-4 md:mt-0">
                  <span className="text-sm text-gray-500 mr-8">{project.year}</span>
                  <Button
                    variant="outline"
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
    </div>
  )
}
