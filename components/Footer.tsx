'use client'

import { Heart, Github, Linkedin, Twitter } from 'lucide-react'
import Magnetic from './Magnetic'
import SelfDestruct from './SelfDestruct'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="w-full bg-[#0b0b0c] border-t border-white/5 relative z-10 pt-8 pb-8 mt-4">
      <div className="max-w-7xl mx-auto px-6 flex flex-col items-center">

        {/* Hidden Self Destruct */}
        <SelfDestruct />

        <div className="flex flex-col md:flex-row items-center justify-between w-full gap-6">

          {/* Copyright */}
          <div className="text-center md:text-left">
            <p className="text-sm font-medium text-gray-500">
              © {currentYear} Utkarsh Gupta. All rights reserved.
            </p>
          </div>

          {/* Made with love */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-gray-500">Crafted with</span>
            <Heart className="w-3 h-3 text-lime-400 fill-lime-400" />
            <span className="text-xs font-medium text-gray-500">in India</span>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <Magnetic strength={20}>
              <a
                href="https://github.com/utkarsh240"
                target="_blank"
                rel="noopener noreferrer"
                className="group p-2"
              >
                <Github className="w-5 h-5 text-gray-400 group-hover:text-lime-400 transition-colors" />
              </a>
            </Magnetic>
            <Magnetic strength={20}>
              <a
                href="https://linkedin.com/in/utkarsh-gupta-53647b217/"
                target="_blank"
                rel="noopener noreferrer"
                className="group p-2"
              >
                <Linkedin className="w-5 h-5 text-gray-400 group-hover:text-lime-400 transition-colors" />
              </a>
            </Magnetic>
            <Magnetic strength={20}>
              <a
                href="https://x.com/utkarshh_24?t=DlWFEbvPtBUBHlG3bCnqkg&s=09"
                target="_blank"
                rel="noopener noreferrer"
                className="group p-2"
              >
                <Twitter className="w-5 h-5 text-gray-400 group-hover:text-lime-400 transition-colors" />
              </a>
            </Magnetic>
          </div>

        </div>
      </div>
    </footer>
  )
}