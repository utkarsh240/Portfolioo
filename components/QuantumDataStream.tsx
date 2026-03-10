'use client'

import React, { useEffect, useState } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'

export default function QuantumDataStream() {
    const [isMobile, setIsMobile] = useState(true)
    const [hexData, setHexData] = useState<string[]>([])

    // Track scroll for the right-side minimap
    const { scrollYProgress } = useScroll()
    const scaleY = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    })

    // Smooth scroll percentage for the text readout
    const scrollPerc = useTransform(scaleY, [0, 1], [0, 100])
    const [scrollTxt, setScrollTxt] = useState("00")

    useEffect(() => {
        return scrollPerc.onChange((v) => setScrollTxt(v.toFixed(0).padStart(2, '0')))
    }, [scrollPerc])

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.matchMedia("(max-width: 1280px)").matches) // Only show on large lg screens + 
        }
        checkMobile()
        window.addEventListener('resize', checkMobile)

        // Generate static background hex chunks
        const generateHex = () => {
            const chunks = []
            for (let i = 0; i < 40; i++) {
                chunks.push(Math.random().toString(16).substring(2, 6).toUpperCase())
            }
            setHexData(chunks)
        }
        generateHex()

        // Periodically scramble some hex data
        const interval = setInterval(() => {
            setHexData(prev => {
                const newData = [...prev]
                const randomIndex = Math.floor(Math.random() * newData.length)
                newData[randomIndex] = Math.random().toString(16).substring(2, 6).toUpperCase()
                return newData
            })
        }, 150)

        return () => {
            window.removeEventListener('resize', checkMobile)
            clearInterval(interval)
        }
    }, [])

    if (isMobile) return null

    return (
        <>
            {/* LEFT GUTTER: Quantum Data Stream */}
            <div className="fixed left-4 top-0 bottom-0 w-8 flex flex-col items-center justify-center opacity-30 pointer-events-none z-0">
                <div className="h-full w-[1px] bg-gradient-to-b from-transparent via-lime-400/50 to-transparent absolute left-1/2 -translate-x-1/2" />
                <div className="flex flex-col gap-8 text-[10px] font-mono text-lime-400/80 leading-none whitespace-nowrap overflow-hidden py-12">
                    <motion.div
                        className="flex flex-col gap-12 items-center"
                        animate={{ y: [0, -1000] }}
                        transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
                    >
                        {hexData.map((hex, i) => (
                            <div key={i} className="transform -rotate-90 origin-center tracking-widest mix-blend-screen shadow-[0_0_10px_rgba(163,230,53,0.5)]">
                                0x{hex}
                            </div>
                        ))}
                        {/* Duplicate for seamless infinite scroll loop */}
                        {hexData.map((hex, i) => (
                            <div key={`dup-${i}`} className="transform -rotate-90 origin-center tracking-widest mix-blend-screen shadow-[0_0_10px_rgba(163,230,53,0.5)]">
                                0x{hex}
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>

            {/* RIGHT GUTTER: Minimap / Scroll Tracker */}
            <div className="fixed right-6 top-1/4 bottom-1/4 w-4 flex flex-col items-center justify-between opacity-50 pointer-events-none z-0">
                {/* Top Label */}
                <div className="text-[10px] font-mono text-white/50 mb-4 transform rotate-90 origin-center absolute -top-8 -right-2 tracking-widest">
                    SYS.POS
                </div>

                {/* The Track */}
                <div className="relative h-full w-[2px] bg-white/10 rounded-full overflow-hidden">
                    {/* The Progress Fill */}
                    <motion.div
                        className="absolute top-0 left-0 right-0 bg-gradient-to-b from-lime-400/50 to-lime-400 rounded-full shadow-[0_0_15px_rgba(163,230,53,1)] origin-top"
                        style={{ scaleY }}
                    />
                </div>

                {/* Bottom Readout */}
                <div className="text-[10px] font-mono text-lime-400 mt-4 absolute -bottom-8 -right-1.5 tracking-wider w-8 text-center flex flex-col items-center gap-1">
                    <span className="text-white/30 text-[8px] transform -rotate-90 relative top-2 -left-2 block">ALT</span>
                    <span>{scrollTxt}%</span>
                </div>
            </div>
        </>
    )
}
