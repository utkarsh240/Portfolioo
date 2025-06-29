'use client'
import { useEffect, useState } from 'react'

export function useReducedMotion() {
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return

    let mq: MediaQueryList | undefined
    try {
      mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    } catch (e) {
      return
    }
    if (!mq) return
    setReduced(mq.matches)
    const handler = () => setReduced(mq!.matches)
    if (typeof mq.addEventListener === 'function') {
      mq.addEventListener('change', handler)
      return () => mq && mq.removeEventListener('change', handler)
    } else if (typeof mq.addListener === 'function') {
      mq.addListener(handler)
      return () => mq && mq.removeListener(handler)
    }
    // fallback: no-op cleanup
    return () => {}
  }, [])

  return reduced
} 