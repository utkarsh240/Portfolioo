'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface CursorState {
  x: number
  y: number
  rawX: number
  rawY: number
  isActive: boolean
}

const CursorContext = createContext<CursorState | null>(null)

interface CursorProviderProps {
  children: ReactNode
}

export function CursorProvider({ children }: CursorProviderProps) {
  const [cursor, setCursor] = useState<CursorState>({ x: 0.5, y: 0.5, rawX: 0, rawY: 0, isActive: false })

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      setCursor(c => ({
        ...c,
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
        rawX: e.clientX,
        rawY: e.clientY,
      }))
    }
    const handleDown = () => setCursor(c => ({ ...c, isActive: true }))
    const handleUp = () => setCursor(c => ({ ...c, isActive: false }))
    window.addEventListener('mousemove', handleMove)
    window.addEventListener('mousedown', handleDown)
    window.addEventListener('mouseup', handleUp)
    return () => {
      window.removeEventListener('mousemove', handleMove)
      window.removeEventListener('mousedown', handleDown)
      window.removeEventListener('mouseup', handleUp)
    }
  }, [])

  return <CursorContext.Provider value={cursor}>{children}</CursorContext.Provider>
}

export function useCursorContext(): CursorState {
  const context = useContext(CursorContext)
  if (context === null) {
    throw new Error('useCursorContext must be used within a CursorProvider')
  }
  return context
} 