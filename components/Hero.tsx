'use client'

import React, { useState, useEffect } from 'react'

const FlipText = ({ text, className = "", delay = 0 }: { text: string, className?: string, delay?: number }) => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay)
    return () => clearTimeout(timer)
  }, [delay])

  return (
    <span className={`inline-block ${className}`}>
      {text.split('').map((char, index) => (
        <span
          key={index}
          className={`inline-block transition-all duration-700 ease-out ${
            isVisible 
              ? 'transform-none opacity-100' 
              : 'transform rotate-x-90 opacity-0'
          }`}
          style={{
            transitionDelay: isVisible ? `${index * 100}ms` : '0ms',
            transformStyle: 'preserve-3d',
            transform: isVisible ? 'rotateX(0deg)' : 'rotateX(90deg)',
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </span>
  )
}

const Hero = () => {
  return (
    <section id="home" className="relative min-h-[80vh] flex flex-col justify-center items-center bg-dark-900 text-center px-4 pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
      {/* Subtle geometric background */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-electric-500/10 rounded-full blur-2xl" />
      </div>
      <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center gap-6">
        <h1 className="text-4xl md:text-6xl font-extrabold font-heading tracking-tight text-text-primary leading-tight">
          Hi, I&apos;m{' '}
          <span className="text-primary-500">
            <FlipText text="Utkarsh" className="mr-2" delay={500} />
            <FlipText text="Gupta" delay={1200} />
          </span>
        </h1>
        <p className="text-lg md:text-2xl text-text-secondary font-body max-w-xl mx-auto">
          Computer Science Student & Full Stack Developer. I build modern web applications and love solving real-world problems with code.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <a href="#projects" className="btn-primary font-heading">View Projects</a>
          <a href="#contact" className="btn-secondary font-heading">Get In Touch</a>
        </div>
      </div>
    </section>
  )
}

export default Hero 