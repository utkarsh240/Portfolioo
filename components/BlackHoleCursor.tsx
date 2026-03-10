'use client'

import React, { useEffect } from 'react'

export default function BlackHoleCursor() {

    useEffect(() => {
        const isMobile = window.matchMedia("(max-width: 768px)").matches || ('ontouchstart' in window)
        if (isMobile) return

        let mouseX = window.innerWidth / 2
        let mouseY = window.innerHeight / 2

        const handleMouseMove = (e: MouseEvent) => {
            mouseX = e.clientX
            mouseY = e.clientY
        }

        window.addEventListener('mousemove', handleMouseMove)

        let animationFrameId: number

        // We will find all interactive elements to warp (buttons, headings, cards)
        // We don't want to warp EVERYTHING, just structurally interesting things.
        const getWarpTargets = () => {
            return document.querySelectorAll('h1, h2, h3, a, button, .project-card, .exp-timeline-card')
        }

        const animate = () => {
            const targets = getWarpTargets()

            const MAX_DISTANCE = 300 // Radius of the "black hole"
            const STRENGTH = 0.15 // How strong the pull is

            targets.forEach((el) => {
                const HTMLElement = el as HTMLElement
                const rect = HTMLElement.getBoundingClientRect()

                // Element center
                const ex = rect.left + rect.width / 2
                const ey = rect.top + rect.height / 2

                const dx = mouseX - ex
                const dy = mouseY - ey
                const distance = Math.sqrt(dx * dx + dy * dy)

                if (distance < MAX_DISTANCE) {
                    // Calculate pull
                    const pull = (MAX_DISTANCE - distance) / MAX_DISTANCE
                    const tx = dx * pull * STRENGTH
                    const ty = dy * pull * STRENGTH

                    // Apply a slight scale down to simulate Z-depth sucking in
                    const scale = 1 - (pull * 0.05)

                    HTMLElement.style.transform = `translate(${tx}px, ${ty}px) scale(${scale})`
                    HTMLElement.style.transition = 'none' // Important for real-time physics
                } else {
                    // Release element
                    if (HTMLElement.style.transform) {
                        HTMLElement.style.transform = 'translate(0px, 0px) scale(1)'
                        HTMLElement.style.transition = 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)' // Spring back
                    }
                }
            })

            animationFrameId = requestAnimationFrame(animate)
        }

        animationFrameId = requestAnimationFrame(animate)

        return () => {
            window.removeEventListener('mousemove', handleMouseMove)
            cancelAnimationFrame(animationFrameId)
            // Cleanup all transforms
            const targets = getWarpTargets()
            targets.forEach(el => {
                const htmlEl = el as HTMLElement;
                htmlEl.style.transform = '';
                htmlEl.style.transition = '';
            })
        }
    }, [])

    return null // Pure functional component, no DOM rendering
}
