"use client"

import { motion } from "framer-motion"
import { Figma, Framer, Code2, PenTool, Layers, Palette, Lightbulb, Users, LineChart, Smartphone } from "lucide-react"

export default function Skills() {
  const skills = [
    {
      name: "UI Design",
      icon: <Palette className="h-10 w-10" />,
      description: "Creating beautiful and intuitive interfaces with attention to detail",
    },
    {
      name: "UX Design",
      icon: <Users className="h-10 w-10" />,
      description: "Crafting seamless user experiences based on research and testing",
    },
    {
      name: "Wireframing",
      icon: <PenTool className="h-10 w-10" />,
      description: "Building the blueprint for successful digital products",
    },
    {
      name: "Prototyping",
      icon: <Layers className="h-10 w-10" />,
      description: "Creating interactive prototypes to test and validate ideas",
    },
    {
      name: "Figma",
      icon: <Figma className="h-10 w-10" />,
      description: "Expert in collaborative design and prototyping",
    },
    {
      name: "Framer",
      icon: <Framer className="h-10 w-10" />,
      description: "Building high-fidelity interactive prototypes",
    },
    {
      name: "Front-end",
      icon: <Code2 className="h-10 w-10" />,
      description: "Translating designs into responsive HTML, CSS and JavaScript",
    },
    {
      name: "Design Systems",
      icon: <Lightbulb className="h-10 w-10" />,
      description: "Creating scalable and consistent design systems",
    },
    {
      name: "Analytics",
      icon: <LineChart className="h-10 w-10" />,
      description: "Data-driven design decisions based on user behavior",
    },
    {
      name: "Responsive Design",
      icon: <Smartphone className="h-10 w-10" />,
      description: "Creating designs that work beautifully across all devices",
    },
  ]

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
            key={skill.name}
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
                {skill.icon}
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
