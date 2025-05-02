"use client"

import { useEffect, useState } from "react"
import Hero from "@/components/hero"
import About from "@/components/about"
import Projects from "@/components/projects"
import Contact from "@/components/contact"
import Footer from "@/components/footer"

export default function Home() {
  const [mounted, setMounted] = useState(false)

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-[#f5f5f3] dark:bg-[#121212] transition-colors duration-500">
      <main>
        <section id="home">
          <Hero />
        </section>

        <section id="about">
          <About />
        </section>

        <section id="projects">
          <Projects />
        </section>

        <section id="contact" className="bg-[#f5f5f3] dark:bg-[#121212] py-24">
          <div className="container mx-auto px-4 md:px-8">
            <h2 className="text-4xl md:text-5xl font-bold mb-16">GET IN TOUCH</h2>
            <Contact />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
