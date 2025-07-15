'use client'

import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Education from '@/components/Education'
import Experience from '@/components/Experience'
import Projects from '@/components/Projects'
import Skills from '@/components/Skills'
import Contact from '@/components/Contact'

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function Home() {
  useEffect(() => {
    // Performance optimization: Throttle scroll events
    let ticking = false
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          // Scroll-based animations are handled by GSAP ScrollTrigger
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    // Cleanup function
    return () => {
      window.removeEventListener('scroll', handleScroll)
      // Kill all ScrollTriggers on unmount
      ScrollTrigger.killAll()
    }
  }, [])

  return (
    <main className="bg-dark-900 min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <Education />
      <Experience />
      <Projects />
      <Skills />
      <Contact />
    </main>
  )
} 