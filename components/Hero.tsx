'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Linkedin, Github, Twitter, Mail, FileText } from 'lucide-react'
import Image from 'next/image'

const Hero = () => {
  return (
    <section id="home" className="min-h-[90vh] bg-background px-4 sm:px-6 pt-20 sm:pt-24 pb-8">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section with Profile Picture and Info */}
        <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-12 mb-12 lg:mb-16">
          {/* Left Side - Profile Picture and Name */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex-shrink-0 flex flex-col items-start"
          >
            <div className="relative w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 rounded-full overflow-hidden border-4 border-gray-700 mb-4">
              <Image
                src="/profile-placeholder.jpg"
                alt="Utkarsh Gupta"
                width={192}
                height={192}
                className="object-cover"
                onError={(e) => {
                  // Fallback to a colored div if image fails to load
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.nextElementSibling?.classList.remove('hidden');
                }}
              />
              <div className="hidden absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-2xl sm:text-3xl lg:text-4xl font-bold">
                UG
              </div>
              {/* Online status dot - positioned on the profile picture */}
              <div className="absolute bottom-2 sm:bottom-4 right-2 sm:right-4 w-3 h-3 sm:w-4 sm:h-4 bg-green-500 rounded-full border-2 border-background"></div>
            </div>
            
            {/* Name and Title */}
            <div className="text-left">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-2 sm:mb-3">
                Utkarsh <span className="gradient-text">Gupta</span>
              </h1>
              <div className="inline-block bg-secondary text-secondary-foreground px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm font-medium mb-2 sm:mb-3">
                <span className="gradient-text">Full-Stack Developer</span>
              </div>
              <p className="text-foreground text-sm sm:text-base">Bengaluru, India</p>
            </div>
          </motion.div>

          {/* Right Side - About and Status */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex-1"
          >
            {/* About Section */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mb-6 sm:mb-8"
            >
              <h2 className="text-base sm:text-lg md:text-xl font-bold text-foreground mb-2 sm:mb-3">About</h2>
              <p className="text-muted-foreground leading-relaxed text-xs sm:text-sm">
                Computer Science Student & <span className="gradient-text font-semibold">Full Stack Developer</span> with knowledge of <span className="gradient-text font-semibold">Gen AI</span>. I build modern web applications and love solving real-world problems with code. Besides development, I am also skilled in <span className="gradient-text font-semibold">Data Structures & Algorithms</span> and practice daily LeetCode problems with Java.
              </p>
            </motion.div>

            {/* Status and Focus Section */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="space-y-4 sm:space-y-6"
            >
              {/* Status */}
              <div>
                <h3 className="text-sm sm:text-base font-bold text-foreground mb-2">STATUS</h3>
                <div className="space-y-1 sm:space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-green-500 rounded-full"></div>
                    <span className="text-muted-foreground text-xs sm:text-sm">Available for work</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-blue-500 rounded-full"></div>
                    <span className="text-muted-foreground text-xs sm:text-sm">Open to freelance</span>
                  </div>
                </div>
              </div>

              {/* Focus */}
              <div>
                <h3 className="text-sm sm:text-base font-bold text-foreground mb-2">FOCUS</h3>
                <div className="space-y-1 sm:space-y-2">
                  <div className="text-muted-foreground text-xs sm:text-sm">• <span className="gradient-text">Full-Stack Development</span></div>
                  <div className="text-muted-foreground text-xs sm:text-sm">• <span className="gradient-text">DSA & Problem Solving</span></div>
                </div>
              </div>

              {/* Social Icons */}
              <div className="flex items-center gap-2 sm:gap-3">
                <a href="/resume.pdf" target="_blank" className="p-1.5 sm:p-2 text-foreground hover:text-blue-400 transition-colors">
                  <FileText size={16} className="sm:w-4 sm:h-4" />
                </a>
                <a href="https://x.com/utkarshh_24" target="_blank" className="p-1.5 sm:p-2 text-foreground hover:text-blue-400 transition-colors">
                  <Twitter size={16} className="sm:w-4 sm:h-4" />
                </a>
                <a href="https://github.com/utkarsh240" target="_blank" className="p-1.5 sm:p-2 text-foreground hover:text-blue-400 transition-colors">
                  <Github size={16} className="sm:w-4 sm:h-4" />
                </a>
                <a href="https://linkedin.com/in/utkarsh-gupta-53647b217" target="_blank" className="p-1.5 sm:p-2 text-foreground hover:text-blue-400 transition-colors">
                  <Linkedin size={16} className="sm:w-4 sm:h-4" />
                </a>
                <a href="mailto:utkarsh@example.com" className="p-1.5 sm:p-2 text-foreground hover:text-blue-400 transition-colors">
                  <Mail size={16} className="sm:w-4 sm:h-4" />
                </a>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Hero 