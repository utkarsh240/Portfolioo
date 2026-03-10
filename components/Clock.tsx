'use client'

import React, { useState, useEffect } from 'react'

export default function Clock() {
    const [time, setTime] = useState<Date | null>(null)

    useEffect(() => {
        // Set initial time only on client to avoid hydration mismatch
        setTime(new Date())

        // Update time every second
        const timer = setInterval(() => {
            setTime(new Date())
        }, 1000)

        return () => clearInterval(timer)
    }, [])

    if (!time) {
        // Return a fixed width placeholder during SSR to prevent layout shift
        return <div className="hidden md:flex flex-col items-end opacity-0 w-[120px] h-9" />
    }

    return (
        <div className="hidden lg:flex flex-col items-end text-right">
            <span className="text-sm font-bold text-white tracking-widest font-mono">
                {time.toLocaleTimeString('en-US', {
                    hour12: true,
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit'
                })}
            </span>
            <span className="text-[10px] text-lime-400 font-mono uppercase tracking-widest">
                {time.toLocaleDateString('en-US', {
                    weekday: 'short',
                    month: 'short',
                    day: 'numeric'
                })}
            </span>
        </div>
    )
}
