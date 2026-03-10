'use client'

import React, { useRef, useState, useEffect } from 'react'
import { motion, useSpring, useTransform, useMotionValue } from 'framer-motion'
import Image from 'next/image'

interface LiquidImageProps {
    src: string
    alt: string
    className?: string
}

export default function LiquidImage({ src, alt, className = '' }: LiquidImageProps) {
    const ref = useRef<HTMLDivElement>(null)
    const [isHovered, setIsHovered] = useState(false)
    const [isMobile, setIsMobile] = useState(true)

    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)

    const springConfig = { damping: 15, stiffness: 150, mass: 0.5 }
    const xSpring = useSpring(mouseX, springConfig)
    const ySpring = useSpring(mouseY, springConfig)

    // Chromatic Aberration offsets
    const redX = useTransform(xSpring, [-0.5, 0.5], [-15, 15])
    const redY = useTransform(ySpring, [-0.5, 0.5], [-15, 15])

    const blueX = useTransform(xSpring, [-0.5, 0.5], [15, -15])
    const blueY = useTransform(ySpring, [-0.5, 0.5], [15, -15])

    // Displacement Map Frequency
    const turbulenceBaseFrequency = useTransform(
        xSpring,
        [-0.5, 0, 0.5],
        [0.05, 0, 0.05]
    )

    useEffect(() => {
        setIsMobile(window.matchMedia("(max-width: 768px)").matches)
    }, [])

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (isMobile || !ref.current) return
        const rect = ref.current.getBoundingClientRect()
        const xPct = (e.clientX - rect.left) / rect.width - 0.5
        const yPct = (e.clientY - rect.top) / rect.height - 0.5
        mouseX.set(xPct)
        mouseY.set(yPct)
    }

    const handleMouseLeave = () => {
        setIsHovered(false)
        mouseX.set(0)
        mouseY.set(0)
    }

    return (
        <div
            ref={ref}
            className={`relative overflow-hidden ${className}`}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => !isMobile && setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
        >
            {/* SVG Filter for Liquid Displacement */}
            <svg className="absolute w-0 h-0">
                <filter id={`liquid-${src.replace(/[^a-zA-Z0-9]/g, '')}`}>
                    <motion.feTurbulence
                        type="fractalNoise"
                        baseFrequency={isHovered ? 0.02 : 0}
                        numOctaves="3"
                        result="noise"
                    />
                    <feDisplacementMap
                        in="SourceGraphic"
                        in2="noise"
                        scale="20"
                        xChannelSelector="R"
                        yChannelSelector="G"
                    />
                </filter>
            </svg>

            <div
                className="w-full h-full relative"
                style={{
                    filter: isHovered && !isMobile ? `url(#liquid-${src.replace(/[^a-zA-Z0-9]/g, '')})` : 'none',
                    transition: 'filter 0.3s ease-out'
                }}
            >
                {/* Base Layer */}
                <Image src={src} alt={alt} fill className="object-cover relative z-10 block" />

                {/* Red Channel */}
                {!isMobile && (
                    <motion.div
                        className="absolute inset-0 mix-blend-screen opacity-0 pointer-events-none z-20"
                        style={{ x: redX, y: redY, opacity: isHovered ? 0.8 : 0 }}
                    >
                        <Image src={src} alt="" fill className="object-cover" style={{ filter: 'drop-shadow(0 0 0 red) saturate(200%) hue-rotate(0deg)' }} />
                    </motion.div>
                )}

                {/* Blue Channel */}
                {!isMobile && (
                    <motion.div
                        className="absolute inset-0 mix-blend-screen opacity-0 pointer-events-none z-20"
                        style={{ x: blueX, y: blueY, opacity: isHovered ? 0.8 : 0 }}
                    >
                        <Image src={src} alt="" fill className="object-cover" style={{ filter: 'drop-shadow(0 0 0 cyan) saturate(200%) hue-rotate(180deg)' }} />
                    </motion.div>
                )}
            </div>
        </div>
    )
}
