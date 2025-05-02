"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ArrowRight } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

export default function Contact() {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
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
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
      <div>
        <p className="text-lg mb-8 max-w-md">
          Have a project in mind or want to discuss a potential collaboration? I'd love to hear from you.
        </p>
        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-bold uppercase mb-2">Email</h3>
            <p className="text-gray-600 dark:text-gray-300">gaurang7717@gmail.com</p>
          </div>
          <div>
            <h3 className="text-sm font-bold uppercase mb-2">Phone</h3>
            <p className="text-gray-600 dark:text-gray-300">+91 90819 65909</p>
          </div>
          <div>
            <h3 className="text-sm font-bold uppercase mb-2">Location</h3>
            <p className="text-gray-600 dark:text-gray-300">Ahmedabad, India</p>
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
  )
}
