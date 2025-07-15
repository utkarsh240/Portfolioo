'use client'

import React from 'react'
import { useEffect, useRef } from 'react'
import { useOptimizedGSAP } from '@/hooks/useOptimizedGSAP'
import { useGSAPProximity } from '@/hooks/useGSAPProximity'

const About = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const achievementsRef = useRef<HTMLDivElement>(null)
  const { createFadeInUp, createStaggerAnimation } = useOptimizedGSAP()

  useEffect(() => {
    if (sectionRef.current) {
      createFadeInUp(sectionRef.current)
    }

    if (achievementsRef.current) {
      createStaggerAnimation(
        Array.from(achievementsRef.current.querySelectorAll('[data-stagger]')),
        {
          opacity: 1,
          y: 0,
          scale: 1
        },
        { stagger: 0.2 }
      )
    }
  }, [createFadeInUp, createStaggerAnimation])

  // Section focus and parallax
  useGSAPProximity(sectionRef, (proximity: number) => ({
    scale: 1 + proximity * 0.01,
    skewX: proximity * 2,
    skewY: proximity * 2,
  }))
  useGSAPProximity(contentRef, (proximity: number) => ({
    x: -proximity * 20,
    y: -proximity * 20,
  }))

  return (
    <section id="about" className="py-20 px-4 bg-dark-800 flex justify-center">
      <div className="max-w-2xl w-full bg-dark-900 rounded-2xl shadow-lg border-l-8 border-primary-500 p-8 flex flex-col gap-4">
        <h2 className="text-3xl md:text-4xl font-bold font-heading text-text-primary mb-2">About Me</h2>
        <p className="text-lg text-text-secondary font-body">
          I&apos;m a Computer Science Student & Full Stack Developer with knowledge of Gen AI. I build modern web applications and love solving real-world problems with code. My focus is on creating efficient, scalable solutions using cutting-edge technologies. I enjoy collaborating, learning new technologies, and pushing the boundaries of what&apos;s possible on the web.
        </p>
      </div>
    </section>
  )
}

export default About 