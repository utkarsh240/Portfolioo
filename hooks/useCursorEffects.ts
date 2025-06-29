'use client'
import { useEffect, useState } from 'react'

// Utility to clamp a value between min and max
const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value))

// Utility to map a value from one range to another
const mapRange = (value: number, inMin: number, inMax: number, outMin: number, outMax: number) => {
  return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin
}

export function useCursorEffects() {
  const [cursor, setCursor] = useState({ x: 0.5, y: 0.5, rawX: 0, rawY: 0 })

  useEffect(() => {
    if (typeof window === 'undefined') return
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize cursor position (0-1)
      const x = clamp(e.clientX / window.innerWidth, 0, 1)
      const y = clamp(e.clientY / window.innerHeight, 0, 1)
      setCursor({ x, y, rawX: e.clientX, rawY: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Utility: Get proximity (0-1) to a DOMRect
  const getProximity = (rect: DOMRect) => {
    if (typeof window === 'undefined') return 0
    const cx = cursor.rawX
    const cy = cursor.rawY
    const dx = Math.max(rect.left - cx, 0, cx - rect.right)
    const dy = Math.max(rect.top - cy, 0, cy - rect.bottom)
    const distance = Math.sqrt(dx * dx + dy * dy)
    // Map distance to proximity (closer = 1, farther = 0)
    const maxDist = Math.sqrt(window.innerWidth ** 2 + window.innerHeight ** 2) / 2
    return clamp(1 - distance / maxDist, 0, 1)
  }

  return { ...cursor, getProximity, mapRange }
} 