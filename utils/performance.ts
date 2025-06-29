// Performance optimization utilities

export const throttle = (func: Function, limit: number) => {
  let inThrottle: boolean
  return function(this: any, ...args: any[]) {
    if (!inThrottle) {
      func.apply(this, args)
      inThrottle = true
      setTimeout(() => inThrottle = false, limit)
    }
  }
}

export const debounce = (func: Function, wait: number) => {
  let timeout: NodeJS.Timeout
  return function(this: any, ...args: any[]) {
    clearTimeout(timeout)
    timeout = setTimeout(() => func.apply(this, args), wait)
  }
}

// Optimize Three.js rendering
export const optimizeThreeJS = () => {
  if (typeof window !== 'undefined') {
    // Reduce motion for users who prefer it
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    
    if (prefersReducedMotion) {
      return {
        enableAnimations: false,
        frameRate: 30,
        quality: 'low'
      }
    }
    
    // Check device performance
    const isLowEndDevice = navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4
    
    if (isLowEndDevice) {
      return {
        enableAnimations: true,
        frameRate: 30,
        quality: 'medium'
      }
    }
    
    return {
      enableAnimations: true,
      frameRate: 60,
      quality: 'high'
    }
  }
  
  return {
    enableAnimations: true,
    frameRate: 60,
    quality: 'high'
  }
}

// Lazy loading utility
export const lazyLoad = (importFunc: () => Promise<any>) => {
  return new Promise((resolve) => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          importFunc().then(resolve)
          observer.disconnect()
        }
      })
    })
    
    return observer
  })
} 