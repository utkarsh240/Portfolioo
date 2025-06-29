'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Briefcase, Users } from 'lucide-react'

const experiences = [
  {
    company: 'Ekaant',
    role: 'Software Developer Intern',
    period: 'May 2024 - Present',
    description: 'Worked on scalable web applications using React.js, Tailwind CSS, TypeScript, Docker, and AWS. Collaborated with cross-functional teams to deliver robust solutions.',
    icon: Briefcase,
    color: 'text-blue-400',
    bgColor: 'bg-blue-400/10',
  },
  {
    company: 'WebXstreet',
    role: 'Cofounder',
    period: '2022 - Present',
    description: 'Co-founded a web solutions startup, leading product development, client acquisition, and project delivery. Specialized in modern web technologies and business growth.',
    icon: Users,
    color: 'text-purple-400',
    bgColor: 'bg-purple-400/10',
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
            Professional <span className="gradient-text">Experience</span>
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-xl text-gray-400 max-w-3xl mx-auto"
          >
            My journey through impactful roles and entrepreneurial ventures.
          </motion.p>
        </motion.div>
        <div className="grid md:grid-cols-2 gap-8">
          {experiences.map((exp, idx) => (
            <motion.div
              key={exp.company}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              className="glass p-6 rounded-xl hover:border-primary-500 transition-all duration-300"
            >
              <div className="flex items-center mb-4">
                <div className={`p-3 rounded-lg ${exp.bgColor} mr-4`}>
                  <exp.icon className={`w-6 h-6 ${exp.color}`} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">{exp.company}</h3>
                  <p className="text-primary-400 font-medium">{exp.role}</p>
                  <p className="text-gray-400 text-sm">{exp.period}</p>
                </div>
              </div>
              <p className="text-gray-300 leading-relaxed">{exp.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Experience 