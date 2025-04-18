"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"

export default function About() {
  return (
    <div className="container mx-auto">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="text-3xl md:text-4xl font-bold text-center mb-16"
      >
        About <span className="text-primary">Me</span>
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="absolute -inset-4 rounded-2xl bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20 blur-xl opacity-70" />
          <div className="relative aspect-square overflow-hidden rounded-2xl border border-border/40 bg-background/80 backdrop-blur-sm">
            <Image
              src="/placeholder.svg?height=600&width=600"
              alt="Jane Doe - UI/UX Designer"
              width={600}
              height={600}
              className="object-cover w-full h-full"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-semibold mb-4">UI/UX Designer & Creative Developer</h3>

          <p className="text-muted-foreground mb-6">
            Hello! I'm Jane, a passionate UI/UX designer with over 5 years of experience creating beautiful and
            functional digital experiences. I specialize in user-centered design that balances aesthetics with
            usability.
          </p>

          <p className="text-muted-foreground mb-6">
            My approach combines research, strategy, and creativity to solve complex problems and deliver designs that
            not only look great but also provide meaningful experiences for users. I believe that good design should be
            intuitive, accessible, and delightful.
          </p>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <div>
              <h4 className="font-medium mb-2">Name:</h4>
              <p className="text-muted-foreground">Jane Doe</p>
            </div>
            <div>
              <h4 className="font-medium mb-2">Email:</h4>
              <p className="text-muted-foreground">hello@janedoe.com</p>
            </div>
            <div>
              <h4 className="font-medium mb-2">Location:</h4>
              <p className="text-muted-foreground">San Francisco, CA</p>
            </div>
            <div>
              <h4 className="font-medium mb-2">Availability:</h4>
              <p className="text-muted-foreground">Freelance & Full-time</p>
            </div>
          </div>

          <Button className="rounded-full">
            <Download className="mr-2 h-4 w-4" /> Download Resume
          </Button>
        </motion.div>
      </div>
    </div>
  )
}
