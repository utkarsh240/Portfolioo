'use client'

import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Cpu, User, Play, Pause, RotateCcw } from 'lucide-react'
import Section from './Section'

export default function NeonPong() {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [playerScore, setPlayerScore] = useState(0)
    const [aiScore, setAiScore] = useState(0)
    const [isPlayingUI, setIsPlayingUI] = useState(false)

    const gameState = useRef({
        isPlaying: false,
        ball: { x: 400, y: 200, vx: 6, vy: 4, radius: 8 },
        player: { y: 160, width: 10, height: 80 },
        ai: { y: 160, width: 10, height: 80, speed: 4.5 },
        scores: { player: 0, ai: 0 }
    })

    const togglePlay = () => {
        gameState.current.isPlaying = !gameState.current.isPlaying
        setIsPlayingUI(gameState.current.isPlaying)
    }

    const resetGame = () => {
        gameState.current.scores = { player: 0, ai: 0 }
        setPlayerScore(0)
        setAiScore(0)
        gameState.current.ball = { x: 400, y: 200, vx: 5, vy: 3, radius: 8 }
        gameState.current.isPlaying = false
        setIsPlayingUI(false)
    }

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')
        if (!ctx) return

        let animationId: number

        const resetBall = (direction: number) => {
            gameState.current.ball = {
                x: canvas.width / 2,
                y: canvas.height / 2,
                vx: direction * 6,
                vy: (Math.random() - 0.5) * 10,
                radius: 8
            }
        }

        const gameLoop = () => {
            animationId = requestAnimationFrame(gameLoop)

            const state = gameState.current
            const { ball, player, ai } = state

            // Clear Canvas with Trail Effect
            ctx.fillStyle = 'rgba(11, 11, 12, 0.3)'
            ctx.fillRect(0, 0, canvas.width, canvas.height)

            // Draw Center Line
            ctx.setLineDash([15, 20])
            ctx.beginPath()
            ctx.moveTo(canvas.width / 2, 0)
            ctx.lineTo(canvas.width / 2, canvas.height)
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)'
            ctx.lineWidth = 2
            ctx.stroke()
            ctx.setLineDash([])

            if (state.isPlaying) {
                // --- PHYSICS UPDATE ---

                // AI Logic: follow the ball with limited speed
                const aiCenter = ai.y + ai.height / 2
                const targetY = ball.y
                if (targetY < aiCenter - 10) {
                    ai.y -= ai.speed
                } else if (targetY > aiCenter + 10) {
                    ai.y += ai.speed
                }

                // Clamp positions
                ai.y = Math.max(0, Math.min(canvas.height - ai.height, ai.y))
                player.y = Math.max(0, Math.min(canvas.height - player.height, player.y))

                // Move Ball
                ball.x += ball.vx
                ball.y += ball.vy

                // Ball - Wall Collisions
                if (ball.y <= ball.radius || ball.y >= canvas.height - ball.radius) {
                    ball.vy *= -1
                    ball.y = ball.y <= ball.radius ? ball.radius : canvas.height - ball.radius
                }

                // Ball - Player Paddle Collision
                if (
                    ball.x - ball.radius < 20 + player.width &&
                    ball.x > 20 &&
                    ball.y > player.y &&
                    ball.y < player.y + player.height &&
                    ball.vx < 0
                ) {
                    ball.vx *= -1.05 // Speed up on hit
                    const hitDelta = (ball.y - (player.y + player.height / 2)) / (player.height / 2)
                    ball.vy = hitDelta * 8
                    ball.x = 20 + player.width + ball.radius
                }

                // Ball - AI Paddle Collision
                if (
                    ball.x + ball.radius > canvas.width - 20 - ai.width &&
                    ball.x < canvas.width - 20 &&
                    ball.y > ai.y &&
                    ball.y < ai.y + ai.height &&
                    ball.vx > 0
                ) {
                    ball.vx *= -1.05
                    const hitDelta = (ball.y - (ai.y + ai.height / 2)) / (ai.height / 2)
                    ball.vy = hitDelta * 8
                    ball.x = canvas.width - 20 - ai.width - ball.radius
                }

                // Scoring
                if (ball.x + ball.radius < 0) {
                    state.scores.ai++
                    setAiScore(state.scores.ai)
                    resetBall(1)
                } else if (ball.x - ball.radius > canvas.width) {
                    state.scores.player++
                    setPlayerScore(state.scores.player)
                    resetBall(-1)
                }
            }

            // --- DRAW ELEMENTS ---

            // Function to draw glowing paddles
            const drawPaddle = (x: number, y: number, w: number, h: number, color: string) => {
                ctx.shadowBlur = 20
                ctx.shadowColor = color
                ctx.fillStyle = color

                ctx.beginPath()
                if (ctx.roundRect) {
                    ctx.roundRect(x, y, w, h, 6)
                } else {
                    ctx.rect(x, y, w, h)
                }
                ctx.fill()
                ctx.shadowBlur = 0 // reset
            }

            // Draw Player Paddle (Neon Green)
            drawPaddle(20, player.y, player.width, player.height, '#A3E635')

            // Draw AI Paddle (Neon Indigo)
            drawPaddle(canvas.width - 20 - ai.width, ai.y, ai.width, ai.height, '#818cf8')

            // Draw Glowing Ball
            ctx.shadowBlur = 15
            ctx.shadowColor = '#ffffff'
            ctx.fillStyle = '#ffffff'
            ctx.beginPath()
            ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2)
            ctx.fill()
            ctx.shadowBlur = 0
        }

        // Start loop
        animationId = requestAnimationFrame(gameLoop)

        // Touch and Mouse Controls
        const handleMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect()
            const scaleY = canvas.height / rect.height
            const y = (e.clientY - rect.top) * scaleY
            gameState.current.player.y = y - gameState.current.player.height / 2
        }

        const handleTouchMove = (e: TouchEvent) => {
            // only prevent default if we are playing to stop page scrolling
            if (gameState.current.isPlaying) {
                e.preventDefault()
            }
            const rect = canvas.getBoundingClientRect()
            const scaleY = canvas.height / rect.height
            const y = (e.touches[0].clientY - rect.top) * scaleY
            gameState.current.player.y = y - gameState.current.player.height / 2
        }

        canvas.addEventListener('mousemove', handleMouseMove)
        canvas.addEventListener('touchmove', handleTouchMove, { passive: false })

        return () => {
            cancelAnimationFrame(animationId)
            canvas.removeEventListener('mousemove', handleMouseMove)
            canvas.removeEventListener('touchmove', handleTouchMove)
        }
    }, [])

    return (
        <Section id="minigame" className="py-24">
            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="mb-16">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs text-lime-400 font-medium tracking-wide mb-6">
                        <span className="w-2 h-2 rounded-full bg-lime-400 animate-pulse" />
                        Interactive Protocol
                    </div>
                    <h2 className="text-3xl md:text-5xl font-heading font-bold tracking-tight text-white mb-4">
                        Cyber <span className="text-lime-400">Pong.</span>
                    </h2>
                    <p className="text-gray-400 text-lg max-w-2xl">
                        A classic recreated in a futuristic neon interface. Take control of the green paddle and challenge the AI.
                    </p>
                </div>

                <div className="relative mx-auto max-w-4xl">
                    {/* Glowing background */}
                    <div className="absolute inset-0 bg-lime-400/5 blur-[100px] rounded-full pointer-events-none" />

                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-10 shadow-2xl relative z-10">

                        {/* Scoreboard */}
                        <div className="flex items-center justify-between mb-8 px-4">
                            <div className="flex flex-col items-center">
                                <div className="flex items-center gap-2 text-lime-400 mb-2 font-bold tracking-wider text-xs sm:text-sm uppercase">
                                    <User size={16} /> YOU
                                </div>
                                <div className="text-5xl sm:text-7xl font-heading font-bold text-white drop-shadow-[0_0_15px_rgba(163,230,53,0.5)]">
                                    {playerScore}
                                </div>
                            </div>

                            <div className="flex flex-col items-center gap-4">
                                <button
                                    onClick={togglePlay}
                                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/10 hover:bg-lime-400 hover:text-black border border-white/20 hover:border-lime-400 flex items-center justify-center transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.05)] hover:shadow-[0_0_20px_rgba(163,230,53,0.5)] hover:scale-105 active:scale-95"
                                >
                                    {isPlayingUI ? <Pause size={32} className="ml-0" /> : <Play size={32} className="ml-1" />}
                                </button>
                                <button
                                    onClick={resetGame}
                                    className="text-[10px] sm:text-xs text-gray-500 hover:text-white flex items-center gap-1 transition-colors uppercase tracking-widest font-bold"
                                >
                                    <RotateCcw size={12} /> Reset
                                </button>
                            </div>

                            <div className="flex flex-col items-center">
                                <div className="flex items-center gap-2 text-indigo-400 mb-2 font-bold tracking-wider text-xs sm:text-sm uppercase">
                                    AI <Cpu size={16} />
                                </div>
                                <div className="text-5xl sm:text-7xl font-heading font-bold text-white drop-shadow-[0_0_15px_rgba(99,102,241,0.5)]">
                                    {aiScore}
                                </div>
                            </div>
                        </div>

                        {/* Canvas Container */}
                        <div className="relative w-full aspect-[4/3] sm:aspect-[2/1] rounded-2xl overflow-hidden border border-white/10 bg-[#0b0b0c] shadow-[inset_0_0_50px_rgba(0,0,0,0.8)] touch-none cursor-crosshair">

                            {!isPlayingUI && playerScore === 0 && aiScore === 0 && (
                                <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/60 backdrop-blur-sm pointer-events-none">
                                    <div className="flex flex-col items-center gap-4 animate-pulse">
                                        <Play size={48} className="text-lime-400 opacity-80" />
                                        <span className="text-lime-400 font-mono tracking-widest text-sm sm:text-base uppercase bg-lime-400/10 px-4 py-2 rounded-full border border-lime-400/30">Click Play to Start</span>
                                    </div>
                                </div>
                            )}

                            <canvas
                                ref={canvasRef}
                                width={800}
                                height={400}
                                className="w-full h-full object-cover"
                            />

                            {/* CRT Scanline overlay effect */}
                            <div
                                className="absolute inset-0 pointer-events-none opacity-20"
                                style={{
                                    backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px)`,
                                    backgroundSize: '100% 4px'
                                }}
                            />
                        </div>

                        <div className="mt-6 text-center flex items-center justify-center gap-2 opacity-50">
                            <span className="w-1.5 h-1.5 rounded-full bg-lime-400 animate-pulse" />
                            <span className="text-xs text-gray-400 font-mono">Drag mouse or finger on the screen to control paddle</span>
                            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
                        </div>

                    </div>
                </div>
            </div>
        </Section>
    )
}
