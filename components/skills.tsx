"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { getSkills } from "@/lib/api"
import type { Skill } from "@/types/database"
import * as LucideIcons from "lucide-react"
import { Palette } from "lucide-react"

export default function Skills() {
  const [skills, setSkills] = useState<Skill[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Fallback skills data
  const fallbackSkills = [
    {
      id: "1",
      name: "UI Design",
      icon: "Palette",
      description: "Creating beautiful and intuitive interfaces with attention to detail",
      order: 0,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: "2",
      name: "UX Research",
      icon: "Users",
      description: "Conducting user research to inform design decisions",
      order: 1,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: "3",
      name: "Wireframing",
      icon: "PenTool",
      description: "Building the blueprint for successful digital products",
      order: 2,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: "4",
      name: "Prototyping",
      icon: "Layers",
      description: "Creating interactive prototypes to test and validate ideas",
      order: 3,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: "5",
      name: "Figma",
      icon: "Figma",
      description: "Expert in collaborative design and prototyping",
      order: 4,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: "6",
      name: "Market Survey",
      icon: "LineChart",
      description: "Researching market trends and user preferences",
      order: 5,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: "7",
      name: "User Persona",
      icon: "UserPlus",
      description: "Creating detailed user personas to guide design decisions",
      order: 6,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: "8",
      name: "Brainstorming",
      icon: "Lightbulb",
      description: "Generating creative ideas and solutions for design challenges",
      order: 7,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: "9",
      name: "Competitive Analysis",
      icon: "Search",
      description: "Analyzing competitors to identify opportunities and best practices",
      order: 8,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: "10",
      name: "Social Media Design",
      icon: "Share2",
      description: "Creating engaging designs for social media platforms",
      order: 9,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  ]

  useEffect(() => {
    async function loadSkills() {
      try {
        setIsLoading(true)
        const data = await getSkills()

        // If we got data from the API, use it
        if (data && data.length > 0) {
          setSkills(data)
        } else {
          // Otherwise use fallback data
          setSkills(fallbackSkills)
        }
      } catch (error) {
        console.error("Failed to load skills:", error)
        // Use fallback data if API fails
        setSkills(fallbackSkills)
      } finally {
        setIsLoading(false)
      }
    }

    loadSkills()
  }, [])

  const renderIcon = (iconName: string) => {
    // Check if the icon exists in LucideIcons
    const Icon = (LucideIcons as Record<string, React.ComponentType<any>>)[iconName]
    return Icon ? <Icon className="h-8 w-8 md:h-10 md:w-10" /> : <Palette className="h-8 w-8 md:h-10 md:w-10" />
  }

  return (
    <section id="skills" className="bg-white dark:bg-black py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
          My <span className="text-primary">Skills</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
          {skills.map((skill, index) => (
            <div
              key={skill.id}
              className="group relative overflow-hidden rounded-xl border border-border/40 bg-background/80 backdrop-blur-sm p-4 md:p-6 text-center hover:border-primary/40 transition-colors duration-300 hover:-translate-y-1"
            >
              <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-primary/0 via-primary/0 to-primary/0 group-hover:from-primary/10 group-hover:via-secondary/10 group-hover:to-primary/10 blur opacity-0 group-hover:opacity-100 transition-all duration-500" />
              <div className="relative flex flex-col items-center">
                <div className="mb-3 md:mb-4 text-primary transition-transform duration-300 group-hover:scale-110">
                  {renderIcon(skill.icon)}
                </div>
                <h3 className="text-base md:text-lg font-semibold mb-1 md:mb-2">{skill.name}</h3>
                <p className="text-xs md:text-sm text-muted-foreground">{skill.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
