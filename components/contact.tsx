"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ArrowRight, Mail, Phone, MapPin } from "lucide-react"
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
      formDataObj.append("subject", formData.subject || "Contact Form Submission") // Ensure subject has a default value
      formDataObj.append("message", formData.message)

      // Submit the form using fetch to the server action endpoint
      const response = await fetch("/api/contact", {
        method: "POST",
        body: formDataObj,
      })

      if (!response.ok) {
        // Get the error message from the response if available
        let errorMessage = "Failed to submit contact form"
        try {
          const errorData = await response.json()
          if (errorData.error) {
            errorMessage = errorData.error
          }
        } catch (e) {
          // If we can't parse the JSON, just use the default error message
        }

        throw new Error(errorMessage)
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

      // In preview mode or when the backend is unavailable, show a different message
      if (window.location.hostname.includes("vercel.app") || window.location.hostname === "localhost") {
        toast({
          title: "Demo Mode",
          description: "Form submission is simulated in preview mode. In production, your message would be sent.",
        })

        // Reset form in preview mode too
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        })
      } else {
        toast({
          title: "Error",
          description: "Failed to send message. Please try again later or contact me directly via email.",
          variant: "destructive",
        })
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
        Contact <span className="text-primary">Me</span>
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16">
        <div>
          <p className="text-base md:text-lg mb-8 max-w-md">
            Have a project in mind or want to discuss a potential collaboration? I'd love to hear from you.
          </p>
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <Mail className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="text-sm font-bold uppercase mb-1">Email</h3>
                <p className="text-sm md:text-base text-gray-600 dark:text-gray-300">gaurang7717@gmail.com</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <Phone className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="text-sm font-bold uppercase mb-1">Phone</h3>
                <p className="text-sm md:text-base text-gray-600 dark:text-gray-300">+91 90819 65909</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <MapPin className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="text-sm font-bold uppercase mb-1">Location</h3>
                <p className="text-sm md:text-base text-gray-600 dark:text-gray-300">Ahmedabad, India</p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                required
                disabled={isSubmitting}
                className="border-0 border-b border-gray-300 dark:border-gray-700 rounded-none px-0 py-2 focus-visible:ring-0 focus-visible:border-black dark:focus-visible:border-white"
              />
            </div>
            <div>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your Email"
                required
                disabled={isSubmitting}
                className="border-0 border-b border-gray-300 dark:border-gray-700 rounded-none px-0 py-2 focus-visible:ring-0 focus-visible:border-black dark:focus-visible:border-white"
              />
            </div>
            <div>
              <Input
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Subject (Optional)"
                disabled={isSubmitting}
                className="border-0 border-b border-gray-300 dark:border-gray-700 rounded-none px-0 py-2 focus-visible:ring-0 focus-visible:border-black dark:focus-visible:border-white"
              />
            </div>
            <div>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your Message"
                rows={5}
                required
                disabled={isSubmitting}
                className="border-0 border-b border-gray-300 dark:border-gray-700 rounded-none px-0 py-2 focus-visible:ring-0 focus-visible:border-black dark:focus-visible:border-white resize-none"
              />
            </div>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="rounded-full bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 w-fit flex items-center gap-2 px-6"
            >
              {isSubmitting ? "Sending..." : "Send Message"} <ArrowRight className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </div>
    </>
  )
}
