"use client"

import { motion } from "framer-motion"
import { MessageSquare } from "lucide-react"

export default function Languages() {
  const languageData = [
    {
      id: "1",
      name: "Gujarati",
      proficiency: "Native",
      icon: <MessageSquare className="h-5 w-5" />,
    },
    {
      id: "2",
      name: "Hindi",
      proficiency: "Fluent",
      icon: <MessageSquare className="h-5 w-5" />,
    },
    {
      id: "3",
      name: "English",
      proficiency: "Proficient",
      icon: <MessageSquare className="h-5 w-5" />,
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
        <span className="text-primary">Languages</span> I Speak
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {languageData.map((language, index) => (
          <motion.div
            key={language.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="flex items-center justify-center"
          >
            <div className="relative overflow-hidden rounded-xl border border-border/40 bg-background/80 backdrop-blur-sm p-6 hover:border-primary/40 transition-colors duration-300 w-full text-center">
              <div className="flex flex-col items-center">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4">
                  {language.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{language.name}</h3>
                <p className="text-muted-foreground">{language.proficiency}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
