'use client'

import { Suspense, useRef, useEffect, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Text, Html } from '@react-three/drei'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { optimizeThreeJS, throttle } from '@/utils/performance'

// Register ScrollTrigger
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

// Floating Card Component
function FloatingCard({ position, rotation, children, color, enableAnimations }: any) {
  const meshRef = useRef<any>()
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

// Rotating Icon Component
function RotatingIcon({ position, icon, color, enableAnimations }: any) {
  const meshRef = useRef<any>()

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
    { position: [3, 2, -2], rotation: [0, 0.5, 0], color: '#0ea5e9', text: 'React.js' },
    { position: [-3, 3, 1], rotation: [0, -0.3, 0], color: '#3b82f6', text: 'Next.js' },
    { position: [2, 4, -1], rotation: [0, 0.8, 0], color: '#8b5cf6', text: 'TypeScript' },
    { position: [-2, 1, 2], rotation: [0, -0.6, 0], color: '#06b6d4', text: 'Python' },
    { position: [4, 3, -3], rotation: [0, 0.2, 0], color: '#10b981', text: 'Java' },
  ]

  const rotatingIcons = [
    { position: [1, 5, 0], icon: '⚛️', color: '#0ea5e9' },
    { position: [-1, 6, 1], icon: '🔷', color: '#3b82f6' },
    { position: [2, 4, -2], icon: '🔶', color: '#8b5cf6' },
    { position: [-2, 3, 2], icon: '🐍', color: '#10b981' },
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

  useEffect(() => {
    // Lazy load the 3D background
    const timer = setTimeout(() => setIsVisible(true), 100)
    return () => clearTimeout(timer)
  }, [])

  if (!isVisible) {
    return <div className="fixed inset-0 z-0 pointer-events-none bg-dark-900" />
  }

  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Suspense fallback={<div className="w-full h-full bg-dark-900" />}>
        <Scene />
      </Suspense>
    </div>
  )
}

export default AnimatedBackground 