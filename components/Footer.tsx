'use client'

import { motion } from 'framer-motion'
import { Heart, Github, Linkedin, Twitter } from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-muted/30 border-t border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="flex flex-col items-center space-y-4 sm:space-y-6">
          {/* Made with love */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex items-center space-x-2 text-muted-foreground"
          >
            <span className="text-xs sm:text-sm">Made with</span>
            <Heart className="w-3 h-3 sm:w-4 sm:h-4 text-red-500 fill-current" />
            <span className="text-xs sm:text-sm">by Utkarsh Kumar Gupta</span>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex items-center space-x-3 sm:space-x-4"
          >
            <a 
              href="https://github.com/utkarsh240" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-1.5 sm:p-2 rounded-full bg-muted hover:bg-green-500/20 transition-all duration-300 group"
            >
              <Github className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground group-hover:text-green-500 transition-colors duration-300" />
            </a>
            <a 
              href="https://linkedin.com/in/utkarsh-gupta-53647b217/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-1.5 sm:p-2 rounded-full bg-muted hover:bg-blue-500/20 transition-all duration-300 group"
            >
              <Linkedin className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground group-hover:text-blue-500 transition-colors duration-300" />
            </a>
            <a 
              href="https://x.com/utkarshh_24?t=DlWFEbvPtBUBHlG3bCnqkg&s=09" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-1.5 sm:p-2 rounded-full bg-muted hover:bg-purple-500/20 transition-all duration-300 group"
            >
              <Twitter className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground group-hover:text-purple-500 transition-colors duration-300" />
            </a>
          </motion.div>

          {/* Copyright */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-center"
          >
            <p className="text-xs sm:text-sm text-muted-foreground">
              © {currentYear} Utkarsh Kumar Gupta. All rights reserved.
            </p>
            <p className="text-xs text-muted-foreground mt-1 sm:mt-2">
              Built with Next.js, TypeScript, and Tailwind CSS
            </p>
          </motion.div>
        </div>
      </div>
    </footer>
  )
}

export default Footer 