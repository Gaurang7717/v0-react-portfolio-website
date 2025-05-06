"use client"

import { useState, useEffect } from "react"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { motion } from "framer-motion"

export default function Hero() {
  const [mounted, setMounted] = useState(false)

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-[#f5f5f3] dark:bg-[#121212] flex flex-col">
      {/* Navigation */}
      <div className="container mx-auto py-8 px-4 md:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-black dark:bg-white rounded-full"></div>
            <span className="font-medium">GAURANG</span>
          </div>
          <button className="bg-black dark:bg-white text-white dark:text-black text-sm px-4 py-2 rounded-full">
            MENU
          </button>
        </div>
      </div>

      {/* Hero Content */}
      <div className="container mx-auto flex-1 grid grid-cols-1 lg:grid-cols-2 gap-8 px-4 md:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col justify-center"
        >
          <h2 className="text-lg mb-2">Hey, I'm Gaurang,</h2>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-4">
            A UI/UX
            <br />
            <span className="font-serif italic font-normal">&</span> Brand
            <br />
            DESIGNER
          </h1>
          <p className="text-gray-600 dark:text-gray-300 max-w-md mb-8">
            Transforming ideas into stunning visuals - UI/UX and brand design that captivates, engages, and delivers
            results.
          </p>
          <Button className="rounded-full bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 w-fit flex items-center gap-2 px-6">
            CONTACT ME <ArrowRight className="h-4 w-4" />
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex items-center justify-center lg:justify-end"
        >
          <div className="relative">
            <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-lg">
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
        </motion.div>
      </div>

      {/* Stats */}
      <div className="container mx-auto px-4 md:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="text-center">
            <p className="text-3xl font-bold">15+</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Years Experience</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold">280+</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Projects Delivered</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold">+99%</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Client Satisfaction</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold">50</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Clients worldwide</p>
          </div>
        </div>
      </div>

      {/* Services */}
      <div className="container mx-auto px-4 md:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-sm font-bold uppercase mb-4">User-Centered Design</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Intuitive and engaging experiences tailored for your audience
            </p>
          </div>
          <div>
            <h3 className="text-sm font-bold uppercase mb-4">Brand Identity & Strategy</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Strong visual storytelling that makes your brand unforgettable
            </p>
          </div>
          <div>
            <h3 className="text-sm font-bold uppercase mb-4">Responsive & Modern UI</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Pixel-perfect designs optimized for all devices</p>
          </div>
          <div>
            <h3 className="text-sm font-bold uppercase mb-4">Seamless Prototyping</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Interactive designs to bring ideas to life before development
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
