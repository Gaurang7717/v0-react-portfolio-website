"use client"
import { Github, Linkedin, Twitter, Instagram, Dribbble } from "lucide-react"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-[#f5f5f3] dark:bg-[#121212] py-8 md:py-12 border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-black dark:bg-white rounded-full"></div>
              <span className="font-medium">GAURANG</span>
            </div>
          </div>

          <div className="flex gap-4 md:gap-6 mb-6 md:mb-0">
            {[
              { icon: Github, label: "Github" },
              { icon: Linkedin, label: "LinkedIn" },
              { icon: Twitter, label: "Twitter" },
              { icon: Instagram, label: "Instagram" },
              { icon: Dribbble, label: "Dribbble" },
            ].map((social) => (
              <a
                key={social.label}
                href="#"
                className="text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                aria-label={social.label}
              >
                <social.icon className="h-5 w-5" />
              </a>
            ))}
          </div>

          <div className="text-sm text-gray-500 dark:text-gray-400">© {currentYear} Gaurang Dumaniya</div>
        </div>
      </div>
    </footer>
  )
}
