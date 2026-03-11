'use client'

import React, { useState, useEffect } from 'react'
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import Clock from './Clock'
import Magnetic from './Magnetic'

const navItems = [
  { name: 'Home', href: '#home', id: 'home' },
  { name: 'Projects', href: '#projects', id: 'projects' },
  { name: 'Skills', href: '#skills', id: 'skills' },
  { name: 'Experience', href: '#experience', id: 'experience' },
  { name: 'Contact', href: '#contact', id: 'contact' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState<string>('home')
  const { scrollY, scrollYProgress } = useScroll()

  // Smooth scroll progress for the top bar
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 })

  const navbarBg = useTransform(
    scrollY,
    [0, 50],
    ['rgba(6, 6, 8, 0.3)', 'rgba(6, 6, 8, 0.85)']
  )

  const navbarBorder = useTransform(
    scrollY,
    [0, 50],
    ['rgba(255, 255, 255, 0.03)', 'rgba(255, 255, 255, 0.06)']
  )

  const navbarShadow = useTransform(
    scrollY,
    [0, 50],
    ['0 0 0 transparent', '0 8px 32px rgba(0, 0, 0, 0.4)']
  )

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map((item) => document.getElementById(item.id))
      const scrollPosition = window.scrollY + 100

      sections.forEach((section) => {
        if (!section) return
        const sectionTop = section.offsetTop
        const sectionHeight = section.offsetHeight

        if (
          scrollPosition >= sectionTop &&
          scrollPosition < sectionTop + sectionHeight
        ) {
          setActiveSection(section.id)
        }
      })
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsOpen(false)
  }

  return (
    <>
      {/* Scroll Progress Bar — hair-thin neon line at top */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#0ff] to-lime-400 origin-left z-[60]"
        style={{ scaleX }}
      />

      <div className="fixed top-4 md:top-6 left-0 right-0 z-50 flex justify-center pointer-events-none px-4">
        <motion.nav
          style={{
            backgroundColor: navbarBg,
            borderColor: navbarBorder,
            boxShadow: navbarShadow
          }}
          className="pointer-events-auto backdrop-blur-2xl border rounded-full px-4 md:px-6 h-14 w-full max-w-4xl flex items-center justify-between relative"
        >

          {/* Logo */}
          <div
            className="flex-1 flex justify-start items-center gap-2.5 cursor-pointer group"
            onClick={() => scrollToSection('#home')}
          >
            <Magnetic strength={15}>
              <div className="w-7 h-7 rounded-md border border-white/[0.08] flex items-center justify-center bg-white/[0.03] group-hover:border-[#0ff]/30 transition-premium">
                <span className="font-heading font-bold text-xs text-white group-hover:text-[#0ff] transition-colors">UG</span>
              </div>
            </Magnetic>
            <span className="text-sm font-heading font-semibold tracking-subhead text-white/80 group-hover:text-white transition-colors whitespace-nowrap hidden sm:block">
              Utkarsh Gupta
            </span>
          </div>

          {/* Desktop Nav Links */}
          <div className="absolute left-1/2 -translate-x-1/2 hidden lg:flex items-center space-x-7">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className={`relative text-[13px] font-medium hover:text-white group transition-premium ${activeSection === item.id ? 'text-white' : 'text-gray-500'
                  }`}
              >
                {item.name}
                <span
                  className={`absolute left-0 -bottom-1 h-[1px] bg-gradient-to-r from-[#0ff] to-lime-400 transition-all duration-300 ${activeSection === item.id ? 'w-full opacity-100' : 'w-0 opacity-0 group-hover:w-full group-hover:opacity-100'}`}
                  style={{ transitionTimingFunction: 'var(--ease-out-expo)' }}
                />
              </button>
            ))}
          </div>

          {/* Right side */}
          <div className="flex-1 flex justify-end items-center space-x-4">
            <Clock />

            <Magnetic strength={20}>
              <button
                onClick={() => scrollToSection('#contact')}
                className="hidden sm:inline-flex px-5 py-1.5 rounded-full border border-white/[0.08] bg-white/[0.03] text-[13px] font-medium text-gray-400 hover:bg-white/[0.06] hover:border-white/[0.12] hover:text-white transition-premium whitespace-nowrap"
              >
                Let's Talk
              </button>
            </Magnetic>

            {/* Mobile Menu Toggle */}
            <div className="lg:hidden flex items-center">
              <button
                className="text-gray-400 hover:text-white p-2 transition-colors"
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle menu"
              >
                {isOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </motion.nav>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-[#060608]/98 backdrop-blur-2xl pt-24 px-6 md:hidden"
          >
            <div className="flex flex-col space-y-6">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className={`text-3xl font-heading font-bold tracking-headline text-left transition-premium ${activeSection === item.id ? 'text-white' : 'text-gray-600'
                    }`}
                >
                  {item.name}
                </button>
              ))}

              <div className="h-[1px] w-full bg-white/[0.04] my-4" />

              <button
                onClick={() => scrollToSection('#contact')}
                className="w-full px-6 py-4 rounded-xl bg-white text-black text-center font-bold text-base"
              >
                Let's Talk
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}