"use client"

import { useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { ArrowDown } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Interactive background animation
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    const particles: Particle[] = []
    const particleCount = 100

    class Particle {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      color: string

      constructor() {
        this.x = Math.random() * width
        this.y = Math.random() * height
        this.size = Math.random() * 5 + 1
        this.speedX = Math.random() * 3 - 1.5
        this.speedY = Math.random() * 3 - 1.5
        this.color = `hsla(${Math.random() * 60 + 200}, 70%, 60%, 0.8)`
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY

        if (this.x > width || this.x < 0) {
          this.speedX = -this.speedX
        }

        if (this.y > height || this.y < 0) {
          this.speedY = -this.speedY
        }
      }

      draw() {
        if (!ctx) return
        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    const init = () => {
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle())
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, width, height)

      for (let i = 0; i < particles.length; i++) {
        particles[i].update()
        particles[i].draw()

        // Connect particles with lines
        for (let j = i; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 100) {
            ctx.beginPath()
            ctx.strokeStyle = `rgba(120, 180, 255, ${0.2 - distance / 500})`
            ctx.lineWidth = 0.5
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }

      requestAnimationFrame(animate)
    }

    const handleResize = () => {
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }

    window.addEventListener("resize", handleResize)

    init()
    animate()

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  const scrollToAbout = () => {
    const aboutSection = document.querySelector("#about")
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      <div className="absolute inset-0 bg-gradient-to-b from-background/30 to-background/80 backdrop-blur-[2px]" />

      <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-lg md:text-xl font-light text-muted-foreground mb-4"
        >
          Hello, I'm
        </motion.h2>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6"
        >
          <span className="text-primary">Jane</span> Doe
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="relative mb-8"
        >
          <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-primary/20 to-secondary/20 blur opacity-70" />
          <div className="relative rounded-lg bg-background/80 backdrop-blur-sm px-6 py-4 border border-border/40">
            <h2 className="text-xl md:text-2xl font-medium">UI/UX Designer & Creative Developer</h2>
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto"
        >
          Creating beautiful, intuitive, and functional digital experiences that connect people with products and
          brands.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button
            size="lg"
            className="rounded-full"
            onClick={() => {
              const projectsSection = document.querySelector("#projects")
              if (projectsSection) {
                projectsSection.scrollIntoView({ behavior: "smooth" })
              }
            }}
          >
            View My Work
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="rounded-full"
            onClick={() => {
              const contactSection = document.querySelector("#contact")
              if (contactSection) {
                contactSection.scrollIntoView({ behavior: "smooth" })
              }
            }}
          >
            Get In Touch
          </Button>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.6,
          delay: 1.2,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
          repeatDelay: 0.5,
        }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer"
        onClick={scrollToAbout}
      >
        <ArrowDown className="h-8 w-8 text-primary" />
      </motion.div>
    </div>
  )
}
