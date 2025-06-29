'use client'

import { Suspense, useRef } from 'react'
import { motion } from 'framer-motion'
import { Canvas } from '@react-three/fiber'
import { Physics, useBox, usePlane } from '@react-three/cannon'
import { OrbitControls, Text, Html } from '@react-three/drei'
import { ChevronDown, Github, Linkedin, Mail } from 'lucide-react'
import { Mesh } from 'three'

// Physics Box Component
function PhysicsBox({ position, color, size = 1 }: { position: [number, number, number], color: string, size?: number }) {
  const [ref] = useBox<Mesh>(() => ({
    mass: 1,
    position,
    args: [size, size, size],
  }))

  return (
    <mesh ref={ref} castShadow>
      <boxGeometry args={[size, size, size]} />
      <meshStandardMaterial color={color} />
    </mesh>
  )
}

// Ground Plane
function Ground() {
  const [ref] = usePlane<Mesh>(() => ({
    rotation: [-Math.PI / 2, 0, 0],
    position: [0, -5, 0],
    type: 'Static',
  }))

  return (
    <mesh ref={ref} receiveShadow>
      <planeGeometry args={[50, 50]} />
      <meshStandardMaterial color="#1e293b" transparent opacity={0.3} />
    </mesh>
  )
}

// Developer-themed floating objects
function FloatingObjects() {
  const objects = [
    { position: [2, 3, 0], color: '#0ea5e9', text: 'React.js' },
    { position: [-2, 4, 1], color: '#3b82f6', text: 'Next.js' },
    { position: [1, 5, -1], color: '#8b5cf6', text: 'TypeScript' },
    { position: [-1, 2, 2], color: '#06b6d4', text: 'Python' },
    { position: [3, 4, -2], color: '#10b981', text: 'Java' },
  ]

  return (
    <>
      {objects.map((obj, index) => (
        <Html key={index} position={obj.position as [number, number, number]} center>
          <div className="bg-dark-800 px-3 py-1 rounded-lg text-xs font-mono text-white border border-primary-500">
            {obj.text}
          </div>
        </Html>
      ))}
    </>
  )
}

// 3D Scene Component
function Scene() {
  return (
    <Canvas shadows camera={{ position: [0, 5, 10], fov: 50 }}>
      <ambientLight intensity={0.3} />
      <directionalLight
        position={[10, 10, 5]}
        intensity={1}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      
      <Physics gravity={[0, -9.81, 0]}>
        <PhysicsBox position={[0, 5, 0]} color="#0ea5e9" />
        <PhysicsBox position={[2, 8, 0]} color="#3b82f6" />
        <PhysicsBox position={[-2, 6, 1]} color="#8b5cf6" />
        <PhysicsBox position={[1, 7, -1]} color="#06b6d4" />
        <PhysicsBox position={[-1, 9, -2]} color="#10b981" />
        <Ground />
      </Physics>
      
      <FloatingObjects />
      <OrbitControls enableZoom={false} enablePan={false} />
    </Canvas>
  )
}

const Hero = () => {
  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <Suspense fallback={<div className="w-full h-full bg-dark-900" />}>
          <Scene />
        </Suspense>
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          {/* Greeting */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-primary-400 font-mono text-lg"
          >
            Hello, I'm
          </motion.p>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold gradient-text"
          >
            Utkarsh Kumar Gupta
          </motion.h1>

          {/* Title */}
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-2xl md:text-3xl text-gray-300 font-medium"
          >
            Computer Science Student & Full Stack Developer
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed px-2 sm:px-0"
          >
            I build modern web applications and love solving real-world problems with code.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={scrollToAbout}
              className="btn-primary"
            >
              Learn More
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn-secondary"
            >
              Get In Touch
            </motion.button>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="flex justify-center space-x-6 pt-8"
          >
            <motion.a
              href="https://github.com/utkarsh240"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, y: -2 }}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <Github size={24} />
            </motion.a>
            <motion.a
              href="https://www.linkedin.com/in/utkarsh-gupta-53647b217/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, y: -2 }}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <Linkedin size={24} />
            </motion.a>
            <motion.a
              href="mailto:utk24g@gmail.com"
              whileHover={{ scale: 1.2, y: -2 }}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <Mail size={24} />
            </motion.a>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.button
          onClick={scrollToAbout}
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-gray-400 hover:text-white transition-colors"
        >
          <ChevronDown size={32} />
        </motion.button>
      </motion.div>
    </section>
  )
}

export default Hero 