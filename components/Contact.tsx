'use client'

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
    <section ref={sectionRef} id="contact" className="py-20 bg-dark-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            Get In <span className="gradient-text">Touch</span>
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-xl text-text-secondary max-w-3xl mx-auto"
          >
            I&apos;m always open to discussing new opportunities, interesting projects, or just having a chat about technology.
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            ref={contactInfoRef}
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="space-y-8"
          >
            <motion.h3
              variants={itemVariants}
              className="text-2xl font-bold text-text-primary mb-6"
            >
              Let&apos;s Connect
            </motion.h3>

            {/* Contact Info Cards */}
            <div className="space-y-4">
              {contactInfo.map((info) => (
                <motion.a
                  key={info.title}
                  data-stagger
                  href={info.link}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02, y: -2 }}
                  className="flex items-center p-4 glass rounded-lg hover:border-primary-500/50 transition-all duration-300 hover-3d"
                >
                  <div className={`p-3 rounded-lg bg-dark-700 mr-4`}>
                    <info.icon className={`w-6 h-6 ${info.color}`} />
                  </div>
                  <div>
                    <h4 className="text-text-primary font-semibold">{info.title}</h4>
                    <p className="text-text-secondary">{info.value}</p>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Social Links */}
            <motion.div variants={itemVariants} className="pt-8">
              <h4 className="text-lg font-semibold text-text-primary mb-4">Follow Me</h4>
              <div className="flex justify-center space-x-6">
                {socialLinks.map((link) => (
                  <a
                    key={link.name}
                    ref={el => { socialIconRefs.current[socialLinks.findIndex(l => l.name === link.name)] = el }}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={link.color + ' transition-colors duration-300'}
                    style={{ fontSize: 24 }}
                  >
                    <link.icon size={24} />
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            ref={formRef}
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="glass p-8 rounded-xl"
          >
            <motion.h3
              variants={itemVariants}
              className="text-2xl font-bold text-text-primary mb-6"
            >
              Send Message
            </motion.h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              <motion.div variants={itemVariants}>
                <label htmlFor="name" className="block text-text-primary font-semibold mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-lg text-text-primary placeholder-text-secondary focus:outline-none focus:border-primary-500 transition-colors"
                  placeholder="Your name"
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <label htmlFor="email" className="block text-text-primary font-semibold mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-lg text-text-primary placeholder-text-secondary focus:outline-none focus:border-primary-500 transition-colors"
                  placeholder="your.email@example.com"
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <label htmlFor="subject" className="block text-text-primary font-semibold mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-lg text-text-primary placeholder-text-secondary focus:outline-none focus:border-primary-500 transition-colors"
                  placeholder="What&apos;s this about?"
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <label htmlFor="message" className="block text-text-primary font-semibold mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-lg text-text-primary placeholder-text-secondary focus:outline-none focus:border-primary-500 transition-colors resize-none"
                  placeholder="Tell me about your project or just say hello!"
                />
              </motion.div>

              <motion.button
                ref={sendBtnRef}
                type="submit"
                disabled={isSubmitting}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full bg-primary-500 hover:bg-primary-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Sending...
                  </span>
                ) : (
                  <span className="flex items-center justify-center">
                    <Send size={18} className="mr-2" />
                    Send Message
                  </span>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Contact 