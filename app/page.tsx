import Navbar from "@/components/navbar"
import Hero from "@/components/hero"
import About from "@/components/about"
import Projects from "@/components/projects"
import Skills from "@/components/skills"
import Experience from "@/components/experience"
import Contact from "@/components/contact"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <section id="contact" className="bg-[#f5f5f3] dark:bg-[#121212] py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-8">
            <Contact />
          </div>
        </section>
        <Footer />
      </main>
    </>
  )
}
