'use client'
import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { useCursorContext } from '@/context/CursorContext'

export default function CustomCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const { rawX, rawY, isActive } = useCursorContext()
  useEffect(() => {
    gsap.to(dotRef.current, {
      x: rawX,
      y: rawY,
      scale: isActive ? 1.2 : 1,
      backgroundColor: isActive ? '#00F0FF' : '#FFCC00',
      duration: 0.2,
      ease: 'power2.out',
    })
    gsap.to(ringRef.current, {
      x: rawX,
      y: rawY,
      scale: isActive ? 1.5 : 1,
      borderColor: isActive ? '#00F0FF' : '#FFCC00',
      opacity: isActive ? 0.5 : 0.2,
      duration: 0.3,
      ease: 'power2.out',
    })
  }, [rawX, rawY, isActive])
  return (
    <>
      <div ref={dotRef} style={{pointerEvents:'none'}} className='fixed z-[9999] w-3 h-3 rounded-full bg-[#FFCC00] mix-blend-difference'/>
      <div ref={ringRef} style={{pointerEvents:'none'}} className='fixed z-[9998] w-12 h-12 rounded-full border-2 border-[#FFCC00]'/>
    </>
  )
} 