"use client"

import { motion } from "framer-motion"
import { GraduationCap, Calendar } from "lucide-react"

export default function Education() {
  const educationData = [
    {
      id: "1",
      degree: "B.A.",
      year: "2022",
      institution: "Shree K. K. A. & C. college Dhandhuka",
      board: "Gujarat University",
    },
    {
      id: "2",
      degree: "H.S.C.",
      year: "2019",
      institution: "The B. & H. High school Dhandhuka",
      board: "G.S.E.B.",
    },
    {
      id: "3",
      degree: "I.T.I. (COPA)",
      year: "2022",
      institution: "I.T.I. Dhandhuka",
      board: "NCVT",
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
        My <span className="text-primary">Education</span>
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {educationData.map((education, index) => (
          <motion.div
            key={education.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-xl border border-border/40 bg-background/80 backdrop-blur-sm p-6 hover:border-primary/40 transition-colors duration-300"
          >
            <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-primary/0 via-primary/0 to-primary/0 group-hover:from-primary/10 group-hover:via-secondary/10 group-hover:to-primary/10 blur opacity-0 group-hover:opacity-100 transition-all duration-500" />

            <div className="relative">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4">
                <GraduationCap className="h-6 w-6" />
              </div>

              <h3 className="text-xl font-semibold mb-2">{education.degree}</h3>

              <div className="flex items-center text-sm text-muted-foreground mb-4">
                <Calendar className="h-4 w-4 mr-1" />
                {education.year}
              </div>

              <p className="font-medium">{education.institution}</p>
              <p className="text-sm text-muted-foreground">{education.board}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
