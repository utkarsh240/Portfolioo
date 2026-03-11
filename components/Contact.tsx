'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, Mail, MapPin, Code2 } from 'lucide-react'
import Section from './Section'
import ScrambleText from './ScrambleText'

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setIsSubmitted(false)

    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
    }, 1200)
  }

  return (
    <Section id="contact" className="pt-32 pb-8 relative overflow-hidden">
      {/* Ambient glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] pointer-events-none opacity-15"
        style={{
          background: 'radial-gradient(circle, rgba(0,255,255,0.1) 0%, transparent 70%)'
        }}
      />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="mb-20">
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-white/[0.06] bg-white/[0.03] text-xs text-lime-400 font-medium tracking-wide mb-8 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-lime-400 animate-pulse shadow-[0_0_8px_rgba(163,230,53,0.8)]" />
            Accepting New Projects
          </div>
          <h2 className="text-4xl md:text-6xl font-heading font-bold tracking-headline leading-headline text-white mb-5">
            <ScrambleText text="Let's" /> <span className="text-gradient-accent">Talk</span>
          </h2>
          <p className="text-gray-400 text-[15px] max-w-xl leading-relaxed">
            Have an idea for a startup, a complex tool, or scaling your infrastructure? Let's discuss how we can bring it to life.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-8 items-start">

          {/* Left Column: Contact Info */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <div className="glass-card glass-card-hover rounded-2xl p-8">
              <Mail className="text-[#0ff] mb-6" size={28} />
              <h3 className="text-lg font-semibold text-white mb-2 tracking-subhead">Email Me</h3>
              <p className="text-gray-500 mb-6 font-mono text-sm tracking-wide">inet.utkarsh@gmail.com</p>
              <a href="mailto:inet.utkarsh@gmail.com" className="text-[#0ff] text-xs font-bold uppercase tracking-[0.12em] hover:text-white transition-premium">
                Drop a line →
              </a>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="glass-card glass-card-hover rounded-2xl p-6 text-center">
                <MapPin className="text-gray-600 mx-auto mb-4" size={20} />
                <h3 className="text-white font-semibold text-sm mb-1">Based in</h3>
                <p className="text-gray-600 text-[11px] uppercase font-mono tracking-[0.1em]">India</p>
              </div>
              <div className="glass-card glass-card-hover rounded-2xl p-6 text-center">
                <Code2 className="text-gray-600 mx-auto mb-4" size={20} />
                <h3 className="text-white font-semibold text-sm mb-1">Working</h3>
                <p className="text-gray-600 text-[11px] uppercase font-mono tracking-[0.1em]">Remote</p>
              </div>
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="lg:col-span-3 w-full glass-card glass-card-hover rounded-2xl p-8 md:p-12">
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-[11px] font-mono tracking-[0.1em] uppercase text-gray-500 ml-0.5">Full Name</label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    required
                    suppressHydrationWarning
                    className="w-full bg-transparent border-b border-white/[0.08] px-1 py-3 text-sm text-white placeholder:text-gray-700 focus:outline-none focus:border-[#0ff]/50 transition-premium"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[11px] font-mono tracking-[0.1em] uppercase text-gray-500 ml-0.5">Email *</label>
                  <input
                    type="email"
                    placeholder="john@example.com"
                    required
                    suppressHydrationWarning
                    className="w-full bg-transparent border-b border-white/[0.08] px-1 py-3 text-sm text-white placeholder:text-gray-700 focus:outline-none focus:border-[#0ff]/50 transition-premium"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[11px] font-mono tracking-[0.1em] uppercase text-gray-500 ml-0.5">Company / Project Link (Optional)</label>
                <input
                  type="text"
                  placeholder="https://..."
                  suppressHydrationWarning
                  className="w-full bg-transparent border-b border-white/[0.08] px-1 py-3 text-sm text-white placeholder:text-gray-700 focus:outline-none focus:border-[#0ff]/50 transition-premium"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[11px] font-mono tracking-[0.1em] uppercase text-gray-500 ml-0.5">Message *</label>
                <textarea
                  placeholder="How can I help you?"
                  required
                  rows={4}
                  suppressHydrationWarning
                  className="w-full bg-transparent border-b border-white/[0.08] px-1 py-3 text-sm text-white placeholder:text-gray-700 focus:outline-none focus:border-[#0ff]/50 transition-premium resize-none"
                />
              </div>

              <div className="pt-6 flex flex-col items-center mt-2 border-t border-white/[0.04]">
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full group relative flex items-center justify-center gap-3 py-4 rounded-xl font-bold text-sm transition-all overflow-hidden ${isSubmitted
                    ? 'bg-emerald-500 hover:bg-emerald-600 text-white'
                    : 'bg-white text-black hover:bg-gray-100'
                    }`}
                  style={{ transitionTimingFunction: 'var(--ease-out-expo)' }}
                >
                  {/* Button shine effect */}
                  <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/30 to-transparent" />

                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                  ) : isSubmitted ? (
                    <>Sent Successfully ✓</>
                  ) : (
                    <>
                      Send Message
                      <Send size={16} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-0.5" style={{ transitionTimingFunction: 'var(--ease-spring)' }} />
                    </>
                  )}
                </motion.button>
              </div>
            </form>
          </div>

        </div>
      </div>
    </Section>
  )
}