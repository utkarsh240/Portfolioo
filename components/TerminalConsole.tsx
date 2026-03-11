'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { TerminalSquare, X, Minus, Square } from 'lucide-react'

interface CommandHistory {
    command: string
    output: React.ReactNode
}

export default function TerminalConsole() {
    const [isOpen, setIsOpen] = useState(false)
    const [isMinimized, setIsMinimized] = useState(false)
    const [input, setInput] = useState('')
    const [history, setHistory] = useState<CommandHistory[]>([
        { command: '', output: 'SYSTEM INITIALIZED.\nType "help" to see available commands.' }
    ])

    const inputRef = useRef<HTMLInputElement>(null)
    const endOfTerminalRef = useRef<HTMLDivElement>(null)

    // Keyboard shortcut to toggle terminal (Cmd/Ctrl + J)
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'j') {
                e.preventDefault()
                setIsOpen(prev => !prev)
                if (isMinimized) setIsMinimized(false)
            }
        }
        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [isMinimized])

    // Auto-scroll to bottom of terminal
    useEffect(() => {
        endOfTerminalRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [history])

    // Focus input when opened
    useEffect(() => {
        if (isOpen && !isMinimized) {
            setTimeout(() => inputRef.current?.focus(), 100)
        }
    }, [isOpen, isMinimized])

    const handleTerminalClick = () => {
        inputRef.current?.focus()
    }

    const processCommand = (cmd: string) => {
        const sanitizedCmd = cmd.trim().toLowerCase()
        let output: React.ReactNode = ''

        switch (sanitizedCmd) {
            case 'help':
                output = (
                    <div className="text-gray-300">
                        Available commands:
                        <br />- <span className="text-[#0ff]">whoami</span>: Display user info
                        <br />- <span className="text-[#0ff]">ls projects</span>: List featured projects
                        <br />- <span className="text-[#0ff]">cat resume.txt</span>: Download resume
                        <br />- <span className="text-[#0ff]">clear</span>: Clear terminal output
                        <br />- <span className="text-red-500">sudo rm -rf /</span>: [RESTRICTED]
                    </div>
                )
                break
            case 'whoami':
                output = (
                    <div>
                        Utkarsh Gupta<br />
                        Role: Full Stack Developer<br />
                        Location: Earth<br />
                        Specialty: React, Next.js, AI Integration
                    </div>
                )
                break
            case 'ls projects':
                output = (
                    <div>
                        1. DecorAI (AI Architectural Visualization)<br />
                        2. TimeBox (Real-Time Ephemeral Chat)<br />
                        3. AI PDF Analysis System (RAG pipeline)
                    </div>
                )
                break
            case 'cat resume.txt':
                output = 'Downloading resume.pdf...'
                window.open('/resume.pdf', '_blank')
                break
            case 'sudo rm -rf /':
                output = (
                    <div className="text-red-500 animate-pulse font-bold">
                        ACCESS DENIED. THIS INCIDENT WILL BE REPORTED.
                    </div>
                )
                break
            case 'clear':
                setHistory([])
                return
            case '':
                output = ''
                break
            default:
                output = `command not found: ${sanitizedCmd}`
        }

        setHistory(prev => [...prev, { command: cmd, output }])
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (input) {
            processCommand(input)
            setInput('')
        }
    }

    return (
        <>
            {/* Global floating button to open terminal if user doesn't know the shortcut */}
            {!isOpen && (
                <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    onClick={() => setIsOpen(true)}
                    className="fixed bottom-6 right-6 z-50 p-3 bg-black/80 backdrop-blur-md border border-[#0ff]/50 rounded-full text-[#0ff] shadow-[0_0_20px_rgba(0,255,255,0.2)] hover:shadow-[0_0_30px_rgba(0,255,255,0.5)] hover:bg-[#0ff]/10 transition-all font-mono"
                    title="Open Terminal (Cmd+J)"
                >
                    <TerminalSquare size={24} />
                </motion.button>
            )}

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        drag
                        dragConstraints={{ left: 0, top: 0, right: typeof window !== 'undefined' ? window.innerWidth - 300 : 0, bottom: typeof window !== 'undefined' ? window.innerHeight - 200 : 0 }}
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{
                            opacity: 1,
                            scale: 1,
                            y: 0,
                            height: isMinimized ? '40px' : '400px'
                        }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ duration: 0.2 }}
                        className="fixed bottom-24 right-6 z-[100] w-[350px] md:w-[500px] bg-[#0b0b0c]/95 backdrop-blur-3xl border border-white/20 rounded-lg shadow-[0_20px_60px_rgba(0,0,0,0.8),0_0_30px_rgba(0,255,255,0.1)] overflow-hidden flex flex-col font-mono text-sm"
                        style={{ resize: 'both' }}
                    >
                        {/* Terminal Header (Draggable Handle) */}
                        <div className="flex items-center justify-between px-4 py-2 bg-white/5 border-b border-white/10 cursor-grab active:cursor-grabbing select-none">
                            <div className="flex items-center gap-2 text-gray-400">
                                <TerminalSquare size={16} className="text-[#0ff]" />
                                <span className="text-xs">utkarsh@portfolio:~</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <button onClick={() => setIsMinimized(!isMinimized)} className="text-gray-400 hover:text-white transition-colors">
                                    <Minus size={14} />
                                </button>
                                <button onClick={() => setIsMinimized(false)} className="text-gray-400 hover:text-white transition-colors">
                                    <Square size={12} />
                                </button>
                                <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-red-400 transition-colors">
                                    <X size={14} />
                                </button>
                            </div>
                        </div>

                        {/* Terminal Body */}
                        {!isMinimized && (
                            <div
                                className="flex-1 p-4 overflow-y-auto custom-scrollbar text-lime-400/90"
                                onClick={handleTerminalClick}
                            >
                                {history.map((item, index) => (
                                    <div key={index} className="mb-2">
                                        {item.command && (
                                            <div className="flex gap-2 text-white">
                                                <span className="text-[#0ff]">❯</span>
                                                <span className="text-gray-300">{item.command}</span>
                                            </div>
                                        )}
                                        {item.output && (
                                            <div className="mt-1 whitespace-pre-wrap leading-relaxed opacity-90">
                                                {item.output}
                                            </div>
                                        )}
                                    </div>
                                ))}

                                <form onSubmit={handleSubmit} className="flex gap-2 items-center mt-2">
                                    <span className="text-[#0ff]">❯</span>
                                    <input
                                        ref={inputRef}
                                        type="text"
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        className="flex-1 bg-transparent border-none outline-none text-gray-300 font-mono"
                                        spellCheck={false}
                                        autoComplete="off"
                                    />
                                    {/* Blinking cursor effect handled implicitly by the input's focus */}
                                </form>
                                <div ref={endOfTerminalRef} />
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
