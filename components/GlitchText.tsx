'use client'

import React, { useEffect, useState } from 'react'

interface GlitchTextProps {
    text: string
    speed?: number
    delay?: number
    className?: string
}

const CHARACTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+{}|:<>?~'

export default function GlitchText({ text, speed = 50, delay = 0, className = '' }: GlitchTextProps) {
    const [displayText, setDisplayText] = useState('')
    const [isDecoding, setIsDecoding] = useState(false)

    useEffect(() => {
        let timeout: NodeJS.Timeout
        let interval: NodeJS.Timeout

        const startDecoding = () => {
            setIsDecoding(true)
            let iteration = 0

            interval = setInterval(() => {
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
                    setIsDecoding(false)
                }

                iteration += 1 / 2 // Decode speed (lower is slower)
            }, speed)
        }

        // Initial delay before starting the effect
        timeout = setTimeout(startDecoding, delay)

        return () => {
            clearTimeout(timeout)
            clearInterval(interval)
        }
    }, [text, speed, delay])

    // Optional: Retrigger on hover
    const handleMouseEnter = () => {
        if (!isDecoding) {
            setIsDecoding(true)
            let iteration = 0

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
                    setIsDecoding(false)
                }

                iteration += 1 / 1
            }, speed / 2) // Faster on hover
        }
    }

    return (
        <span
            className={`font-mono transition-colors ${isDecoding ? 'text-lime-400' : ''} ${className}`}
            onMouseEnter={handleMouseEnter}
        >
            {displayText || text.replace(/./g, '█')}
        </span>
    )
}
