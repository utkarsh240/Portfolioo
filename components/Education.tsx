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
    logoUrl: '/kiit-logo.jpg', // Official KIIT University logo
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
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
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
        
        <div className="space-y-8">
          {education.map((edu) => (
            <motion.div
              key={edu.institution}
              variants={itemVariants}
              className="border-b border-dark-700 pb-8 last:border-b-0"
            >
              <div className="flex items-start space-x-6">
                {/* Icon */}
                <div className="flex-shrink-0">
                  <div className={`p-3 rounded-lg ${edu.bgColor} flex items-center justify-center`}>
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
                </div>
                
                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-2xl font-bold text-text-primary">{edu.institution}</h3>
                    <span className="text-sm text-text-secondary bg-dark-700 px-3 py-1 rounded-full">
                      {edu.period}
                    </span>
                  </div>
                  <p className="text-lg text-primary-500 font-semibold mb-3">{edu.degree}</p>
                  <p className="text-text-secondary leading-relaxed">{edu.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Education 