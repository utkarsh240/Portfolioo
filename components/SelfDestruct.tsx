'use client'

import React, { useState } from 'react'
import Matter from 'matter-js'
import { AlertOctagon } from 'lucide-react'

export default function SelfDestruct() {
    const [destroyed, setDestroyed] = useState(false)

    const triggerDestruction = () => {
        if (destroyed) return
        setDestroyed(true)

        // Play an alarm siren using Web Audio API
        const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)()
        const osc = audioCtx.createOscillator()
        const gain = audioCtx.createGain()
        osc.connect(gain)
        gain.connect(audioCtx.destination)
        osc.type = 'sawtooth'

        let freq = 400
        let up = true
        const interval = setInterval(() => {
            if (up) freq += 30
            else freq -= 30
            if (freq > 800) up = false
            if (freq < 400) up = true
            osc.frequency.setValueAtTime(freq, audioCtx.currentTime)
        }, 20)

        osc.start()
        gain.gain.setValueAtTime(0.05, audioCtx.currentTime)

        setTimeout(() => {
            clearInterval(interval)
            osc.stop()
        }, 4000)

        // Add a crazy red flash to the whole body
        document.body.style.transition = 'background-color 0.2s'
        let flashCount = 0
        const flashInterval = setInterval(() => {
            document.body.style.backgroundColor = flashCount % 2 === 0 ? '#450a0a' : '#0b0b0c'
            flashCount++
        }, 200)

        setTimeout(() => {
            clearInterval(flashInterval)
            document.body.style.backgroundColor = '#0b0b0c'
            startPhysics()
        }, 1500)
    }

    const startPhysics = () => {
        // Hide the custom cursors to avoid interference with the dragging
        const cursors = document.querySelectorAll('.custom-cursor-dot, .custom-cursor-outline')
        cursors.forEach((c) => ((c as HTMLElement).style.display = 'none'))

        // 1. Setup Wrapper
        const wrapper = document.createElement('div')
        wrapper.style.position = 'fixed'
        wrapper.style.inset = '0'
        wrapper.style.zIndex = '999999'
        wrapper.style.overflow = 'hidden'
        wrapper.style.pointerEvents = 'auto'
        wrapper.id = 'physics-wrapper'
        document.body.appendChild(wrapper)

        const Engine = Matter.Engine,
            Runner = Matter.Runner,
            Bodies = Matter.Bodies,
            Composite = Matter.Composite,
            Mouse = Matter.Mouse,
            MouseConstraint = Matter.MouseConstraint

        const engine = Engine.create()
        const world = engine.world

        const vw = window.innerWidth
        const vh = window.innerHeight

        // Boundaries
        const ground = Bodies.rectangle(vw / 2, vh + 50, vw * 2, 100, { isStatic: true })
        const wallLeft = Bodies.rectangle(-50, vh / 2, 100, vh * 2, { isStatic: true })
        const wallRight = Bodies.rectangle(vw + 50, vh / 2, 100, vh * 2, { isStatic: true })
        Composite.add(world, [ground, wallLeft, wallRight])

        // Find targets to detach and drop
        // We want visually distinct blocks: images, headings, buttons, cards, list items
        const targets = Array.from(document.querySelectorAll('h1, h2, h3, h4, p, a, button, img, li, .project-card, .glass-panel, svg'))

        // Reverse it so children are processed before parents, though we'll just skip children of already processed
        const elements: { body: Matter.Body, el: HTMLElement, originLeft: number, originTop: number }[] = []

        // To prevent nesting issues (duplicating children)
        const processedNodes = new Set<Node>()

        targets.forEach((node) => {
            const el = node as HTMLElement
            // skip if hidden, part of our physics wrapper, or parent already processed
            if (el.closest('#physics-wrapper') || el.closest('#self-destruct-container')) return

            let parent = el.parentElement
            while (parent) {
                if (processedNodes.has(parent)) return
                parent = parent.parentElement
            }

            const rect = el.getBoundingClientRect()
            // Only grab things currently somewhat visible to avoid huge computations
            if (rect.top > vh * 1.5 || rect.bottom < -vh * 0.5 || rect.width === 0 || rect.height === 0) return

            processedNodes.add(el)

            // Clone it
            const clone = el.cloneNode(true) as HTMLElement

            // Compute styles to freeze its original look
            const computed = window.getComputedStyle(el)
            clone.style.margin = '0'
            clone.style.position = 'absolute'
            clone.style.left = `${rect.left}px`
            clone.style.top = `${rect.top}px`
            clone.style.width = `${rect.width}px`
            clone.style.height = `${rect.height}px`
            clone.style.boxSizing = 'border-box'

            // Preserve critical visual styles
            clone.style.color = computed.color
            clone.style.backgroundColor = computed.backgroundColor
            clone.style.fontSize = computed.fontSize
            clone.style.fontFamily = computed.fontFamily
            clone.style.fontWeight = computed.fontWeight
            clone.style.lineHeight = computed.lineHeight
            clone.style.padding = computed.padding
            clone.style.border = computed.border
            clone.style.borderRadius = computed.borderRadius
            clone.style.boxShadow = computed.boxShadow
            clone.style.zIndex = '10'

            // Disable pointer events on children so MouseConstraint grabs the whole block
            clone.style.pointerEvents = 'none'

            wrapper.appendChild(clone)
            // Hide original
            el.style.opacity = '0'

            // Create physics body
            const x = rect.left + rect.width / 2
            const y = rect.top + rect.height / 2
            const body = Bodies.rectangle(x, y, rect.width, rect.height, {
                restitution: 0.6,
                friction: 0.1,
                frictionAir: 0.02,
                density: 0.005,
            })

            Composite.add(world, body)
            elements.push({ body, el: clone, originLeft: rect.left, originTop: rect.top })
        })

        // Mouse constraint for throwing elements around
        const mouse = Mouse.create(wrapper)
        const mConstraint = MouseConstraint.create(engine, {
            mouse: mouse,
            constraint: {
                stiffness: 0.2,
                render: { visible: false }
            }
        })
        Composite.add(world, mConstraint)

        // Run engine
        Runner.run(Runner.create(), engine)

        // Sync DOM with physics engine
        const update = () => {
            elements.forEach(({ body, el, originLeft, originTop }) => {
                const width = parseFloat(el.style.width)
                const height = parseFloat(el.style.height)

                const tx = body.position.x - width / 2 - originLeft
                const ty = body.position.y - height / 2 - originTop

                el.style.transform = `translate(${tx}px, ${ty}px) rotate(${body.angle}rad)`
            })
            requestAnimationFrame(update)
        }
        update()
    }

    return (
        <div className="flex justify-center my-12 relative z-[9999] w-full" id="self-destruct-container">
            {!destroyed && (
                <button
                    onClick={triggerDestruction}
                    className="group relative flex items-center justify-center gap-3 px-10 py-5 bg-red-500/10 text-red-500 border-2 border-red-500/40 text-[14px] tracking-[0.2em] font-black uppercase font-mono rounded-full hover:bg-red-500 hover:text-black hover:border-red-500 transition-all duration-300 hover:shadow-[0_0_50px_rgba(239,68,68,0.9)] active:scale-90"
                >
                    <AlertOctagon size={24} className="group-hover:animate-ping" />
                    <span>Do Not Press</span>
                </button>
            )}
            {destroyed && (
                <div className="text-red-500 font-mono font-bold text-2xl md:text-5xl animate-pulse whitespace-nowrap drop-shadow-[0_0_20px_rgba(239,68,68,1)] text-center">
                    SYSTEM CORE FAILURE
                </div>
            )}
        </div>
    )
}
