'use client'

import React, { useRef, useState, useEffect } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { Github, ExternalLink } from 'lucide-react'

// Same project type definition based on usage in Projects.tsx
interface ProjectCardProps {
    project: {
        title: string
        description: string
        technologies: string[]
        github: string
        demo: string
        icon: any
    }
}

export default function ProjectCard3D({ project }: ProjectCardProps) {
    const ref = useRef<HTMLDivElement>(null)
    const [isHovered, setIsHovered] = useState(false)

    // Use springs to make the rotation snappy but smooth
    const x = useMotionValue(0)
    const y = useMotionValue(0)

    const springConfig = { damping: 20, stiffness: 150, mass: 0.5 }
    const mouseXSpring = useSpring(x, springConfig)
    const mouseYSpring = useSpring(y, springConfig)

    // Map mouse coordinate ratios to rotation degrees (tilt max 15 deg)
    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['10deg', '-10deg'])
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-10deg', '10deg'])

    // Only apply 3d on desktop
    const [isMobile, setIsMobile] = useState(true)

    useEffect(() => {
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
        if (!ref.current) return
        const rect = ref.current.getBoundingClientRect()

        // Calculate mouse position relative to center [-0.5 to 0.5]
        const mouseX = e.clientX - rect.left
        const mouseY = e.clientY - rect.top
        const xPct = mouseX / rect.width - 0.5
        const yPct = mouseY / rect.height - 0.5

        x.set(xPct)
        y.set(yPct)
    }

    const handleMouseLeave = () => {
        if (isMobile) return
        setIsHovered(false)
        x.set(0)
        y.set(0)
    }

    const handleMouseEnter = () => {
        if (isMobile) return
        setIsHovered(true)
    }

    // Calculate background gradient transform outside of render to avoid hook order errors
    const bgGradient = useTransform(
        () => `radial-gradient(circle at ${(x.get() + 0.5) * 100}% ${(y.get() + 0.5) * 100}%, rgba(0,255,255,0.15) 0%, transparent 60%)`
    )

    const borderGlow = useTransform(
        () => `radial-gradient(500px circle at ${(x.get() + 0.5) * 100}% ${(y.get() + 0.5) * 100}%, rgba(0,255,255,0.4), transparent 40%)`
    )

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{
                transformStyle: 'preserve-3d',
                rotateX: isMobile ? 0 : rotateX,
                rotateY: isMobile ? 0 : rotateY,
                perspective: 1000,
            }}
            className="project-card h-full w-full will-change-transform relative group rounded-2xl"
        >
            {/* Animated Hover Border Container */}
            {!isMobile && (
                <motion.div
                    className="absolute -inset-[1px] rounded-2xl z-0 pointer-events-none transition-opacity duration-300"
                    style={{
                        opacity: isHovered ? 1 : 0,
                        background: borderGlow,
                    }}
                />
            )}

            <div
                className="flex flex-col h-full bg-[#0b0b0c]/90 backdrop-blur-2xl border border-white/10 rounded-2xl p-6 transition-all duration-300 relative overflow-hidden z-10"
                style={{
                    transformStyle: 'preserve-3d',
                    transform: isMobile ? 'none' : 'translateZ(20px)',
                    boxShadow: isHovered && !isMobile
                        ? '0 30px 60px -20px rgba(0,255,255,0.15), inset 0 0 20px rgba(0,255,255,0.05)'
                        : '0 10px 30px -10px rgba(0,0,0,0.8)'
                }}
            >
                {/* Dynamic Highlight Glow that follows mouse */}
                {!isMobile && (
                    <motion.div
                        className="absolute inset-0 z-0 pointer-events-none transition-opacity duration-300"
                        style={{
                            opacity: isHovered ? 1 : 0,
                            background: bgGradient
                        }}
                    />
                )}

                <div className="flex justify-between items-start mb-6 relative z-10" style={{ transform: isMobile ? 'none' : 'translateZ(30px)' }}>
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-[#0ff]/50 transition-colors shadow-[inset_0_0_15px_rgba(255,255,255,0.05)]">
                            <project.icon className="text-white group-hover:text-[#0ff] transition-colors drop-shadow-[0_0_8px_rgba(0,255,255,0.8)]" size={24} />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-white leading-tight mb-1 line-clamp-2">
                                {project.title}
                            </h3>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        {project.github && project.github !== '#' && (
                            <a href={project.github} target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-full bg-white/5 hover:bg-[#0ff] hover:text-black transition-all border border-white/10 hover:shadow-[0_0_15px_rgba(0,255,255,0.5)] z-20">
                                <Github size={18} className="text-inherit" />
                            </a>
                        )}
                        {project.demo && project.demo !== '#' && (
                            <a href={project.demo} target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-full bg-white/5 hover:bg-[#0ff] hover:text-black transition-all border border-white/10 hover:shadow-[0_0_15px_rgba(0,255,255,0.5)] z-20">
                                <ExternalLink size={18} className="text-inherit" />
                            </a>
                        )}
                    </div>
                </div>

                <p className="text-gray-400 text-sm leading-relaxed mb-8 flex-1 relative z-10" style={{ transform: isMobile ? 'none' : 'translateZ(15px)' }}>
                    {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mt-auto relative z-10" style={{ transform: isMobile ? 'none' : 'translateZ(25px)' }}>
                    {project.technologies.map((tech: string) => (
                        <span
                            key={tech}
                            className="px-3 py-1.5 text-[10px] uppercase font-bold tracking-wider text-lime-400/80 border border-lime-400/20 rounded bg-lime-400/5 shadow-[0_0_10px_rgba(163,230,53,0.05)]"
                        >
                            {tech}
                        </span>
                    ))}
                </div>
            </div>
        </motion.div>
    )
}
