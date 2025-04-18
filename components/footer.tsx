"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Github, Linkedin, Twitter, Instagram, Dribbble } from "lucide-react"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="py-8 mt-20 border-t border-border/40"
    >
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <Link href="#home" className="text-xl font-bold tracking-tighter">
              <span className="text-primary">Design</span>Folio
            </Link>
          </div>

          <div className="flex gap-4 mb-4 md:mb-0">
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Github">
              <Github className="h-5 w-5" />
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors" aria-label="LinkedIn">
              <Linkedin className="h-5 w-5" />
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Twitter">
              <Twitter className="h-5 w-5" />
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Instagram">
              <Instagram className="h-5 w-5" />
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Dribbble">
              <Dribbble className="h-5 w-5" />
            </a>
          </div>

          <div className="text-sm text-muted-foreground">© {currentYear} Jane Doe. All rights reserved.</div>
        </div>
      </div>
    </motion.footer>
  )
}
