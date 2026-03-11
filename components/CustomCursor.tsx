'use client'

import React, { useEffect, useState } from 'react'
import { motion, useSpring, useMotionValue } from 'framer-motion'

export default function CustomCursor() {
    const [isVisible, setIsVisible] = useState(false)
    const [isHovering, setIsHovering] = useState(false)
    const [isClicking, setIsClicking] = useState(false)

    const cursorX = useMotionValue(-100)
    const cursorY = useMotionValue(-100)

    const springConfig = { damping: 25, stiffness: 300, mass: 0.5 }
    const cursorXSpring = useSpring(cursorX, springConfig)
    const cursorYSpring = useSpring(cursorY, springConfig)

    useEffect(() => {
        const updateMousePosition = (e: MouseEvent) => {
            cursorX.set(e.clientX)
            cursorY.set(e.clientY)
            if (!isVisible) setIsVisible(true)
        }

        const updateHoverState = (e: MouseEvent) => {
            const target = e.target as HTMLElement
            const isClickable =
                target.tagName.toLowerCase() === 'a' ||
                target.tagName.toLowerCase() === 'button' ||
                target.tagName.toLowerCase() === 'input' ||
                target.tagName.toLowerCase() === 'textarea' ||
                window.getComputedStyle(target).cursor === 'pointer' ||
                target.closest('.project-card') !== null ||
                target.closest('a') !== null ||
                target.closest('button') !== null

            setIsHovering(isClickable)
        }

        const handleMouseDown = () => setIsClicking(true)
        const handleMouseUp = () => setIsClicking(false)
        const handleMouseLeave = () => setIsVisible(false)
        const handleMouseEnter = () => setIsVisible(true)

        window.addEventListener('mousemove', updateMousePosition)
        window.addEventListener('mouseover', updateHoverState)
        window.addEventListener('mousedown', handleMouseDown)
        window.addEventListener('mouseup', handleMouseUp)
        document.documentElement.addEventListener('mouseleave', handleMouseLeave)
        document.documentElement.addEventListener('mouseenter', handleMouseEnter)

        return () => {
            window.removeEventListener('mousemove', updateMousePosition)
            window.removeEventListener('mouseover', updateHoverState)
            window.removeEventListener('mousedown', handleMouseDown)
            window.removeEventListener('mouseup', handleMouseUp)
            document.documentElement.removeEventListener('mouseleave', handleMouseLeave)
            document.documentElement.removeEventListener('mouseenter', handleMouseEnter)
        }
    }, [isVisible, cursorX, cursorY])

    if (!isVisible) return null

    return (
        <>
            {/* Core Dot (Instant, no spring) */}
            <motion.div
                className="hidden md:block fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none z-[100] mix-blend-difference"
                style={{
                    x: cursorX,
                    y: cursorY,
                    translateX: '-50%',
                    translateY: '-50%',
                }}
                animate={{
                    backgroundColor: isHovering ? '#0ff' : '#a3e635',
                    scale: isClicking ? 0.5 : isHovering ? 1.5 : 1,
                    boxShadow: isHovering ? '0 0 10px #0ff, 0 0 20px #0ff' : '0 0 10px #a3e635'
                }}
                transition={{ duration: 0.15 }}
            />

            {/* Trailing Sci-Fi Ring */}
            <motion.div
                className="hidden md:flex fixed top-0 left-0 w-12 h-12 pointer-events-none z-[99] items-center justify-center mix-blend-difference"
                style={{
                    x: cursorXSpring,
                    y: cursorYSpring,
                    translateX: '-50%',
                    translateY: '-50%',
                }}
                animate={{
                    scale: isClicking ? 0.8 : isHovering ? 1.4 : 1,
                    rotate: isHovering ? 90 : 0
                }}
                transition={{ type: 'spring', stiffness: 150, damping: 15 }}
            >
                {/* Border bracket elements */}
                <motion.div
                    className="absolute w-full h-full border-2 rounded-full"
                    animate={{
                        borderColor: isHovering ? '#0ff' : '#a3e635',
                        opacity: isHovering ? 0.6 : 0.4
                    }}
                />

                {/* Targeting Crosshairs that appear on hover */}
                <motion.div
                    className="absolute w-[18px] h-[2px] bg-[#0ff] left-[-10px]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isHovering ? 0.8 : 0, x: isHovering ? 0 : 10 }}
                />
                <motion.div
                    className="absolute w-[18px] h-[2px] bg-[#0ff] right-[-10px]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isHovering ? 0.8 : 0, x: isHovering ? 0 : -10 }}
                />
                <motion.div
                    className="absolute h-[18px] w-[2px] bg-[#0ff] top-[-10px]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isHovering ? 0.8 : 0, y: isHovering ? 0 : 10 }}
                />
                <motion.div
                    className="absolute h-[18px] w-[2px] bg-[#0ff] bottom-[-10px]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isHovering ? 0.8 : 0, y: isHovering ? 0 : -10 }}
                />
            </motion.div>
        </>
    )
}
