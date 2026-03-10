'use client'

import { motion } from 'framer-motion'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Education from '@/components/Education'
import Experience from '@/components/Experience'
import Projects from '@/components/Projects'
import Skills from '@/components/Skills'
import GitHubContributions from '@/components/GitHubContributions'
import NeonPong from '@/components/NeonPong'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <motion.main
      className="min-h-screen bg-background pb-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <Navbar />
      <Hero />
      <Projects />
      <Experience />
      <Education />
      <Skills />
      <GitHubContributions />
      <NeonPong />
      <Contact />
      <Footer />
    </motion.main>
  )
} 