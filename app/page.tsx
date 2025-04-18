"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { ThemeProvider } from "@/components/theme-provider"
import Navbar from "@/components/navbar"
import Hero from "@/components/hero"
import About from "@/components/about"
import Skills from "@/components/skills"
import Projects from "@/components/projects"
import Contact from "@/components/contact"
import Footer from "@/components/footer"
import { useTheme } from "next-themes"

export default function Home() {
  const [mounted, setMounted] = useState(false)
  const { theme } = useTheme()

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
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
    </ThemeProvider>
  )
}
