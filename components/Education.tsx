'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { GraduationCap } from 'lucide-react'
import Image from 'next/image'

const education = [
  {
    institution: 'KIIT University',
    degree: 'B.Tech Computer Science and Engineering',
    period: '2021 - 2025',
    description: 'Pursuing Bachelor of Technology in Computer Science and Engineering with focus on software development, algorithms, and emerging technologies.',
    icon: GraduationCap,
    logoUrl: '/kiit-logo.svg', // KIIT University logo
    color: 'text-primary-500',
    bgColor: 'bg-primary-500/10',
  },
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

const Education = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (sectionRef.current) {
      // Animate section on scroll
      // You can add GSAP or other animation logic here if desired
    }
  }, [])

  return (
    <section ref={sectionRef} id="education" className="py-20 bg-dark-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="text-center mb-16"
        >
          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            Educational <span className="gradient-text">Background</span>
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-xl text-text-secondary max-w-3xl mx-auto"
          >
            My academic journey in computer science and engineering.
          </motion.p>
        </motion.div>
        <div className="grid md:grid-cols-2 gap-8 justify-center">
          {education.map((edu) => (
            <motion.div
              key={edu.institution}
              variants={itemVariants}
              whileHover={{ scale: 1.02, y: -5 }}
              className="glass p-6 rounded-xl hover:border-primary-500/50 transition-all duration-300 hover-3d max-w-md mx-auto"
            >
              <div className="flex items-center mb-4">
                <div className={`p-3 rounded-lg ${edu.bgColor} mr-4 flex items-center justify-center`}>
                  {edu.logoUrl ? (
                    <Image
                      src={edu.logoUrl}
                      alt={`${edu.institution} logo`}
                      width={32}
                      height={32}
                      className="object-contain"
                    />
                  ) : (
                    <edu.icon className={`w-6 h-6 ${edu.color}`} />
                  )}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-text-primary">{edu.institution}</h3>
                  <p className="text-primary-500 font-semibold">{edu.degree}</p>
                  <p className="text-text-secondary text-sm">{edu.period}</p>
                </div>
              </div>
              <p className="text-text-secondary leading-relaxed">{edu.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Education 