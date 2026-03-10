'use client'

import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { GraduationCap } from 'lucide-react'
import Section from './Section'
import Image from 'next/image'

const education = [
  {
    institution: 'KIIT University',
    degree: 'B.Tech Computer Science and Engineering',
    period: '2021 - 2025',
    description: 'Pursuing Bachelor of Technology in Computer Science and Engineering with focus on software development, algorithms, and emerging technologies.',
    icon: GraduationCap,
    logoUrl: '/kiit-logo.jpg',
    gradient: 'from-emerald-500 to-teal-500',
  },
]

export default function Education() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Line animation
      gsap.fromTo(
        '.edu-timeline-line',
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
      gsap.utils.toArray('.edu-timeline-card').forEach((card: any) => {
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
      gsap.utils.toArray('.edu-timeline-dot').forEach((dot: any) => {
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
    <Section id="education" className="pt-12 pb-24">
      <div className="mb-16">
        <h2 className="text-3xl md:text-5xl font-heading font-bold tracking-tight text-white mb-4">
          Educational <span className="text-lime-400">Background</span>
        </h2>
        <p className="text-gray-400 text-lg max-w-2xl">
          My academic foundation and qualifications.
        </p>
      </div>

      <div ref={containerRef} className="relative max-w-4xl mx-auto">
        {/* The Vertical Line */}
        <div className="absolute left-4 md:left-8 top-0 bottom-0 w-px bg-black/10 dark:bg-white/10 origin-top edu-timeline-line" />

        <div className="space-y-12">
          {education.map((item, index) => (
            <div key={index} className="relative pl-12 md:pl-24">
              {/* Timeline Dot */}
              <div className={`edu-timeline-dot absolute left-4 md:left-8 top-6 -translate-x-1/2 w-4 h-4 rounded-full bg-gradient-to-br ${item.gradient} shadow-[0_0_15px_rgba(255,255,255,0.2)] border-2 border-black z-10`} />

              {/* Timeline Card */}
              <div className="edu-timeline-card group relative bg-black/5 dark:bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 md:p-8 transition-all duration-300 hover:bg-black/10 dark:bg-white/10 hover:border-white/20 hover:shadow-xl hover:-translate-y-1">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.gradient} p-0.5 flex-shrink-0`}>
                      <div className="w-full h-full bg-black/50 backdrop-blur-xl rounded-[10px] flex items-center justify-center">
                        {item.logoUrl ? (
                          <div className="relative w-8 h-8 filter grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300">
                            <Image
                              src={item.logoUrl}
                              alt={item.institution}
                              fill
                              className="object-contain rounded-sm"
                            />
                          </div>
                        ) : (
                          <item.icon className="text-foreground dark:text-white" size={20} />
                        )}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-foreground dark:text-white leading-tight">
                        {item.institution}
                      </h3>
                      <p className="text-emerald-400 font-medium mt-1">
                        {item.degree}
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