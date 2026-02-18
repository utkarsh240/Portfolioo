'use client'

import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Education from '@/components/Education'
import Experience from '@/components/Experience'
import Projects from '@/components/Projects'
import Skills from '@/components/Skills'
import GitHubContributions from '@/components/GitHubContributions'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <Education />
      <Experience />
      <Projects />
      <Skills />
      <GitHubContributions />
      <Contact />
      <Footer />
    </main>
  )
} 