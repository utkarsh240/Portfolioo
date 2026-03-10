'use client'

import React, { useRef, useState, useEffect } from 'react'
import { motion, useSpring } from 'framer-motion'

export default function Magnetic({
    children,
    strength = 30, // How far it moves
}: {
    children: React.ReactElement
    strength?: number
}) {
    const ref = useRef<HTMLDivElement>(null)

    // High stiffness spring for snappy physical feeling
    const springX = useSpring(0, { stiffness: 150, damping: 15, mass: 0.5 })
    const springY = useSpring(0, { stiffness: 150, damping: 15, mass: 0.5 })

    const [isHovered, setIsHovered] = useState(false)

    // Only apply magnet effect on desktop (mouse devices)
    const [isMobile, setIsMobile] = useState(true)

    useEffect(() => {
        // Basic mobile check - don't use magnet effect on touch devices
        const checkMobile = () => {
            setIsMobile(window.matchMedia("(max-width: 768px)").matches ||
                ('ontouchstart' in window) ||
                (navigator.maxTouchPoints > 0))
        }
        checkMobile()
        window.addEventListener('resize', checkMobile)
        return () => window.removeEventListener('resize', checkMobile)
    }, [])

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (isMobile) return
        const { clientX, clientY } = e
        const { height, width, left, top } = ref.current!.getBoundingClientRect()

        // Calculate mouse position relative to center of element
        const centerX = left + width / 2
        const centerY = top + height / 2

        // Calculate distance from center (-1 to 1)
        const distanceX = (clientX - centerX) / (width / 2)
        const distanceY = (clientY - centerY) / (height / 2)

        springX.set(distanceX * strength)
        springY.set(distanceY * strength)
    }

    const handleMouseLeave = () => {
        setIsHovered(false)
        springX.set(0)
        springY.set(0)
    }

    const handleMouseEnter = () => {
        if (!isMobile) setIsHovered(true)
    }

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onMouseEnter={handleMouseEnter}
            style={{
                x: springX,
                y: springY,
                display: 'inline-flex',
                zIndex: isHovered ? 10 : 1,
            }}
        >
            {children}
        </motion.div>
    )
}
