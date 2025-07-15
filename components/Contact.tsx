'use client'

import React from 'react'
import { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Mail, Phone, MapPin, Github, Linkedin, Send } from 'lucide-react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useCursorEffects } from '@/hooks/useCursorEffects'

// Register ScrollTrigger
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const Contact = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const sectionRef = useRef<HTMLElement>(null)
  const contactInfoRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLDivElement>(null)
  const socialIconRefs = useRef<(HTMLAnchorElement | null)[]>([])
  const sendBtnRef = useRef<HTMLButtonElement>(null)

  const { rawX, rawY } = useCursorEffects()

  useEffect(() => {
    if (sectionRef.current) {
      // Animate section on scroll
      gsap.fromTo(
        sectionRef.current,
        { opacity: 0, y: 100 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
          }
        }
      )
    }

    if (contactInfoRef.current) {
      // Stagger animation for contact info
      const items = contactInfoRef.current.querySelectorAll('[data-stagger]')
      gsap.fromTo(
        items,
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: contactInfoRef.current,
            start: 'top 85%',
            end: 'bottom 15%',
            toggleActions: 'play none none reverse'
          }
        }
      )
    }

    if (formRef.current) {
      // Animate form
      gsap.fromTo(
        formRef.current,
        { opacity: 0, x: 50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: formRef.current,
            start: 'top 85%',
            end: 'bottom 15%',
            toggleActions: 'play none none reverse'
          }
        }
      )
    }
  }, [])

  // Animate social icons and send button on cursor proximity
  useEffect(() => {
    const animateSocialIcons = () => {
      socialIconRefs.current.forEach((icon) => {
        if (icon) {
          const rect = icon.getBoundingClientRect()
          const cx = rect.left + rect.width / 2
          const cy = rect.top + rect.height / 2
          const dx = rawX - cx
          const dy = rawY - cy
          const dist = Math.sqrt(dx * dx + dy * dy)
          const maxDist = Math.sqrt(window.innerWidth ** 2 + window.innerHeight ** 2) / 2
          const proximity = 1 - Math.min(dist / maxDist, 1)
          
          gsap.to(icon, {
            color: proximity > 0.7 ? '#8BC34A' : '#A0A0A0',
            opacity: 0.7 + proximity * 0.3,
            boxShadow: proximity > 0.7 ? '0 0 16px rgba(139, 195, 74, 0.3)' : 'none',
            scale: 1 + proximity * 0.08,
            duration: 0.4,
            ease: 'power2.out',
          })
        }
      })
    }

    const animateSendBtn = () => {
      if (sendBtnRef.current) {
        const rect = sendBtnRef.current.getBoundingClientRect()
        const cx = rect.left + rect.width / 2
        const cy = rect.top + rect.height / 2
        const dx = rawX - cx
        const dy = rawY - cy
        const dist = Math.sqrt(dx * dx + dy * dy)
        const maxDist = Math.sqrt(window.innerWidth ** 2 + window.innerHeight ** 2) / 2
        const proximity = 1 - Math.min(dist / maxDist, 1)
        
        gsap.to(sendBtnRef.current, {
          backgroundColor: proximity > 0.7 ? '#8BC34A' : '#2C2C2C',
          color: proximity > 0.7 ? '#1A1A1A' : '#F0F0F0',
          boxShadow: proximity > 0.7 ? '0 0 24px rgba(139, 195, 74, 0.3)' : 'none',
          scale: 1 + proximity * 0.06,
          duration: 0.4,
          ease: 'power2.out',
        })
      }
    }

    const animate = () => {
      animateSocialIcons()
      animateSendBtn()
      requestAnimationFrame(animate)
    }

    const frameId = requestAnimationFrame(animate)
    
    return () => {
      cancelAnimationFrame(frameId)
    }
  }, [rawX, rawY])

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Here you would typically send the form data to your backend
    console.log('Form submitted:', formData)
    
    // Reset form
    setFormData({ name: '', email: '', subject: '', message: '' })
    setIsSubmitting(false)
    
    // Show success message (you can implement a toast notification here)
    alert('Thank you for your message! I&apos;ll get back to you soon.')
  }

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      value: 'utk24g@gmail.com',
      link: 'mailto:utk24g@gmail.com',
      color: 'text-primary-500'
    },
    {
      icon: Phone,
      title: 'Phone',
      value: '+91-9934546008',
      link: 'tel:+919934546008',
      color: 'text-electric-500'
    },
    {
      icon: MapPin,
      title: 'Location',
      value: 'Bhubaneswar, Odisha, India',
      link: '#',
      color: 'text-primary-500'
    }
  ]

  const socialLinks = [
    {
      icon: Github,
      name: 'GitHub',
      url: 'https://github.com/utkarsh240',
      color: 'text-text-secondary hover:text-primary-500'
    },
    {
      icon: Linkedin,
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/utkarsh-gupta-53647b217/',
      color: 'text-text-secondary hover:text-primary-500'
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <section id="contact" className="py-20 px-4 bg-dark-900 flex justify-center">
      <div className="max-w-xl w-full bg-dark-800 rounded-2xl shadow-lg p-8 flex flex-col gap-6">
        <h2 className="text-3xl md:text-4xl font-bold font-heading text-text-primary mb-2">Contact</h2>
        <form className="flex flex-col gap-4">
          <input type="text" placeholder="Name" className="bg-dark-900 border border-dark-700 rounded-lg px-4 py-3 text-text-primary font-body focus:border-primary-500 focus:outline-none" />
          <input type="email" placeholder="Email" className="bg-dark-900 border border-dark-700 rounded-lg px-4 py-3 text-text-primary font-body focus:border-primary-500 focus:outline-none" />
          <textarea placeholder="Message" rows={4} className="bg-dark-900 border border-dark-700 rounded-lg px-4 py-3 text-text-primary font-body focus:border-primary-500 focus:outline-none" />
          <button type="submit" className="btn-primary font-heading mt-2">Send Message</button>
        </form>
      </div>
    </section>
  )
}

export default Contact 