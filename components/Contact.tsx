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
    <Section id="contact" className="pt-24 pb-8 relative overflow-hidden">
      {/* Background glow for contact section */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] pointer-events-none opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(163,230,53,0.15) 0%, transparent 70%)'
        }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs text-lime-400 font-medium tracking-wide mb-6">
            <span className="w-2 h-2 rounded-full bg-lime-400 animate-pulse" />
            Accepting New Projects
          </div>
          <h2 className="text-3xl md:text-5xl font-heading font-bold tracking-tight text-white mb-4">
            <ScrambleText text="Let's" /> <span className="text-lime-400">Talk</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl">
            Have an idea for a startup, a complex tool, or scaling your infrastructure? Let's discuss how we can bring it to life.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-8 items-start">

          {/* Left Column: Contact Info */}
          <div className="lg:col-span-2 flex flex-col gap-8">
            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 hover:border-lime-400/30 transition-colors">
              <Mail className="text-lime-400 mb-6" size={32} />
              <h3 className="text-xl font-bold text-white mb-2">Email Me</h3>
              <p className="text-gray-400 mb-6 font-mono text-sm tracking-wide">inet.utkarsh@gmail.com</p>
              <a href="mailto:inet.utkarsh@gmail.com" className="text-lime-400 text-sm font-bold uppercase tracking-widest hover:text-white transition-colors">
                Drop a line →
              </a>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/5 border border-white/10 rounded-3xl p-6 text-center hover:border-lime-400/30 transition-colors">
                <MapPin className="text-gray-500 mx-auto mb-4" size={24} />
                <h3 className="text-white font-bold mb-1">Based in</h3>
                <p className="text-gray-500 text-xs uppercase font-mono tracking-widest">India</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-3xl p-6 text-center hover:border-lime-400/30 transition-colors">
                <Code2 className="text-gray-500 mx-auto mb-4" size={24} />
                <h3 className="text-white font-bold mb-1">Working</h3>
                <p className="text-gray-500 text-xs uppercase font-mono tracking-widest">Remote</p>
              </div>
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="lg:col-span-3 w-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 hover:border-lime-400/30 transition-colors duration-300">
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-mono tracking-widest uppercase text-lime-400 ml-1">Full Name</label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    required
                    suppressHydrationWarning
                    className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-lime-400 transition-all duration-300"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-mono tracking-widest uppercase text-lime-400 ml-1">Email *</label>
                  <input
                    type="email"
                    placeholder="john@example.com"
                    required
                    suppressHydrationWarning
                    className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-lime-400 transition-all duration-300"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-mono tracking-widest uppercase text-lime-400 ml-1">Company / Project Link (Optional)</label>
                <input
                  type="text"
                  placeholder="https://..."
                  suppressHydrationWarning
                  className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-lime-400 transition-all duration-300"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-mono tracking-widest uppercase text-lime-400 ml-1">Message *</label>
                <textarea
                  placeholder="How can I help you?"
                  required
                  rows={4}
                  suppressHydrationWarning
                  className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-lime-400 transition-all duration-300 resize-none"
                />
              </div>

              <div className="pt-4 flex flex-col items-center mt-4 border-t border-white/10">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full group relative flex items-center justify-center gap-3 py-5 rounded-xl font-bold text-black transition-all overflow-hidden ${isSubmitted
                    ? 'bg-emerald-500 hover:bg-emerald-600 text-white'
                    : 'bg-lime-400 hover:bg-lime-500'
                    }`}
                >
                  {/* Button shine effect */}
                  <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/50 to-transparent" />

                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                  ) : isSubmitted ? (
                    <>Sent Successfully</>
                  ) : (
                    <>
                      Send Message
                      <Send size={20} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
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