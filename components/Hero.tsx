'use client'

import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { motion } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'
import GlitchText from './GlitchText'
import Magnetic from './Magnetic'
import LiquidImage from './LiquidImage'

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      tl.fromTo(
        '.hero-stagger',
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1.2, stagger: 0.12 },
        0.3
      )

      // Rings animation
      gsap.to('.hero-ring-1', {
        rotation: 360,
        duration: 30,
        repeat: -1,
        ease: 'linear'
      })
      gsap.to('.hero-ring-2', {
        rotation: -360,
        duration: 40,
        repeat: -1,
        ease: 'linear'
      })

      // Image reveal
      tl.fromTo(
        '.hero-image',
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 1.5, ease: 'expo.out' },
        0.6
      )

    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="home" className="relative w-full min-h-screen flex items-center pt-32 pb-20 overflow-hidden" ref={containerRef}>

      {/* Ambient gradient mesh background — Stripe-inspired */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-[#0ff]/[0.04] blur-[120px] animate-glow-pulse" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-lime-400/[0.03] blur-[100px] animate-glow-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-[30%] left-[40%] w-[300px] h-[300px] rounded-full bg-purple-500/[0.02] blur-[80px] animate-glow-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="max-w-6xl mx-auto px-6 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-12 items-center">

          {/* Left — Text Content */}
          <div className="flex flex-col items-start">

            {/* Status badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="hero-stagger inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-white/[0.06] bg-white/[0.03] text-xs text-lime-400 font-medium tracking-wide mb-8 backdrop-blur-sm"
            >
              <span className="w-2 h-2 rounded-full bg-lime-400 animate-pulse shadow-[0_0_8px_rgba(163,230,53,0.8)]" />
              Available for work
            </motion.div>

            {/* Main headline — massive, with gradient */}
            <h1 className="hero-stagger text-6xl md:text-7xl lg:text-[5.5rem] font-heading font-bold tracking-headline leading-headline text-white mb-3">
              Utkarsh
            </h1>
            <h1 className="hero-stagger text-6xl md:text-7xl lg:text-[5.5rem] font-heading font-bold tracking-headline leading-headline mb-8">
              <span className="text-gradient-accent">Gupta</span>
            </h1>

            {/* Subtitle */}
            <div className="hero-stagger flex items-start gap-5 mb-10 max-w-lg">
              <div className="w-12 h-[2px] bg-gradient-to-r from-lime-400 to-[#0ff] shrink-0 mt-3" />
              <div>
                <p className="text-gray-300 text-lg md:text-xl font-medium tracking-subhead leading-snug">
                  <GlitchText
                    text="Full Stack Developer crafting modern web applications and AI-powered tools."
                    speed={30}
                    delay={2500}
                  />
                </p>
                <p className="text-gray-500 text-[15px] leading-relaxed mt-3">
                  I specialize in creating beautiful, performant, and memorable digital experiences.
                </p>
              </div>
            </div>

            {/* Tech stack — elegant inline */}
            <div className="hero-stagger flex items-center gap-3 mb-10 text-[13px] text-gray-500 font-mono tracking-wide">
              <Sparkles size={14} className="text-[#0ff]/60" />
              <span>Next.js</span>
              <span className="text-white/10">·</span>
              <span>React</span>
              <span className="text-white/10">·</span>
              <span>TypeScript</span>
              <span className="text-white/10">·</span>
              <span>AI</span>
            </div>

            {/* CTA buttons */}
            <div className="hero-stagger flex flex-wrap gap-4">
              <Magnetic strength={30}>
                <a
                  href="#projects"
                  className="group relative inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-white text-black rounded-xl font-bold text-sm transition-all hover:scale-[1.02] active:scale-[0.98] shadow-[0_0_0_1px_rgba(255,255,255,0.1),0_8px_30px_rgba(0,0,0,0.4)]"
                  style={{ transitionTimingFunction: 'var(--ease-out-expo)' }}
                >
                  View Projects
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" style={{ transitionTimingFunction: 'var(--ease-spring)' }} />
                </a>
              </Magnetic>

              <Magnetic strength={30}>
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center justify-center px-8 py-4 bg-transparent text-gray-300 border border-white/[0.08] rounded-xl font-medium text-sm transition-all hover:bg-white/[0.04] hover:border-white/[0.15] hover:text-white active:scale-[0.98]"
                  style={{ transitionTimingFunction: 'var(--ease-out-expo)' }}
                >
                  Download Resume
                </a>
              </Magnetic>
            </div>
          </div>

          {/* Right — Portrait with rings */}
          <div className="relative flex justify-center items-center lg:justify-end mt-10 lg:mt-0 min-h-[480px]">
            {/* Soft radial glow */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'radial-gradient(circle at center, rgba(0,255,255,0.06), transparent 65%)'
              }}
            />

            {/* Animated rings */}
            <div className="hero-ring-1 absolute w-[280px] h-[280px] md:w-[550px] md:h-[550px] rounded-full border border-white/[0.04] border-t-[#0ff]/20" />
            <div className="hero-ring-2 absolute w-[240px] h-[240px] md:w-[460px] md:h-[460px] rounded-full border border-white/[0.04] border-b-lime-400/20" />
            <div className="absolute w-[200px] h-[200px] md:w-[370px] md:h-[370px] rounded-full border border-white/[0.03]" />

            <div className="relative w-60 h-60 md:w-[360px] md:h-[360px] flex items-center justify-center">
              <div className="hero-image relative w-[80%] h-[80%] rounded-full overflow-hidden border border-white/[0.06] z-10 bg-[#060608] shadow-[0_0_60px_rgba(0,255,255,0.08)]">
                <div className="absolute inset-0 bg-gradient-to-t from-[#0ff]/10 to-transparent z-10 mix-blend-overlay" />
                <div className="absolute bottom-3 left-0 right-0 z-20 text-center opacity-20">
                  <span className="font-heading font-bold text-5xl md:text-6xl tracking-tighter text-transparent" style={{ WebkitTextStroke: '1px rgba(0,255,255,0.3)' }}>
                    UG
                  </span>
                </div>
                {/* Micro grid inside photo frame */}
                <div className="absolute inset-0 bg-[#060608] flex items-center justify-center -z-10">
                  <div className="w-full h-full opacity-20" style={{ backgroundImage: 'linear-gradient(rgba(0,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,255,0.08) 1px, transparent 1px)', backgroundSize: '12px 12px' }} />
                </div>
                <LiquidImage
                  src="/dp.webp"
                  alt="Utkarsh Gupta"
                  className="w-full h-full mix-blend-luminosity hover:mix-blend-normal transition-all duration-700"
                />
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-60 z-20">
        <span className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-mono">Scroll</span>
        <div className="w-5 h-9 rounded-full border border-white/[0.1] flex justify-center p-1.5 bg-white/[0.02] backdrop-blur-sm">
          <div className="w-1 h-2.5 bg-lime-400 rounded-full animate-bounce shadow-[0_0_8px_rgba(163,230,53,0.6)]" />
        </div>
      </div>
    </section>
  )
}