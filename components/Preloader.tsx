'use client'

import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Preloader() {
    const [progress, setProgress] = useState(0)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        // Lock body scroll while loading
        document.body.style.overflow = 'hidden'

        // Fake progress sequence
        const duration = 2000 // 2 seconds total loading sequence
        const interval = 20 // update every 20ms
        const steps = duration / interval
        let currentStep = 0

        const timer = setInterval(() => {
            currentStep++

            // Calculate eased progress (easeOutQuad roughly)
            const t = currentStep / steps
            const easedProgress = t * (2 - t)

            const nextProgress = Math.min(Math.round(easedProgress * 100), 100)
            setProgress(nextProgress)

            if (currentStep >= steps) {
                clearInterval(timer)
                setTimeout(() => {
                    setIsLoading(false)
                    document.body.style.overflow = '' // Restore scroll
                }, 300) // slight pause at 100%
            }
        }, interval)

        return () => {
            clearInterval(timer)
            document.body.style.overflow = ''
        }
    }, [])

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    key="preloader"
                    initial={{ y: 0 }}
                    exit={{
                        y: '-100%',
                        transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
                    }}
                    className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#050505] text-white"
                >
                    {/* Background grid texture while loading */}
                    <div
                        className="absolute inset-0 opacity-[0.03] pointer-events-none"
                        style={{
                            backgroundImage: `linear-gradient(rgba(163, 230, 53, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(163, 230, 53, 0.5) 1px, transparent 1px)`,
                            backgroundSize: '40px 40px',
                        }}
                    />

                    <div className="relative flex flex-col items-center">
                        {/* Pulsing ring */}
                        <motion.div
                            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.8, 0.3] }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                            className="absolute w-40 h-40 border border-lime-400/20 rounded-full"
                        />

                        <div className="text-6xl md:text-8xl font-heading font-bold text-transparent"
                            style={{
                                WebkitTextStroke: '2px rgba(163,230,53,1)',
                                textShadow: '0 0 20px rgba(163,230,53,0.3)',
                                fontVariantNumeric: 'tabular-nums'
                            }}>
                            {progress}%
                        </div>

                        <div className="mt-4 text-xs tracking-[0.3em] text-lime-400 font-mono uppercase opacity-70">
                            Initializing Protocol
                        </div>

                        {/* Progress Bar Line */}
                        <div className="mt-8 w-48 h-[2px] bg-white/10 overflow-hidden relative rounded-full">
                            <motion.div
                                className="absolute top-0 left-0 bottom-0 bg-lime-400 shadow-[0_0_10px_rgba(163,230,53,0.8)]"
                                initial={{ width: '0%' }}
                                animate={{ width: `${progress}%` }}
                                transition={{ duration: 0.1 }}
                            />
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
