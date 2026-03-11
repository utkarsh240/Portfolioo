'use client'

import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { Briefcase, Users } from 'lucide-react'
import Section from './Section'
import ScrambleText from './ScrambleText'

const experiences = [
  {
    company: 'Wipro Limited',
    role: 'Software Developer Trainee',
    period: 'Dec 2025 - Present',
    description: 'Training in enterprise full-stack development with .NET (C#) and Angular, building scalable backend services and RESTful APIs following enterprise coding standards, Agile workflows, and CI/CD practices.',
    icon: Briefcase,
    color: '#6366f1',
  },
  {
    company: 'Ekaant',
    role: 'Software Developer Intern',
    period: 'May 2024 - July 2024',
    description: 'Built reusable React components in TypeScript and Tailwind CSS for a platform with 1,000+ daily active users, optimized API integration to reduce page load time, and deployed Dockerized workloads to AWS EC2 and S3.',
    icon: Briefcase,
    color: '#a855f7',
  },
  {
    company: 'WebXstreet',
    role: 'Cofounder',
    period: 'Feb 2022 - March 2023',
    description: 'Co-founded a web solutions startup, leading product development, client acquisition, and project delivery. Specialized in modern web technologies and business growth.',
    icon: Users,
    color: '#f97316',
  },
]

export default function Experience() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Neon line pouring animation
      gsap.fromTo(
        '.exp-timeline-progress',
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 50%',
            end: 'bottom 50%',
            scrub: 0.5,
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

      // Dots lighting up animation
      gsap.utils.toArray('.exp-timeline-dot').forEach((dot: any) => {
        gsap.fromTo(
          dot,
          { backgroundColor: 'rgba(255,255,255,0.05)', boxShadow: 'none', scale: 0.8 },
          {
            backgroundColor: 'rgba(0,255,255,1)',
            boxShadow: '0 0 20px rgba(0,255,255,0.6)',
            scale: 1,
            duration: 0.3,
            scrollTrigger: {
              trigger: dot,
              start: 'top 50%',
              toggleActions: 'play none none reverse'
            },
          }
        )
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <Section id="experience" className="pt-32 pb-16">
      <div className="mb-20">
        <h2 className="text-4xl md:text-6xl font-heading font-bold tracking-headline leading-headline text-white mb-5">
          <ScrambleText text="Professional" /> <span className="text-gradient-accent">Experience</span>
        </h2>
        <p className="text-gray-400 text-[15px] max-w-xl leading-relaxed">
          My journey and technical contributions across different roles.
        </p>
      </div>

      <div ref={containerRef} className="relative max-w-4xl mx-auto">
        {/* Background Static Line */}
        <div className="absolute left-4 md:left-8 top-0 bottom-0 w-[1px] bg-white/[0.04]" />
        {/* Neon Progress Line */}
        <div className="absolute left-4 md:left-8 top-0 bottom-0 w-[1px] bg-gradient-to-b from-[#0ff] to-lime-400 origin-top exp-timeline-progress shadow-[0_0_12px_rgba(0,255,255,0.5)] z-0" />

        <div className="space-y-14">
          {experiences.map((item, index) => (
            <div key={index} className="relative pl-14 md:pl-24">
              {/* Timeline Dot */}
              <div className="exp-timeline-dot absolute left-4 md:left-8 top-7 -translate-x-1/2 w-3 h-3 rounded-full border border-[#060608] z-10" />

              {/* Timeline Card */}
              <div className="exp-timeline-card group glass-card glass-card-hover p-7 md:p-9 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(0,0,0,0.4)]">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-5">
                  <div className="flex items-center gap-4">
                    <div
                      className="w-11 h-11 rounded-xl flex-shrink-0 flex items-center justify-center border border-white/[0.06] backdrop-blur-sm"
                      style={{ backgroundColor: `${item.color}15` }}
                    >
                      <item.icon className="text-gray-300" size={18} style={{ color: item.color }} />
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-white tracking-subhead leading-tight">
                        {item.company}
                      </h3>
                      <p className="text-[#0ff] text-sm font-medium mt-0.5">
                        {item.role}
                      </p>
                    </div>
                  </div>

                  <div className="inline-flex items-center px-3 py-1.5 bg-white/[0.03] border border-white/[0.06] rounded-full text-[11px] font-mono tracking-[0.06em] text-gray-500 whitespace-nowrap h-fit">
                    {item.period}
                  </div>
                </div>

                <p className="text-gray-400 text-[15px] leading-[1.7]">
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