'use client'

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function CustomCursor() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
    const [isHovering, setIsHovering] = useState(false)
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        // Only run on client-side
        const updateMousePosition = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY })
            if (!isVisible) setIsVisible(true)
        }

        const updateHoverState = (e: MouseEvent) => {
            const target = e.target as HTMLElement
            // Check if the current hovered element is clickable (a, button, input or has cursor-pointer)
            const isClickable =
                target.tagName.toLowerCase() === 'a' ||
                target.tagName.toLowerCase() === 'button' ||
                target.tagName.toLowerCase() === 'input' ||
                target.tagName.toLowerCase() === 'textarea' ||
                window.getComputedStyle(target).cursor === 'pointer'

            setIsHovering(isClickable)
        }

        const handleMouseLeave = () => {
            setIsVisible(false)
        }

        const handleMouseEnter = () => {
            setIsVisible(true)
        }

        window.addEventListener('mousemove', updateMousePosition)
        window.addEventListener('mouseover', updateHoverState)
        document.documentElement.addEventListener('mouseleave', handleMouseLeave)
        document.documentElement.addEventListener('mouseenter', handleMouseEnter)

        return () => {
            window.removeEventListener('mousemove', updateMousePosition)
            window.removeEventListener('mouseover', updateHoverState)
            document.documentElement.removeEventListener('mouseleave', handleMouseLeave)
            document.documentElement.removeEventListener('mouseenter', handleMouseEnter)
        }
    }, [isVisible])

    // Don't render until first mouse movement to avoid jumping from 0,0
    if (!isVisible) return null

    return (
        <>
            {/* Central Solid Dot */}
            <motion.div
                className="fixed top-0 left-0 w-2 h-2 bg-lime-400 rounded-full pointer-events-none z-[100] mix-blend-difference"
                animate={{
                    x: mousePosition.x - 4, // center it (width is 8px)
                    y: mousePosition.y - 4,
                    scale: isHovering ? 0 : 1
                }}
                transition={{
                    type: 'tween',
                    ease: 'linear',
                    duration: 0
                }}
            />

            {/* Trailing Ring */}
            <motion.div
                className="fixed top-0 left-0 w-10 h-10 rounded-full border border-lime-400 pointer-events-none z-[99] mix-blend-difference"
                animate={{
                    x: mousePosition.x - 20, // center it (width is 40px)
                    y: mousePosition.y - 20,
                    scale: isHovering ? 1.5 : 1,
                    backgroundColor: isHovering ? 'rgba(163,230,53,0.1)' : 'transparent',
                    borderColor: isHovering ? 'rgba(163,230,53,0.5)' : 'rgba(163,230,53,0.8)'
                }}
                transition={{
                    type: 'spring',
                    stiffness: 150,
                    damping: 20,
                    mass: 0.5
                }}
            />
        </>
    )
}
