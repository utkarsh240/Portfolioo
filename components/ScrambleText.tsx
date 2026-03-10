'use client'

import React, { useEffect, useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'

interface ScrambleTextProps {
    text: string
    className?: string
}

const CHARACTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+{}|:<>?~'

export default function ScrambleText({ text, className = '' }: ScrambleTextProps) {
    const [displayText, setDisplayText] = useState(text.replace(/./g, '█'))
    const ref = useRef<HTMLSpanElement>(null)
    const isInView = useInView(ref, { once: true, margin: "-10%" })

    useEffect(() => {
        if (!isInView) return

        let iteration = 0
        const speed = 30 // ms per frame

        const interval = setInterval(() => {
            setDisplayText((prev) => {
                return text
                    .split('')
                    .map((char, index) => {
                        if (index < iteration) {
                            return text[index]
                        }
                        if (char === ' ') return ' '
                        return CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)]
                    })
                    .join('')
            })

            if (iteration >= text.length) {
                clearInterval(interval)
            }

            iteration += 1 / 3 // Slower decode for headings to be readable
        }, speed)

        return () => clearInterval(interval)
    }, [isInView, text])

    return (
        <span ref={ref} className={className}>
            {displayText}
        </span>
    )
}
