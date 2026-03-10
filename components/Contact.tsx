'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, FileText } from 'lucide-react'
import Section from './Section'

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
    <Section id="contact" className="py-24">
      <div className="max-w-3xl mx-auto flex flex-col items-center">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-6xl font-heading font-bold tracking-tight text-white mb-6">
            Let's build something <span className="text-lime-400">together.</span>
          </h2>
          <p className="text-gray-400 text-lg">
            Have an idea, collaboration, or just want to chat? Drop me a message below.
          </p>
        </div>

        <div className="w-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 hover:border-lime-400/50 transition-colors duration-300">
          <form onSubmit={handleSubmit} className="flex flex-col gap-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex flex-col gap-3">
                <label className="text-xs font-mono tracking-widest uppercase text-lime-400 ml-1">Full Name</label>
                <input
                  type="text"
                  placeholder="John Doe"
                  required
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-lime-400 transition-all duration-300"
                />
              </div>
              <div className="flex flex-col gap-3">
                <label className="text-xs font-mono tracking-widest uppercase text-lime-400 ml-1">Email *</label>
                <input
                  type="email"
                  placeholder="john@example.com"
                  required
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-lime-400 transition-all duration-300"
                />
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <label className="text-xs font-mono tracking-widest uppercase text-lime-400 ml-1">Phone (Optional)</label>
              <input
                type="tel"
                placeholder="+1 234 567 890"
                className="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-lime-400 transition-all duration-300"
              />
            </div>

            <div className="flex flex-col gap-3">
              <label className="text-xs font-mono tracking-widest uppercase text-lime-400 ml-1">Message *</label>
              <textarea
                placeholder="How can I help you?"
                required
                rows={5}
                className="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-lime-400 transition-all duration-300 resize-none"
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
    </Section>
  )
}