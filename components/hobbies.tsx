"use client"

import { motion } from "framer-motion"
import { Music, Book, Film, Camera, Gamepad2, Bike } from "lucide-react"

export default function Hobbies() {
  const hobbiesData = [
    {
      id: "1",
      name: "Music",
      icon: <Music className="h-6 w-6" />,
    },
    {
      id: "2",
      name: "Reading",
      icon: <Book className="h-6 w-6" />,
    },
    {
      id: "3",
      name: "Movies",
      icon: <Film className="h-6 w-6" />,
    },
    {
      id: "4",
      name: "Photography",
      icon: <Camera className="h-6 w-6" />,
    },
    {
      id: "5",
      name: "Gaming",
      icon: <Gamepad2 className="h-6 w-6" />,
    },
    {
      id: "6",
      name: "Cycling",
      icon: <Bike className="h-6 w-6" />,
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
        My <span className="text-primary">Hobbies</span>
      </motion.h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {hobbiesData.map((hobby, index) => (
          <motion.div
            key={hobby.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="flex items-center justify-center"
          >
            <div className="relative overflow-hidden rounded-xl border border-border/40 bg-background/80 backdrop-blur-sm p-6 hover:border-primary/40 transition-colors duration-300 w-full text-center">
              <div className="flex flex-col items-center">
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
                  {hobby.icon}
                </div>
                <h3 className="text-lg font-medium">{hobby.name}</h3>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
