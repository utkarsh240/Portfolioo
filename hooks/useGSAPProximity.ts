import { useEffect, RefObject } from 'react'
import { gsap } from 'gsap'
import { useCursorContext } from '@/context/CursorContext'
import { useReducedMotion } from './useReducedMotion'

interface ProximityOptions {
  (proximity: number): gsap.TweenVars
}

export function useGSAPProximity(ref: RefObject<HTMLElement>, options: ProximityOptions) {
  const { rawX, rawY } = useCursorContext()
  const reduced = useReducedMotion()
  
  useEffect(() => {
    if (!ref.current || reduced) return
    
    let frameId: number
    
    const animate = () => {
      const rect = ref.current!.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dx = rawX - cx
      const dy = rawY - cy
      const dist = Math.sqrt(dx * dx + dy * dy)
      const maxDist = Math.sqrt(window.innerWidth ** 2 + window.innerHeight ** 2) / 2
      const proximity = 1 - Math.min(dist / maxDist, 1)
      
      gsap.to(ref.current, {
        ...options(proximity),
        duration: 0.4,
        ease: 'power2.out',
      })
      
      frameId = requestAnimationFrame(animate)
    }
    
    animate()
    
    return () => {
      if (frameId) {
        cancelAnimationFrame(frameId)
      }
    }
  }, [rawX, rawY, ref, options, reduced])
} 