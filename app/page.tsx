"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Navbar from "@/components/navbar"
import Hero from "@/components/hero"
import About from "@/components/about"
import Skills from "@/components/skills"
import Projects from "@/components/projects"
import Contact from "@/components/contact"
import Footer from "@/components/footer"
import Experience from "@/components/experience"

export default function Home() {
  const [mounted, setMounted] = useState(false)

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted transition-colors duration-500">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Navbar />
        <main>
          <section id="home" className="py-10">
            <Hero />
          </section>

          <motion.section
            id="about"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="py-20"
          >
            <About />
          </motion.section>

          <motion.section
            id="experience"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="py-20"
          >
            <Experience />
          </motion.section>

          <motion.section
            id="skills"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="py-20"
          >
            <Skills />
          </motion.section>

          <motion.section
            id="projects"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="py-20"
          >
            <Projects />
          </motion.section>

          <motion.section
            id="contact"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="py-20"
          >
            <Contact />
          </motion.section>
        </main>
        <Footer />
      </div>
    </div>
  )
}
