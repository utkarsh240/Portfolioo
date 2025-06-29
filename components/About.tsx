'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Award, Code } from 'lucide-react'
import { useOptimizedGSAP } from '@/hooks/useOptimizedGSAP'
import { useGSAPProximity } from '@/hooks/useGSAPProximity'

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const achievementsRef = useRef<HTMLDivElement>(null)
  const { createFadeInUp, createStaggerAnimation } = useOptimizedGSAP()

  useEffect(() => {
    if (sectionRef.current) {
      createFadeInUp(sectionRef.current)
    }

    if (achievementsRef.current) {
      createStaggerAnimation(
        Array.from(achievementsRef.current.querySelectorAll('[data-stagger]')),
        {
          opacity: 1,
          y: 0,
          scale: 1
        },
        { stagger: 0.2 }
      )
    }
  }, [createFadeInUp, createStaggerAnimation])

  // Section focus and parallax
  useGSAPProximity(sectionRef, (proximity: number) => ({
    scale: 1 + proximity * 0.01,
    skewX: proximity * 2,
    skewY: proximity * 2,
  }))
  useGSAPProximity(contentRef, (proximity: number) => ({
    x: -proximity * 20,
    y: -proximity * 20,
  }))

  const achievements = [
    {
      icon: Award,
      title: 'Harvard HPAIR 2025',
      description: 'Selected as a delegate for the prestigious Harvard HPAIR Asia Conference 2025 at the University of Tokyo',
      color: 'text-primary-500'
    },
    {
      icon: Code,
      title: '450+ DSA Problems',
      description: 'Solved 450+ Data Structures and Algorithms problems on multiple coding platforms',
      color: 'text-electric-500'
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
    <section ref={sectionRef} id="about" className="py-20 bg-dark-800">
      <div ref={contentRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
            About <span className="gradient-text">Me</span>
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-xl text-text-secondary max-w-3xl mx-auto"
          >
            A passionate full-stack developer with expertise in modern web technologies and a strong foundation in computer science.
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Story */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="space-y-6"
          >
            <motion.h3
              variants={itemVariants}
              className="text-3xl font-bold text-text-primary mb-6"
            >
              My Journey
            </motion.h3>
            
            <motion.div variants={itemVariants} className="space-y-4 text-text-secondary leading-relaxed">
              <p>
                I&apos;m a Computer Science student passionate about building impactful software and exploring new technologies.
              </p>
              <p>
                <span className="text-primary-500 font-semibold">Education:</span> Bachelor of Technology in Computer Science & Engineering, KIIT University
              </p>
            </motion.div>
          </motion.div>

          {/* Right Column - Achievements */}
          <motion.div
            ref={achievementsRef}
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            {achievements.map((achievement) => (
              <motion.div
                key={achievement.title}
                data-stagger
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -5 }}
                className="glass p-6 rounded-xl hover:border-primary-500/50 transition-all duration-300 hover-3d"
              >
                <div className="flex items-center mb-4">
                  <achievement.icon className={`w-8 h-8 ${achievement.color} mr-3`} />
                  <h4 className="text-lg font-semibold text-text-primary">{achievement.title}</h4>
                </div>
                <p className="text-text-secondary text-sm leading-relaxed">
                  {achievement.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Skills Preview */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mt-16 text-center"
        >
          <motion.h3
            variants={itemVariants}
            className="text-2xl font-bold text-text-primary mb-8"
          >
            Core Competencies
          </motion.h3>
          
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap justify-center gap-4"
          >
            {[
              'Java', 'JavaScript', 'TypeScript', 'Python', 'React.js', 'Next.js',
              'Express.js', 'MongoDB', 'SQL', 'Qdrant', 'Docker', 'Git'
            ].map((skill) => (
              <motion.span
                key={skill}
                whileHover={{ scale: 1.1, y: -2 }}
                className="px-4 py-2 bg-dark-700 text-primary-500 rounded-full text-sm font-semibold border border-primary-500/30 hover:border-primary-500/60 transition-all duration-300 hover:shadow-lg"
              >
                {skill}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default About 