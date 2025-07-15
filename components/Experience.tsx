'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Briefcase, Users } from 'lucide-react'

const experiences = [
  {
    company: 'Ekaant',
    role: 'Software Developer Intern',
    period: 'May 2024 - July 2024',
    description: 'Worked on scalable web applications using React.js, Tailwind CSS, TypeScript, Docker, and AWS. Collaborated with cross-functional teams to deliver robust solutions.',
    icon: Briefcase,
    color: 'text-primary-500',
    bgColor: 'bg-primary-500/10',
  },
  {
    company: 'WebXstreet',
    role: 'Cofounder',
    period: 'Feb 2022 - March 2023',
    description: 'Co-founded a web solutions startup, leading product development, client acquisition, and project delivery. Specialized in modern web technologies and business growth.',
    icon: Users,
    color: 'text-electric-500',
    bgColor: 'bg-electric-500/10',
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

const Experience = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (sectionRef.current) {
      // Animate section on scroll
      // You can add GSAP or other animation logic here if desired
    }
  }, [])

  return (
    <section ref={sectionRef} id="experience" className="py-20 bg-dark-900">
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
            Professional <span className="gradient-text">Experience</span>
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-xl text-text-secondary max-w-3xl mx-auto"
          >
            My journey through impactful roles and entrepreneurial ventures.
          </motion.p>
        </motion.div>
        
        <div className="space-y-8">
          {experiences.map((exp) => (
            <motion.div
              key={exp.company}
              variants={itemVariants}
              className="border-b border-dark-700 pb-8 last:border-b-0"
            >
              <div className="flex items-start space-x-6">
                {/* Icon */}
                <div className="flex-shrink-0">
                  <div className={`p-3 rounded-lg ${exp.bgColor} flex items-center justify-center`}>
                    <exp.icon className={`w-6 h-6 ${exp.color}`} />
                  </div>
                </div>
                
                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-2xl font-bold text-text-primary">{exp.company}</h3>
                    <span className="text-sm text-text-secondary bg-dark-700 px-3 py-1 rounded-full">
                      {exp.period}
                    </span>
                  </div>
                  <p className="text-lg text-primary-500 font-semibold mb-3">{exp.role}</p>
                  <p className="text-text-secondary leading-relaxed">{exp.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Experience 