"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Briefcase, Calendar } from "lucide-react"

// Define a local type for experience data to use as fallback
type ExperienceData = {
  id: string
  title: string
  company: string
  location: string
  period: string
  description: string[]
  skills: string[]
}

export default function Experience() {
  const [experiences, setExperiences] = useState<ExperienceData[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Fallback data to use when the API call fails
  const fallbackExperiences: ExperienceData[] = [
    {
      id: "1",
      title: "UI UX Designer",
      company: "Pixscale Technologies Private Limited",
      location: "Ahmedabad, India",
      period: "May 2024 - Present",
      description: [
        "Skilled UI/UX Designer with expertise in creating intuitive, visually appealing interfaces.",
        "Proficient in Figma, Adobe Photoshop, and Illustrator; experienced in user research, wireframing, prototyping, and social media design.",
      ],
      skills: [
        "UI Design",
        "UX Research",
        "Figma",
        "Adobe Photoshop",
        "Adobe Illustrator",
        "Wireframing",
        "Prototyping",
      ],
    },
    {
      id: "2",
      title: "Computer Operator (Internship)",
      company: "G.S.R.T.C.",
      location: "Gujarat, India",
      period: "April 2022 - March 2023",
      description: [
        "Completed a 1-year internship as a Computer Operator at Gujarat State Road Transport Corporation.",
        "Gained practical experience in computer operations and data management.",
      ],
      skills: ["Computer Operations", "Data Entry", "Office Software", "Customer Service"],
    },
    {
      id: "3",
      title: "UI/UX Designer Trainee",
      company: "Red & White Multimedia Education",
      location: "Gujarat, India",
      period: "2022",
      description: [
        "Received comprehensive training in UI/UX design principles and practices.",
        "Developed skills in user research, wireframing, and prototyping.",
      ],
      skills: ["UI Design", "UX Research", "Wireframing", "Prototyping", "User Testing"],
    },
  ]

  useEffect(() => {
    async function loadExperiences() {
      try {
        // Try to import the API function dynamically to prevent errors at build time
        const { getExperiences } = await import("@/lib/api")
        const data = await getExperiences()
        setExperiences(data)
      } catch (error) {
        console.error("Failed to load experiences:", error)
        // Use fallback data when the API call fails
        setExperiences(fallbackExperiences)
      } finally {
        setIsLoading(false)
      }
    }

    // Set fallback data immediately to prevent loading state if API fails
    setExperiences(fallbackExperiences)
    setIsLoading(false)

    // Still try to load from API in case it works
    loadExperiences()
  }, [])

  return (
    <div className="container mx-auto">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="text-3xl md:text-4xl font-bold text-center mb-16"
      >
        Work <span className="text-primary">Experience</span>
      </motion.h2>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 h-full w-0.5 bg-border" />

        {experiences.map((experience, index) => (
          <motion.div
            key={experience.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className={`relative mb-12 md:mb-16 ${
              index % 2 === 0 ? "md:pr-12 md:text-right md:ml-0 md:mr-auto" : "md:pl-12 md:ml-auto md:mr-0"
            } w-full md:w-1/2 pl-10 md:pl-0`}
          >
            {/* Timeline dot */}
            <div className="absolute left-0 md:left-auto md:right-0 top-0 w-8 h-8 rounded-full bg-primary/10 border border-primary flex items-center justify-center z-10">
              <Briefcase className="h-4 w-4 text-primary" />
            </div>

            {/* Content */}
            <div className="relative overflow-hidden rounded-xl border border-border/40 bg-background/80 backdrop-blur-sm p-6 hover:border-primary/40 transition-colors duration-300">
              <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-primary/0 via-primary/0 to-primary/0 group-hover:from-primary/10 group-hover:via-secondary/10 group-hover:to-primary/10 blur opacity-0 group-hover:opacity-100 transition-all duration-500" />

              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                <h3 className="text-xl font-semibold">{experience.title}</h3>
                <div className="flex items-center mt-2 md:mt-0 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4 mr-1" />
                  {experience.period}
                </div>
              </div>

              <div className="mb-4">
                <div className="text-lg font-medium text-primary">{experience.company}</div>
                <div className="text-sm text-muted-foreground">{experience.location}</div>
              </div>

              <ul className="space-y-2 mb-4">
                {experience.description.map((item, i) => (
                  <li key={i} className="text-muted-foreground">
                    • {item}
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-2 mt-4">
                {experience.skills.map((skill, i) => (
                  <span key={i} className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
