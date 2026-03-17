'use client'

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Activity } from 'lucide-react'

// Premium animated activity graph (GitHub style but with glowing Neons)
export default function ActivityGraph() {
    const [grid, setGrid] = useState<number[][]>([])
    const cols = 52
    const rows = 7

    // Generate initial mock data
    useEffect(() => {
        const newGrid: number[][] = []
        for (let i = 0; i < cols; i++) {
            const col: number[] = []
            for (let j = 0; j < rows; j++) {
                // Random intensity 0-4
                // Bias towards recent weeks (i > 30)
                let intensity = Math.random() > 0.6 ? Math.floor(Math.random() * 4) + 1 : 0
                if (i > cols - 15 && Math.random() > 0.3) intensity = Math.floor(Math.random() * 3) + 2
                col.push(intensity)
            }
            newGrid.push(col)
        }
        setGrid(newGrid)
    }, [])

    // Colors based on intensity
    const getColor = (intensity: number) => {
        switch (intensity) {
            case 0: return 'bg-white/[0.02] border-white/[0.05]'
            case 1: return 'bg-[#0ff]/20 border-[#0ff]/30 shadow-[0_0_8px_rgba(0,255,255,0.2)]'
            case 2: return 'bg-[#0ff]/40 border-[#0ff]/50 shadow-[0_0_12px_rgba(0,255,255,0.4)]'
            case 3: return 'bg-[#0ff]/70 border-[#0ff]/80 shadow-[0_0_16px_rgba(0,255,255,0.6)]'
            case 4: return 'bg-[#0ff] border-white shadow-[0_0_20px_rgba(0,255,255,0.9)]'
            default: return 'bg-white/[0.02] border-white/[0.05]'
        }
    }

    return (
        <div className="w-full glass-card rounded-2xl p-6 md:p-8 relative overflow-hidden group">
            {/* Background ambient glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-[#0ff]/10 blur-[80px] rounded-full pointer-events-none group-hover:bg-[#0ff]/20 transition-all duration-700" />

            <div className="flex items-center justify-between mb-8 relative z-10">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-center">
                        <Activity size={18} className="text-[#0ff]" />
                    </div>
                    <div>
                        <h3 className="text-white font-heading font-semibold text-lg tracking-wide">Activity Heatmap</h3>
                        <p className="text-xs text-gray-500 font-mono mt-1">1,402 contributions in the last year</p>
                    </div>
                </div>

                <div className="hidden sm:flex text-xs text-gray-400 font-mono items-center gap-2">
                    <span>Less</span>
                    <div className="flex gap-1.5">
                        {[0, 1, 2, 3, 4].map(level => (
                            <div key={level} className={`w-3 h-3 rounded-[2px] border ${getColor(level)} opacity-80`} />
                        ))}
                    </div>
                    <span>More</span>
                </div>
            </div>

            <div className="w-full overflow-x-auto custom-scrollbar pb-2 relative z-10">
                <div className="flex gap-1.5 md:gap-2 min-w-max">
                    {grid.map((col, colIdx) => (
                        <div key={colIdx} className="flex flex-col gap-1.5 md:gap-2">
                            {col.map((intensity, rowIdx) => (
                                <motion.div
                                    key={`${colIdx}-${rowIdx}`}
                                    initial={{ opacity: 0, scale: 0.5 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{
                                        duration: 0.4,
                                        delay: (colIdx * 0.01) + (rowIdx * 0.01),
                                        ease: "backOut"
                                    }}
                                    whileHover={{ scale: 1.5, zIndex: 10 }}
                                    className={`w-3 h-3 md:w-3.5 md:h-3.5 rounded-[3px] border transition-colors duration-300 ${getColor(intensity)} hover:border-white hover:bg-white cursor-pointer`}
                                />
                            ))}
                        </div>
                    ))}
                </div>
            </div>

            {/* Months axis */}
            <div className="hidden md:flex justify-between w-full mt-4 text-[10px] text-gray-500 font-mono font-medium px-2">
                <span>Jan</span>
                <span>Feb</span>
                <span>Mar</span>
                <span>Apr</span>
                <span>May</span>
                <span>Jun</span>
                <span>Jul</span>
                <span>Aug</span>
                <span>Sep</span>
                <span>Oct</span>
                <span>Nov</span>
                <span>Dec</span>
            </div>
        </div>
    )
}
