'use client'

import { useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { ThemeToggle } from './theme-toggle'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { scrollY } = useScroll()
  
  // Transform scrollY to navbar height, padding, and border radius
  const navbarHeight = useTransform(scrollY, [0, 100], [80, 60])
  const navbarPadding = useTransform(scrollY, [0, 100], [16, 8])
  const logoScale = useTransform(scrollY, [0, 100], [1, 0.8])
  const borderRadius = useTransform(scrollY, [0, 100], [0, 12])

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'Education', href: '#education' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Contact', href: '#contact' },
  ]

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsOpen(false)
  }

  return (
    <motion.nav
      style={{
        height: navbarHeight,
        paddingTop: navbarPadding,
        paddingBottom: navbarPadding,
        borderRadius: borderRadius,
      }}
      className="fixed top-4 left-4 right-4 z-50 bg-background/90 backdrop-blur-md shadow-lg"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-8 flex justify-between items-center h-full">
        {/* Left Side - Empty for now */}
        <div className="flex-1"></div>

        {/* Center - Navigation Links */}
        <motion.div 
          className="hidden md:flex space-x-6"
          style={{ scale: logoScale }}
        >
          {navItems.map((item) => (
            <button
              key={item.name}
              onClick={() => scrollToSection(item.href)}
              className="transition-all duration-200 text-sm font-medium px-2 py-1 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 text-foreground hover:text-transparent hover:bg-gradient-to-r hover:from-blue-400 hover:to-purple-400 hover:bg-clip-text"
            >
              {item.name}
            </button>
          ))}
        </motion.div>

        {/* Right Side - Theme Toggle and Mobile menu button */}
        <div className="flex items-center space-x-4">
          <ThemeToggle />
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-foreground p-2 rounded hover:text-muted-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="md:hidden bg-background/95 px-4 pt-2 pb-4 rounded-b-xl shadow-lg mt-2"
        >
          <div className="flex flex-col space-y-2">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className="transition-all duration-200 text-sm font-medium text-left px-2 py-2 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 text-foreground hover:text-transparent hover:bg-gradient-to-r hover:from-blue-400 hover:to-purple-400 hover:bg-clip-text"
              >
                {item.name}
              </button>
            ))}
          </div>
        </motion.div>
      )}
    </motion.nav>
  )
}

export default Navbar 