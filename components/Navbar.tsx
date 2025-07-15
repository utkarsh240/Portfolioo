'use client'

import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
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
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 font-heading ${
        scrolled ? 'bg-dark-800/90 shadow-lg py-2' : 'bg-dark-900/80 py-4'
      } backdrop-blur-md`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 flex justify-between items-center">
        {/* Logo - GSAP Style */}
        <div className="text-2xl font-extrabold tracking-wider flex items-center select-none">
          <span className="text-text-primary font-heading">Utkarsh</span>
          <span className="text-primary-500 font-heading ml-1">.</span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-6">
          {navItems.map((item) => (
            <button
              key={item.name}
              onClick={() => scrollToSection(item.href)}
              className="text-text-secondary hover:text-primary-500 transition-colors duration-200 font-body font-semibold px-2 py-1 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
            >
              {item.name}
            </button>
          ))}
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-text-primary p-2 rounded hover:text-primary-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-dark-800/95 px-4 pt-2 pb-4 rounded-b-xl shadow-lg">
          <div className="flex flex-col space-y-2">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className="text-text-secondary hover:text-primary-500 transition-colors duration-200 font-body font-semibold text-left px-2 py-2 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar 