'use client'

import React, { useState, useEffect } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { Menu, X, Coffee } from 'lucide-react'
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
  const { scrollY } = useScroll()

  // Make the navbar slightly transparent at top, then blur more and glow on scroll
  const navbarBg = useTransform(
    scrollY,
    [0, 50],
    ['rgba(255, 255, 255, 0.03)', 'rgba(11, 11, 12, 0.85)']
  )

  const navbarBorder = useTransform(
    scrollY,
    [0, 50],
    ['rgba(255, 255, 255, 0.05)', 'rgba(163, 230, 53, 0.3)']
  )

  const navbarShadow = useTransform(
    scrollY,
    [0, 50],
    ['0 4px 30px rgba(0, 0, 0, 0.1)', '0 10px 40px -10px rgba(163, 230, 53, 0.25)']
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
      <div className="fixed top-4 md:top-6 left-0 right-0 z-50 flex justify-center pointer-events-none px-4">
        <motion.nav
          style={{
            backgroundColor: navbarBg,
            borderColor: navbarBorder,
            boxShadow: navbarShadow
          }}
          className="pointer-events-auto backdrop-blur-2xl border rounded-full px-4 md:px-6 h-16 w-full max-w-5xl flex items-center justify-between relative transition-colors duration-300"
        >

          {/* Logo (Left, takes up equivalent space) */}
          <div
            className="flex-1 flex justify-start items-center gap-3 cursor-pointer group"
            onClick={() => scrollToSection('#home')}
          >
            <Magnetic strength={15}>
              <div className="w-8 h-8 rounded-lg border border-white/20 flex items-center justify-center bg-white/5 group-hover:border-lime-400/50 transition-colors">
                <span className="font-heading font-bold text-white group-hover:text-lime-400 transition-colors">UG</span>
              </div>
            </Magnetic>
            <span className="text-lg md:text-xl font-heading font-bold tracking-tight text-white group-hover:text-gray-300 transition-colors whitespace-nowrap hidden sm:block">
              Utkarsh Gupta
            </span>
          </div>

          {/* Desktop Nav Links (Center, perfectly centered) */}
          <div className="absolute left-1/2 -translate-x-1/2 hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className={`relative text-sm font-medium transition-colors hover:text-white group ${activeSection === item.id ? 'text-lime-400' : 'text-gray-400'
                  }`}
              >
                {item.name}
                <span className={`absolute left-0 -bottom-1 h-[2px] w-0 bg-lime-400 transition-all duration-300 group-hover:w-full ${activeSection === item.id ? 'w-full' : ''}`} />
              </button>
            ))}
          </div>

          {/* Buttons, Clock & Mobile Toggle (Right, takes up equivalent space) */}
          <div className="flex-1 flex justify-end items-center space-x-6">
            <Clock />

            <Magnetic strength={20}>
              <button
                onClick={() => scrollToSection('#contact')}
                className="hidden sm:inline-flex px-5 py-2 rounded-full border border-white/10 bg-white/5 text-sm font-medium text-white hover:bg-white/10 hover:border-white/20 transition-all active:scale-95 whitespace-nowrap"
              >
                Let's Talk
              </button>
            </Magnetic>

            {/* Mobile Menu Toggle */}
            <div className="lg:hidden flex items-center">
              <button
                className="text-white p-2"
                onClick={() => setIsOpen(!isOpen)}
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
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
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl pt-24 px-6 md:hidden"
          >
            <div className="flex flex-col space-y-6">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className={`text-3xl font-heading font-bold tracking-tight text-left ${activeSection === item.id ? 'text-lime-400' : 'text-gray-400'
                    }`}
                >
                  {item.name}
                </button>
              ))}

              <div className="h-px w-full bg-white/10 my-4" />

              <button
                onClick={() => scrollToSection('#contact')}
                className="w-full px-6 py-4 rounded-xl bg-lime-400 text-black text-center font-bold text-lg"
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