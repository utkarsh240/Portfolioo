'use client'

import React, { useEffect, useRef, useState } from 'react'

export default function MatrixRain() {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [isActive, setIsActive] = useState(false)

    // Secret code: "utkarsh"
    const secretCode = ['u', 't', 'k', 'a', 'r', 's', 'h']
    const inputBuffer = useRef<string[]>([])

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // Don't trigger if typing in an input
            if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return

            const key = e.key.toLowerCase()
            inputBuffer.current.push(key)

            // Keep buffer same length as secret code
            if (inputBuffer.current.length > secretCode.length) {
                inputBuffer.current.shift()
            }

            // Check for match
            if (inputBuffer.current.join('') === secretCode.join('')) {
                setIsActive(true)
                inputBuffer.current = [] // reset

                // Turn off after 10 seconds
                setTimeout(() => setIsActive(false), 10000)
            }
        }

        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [])

    useEffect(() => {
        if (!isActive) return
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')
        if (!ctx) return

        // Set canvas to full screen
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight

        // Katakana + Latin + Numerals
        const charset = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレゲゼデベペオォコソトノホモヨョロゴゾドボポヴッン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'

        // Config
        const fontSize = 16
        const columns = canvas.width / fontSize

        // Array of drops - one per column
        // Value represents the y coordinate (in rows)
        const drops: number[] = []
        for (let i = 0; i < columns; i++) {
            // Start them offscreen at random heights
            drops[i] = Math.random() * -100
        }

        let animationId: number

        const draw = () => {
            // Semi-transparent black to create trailing effect
            ctx.fillStyle = 'rgba(11, 11, 12, 0.1)'
            ctx.fillRect(0, 0, canvas.width, canvas.height)

            ctx.fillStyle = '#A3E635' // neon lime
            ctx.font = `${fontSize}px monospace`

            for (let i = 0; i < drops.length; i++) {
                // Pick random character
                const char = charset[Math.floor(Math.random() * charset.length)]

                const x = i * fontSize
                const y = drops[i] * fontSize

                // Draw character
                ctx.fillText(char, x, y)

                // Randomly reset drop to top if it's offscreen
                // The Math.random() > 0.975 gives it a scattered, organic feel
                if (y > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0
                }

                // Move drop down
                drops[i]++
            }

            animationId = requestAnimationFrame(draw)
        }

        animationId = requestAnimationFrame(draw)

        const handleResize = () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
        }
        window.addEventListener('resize', handleResize)

        return () => {
            cancelAnimationFrame(animationId)
            window.removeEventListener('resize', handleResize)
        }
    }, [isActive])

    if (!isActive) return null

    return (
        <div className="fixed inset-0 z-40 pointer-events-none animate-in fade-in duration-500 fade-out mix-blend-screen">
            <canvas ref={canvasRef} className="block w-full h-full opacity-30" />
        </div>
    )
}
