"use client"

import { motion } from "framer-motion"

export default function About() {
  return (
    <div className="bg-[#f5f5f3] dark:bg-[#121212] py-24">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-8">
              CRAFTING MEANINGFUL
              <br />
              BRANDS & INTUITIVE
              <br />
              EXPERIENCES
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <p className="text-lg mb-6">
              Hey, I'm Gaurang, a UI/UX and brand designer passionate about creating visually compelling and
              user-friendly digital experiences.
            </p>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              With a keen eye for aesthetics and a deep understanding of user behavior, I design brands and interfaces
              that not only look great but also resonate with audiences.
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              Whether it's building a brand identity from the ground up or refining a digital product for seamless
              usability, I blend strategy, creativity, and functionality to bring ideas to life. Let's collaborate and
              make something extraordinary.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
