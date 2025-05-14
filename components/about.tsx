"use client"

export default function About() {
  return (
    <section id="about" className="bg-[#f5f5f3] dark:bg-[#121212] py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
          About <span className="text-primary">Me</span>
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16">
          <div>
            <h3 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-8">
              CRAFTING MEANINGFUL
              <br />
              BRANDS & INTUITIVE
              <br />
              EXPERIENCES
            </h3>
          </div>

          <div className="space-y-4 md:space-y-6">
            <p className="text-base md:text-lg">
              Hey, I'm Gaurang, a UI/UX and brand designer passionate about creating visually compelling and
              user-friendly digital experiences.
            </p>
            <p className="text-sm md:text-base text-gray-600 dark:text-gray-300">
              With a keen eye for aesthetics and a deep understanding of user behavior, I design brands and interfaces
              that not only look great but also resonate with audiences.
            </p>
            <p className="text-sm md:text-base text-gray-600 dark:text-gray-300">
              Whether it's building a brand identity from the ground up or refining a digital product for seamless
              usability, I blend strategy, creativity, and functionality to bring ideas to life. Let's collaborate and
              make something extraordinary.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
