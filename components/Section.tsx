'use client'

import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface SectionProps {
    id?: string
    className?: string
    children: React.ReactNode
}

export default function Section({ id, className = '', children }: SectionProps) {
    const sectionRef = useRef<HTMLElement>(null)

    useEffect(() => {
        const el = sectionRef.current
        if (!el) return

        gsap.fromTo(el,
            { opacity: 0, y: 50 },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: el,
                    start: 'top 80%',
                }
            }
        )
    }, [])

    return (
        <section
            id={id}
            ref={sectionRef}
            className={`w-full max-w-6xl mx-auto px-6 py-24 ${className}`}
        >
            {children}
        </section>
    )
}
