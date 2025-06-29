'use client'

import { Suspense, useRef, useEffect, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { optimizeThreeJS, throttle } from '@/utils/performance'
import { useCursorContext } from '@/context/CursorContext'

// Register ScrollTrigger
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

interface FloatingCardProps {
  position: [number, number, number]
  rotation: [number, number, number]
  children: React.ReactNode
  color: string
  enableAnimations: boolean
}

// Floating Card Component
function FloatingCard({ position, rotation, children, color, enableAnimations }: FloatingCardProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const initialY = position[1]

  useFrame((state) => {
    if (meshRef.current && enableAnimations) {
      // Gentle floating animation
      meshRef.current.position.y = initialY + Math.sin(state.clock.elapsedTime * 0.5) * 0.5
      meshRef.current.rotation.y += 0.005
    }
  })

  return (
    <mesh ref={meshRef} position={position} rotation={rotation}>
      <boxGeometry args={[2, 1, 0.1]} />
      <meshStandardMaterial color={color} transparent opacity={0.1} />
      <Html center>
        <div className="bg-dark-800/80 backdrop-blur-sm px-4 py-2 rounded-lg text-xs font-mono text-white border border-primary-500/30">
          {children}
        </div>
      </Html>
    </mesh>
  )
}

interface RotatingIconProps {
  position: [number, number, number]
  icon: string
  color: string
  enableAnimations: boolean
}

// Rotating Icon Component
function RotatingIcon({ position, icon, color, enableAnimations }: RotatingIconProps) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current && enableAnimations) {
      meshRef.current.rotation.y += 0.02
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1
    }
  })

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[0.3, 16, 16]} />
      <meshStandardMaterial color={color} transparent opacity={0.3} />
      <Html center>
        <div className="text-primary-400 text-lg">{icon}</div>
      </Html>
    </mesh>
  )
}

// Camera Controller
function CameraController() {
  const { camera } = useThree()
  const cameraRef = useRef(camera)
  const [performance] = useState(() => optimizeThreeJS())

  useEffect(() => {
    if (!performance.enableAnimations) return

    // Throttled scroll handler for smooth camera panning
    const handleScroll = throttle(() => {
      const scrollY = window.scrollY
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight - windowHeight
      const scrollProgress = scrollY / documentHeight

      // Pan camera based on scroll
      gsap.to(cameraRef.current.position, {
        x: scrollProgress * 10,
        y: scrollProgress * 5,
        duration: 0.5,
        ease: 'power2.out'
      })
    }, 16) // ~60fps

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [performance.enableAnimations])

  return null
}

// Main Scene Component
function Scene() {
  const [performance] = useState(() => optimizeThreeJS())

  const floatingElements = [
    { position: [3, 2, -2] as [number, number, number], rotation: [0, 0.5, 0] as [number, number, number], color: '#0ea5e9', text: 'React.js' },
    { position: [-3, 3, 1] as [number, number, number], rotation: [0, -0.3, 0] as [number, number, number], color: '#3b82f6', text: 'Next.js' },
    { position: [2, 4, -1] as [number, number, number], rotation: [0, 0.8, 0] as [number, number, number], color: '#8b5cf6', text: 'TypeScript' },
    { position: [-2, 1, 2] as [number, number, number], rotation: [0, -0.6, 0] as [number, number, number], color: '#06b6d4', text: 'Python' },
    { position: [4, 3, -3] as [number, number, number], rotation: [0, 0.2, 0] as [number, number, number], color: '#10b981', text: 'Java' },
  ]

  const rotatingIcons = [
    { position: [1, 5, 0] as [number, number, number], icon: '⚛️', color: '#0ea5e9' },
    { position: [-1, 6, 1] as [number, number, number], icon: '🔷', color: '#3b82f6' },
    { position: [2, 4, -2] as [number, number, number], icon: '🔶', color: '#8b5cf6' },
    { position: [-2, 3, 2] as [number, number, number], icon: '🐍', color: '#10b981' },
  ]

  return (
    <Canvas 
      camera={{ position: [0, 0, 10], fov: 60 }}
      gl={{ 
        antialias: performance.quality === 'high',
        powerPreference: 'high-performance',
        alpha: false,
        stencil: false,
        depth: true
      }}
      dpr={performance.quality === 'high' ? window.devicePixelRatio : 1}
    >
      <ambientLight intensity={0.3} />
      <directionalLight position={[10, 10, 5]} intensity={0.8} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} />

      <CameraController />

      {/* Floating Cards */}
      {floatingElements.map((element, index) => (
        <FloatingCard key={index} {...element} enableAnimations={performance.enableAnimations}>
          {element.text}
        </FloatingCard>
      ))}

      {/* Rotating Icons */}
      {rotatingIcons.map((icon, index) => (
        <RotatingIcon key={index} {...icon} enableAnimations={performance.enableAnimations} />
      ))}
    </Canvas>
  )
}

const AnimatedBackground = () => {
  const [isVisible, setIsVisible] = useState(false)
  const bgRef = useRef<HTMLDivElement>(null)
  const cursor = useCursorContext() || { x: 0.5, y: 0.5 }
  const { x, y } = cursor

  useEffect(() => {
    if (!isVisible || !bgRef.current) return
    // Multi-color interpolation: center, edge, and corner
    const colors = [
      { r: 26, g: 26, b: 26 },      // #1A1A1A (base)
      { r: 48, g: 43, b: 99 },      // #302B63 (secondary)
      { r: 69, g: 60, b: 103 },     // #453C67 (center accent)
      { r: 0, g: 240, b: 255 },     // #00F0FF (cyan accent)
    ]
    // Interpolate between center and corners
    const dx = x - 0.5
    const dy = y - 0.5
    const dist = Math.sqrt(dx * dx + dy * dy) * 2
    // Blend: center (closer to 0) is accent, edge/corner is base/secondary
    const r = Math.round(colors[2].r * (1 - dist) + colors[1].r * dist)
    const g = Math.round(colors[2].g * (1 - dist) + colors[1].g * dist)
    const b = Math.round(colors[2].b * (1 - dist) + colors[1].b * dist)
    const color = `rgb(${r},${g},${b})`
    gsap.to(bgRef.current, {
      backgroundColor: color,
      duration: 0.7,
      ease: 'power2.out',
    })
  }, [x, y, isVisible])

  useEffect(() => {
    // Lazy load the 3D background
    const timer = setTimeout(() => setIsVisible(true), 100)
    return () => clearTimeout(timer)
  }, [])

  if (!isVisible) {
    return <div ref={bgRef} className="fixed inset-0 z-0 pointer-events-none bg-[#1A1A1A]" />
  }

  // Parallax SVG layer
  const parallaxX = (x - 0.5) * 80
  const parallaxY = (y - 0.5) * 80

  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <div ref={bgRef} className="absolute inset-0 w-full h-full" style={{ zIndex: 0, pointerEvents: 'none' }} />
      {/* Parallax SVG blob */}
      <svg
        width="400" height="400" viewBox="0 0 400 400"
        style={{ position: 'absolute', left: `calc(50% - 200px + ${parallaxX}px)`, top: `calc(50% - 200px + ${parallaxY}px)`, zIndex: 1, opacity: 0.18, pointerEvents: 'none' }}
      >
        <ellipse cx="200" cy="200" rx="160" ry="120" fill="#00F0FF" />
      </svg>
      <Suspense fallback={<div className="w-full h-full bg-[#1A1A1A]" />}> 
        <Scene />
      </Suspense>
    </div>
  )
}

export default AnimatedBackground 