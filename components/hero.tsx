"use client"

import { useState, useEffect } from "react"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function Hero() {
  const [mounted, setMounted] = useState(false)

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <section id="home" className="min-h-screen pt-16 bg-[#f5f5f3] dark:bg-[#121212] flex flex-col justify-center">
      {/* Hero Content */}
      <div className="container mx-auto flex-1 grid grid-cols-1 lg:grid-cols-2 gap-8 px-4 md:px-8 py-12">
        <div className="flex flex-col justify-center order-2 lg:order-1 text-center lg:text-left">
          <h2 className="text-lg mb-2">Hey, I'm Gaurang,</h2>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 leading-tight">
            A UI/UX
            <br />
            <span className="font-serif italic font-normal">&</span> Brand
            <br />
            DESIGNER
          </h1>
          <p className="text-gray-600 dark:text-gray-300 max-w-md mx-auto lg:mx-0 mb-8">
            Transforming ideas into stunning visuals - UI/UX and brand design that captivates, engages, and delivers
            results.
          </p>
          <div className="flex justify-center lg:justify-start">
            <Button
              className="rounded-full bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 w-fit flex items-center gap-2 px-6"
              onClick={() => {
                const contactSection = document.querySelector("#contact")
                if (contactSection) {
                  contactSection.scrollIntoView({ behavior: "smooth" })
                }
              }}
            >
              CONTACT ME <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="flex items-center justify-center order-1 lg:order-2 mb-8 lg:mb-0">
          <div className="relative">
            <div className="w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-lg">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202024-11-25%20at%201.20.23%20AM-snGNzoo3eLsyZ5HELRvMjoakZpTffw.jpeg"
                alt="Gaurang Dumaniya"
                width={400}
                height={400}
                className="object-cover w-full h-full"
                priority
              />
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="container mx-auto px-4 md:px-8 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {[
            { value: "15+", label: "Years Experience" },
            { value: "280+", label: "Projects Delivered" },
            { value: "+99%", label: "Client Satisfaction" },
            { value: "50", label: "Clients worldwide" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-2xl md:text-3xl font-bold">{stat.value}</p>
              <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Services */}
      <div className="container mx-auto px-4 md:px-8 py-8 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {[
            {
              title: "User-Centered Design",
              description: "Intuitive and engaging experiences tailored for your audience",
            },
            {
              title: "Brand Identity & Strategy",
              description: "Strong visual storytelling that makes your brand unforgettable",
            },
            { title: "Responsive & Modern UI", description: "Pixel-perfect designs optimized for all devices" },
            {
              title: "Seamless Prototyping",
              description: "Interactive designs to bring ideas to life before development",
            },
          ].map((service) => (
            <div
              key={service.title}
              className="p-4 hover:bg-white/50 dark:hover:bg-black/20 rounded-lg transition-colors"
            >
              <h3 className="text-sm font-bold uppercase mb-2 md:mb-4">{service.title}</h3>
              <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
