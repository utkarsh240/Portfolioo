'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { gsap } from 'gsap'
import { useCursorEffects } from '@/hooks/useCursorEffects'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const navRefs = useRef<(HTMLButtonElement | null)[]>([])
  const underlineRef = useRef<HTMLDivElement>(null)
  const menuBtnRef = useRef<HTMLButtonElement>(null)
  const { rawX, rawY } = useCursorEffects()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Proximity underline for nav links
  useEffect(() => {
    const animateNavLinks = () => {
      navRefs.current.forEach((btn, idx) => {
        if (btn && underlineRef.current && idx === 0) {
          const rect = btn.getBoundingClientRect()
          const cx = rect.left + rect.width / 2
          const cy = rect.top + rect.height / 2
          const dx = rawX - cx
          const dy = rawY - cy
          const dist = Math.sqrt(dx * dx + dy * dy)
          const maxDist = Math.sqrt(window.innerWidth ** 2 + window.innerHeight ** 2) / 2
          const proximity = 1 - Math.min(dist / maxDist, 1)
          
          gsap.to(underlineRef.current, {
            x: btn.getBoundingClientRect().left,
            width: btn.getBoundingClientRect().width,
            opacity: proximity > 0.7 ? 1 : 0.3,
            duration: 0.4,
            ease: 'power2.out',
          })
        }
      })
    }

    const animateMenuBtn = () => {
      if (menuBtnRef.current) {
        const rect = menuBtnRef.current.getBoundingClientRect()
        const cx = rect.left + rect.width / 2
        const cy = rect.top + rect.height / 2
        const dx = rawX - cx
        const dy = rawY - cy
        const dist = Math.sqrt(dx * dx + dy * dy)
        const maxDist = Math.sqrt(window.innerWidth ** 2 + window.innerHeight ** 2) / 2
        const proximity = 1 - Math.min(dist / maxDist, 1)
        
        gsap.to(menuBtnRef.current, {
          scale: 1 + proximity * 0.08,
          color: proximity > 0.7 ? '#8BC34A' : '#F0F0F0',
          duration: 0.4,
          ease: 'power2.out',
        })
      }
    }

    const animate = () => {
      animateNavLinks()
      animateMenuBtn()
      requestAnimationFrame(animate)
    }

    const frameId = requestAnimationFrame(animate)
    
    return () => {
      cancelAnimationFrame(frameId)
    }
  }, [rawX, rawY])

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Experience', href: '#experience' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
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
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'glass py-3' : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo - GSAP Style */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-2xl font-extrabold gsap-name tracking-wider"
          >
            <span className="text-text-primary">Utkarsh</span>
            <span className="text-primary-500">.</span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8 relative">
            {navItems.map((item, idx) => (
              <motion.button
                key={item.name}
                ref={el => { navRefs.current[idx] = el }}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection(item.href)}
                className="text-text-secondary hover:text-primary-500 transition-colors duration-300 font-semibold relative z-10 tracking-wide"
              >
                {item.name}
              </motion.button>
            ))}
            {/* Dynamic Underline */}
            <div
              ref={underlineRef}
              style={{ 
                position: 'absolute', 
                bottom: 0, 
                left: 0, 
                height: 3, 
                background: '#8BC34A', 
                borderRadius: 2, 
                width: 0, 
                opacity: 0, 
                pointerEvents: 'none', 
                zIndex: 1,
                boxShadow: '0 0 10px rgba(139, 195, 74, 0.5)'
              }}
            />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <motion.button
              ref={menuBtnRef}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(!isOpen)}
              className="text-text-primary p-2 hover:text-primary-500 transition-colors duration-300"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden mt-4 pb-4"
          >
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <motion.button
                  key={item.name}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => scrollToSection(item.href)}
                  className="text-text-secondary hover:text-primary-500 transition-colors duration-300 font-semibold text-left tracking-wide"
                >
                  {item.name}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  )
}

export default Navbar 