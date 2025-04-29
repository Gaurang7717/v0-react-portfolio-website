"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, MapPin, Phone, Send, Github, Linkedin, Twitter, Instagram, Dribbble, Loader2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

export default function Contact() {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      setIsSubmitting(true)

      // Create a FormData object to submit
      const formDataObj = new FormData()
      formDataObj.append("name", formData.name)
      formDataObj.append("email", formData.email)
      formDataObj.append("subject", formData.subject)
      formDataObj.append("message", formData.message)

      // Submit the form using fetch to the server action endpoint
      const response = await fetch("/api/contact", {
        method: "POST",
        body: formDataObj,
      })

      if (!response.ok) {
        throw new Error("Failed to submit contact form")
      }

      // Reset form
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      })

      // Show success message
      toast({
        title: "Message sent!",
        description: "Thank you for your message. I'll get back to you soon.",
      })
    } catch (error) {
      console.error("Error submitting form:", error)
      toast({
        title: "Error",
        description: "Failed to send message. Please try again later.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container mx-auto">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="text-3xl md:text-4xl font-bold text-center mb-16"
      >
        Get In <span className="text-primary">Touch</span>
      </motion.h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-semibold mb-6">Contact Information</h3>
          <p className="text-muted-foreground mb-8">
            Feel free to reach out to me for any inquiries, collaborations, or just to say hello. I'm always open to
            discussing new projects and opportunities.
          </p>

          <div className="space-y-6 mb-8">
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary">
                <Mail className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-medium">Email</h4>
                <p className="text-muted-foreground">gaurang7717@gmail.com</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary">
                <Phone className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-medium">Phone</h4>
                <p className="text-muted-foreground">+91 90819 65909</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary">
                <MapPin className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-medium">Location</h4>
                <p className="text-muted-foreground">Ahmedabad, India</p>
              </div>
            </div>
          </div>

          <h3 className="text-xl font-semibold mb-4">Connect With Me</h3>
          <div className="flex gap-4">
            <a
              href="#"
              className="flex items-center justify-center w-10 h-10 rounded-full bg-background border border-border hover:border-primary hover:text-primary transition-colors"
              aria-label="Github"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href="#"
              className="flex items-center justify-center w-10 h-10 rounded-full bg-background border border-border hover:border-primary hover:text-primary transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a
              href="#"
              className="flex items-center justify-center w-10 h-10 rounded-full bg-background border border-border hover:border-primary hover:text-primary transition-colors"
              aria-label="Twitter"
            >
              <Twitter className="h-5 w-5" />
            </a>
            <a
              href="#"
              className="flex items-center justify-center w-10 h-10 rounded-full bg-background border border-border hover:border-primary hover:text-primary transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="h-5 w-5" />
            </a>
            <a
              href="#"
              className="flex items-center justify-center w-10 h-10 rounded-full bg-background border border-border hover:border-primary hover:text-primary transition-colors"
              aria-label="Dribbble"
            >
              <Dribbble className="h-5 w-5" />
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="absolute -inset-4 rounded-2xl bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 blur-xl opacity-70" />
          <div className="relative rounded-2xl border border-border/40 bg-background/80 backdrop-blur-sm p-8">
            <h3 className="text-2xl font-semibold mb-6">Send Me a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    Your Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    required
                    disabled={isSubmitting}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Your Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    required
                    disabled={isSubmitting}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-medium">
                  Subject
                </label>
                <Input
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Project Inquiry"
                  required
                  disabled={isSubmitting}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">
                  Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Hello, I'd like to discuss a project..."
                  rows={5}
                  required
                  disabled={isSubmitting}
                />
              </div>
              <Button type="submit" className="w-full rounded-full" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" /> Send Message
                  </>
                )}
              </Button>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
