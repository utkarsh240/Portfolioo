'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Linkedin, Github, Twitter, Mail, FileText } from 'lucide-react'
import Image from 'next/image'

const Hero = () => {
  return (
    <section id="home" className="min-h-[90vh] bg-background px-4 pt-24 pb-8">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section with Profile Picture and Info */}
        <div className="flex flex-col lg:flex-row items-start gap-12 mb-16">
          {/* Left Side - Profile Picture */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-gray-700">
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
              <div className="hidden absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-4xl font-bold">
                UG
              </div>
            </div>
            {/* Online status dot */}
            <div className="absolute bottom-4 right-4 w-4 h-4 bg-green-500 rounded-full border-2 border-background"></div>
          </motion.div>

          {/* Right Side - Name, Title, and Location */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex-1"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-4">
              Utkarsh <span className="gradient-text">Gupta</span>
            </h1>
            <div className="inline-block bg-secondary text-secondary-foreground px-4 py-2 rounded-full text-lg font-medium mb-4">
              <span className="gradient-text">Full-Stack Developer</span>
            </div>
            <p className="text-foreground text-lg">Bengaluru, India</p>
          </motion.div>
        </div>

        {/* About and Status Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* About Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h2 className="text-lg md:text-xl font-bold text-foreground mb-4">About</h2>
            <p className="text-muted-foreground leading-relaxed">
              Computer Science Student & <span className="gradient-text font-semibold">Full Stack Developer</span> with knowledge of <span className="gradient-text font-semibold">Gen AI</span>. I build modern web applications and love solving real-world problems with code. Besides development, I am also skilled in <span className="gradient-text font-semibold">Data Structures & Algorithms</span> and practice daily LeetCode problems with Java.
            </p>
          </motion.div>

          {/* Status and Focus Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="space-y-8"
          >
            {/* Status */}
            <div>
              <h3 className="text-lg font-bold text-foreground mb-3">STATUS</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-muted-foreground">Available for work</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-muted-foreground">Open to freelance</span>
                </div>
              </div>
            </div>

            {/* Focus */}
            <div>
              <h3 className="text-lg font-bold text-foreground mb-3">FOCUS</h3>
              <div className="space-y-2">
                <div className="text-muted-foreground">• <span className="gradient-text">Full-Stack Development</span></div>
                <div className="text-muted-foreground">• <span className="gradient-text">DSA & Problem Solving</span></div>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-4">
              <a href="/resume.pdf" target="_blank" className="p-2 text-foreground hover:text-blue-400 transition-colors">
                <FileText size={20} />
              </a>
              <a href="https://x.com/utkarshh_24" target="_blank" className="p-2 text-foreground hover:text-blue-400 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="https://github.com/utkarsh240" target="_blank" className="p-2 text-foreground hover:text-blue-400 transition-colors">
                <Github size={20} />
              </a>
              <a href="https://linkedin.com/in/utkarsh-gupta-53647b217" target="_blank" className="p-2 text-foreground hover:text-blue-400 transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="mailto:utkarsh@example.com" className="p-2 text-foreground hover:text-blue-400 transition-colors">
                <Mail size={20} />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Hero 