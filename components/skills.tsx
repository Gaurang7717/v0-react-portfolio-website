"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
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
    const Icon = LucideIcons[iconName]
    return Icon ? <Icon className="h-10 w-10" /> : <Palette className="h-10 w-10" />
  }

  return (
    <div className="container mx-auto">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="text-3xl md:text-4xl font-bold text-center mb-16"
      >
        My <span className="text-primary">Skills</span>
      </motion.h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {skills.map((skill, index) => (
          <motion.div
            key={skill.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            whileHover={{
              y: -10,
              transition: { type: "spring", stiffness: 400, damping: 10 },
            }}
            className="group relative overflow-hidden rounded-xl border border-border/40 bg-background/80 backdrop-blur-sm p-6 text-center hover:border-primary/40 transition-colors duration-300"
          >
            <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-primary/0 via-primary/0 to-primary/0 group-hover:from-primary/10 group-hover:via-secondary/10 group-hover:to-primary/10 blur opacity-0 group-hover:opacity-100 transition-all duration-500" />
            <div className="relative flex flex-col items-center">
              <div className="mb-4 text-primary transition-transform duration-300 group-hover:scale-110">
                {renderIcon(skill.icon)}
              </div>
              <h3 className="text-lg font-semibold mb-2">{skill.name}</h3>
              <p className="text-sm text-muted-foreground">{skill.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
