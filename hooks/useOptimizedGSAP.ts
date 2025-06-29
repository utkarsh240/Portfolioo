import { useEffect, useRef, useCallback } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { throttle, debounce } from '@/utils/performance'

// Register ScrollTrigger
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export const useOptimizedGSAP = () => {
  const animationsRef = useRef<gsap.core.Timeline[]>([])
  const scrollTriggersRef = useRef<ScrollTrigger[]>([])

  // Check for reduced motion preference
  const prefersReducedMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false

  const createScrollTrigger = useCallback((
    trigger: string | Element,
    animation: gsap.TweenVars,
    scrollTriggerConfig: ScrollTrigger.Vars = {}
  ) => {
    if (prefersReducedMotion) {
      // Apply instant animation for users who prefer reduced motion
      const element = typeof trigger === 'string' ? document.querySelector(trigger) : trigger
      if (element) {
        gsap.set(element, animation)
      }
      return null
    }

    const scrollTrigger = ScrollTrigger.create({
      trigger,
      start: 'top 80%',
      end: 'bottom 20%',
      toggleActions: 'play none none reverse',
      ...scrollTriggerConfig
    })

    const tl = gsap.timeline({ scrollTrigger })
    tl.to(trigger, animation)
    
    animationsRef.current.push(tl)
    scrollTriggersRef.current.push(scrollTrigger)
    
    return { timeline: tl, scrollTrigger }
  }, [prefersReducedMotion])

  const createStaggerAnimation = useCallback((
    elements: string | Element[],
    animation: gsap.TweenVars,
    staggerConfig: { delay?: number; stagger?: number } = {}
  ) => {
    if (prefersReducedMotion) {
      // Apply instant animation for users who prefer reduced motion
      const elementList = typeof elements === 'string' 
        ? document.querySelectorAll(elements) 
        : elements
      
      elementList.forEach((element, index) => {
        gsap.set(element, {
          ...animation,
          delay: index * (staggerConfig.stagger || 0.1)
        })
      })
      return null
    }

    const tl = gsap.timeline()
    tl.to(elements, {
      ...animation,
      stagger: staggerConfig.stagger || 0.1,
      delay: staggerConfig.delay || 0
    })
    
    animationsRef.current.push(tl)
    return tl
  }, [prefersReducedMotion])

  const createParallaxEffect = useCallback((
    element: string | Element,
    speed: number = 0.5
  ) => {
    if (prefersReducedMotion) return null

    const parallaxTrigger = ScrollTrigger.create({
      trigger: element,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true
    })

    const tl = gsap.timeline({ scrollTrigger: parallaxTrigger })
    tl.to(element, {
      y: (i, target) => -target.offsetHeight * speed,
      ease: 'none'
    })
    
    animationsRef.current.push(tl)
    scrollTriggersRef.current.push(parallaxTrigger)
    
    return { timeline: tl, scrollTrigger: parallaxTrigger }
  }, [prefersReducedMotion])

  const createFadeInUp = useCallback((
    element: string | Element,
    delay: number = 0
  ) => {
    return createScrollTrigger(element, {
      opacity: 1,
      y: 0,
      duration: 1,
      delay,
      ease: 'power3.out'
    }, {
      start: 'top 85%',
      end: 'bottom 15%'
    })
  }, [createScrollTrigger])

  const createScaleIn = useCallback((
    element: string | Element,
    delay: number = 0
  ) => {
    return createScrollTrigger(element, {
      opacity: 1,
      scale: 1,
      duration: 0.8,
      delay,
      ease: 'back.out(1.7)'
    }, {
      start: 'top 90%',
      end: 'bottom 10%'
    })
  }, [createScrollTrigger])

  // Cleanup function
  const cleanup = useCallback(() => {
    animationsRef.current.forEach(tl => tl.kill())
    scrollTriggersRef.current.forEach(st => st.kill())
    animationsRef.current = []
    scrollTriggersRef.current = []
  }, [])

  // Auto cleanup on unmount
  useEffect(() => {
    return cleanup
  }, [cleanup])

  return {
    createScrollTrigger,
    createStaggerAnimation,
    createParallaxEffect,
    createFadeInUp,
    createScaleIn,
    cleanup,
    prefersReducedMotion
  }
} 