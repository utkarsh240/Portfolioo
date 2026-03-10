'use client'

import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { Briefcase, Users } from 'lucide-react'
import Section from './Section'
import Image from 'next/image'

const experiences = [
  {
    company: 'Wipro Limited',
    role: 'Software Developer Trainee',
    period: 'Dec 2025 - Present',
    description: 'Training in enterprise full-stack development with .NET (C#) and Angular, building scalable backend services and RESTful APIs following enterprise coding standards, Agile workflows, and CI/CD practices.',
    icon: Briefcase,
    gradient: 'from-blue-500 to-indigo-500',
  },
  {
    company: 'Ekaant',
    role: 'Software Developer Intern',
    period: 'May 2024 - July 2024',
    description: 'Built reusable React components in TypeScript and Tailwind CSS for a platform with 1,000+ daily active users, optimized API integration to reduce page load time, and deployed Dockerized workloads to AWS EC2 and S3.',
    icon: Briefcase,
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    company: 'WebXstreet',
    role: 'Cofounder',
    period: 'Feb 2022 - March 2023',
    description: 'Co-founded a web solutions startup, leading product development, client acquisition, and project delivery. Specialized in modern web technologies and business growth.',
    icon: Users,
    gradient: 'from-orange-500 to-red-500',
  },
]

export default function Experience() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Line animation
      gsap.fromTo(
        '.exp-timeline-line',
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 1.5,
          ease: 'power3.inOut',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 70%',
            end: 'bottom 80%',
            scrub: 1,
          },
        }
      )

      // Cards stagger animation
      gsap.utils.toArray('.exp-timeline-card').forEach((card: any) => {
        gsap.fromTo(
          card,
          { opacity: 0, x: 50 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: 'back.out(1.7)',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
            },
          }
        )
      })

      // Dots animation
      gsap.utils.toArray('.exp-timeline-dot').forEach((dot: any) => {
        gsap.fromTo(
          dot,
          { opacity: 0, scale: 0 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.4,
            ease: 'back.out(2)',
            scrollTrigger: {
              trigger: dot,
              start: 'top 85%',
            },
          }
        )
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <Section id="experience" className="pt-24 pb-12">
      <div className="mb-16">
        <h2 className="text-3xl md:text-5xl font-heading font-bold tracking-tight text-white mb-4">
          Professional <span className="text-lime-400">Experience</span>
        </h2>
        <p className="text-gray-400 text-lg max-w-2xl">
          My journey and technical contributions across different roles.
        </p>
      </div>

      <div ref={containerRef} className="relative max-w-4xl mx-auto">
        {/* The Vertical Line */}
        <div className="absolute left-4 md:left-8 top-0 bottom-0 w-px bg-black/10 dark:bg-white/10 origin-top exp-timeline-line" />

        <div className="space-y-12">
          {experiences.map((item, index) => (
            <div key={index} className="relative pl-12 md:pl-24">
              {/* Timeline Dot */}
              <div className={`exp-timeline-dot absolute left-4 md:left-8 top-6 -translate-x-1/2 w-4 h-4 rounded-full bg-gradient-to-br ${item.gradient} shadow-[0_0_15px_rgba(255,255,255,0.2)] border-2 border-black z-10`} />

              {/* Timeline Card */}
              <div className="exp-timeline-card group relative bg-black/5 dark:bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 md:p-8 transition-all duration-300 hover:bg-black/10 dark:bg-white/10 hover:border-white/20 hover:shadow-xl hover:-translate-y-1">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.gradient} p-0.5 flex-shrink-0`}>
                      <div className="w-full h-full bg-black/50 backdrop-blur-xl rounded-[10px] flex items-center justify-center">
                        <item.icon className="text-foreground dark:text-white" size={20} />
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-foreground dark:text-white leading-tight">
                        {item.company}
                      </h3>
                      <p className="text-blue-400 font-medium mt-1">
                        {item.role}
                      </p>
                    </div>
                  </div>

                  <div className="inline-flex items-center px-3 py-1 bg-black/5 dark:bg-white/5 border border-white/10 rounded-full text-xs font-medium text-muted-foreground whitespace-nowrap h-fit">
                    {item.period}
                  </div>
                </div>

                <p className="text-muted-foreground text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  )
}