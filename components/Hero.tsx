'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Linkedin, Github, Twitter } from 'lucide-react'

const FlipText = ({ text, className = "", delay = 0 }: { text: string, className?: string, delay?: number }) => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay)
    return () => clearTimeout(timer)
  }, [delay])

  return (
    <span className={`inline-block ${className}`}>
      {text.split('').map((char, index) => (
        <motion.span
          key={index}
          initial={{ rotateX: 90, opacity: 0 }}
          animate={isVisible ? { rotateX: 0, opacity: 1 } : { rotateX: 90, opacity: 0 }}
          transition={{ 
            duration: 0.7, 
            delay: isVisible ? index * 0.1 : 0,
            ease: "easeOut"
          }}
          style={{
            transformStyle: 'preserve-3d',
          }}
          className="inline-block"
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </span>
  )
}

const Hero = () => {
  return (
    <section id="home" className="relative min-h-[80vh] flex flex-col justify-center items-center bg-background text-center px-4 pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
      {/* Subtle geometric background */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-full blur-2xl" />
      </div>
      <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center gap-6">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl font-extrabold font-heading tracking-tight text-foreground leading-tight"
        >
          Hi, I&apos;m{' '}
          <br />
          <span className="text-blue-600 dark:text-blue-400 text-6xl md:text-8xl font-bold">
            <FlipText text="Utkarsh" className="mr-2" delay={500} />
            <FlipText text="Gupta" delay={1200} />
          </span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg md:text-2xl text-muted-foreground font-body max-w-xl mx-auto"
        >
          Computer Science Student & <span className="text-accent-blue font-semibold">Full Stack Developer</span> with knowledge of <span className="text-accent-green font-semibold">Gen AI</span>. I build modern web applications and love solving real-world problems with code.
        </motion.p>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 pt-4"
        >
          <a href="#projects" className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 font-heading shadow-lg hover:shadow-xl">View Projects</a>
          <a href="#contact" className="inline-flex items-center px-6 py-3 border border-border text-foreground rounded-lg hover:bg-accent transition-colors font-heading">Get In Touch</a>
        </motion.div>
        
        {/* Social Links */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex items-center gap-6 pt-6"
        >
          <a 
            href="https://linkedin.com/in/utkarsh-gupta-53647b217/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-muted hover:bg-blue-500/20 transition-all duration-300 group"
          >
            <Linkedin className="w-6 h-6 text-muted-foreground group-hover:text-blue-500 transition-colors duration-300" />
          </a>
          <a 
            href="https://github.com/utkarsh240" 
            target="_blank" 
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-muted hover:bg-green-500/20 transition-all duration-300 group"
          >
            <Github className="w-6 h-6 text-muted-foreground group-hover:text-green-500 transition-colors duration-300" />
          </a>
          <a 
            href="https://x.com/utkarshh_24?t=DlWFEbvPtBUBHlG3bCnqkg&s=09" 
            target="_blank" 
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-muted hover:bg-purple-500/20 transition-all duration-300 group"
          >
            <Twitter className="w-6 h-6 text-muted-foreground group-hover:text-purple-500 transition-colors duration-300" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero 