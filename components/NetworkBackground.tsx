'use client'

import React, { useEffect, useRef } from 'react'

class Particle {
    x: number
    y: number
    originX: number
    originY: number
    vx: number
    vy: number
    color: string
    radius: number
    ease: number
    friction: number

    constructor(x: number, y: number, color: string) {
        this.x = x
        this.y = y
        this.originX = x
        this.originY = y
        this.vx = 0
        this.vy = 0
        this.color = color
        this.radius = Math.random() * 2 + 1
        this.ease = 0.05
        this.friction = 0.85
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        ctx.fillStyle = this.color
        ctx.fill()
    }

    update(mouseX: number, mouseY: number, isHovering: boolean) {
        let dx = mouseX - this.x
        let dy = mouseY - this.y
        let distance = Math.sqrt(dx * dx + dy * dy)

        if (isHovering && distance < 150) {
            // Repel from mouse
            let force = -100 / distance
            let angle = Math.atan2(dy, dx)
            this.vx += force * Math.cos(angle)
            this.vy += force * Math.sin(angle)
        }

        // Spring back to origin
        this.x += (this.originX - this.x) * this.ease
        this.y += (this.originY - this.y) * this.ease

        // Apply velocity
        this.x += this.vx
        this.y += this.vy

        // Apply friction
        this.vx *= this.friction
        this.vy *= this.friction
    }
}

export default function NetworkBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')
        if (!ctx) return

        let particles: Particle[] = []
        let mouse = { x: -1000, y: -1000, isHovering: false }
        let animationFrameId: number

        const init = () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight

            particles = []
            // Number of particles based on screen size so it isn't too dense on mobile
            const numParticles = Math.floor((canvas.width * canvas.height) / 15000)

            for (let i = 0; i < numParticles; i++) {
                const x = Math.random() * canvas.width
                const y = Math.random() * canvas.height
                // 80% dim grey, 20% neon lime
                const color = Math.random() > 0.8 ? 'rgba(163,230,53,0.5)' : 'rgba(255,255,255,0.1)'
                particles.push(new Particle(x, y, color))
            }
        }

        const connect = () => {
            for (let a = 0; a < particles.length; a++) {
                for (let b = a; b < particles.length; b++) {
                    const dx = particles[a].x - particles[b].x
                    const dy = particles[a].y - particles[b].y
                    const distance = Math.sqrt(dx * dx + dy * dy)

                    if (distance < 120) {
                        // Opacity based on distance
                        const opacity = 1 - (distance / 120)

                        // If either particle is lime, line is semi-lime, else dim white
                        const isLime = particles[a].color.includes('163') || particles[b].color.includes('163')
                        ctx.strokeStyle = isLime ? `rgba(163, 230, 53, ${opacity * 0.3})` : `rgba(255, 255, 255, ${opacity * 0.05})`
                        ctx.lineWidth = 1

                        ctx.beginPath()
                        ctx.moveTo(particles[a].x, particles[a].y)
                        ctx.lineTo(particles[b].x, particles[b].y)
                        ctx.stroke()
                    }
                }
            }
        }

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height)

            for (let i = 0; i < particles.length; i++) {
                particles[i].update(mouse.x, mouse.y, mouse.isHovering)
                particles[i].draw(ctx)
            }

            connect()
            animationFrameId = requestAnimationFrame(animate)
        }

        init()
        animate()

        const handleResize = () => {
            init()
        }

        const handleMouseMove = (e: MouseEvent) => {
            mouse.x = e.clientX
            mouse.y = e.clientY
            mouse.isHovering = true
        }

        const handleMouseLeave = () => {
            mouse.isHovering = false
        }

        window.addEventListener('resize', handleResize)
        window.addEventListener('mousemove', handleMouseMove)
        window.addEventListener('mouseout', handleMouseLeave)

        return () => {
            window.removeEventListener('resize', handleResize)
            window.removeEventListener('mousemove', handleMouseMove)
            window.removeEventListener('mouseout', handleMouseLeave)
            cancelAnimationFrame(animationFrameId)
        }
    }, [])

    return (
        <div className="fixed inset-0 z-0 pointer-events-none opacity-60 mix-blend-screen">
            <canvas ref={canvasRef} className="block w-full h-full" />
            {/* Subtle radial gradient to make the center slightly darker for text readability */}
            <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#0b0b0c]/50 to-[#0b0b0c] z-10 pointer-events-none" />
        </div>
    )
}
