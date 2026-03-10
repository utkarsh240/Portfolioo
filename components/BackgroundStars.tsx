'use client'

import React, { useEffect, useRef } from 'react'

export default function BackgroundStars() {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d')
        if (!ctx) return

        let animationFrameId: number
        const stars: { x: number; y: number; size: number; speed: number; opacity: number }[] = []

        // Create initial stars
        const numStars = 100

        const initStars = () => {
            stars.length = 0 // clear array
            for (let i = 0; i < numStars; i++) {
                stars.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    size: Math.random() * 1.5 + 0.5, // 0.5 to 2.0 size
                    speed: Math.random() * 0.3 + 0.1, // 0.1 to 0.4 speed moving UP
                    opacity: Math.random() * 0.5 + 0.1, // 0.1 to 0.6 opacity (subtle)
                })
            }
        }

        const resizeCanvas = () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
            initStars()
        }

        // Set initial size
        resizeCanvas()
        window.addEventListener('resize', resizeCanvas)

        const animate = () => {
            // Clear canvas with transparent rect instead of clearRect to allow grid background to show
            ctx.clearRect(0, 0, canvas.width, canvas.height)

            stars.forEach((star) => {
                // Move star up
                star.y -= star.speed

                // Reset if it goes off top of screen
                if (star.y < 0) {
                    star.y = canvas.height
                    star.x = Math.random() * canvas.width
                }

                // Draw star (using neon green/white mixture)
                ctx.beginPath()
                ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
                // 50% chance white, 50% chance lime
                ctx.fillStyle = star.x % 2 > 1 ? `rgba(255, 255, 255, ${star.opacity})` : `rgba(163, 230, 53, ${star.opacity})`
                ctx.fill()
            })

            animationFrameId = requestAnimationFrame(animate)
        }

        animate()

        return () => {
            window.removeEventListener('resize', resizeCanvas)
            cancelAnimationFrame(animationFrameId)
        }
    }, [])

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 w-full h-full pointer-events-none z-0"
            style={{ opacity: 0.8 }}
        />
    )
}
