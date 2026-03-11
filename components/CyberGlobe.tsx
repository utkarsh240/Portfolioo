'use client'

import React, { useRef, useEffect } from 'react'
import { useScroll } from 'framer-motion'

export default function CyberGlobe() {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const { scrollYProgress } = useScroll()
    const animationRef = useRef<number>(0)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        // Dynamically import Three.js only on the client
        let cleanup = false

        import('three').then((THREE) => {
            if (cleanup) return

            const scene = new THREE.Scene()
            const camera = new THREE.PerspectiveCamera(45, canvas.clientWidth / canvas.clientHeight, 0.1, 100)
            camera.position.z = 5

            const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
            renderer.setSize(canvas.clientWidth, canvas.clientHeight)
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
            renderer.setClearColor(0x000000, 0)

            // --- Galaxy Particles ---
            const particleCount = 4000
            const positions = new Float32Array(particleCount * 3)
            for (let i = 0; i < particleCount; i++) {
                const r = 3.5 * Math.cbrt(Math.random())
                const theta = Math.random() * 2 * Math.PI
                const phi = Math.acos(2 * Math.random() - 1)
                positions[i * 3] = r * Math.sin(phi) * Math.cos(theta)
                positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.3 // Disk shape
                positions[i * 3 + 2] = r * Math.cos(phi)
            }

            const particleGeometry = new THREE.BufferGeometry()
            particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))

            const particleMaterial = new THREE.PointsMaterial({
                color: 0x00ffff,
                size: 0.03,
                sizeAttenuation: true,
                transparent: true,
                depthWrite: false,
                blending: THREE.AdditiveBlending,
            })

            const particles = new THREE.Points(particleGeometry, particleMaterial)
            particles.rotation.z = Math.PI / 4
            scene.add(particles)

            // --- Wireframe Core ---
            const coreGeometry = new THREE.OctahedronGeometry(1, 0)
            const coreMaterial = new THREE.MeshBasicMaterial({
                color: 0xa3e635,
                wireframe: true,
                transparent: true,
                opacity: 0.3,
            })
            const core = new THREE.Mesh(coreGeometry, coreMaterial)
            scene.add(core)

            // --- Resize handler ---
            const handleResize = () => {
                if (!canvas.parentElement) return
                const w = canvas.parentElement.clientWidth
                const h = canvas.parentElement.clientHeight
                renderer.setSize(w, h)
                camera.aspect = w / h
                camera.updateProjectionMatrix()
            }
            window.addEventListener('resize', handleResize)
            handleResize()

            // --- Animation Loop ---
            const clock = new THREE.Clock()
            const targetScale = new THREE.Vector3(1, 1, 1)

            const animate = () => {
                if (cleanup) return
                animationRef.current = requestAnimationFrame(animate)

                const delta = clock.getDelta()

                // Base rotation
                particles.rotation.y += delta * 0.05
                particles.rotation.z += delta * 0.02
                core.rotation.x -= delta * 0.2
                core.rotation.y -= delta * 0.3

                // Scroll-linked effects
                const scrollVelocity = scrollYProgress.getVelocity()
                if (Math.abs(scrollVelocity) > 0) {
                    particles.rotation.y += scrollVelocity * 0.1
                    particles.rotation.x += scrollVelocity * 0.05

                    const distortion = 1 + Math.abs(scrollVelocity) * 0.5
                    targetScale.set(1, distortion, 1)
                } else {
                    targetScale.set(1, 1, 1)
                }
                core.scale.lerp(targetScale, 0.1)

                // Breathing effect
                const breathe = 1 + Math.sin(clock.elapsedTime * 0.5) * 0.05
                particles.scale.set(breathe, breathe, breathe)

                renderer.render(scene, camera)
            }
            animate()

                // Store cleanup for resize
                ; (canvas as any).__threeCleanup = () => {
                    window.removeEventListener('resize', handleResize)
                    renderer.dispose()
                    particleGeometry.dispose()
                    particleMaterial.dispose()
                    coreGeometry.dispose()
                    coreMaterial.dispose()
                }
        })

        return () => {
            cleanup = true
            if (animationRef.current) cancelAnimationFrame(animationRef.current)
            if ((canvas as any).__threeCleanup) (canvas as any).__threeCleanup()
        }
    }, [scrollYProgress])

    return (
        <canvas
            ref={canvasRef}
            className="w-full h-full"
            style={{ display: 'block' }}
        />
    )
}
