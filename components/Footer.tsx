'use client'

import { Heart, Github, Linkedin, Twitter, ArrowUp } from 'lucide-react'
import Magnetic from './Magnetic'
import SelfDestruct from './SelfDestruct'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="w-full bg-[#060608] border-t border-white/[0.04] relative z-10 pt-16 pb-8 mt-8">
      <div className="max-w-6xl mx-auto px-6">

        {/* Hidden Self Destruct */}
        <SelfDestruct />

        {/* Top section: Logo + Back to Top */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <h3 className="text-2xl font-heading font-bold tracking-headline text-white mb-1">
              Utkarsh<span className="text-gradient-accent">.</span>
            </h3>
            <p className="text-gray-600 text-xs font-mono tracking-[0.1em]">Full Stack Developer</p>
          </div>

          <button
            onClick={scrollToTop}
            className="group flex items-center gap-2 px-4 py-2 rounded-full border border-white/[0.06] bg-white/[0.02] text-gray-500 text-xs font-mono tracking-[0.06em] hover:border-[#0ff]/30 hover:text-[#0ff] transition-premium backdrop-blur-sm"
          >
            Back to top
            <ArrowUp size={12} className="transition-transform group-hover:-translate-y-0.5" style={{ transitionTimingFunction: 'var(--ease-spring)' }} />
          </button>
        </div>

        {/* Divider */}
        <div className="h-[1px] bg-white/[0.04] mb-8" />

        {/* Bottom section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">

          {/* Copyright */}
          <p className="text-[13px] text-gray-600 font-mono">
            © {currentYear} Utkarsh Gupta
          </p>

          {/* Made with love */}
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-gray-600 tracking-[0.06em]">Crafted with</span>
            <Heart className="w-3 h-3 text-[#0ff] fill-[#0ff] opacity-60" />
            <span className="text-[11px] text-gray-600 tracking-[0.06em]">in India</span>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-3">
            <Magnetic strength={20}>
              <a
                href="https://github.com/utkarsh240"
                target="_blank"
                rel="noopener noreferrer"
                className="group p-2.5 rounded-lg border border-white/[0.04] bg-white/[0.02] hover:border-white/[0.1] hover:bg-white/[0.04] transition-premium"
                aria-label="GitHub Profile"
              >
                <Github className="w-4 h-4 text-gray-500 group-hover:text-white transition-colors" />
              </a>
            </Magnetic>
            <Magnetic strength={20}>
              <a
                href="https://linkedin.com/in/utkarsh-gupta-53647b217/"
                target="_blank"
                rel="noopener noreferrer"
                className="group p-2.5 rounded-lg border border-white/[0.04] bg-white/[0.02] hover:border-white/[0.1] hover:bg-white/[0.04] transition-premium"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="w-4 h-4 text-gray-500 group-hover:text-white transition-colors" />
              </a>
            </Magnetic>
            <Magnetic strength={20}>
              <a
                href="https://x.com/utkarshh_24?t=DlWFEbvPtBUBHlG3bCnqkg&s=09"
                target="_blank"
                rel="noopener noreferrer"
                className="group p-2.5 rounded-lg border border-white/[0.04] bg-white/[0.02] hover:border-white/[0.1] hover:bg-white/[0.04] transition-premium"
                aria-label="Twitter Profile"
              >
                <Twitter className="w-4 h-4 text-gray-500 group-hover:text-white transition-colors" />
              </a>
            </Magnetic>
          </div>

        </div>
      </div>
    </footer>
  )
}