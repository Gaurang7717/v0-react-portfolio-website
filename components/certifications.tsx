"use client"

import { motion } from "framer-motion"
import { Award } from "lucide-react"

export default function Certifications() {
  const certificationsData = [
    {
      id: "1",
      title: "UI/UX Designer Trainee",
      issuer: "Red & White Multimedia Education",
    },
    {
      id: "2",
      title: "ITI in COPA",
      issuer: "Dhandhuka",
    },
    {
      id: "3",
      title: "G.S.R.T.C. Internship",
      issuer: "Gujarat State Road Transport Corporation",
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
        My <span className="text-primary">Certifications</span>
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {certificationsData.map((certification, index) => (
          <motion.div
            key={certification.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-xl border border-border/40 bg-background/80 backdrop-blur-sm p-6 hover:border-primary/40 transition-colors duration-300"
          >
            <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-primary/0 via-primary/0 to-primary/0 group-hover:from-primary/10 group-hover:via-secondary/10 group-hover:to-primary/10 blur opacity-0 group-hover:opacity-100 transition-all duration-500" />

            <div className="relative flex items-center">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mr-4">
                <Award className="h-6 w-6" />
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-1">{certification.title}</h3>
                <p className="text-sm text-muted-foreground">{certification.issuer}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
