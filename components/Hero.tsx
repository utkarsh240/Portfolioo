'use client'

import React, { useEffect, useRef } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'
import { motion } from 'framer-motion'
import { ArrowRight, Code2, Terminal } from 'lucide-react'

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Timeline for coordinated animation
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      // Text stagger animation
      tl.fromTo(
        '.hero-stagger',
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1.2, stagger: 0.15 },
        0.2
      )

      // Rings animation
      gsap.to('.hero-ring-1', {
        rotation: 360,
        duration: 25,
        repeat: -1,
        ease: 'linear'
      })
      gsap.to('.hero-ring-2', {
        rotation: -360,
        duration: 35,
        repeat: -1,
        ease: 'linear'
      })

      // Image fade
      tl.fromTo(
        '.hero-image',
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 1.5 },
        0.5
      )

    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="home" className="relative w-full min-h-screen flex items-center pt-24 pb-16 overflow-hidden" ref={containerRef}>
      <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 items-center">

          {/* Left Text Content */}
          <div className="flex flex-col items-start lg:pr-12">

            <div className="hero-stagger inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs text-lime-400 font-medium tracking-wide mb-6">
              <span className="w-2 h-2 rounded-full bg-lime-400 animate-pulse" />
              Available for work
            </div>

            <h1 className="hero-stagger text-5xl md:text-7xl lg:text-[5.5rem] font-heading font-bold tracking-tight text-white leading-[1.1] mb-6 drop-shadow-[0_0_40px_rgba(255,255,255,0.2)]">
              Utkarsh<br />
              <span className="text-lime-400 drop-shadow-[0_0_30px_rgba(163,230,53,0.6)]">Gupta</span>
            </h1>

            <div className="hero-stagger flex items-center gap-4 mb-10 max-w-xl">
              <div className="w-10 h-[2px] bg-lime-400 shrink-0" />
              <p className="text-gray-300 text-lg md:text-xl font-medium tracking-wide">
                Full Stack Developer building modern web applications and AI-powered tools.
                I specialize in creating beautiful, highly animated, and fast experiences.
              </p>
            </div>

            {/* Tech Badges */}
            <div className="hero-stagger flex flex-wrap gap-4 mb-10">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 text-sm text-gray-300">
                <Terminal size={14} className="text-lime-400" /> Next.js
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 text-sm text-gray-300">
                <Code2 size={14} className="text-lime-400" /> React
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 text-sm text-gray-300">
                <div className="w-2 h-2 rounded-full bg-blue-400" /> TypeScript
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 text-sm text-gray-300">
                <div className="w-2 h-2 rounded-full bg-green-500" /> MongoDB
              </div>
            </div>

            <div className="hero-stagger flex flex-wrap gap-5">
              <a
                href="#projects"
                className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 bg-lime-400 text-black rounded-lg font-bold transition-transform hover:scale-105 active:scale-95"
              >
                View Projects
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </a>

              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center px-8 py-4 bg-transparent text-white border border-white/20 rounded-lg font-medium transition-all hover:bg-white/5 hover:border-white/40 active:scale-95"
              >
                Download Resume
              </a>
            </div>
          </div>

          {/* Right Image Content */}
          <div className="relative flex justify-center items-center lg:justify-end mt-10 lg:mt-0 min-h-[500px]">
            {/* Glowing Radial Gradient Background */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'radial-gradient(circle at center, rgba(163,230,53,0.15), transparent 60%)'
              }}
            />

            {/* Subtle Animated Rings */}
            <div className="hero-ring-1 absolute w-[400px] h-[400px] md:w-[600px] md:h-[600px] rounded-full border border-white/5 border-t-lime-400/20" />
            <div className="hero-ring-2 absolute w-[350px] h-[350px] md:w-[500px] md:h-[500px] rounded-full border border-white/5 border-b-lime-400/20" />
            <div className="absolute w-[300px] h-[300px] md:w-[400px] md:h-[400px] rounded-full border border-white/5" />

            <div className="relative w-72 h-72 md:w-[400px] md:h-[400px] flex items-center justify-center">
              <div className="hero-image relative w-[80%] h-[80%] rounded-full overflow-hidden border border-white/10 z-10 bg-black shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
                <div className="absolute bottom-4 left-0 right-0 z-20 text-center opacity-30">
                  <span className="font-heading font-bold text-6xl tracking-tighter text-transparent" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.2)' }}>
                    UTKARSH
                  </span>
                </div>
                {/* Fallback pattern if image is missing */}
                <div className="absolute inset-0 bg-[#0b0b0c] flex items-center justify-center -z-10">
                  <div className="w-full h-full opacity-20" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
                </div>
                <Image
                  src="/dp.webp"
                  alt="Utkarsh Gupta"
                  fill
                  className="object-cover relative z-0 mix-blend-luminosity hover:mix-blend-normal transition-all duration-700"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Floating Crazy Neon Geometry */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Giant Top Left Glow */}
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-lime-400/20 blur-[150px] rounded-full mix-blend-screen animate-pulse" style={{ animationDuration: '4s' }} />

        {/* Floating Orb 1 */}
        <motion.div
          animate={{ y: [0, -30, 0], x: [0, 20, 0], rotate: [0, 180, 360] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
          className="absolute top-[30%] left-[10%] w-32 h-32 rounded-full border border-lime-400/30 shadow-[0_0_50px_rgba(163,230,53,0.3)] bg-gradient-to-tr from-lime-400/10 to-transparent backdrop-blur-3xl"
        />

        {/* Floating Orb 2 */}
        <motion.div
          animate={{ y: [0, 40, 0], x: [0, -30, 0], rotate: [360, 180, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="absolute bottom-[20%] right-[15%] w-48 h-48 border border-white/10 rounded-full shadow-[0_0_80px_rgba(255,255,255,0.05)] bg-gradient-to-br from-white/5 to-transparent backdrop-blur-xl"
        />
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-80 z-20">
        <span className="text-[10px] uppercase tracking-widest text-lime-400 font-bold drop-shadow-[0_0_10px_rgba(163,230,53,0.8)]">Scroll</span>
        <div className="w-5 h-8 rounded-full border border-lime-400/50 flex justify-center p-1 shadow-[0_0_15px_rgba(163,230,53,0.3)] bg-black/50 backdrop-blur-md">
          <div className="w-1 h-3 bg-lime-400 rounded-full animate-bounce shadow-[0_0_10px_rgba(163,230,53,1)]" />
        </div>
      </div>
    </section>
  )
}