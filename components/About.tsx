'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Award, Code, Briefcase, GraduationCap, Globe, Target } from 'lucide-react'
import { useOptimizedGSAP } from '@/hooks/useOptimizedGSAP'

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const sectionRef = useRef<HTMLElement>(null)
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

  const achievements = [
    {
      icon: Award,
      title: 'Harvard HPAIR 2025',
      description: 'Selected as a delegate for the prestigious Harvard HPAIR Asia Conference 2025 at the University of Tokyo',
      color: 'text-yellow-400'
    },
    {
      icon: Code,
      title: '450+ DSA Problems',
      description: 'Solved 450+ Data Structures and Algorithms problems on multiple coding platforms',
      color: 'text-green-400'
    },
    {
      icon: Target,
      title: 'Full Stack + Finance',
      description: 'Strong skills in DSA, Full-Stack Development, and solid foundation in finance',
      color: 'text-purple-400'
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
            About <span className="gradient-text">Me</span>
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-xl text-gray-400 max-w-3xl mx-auto"
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
              className="text-3xl font-bold text-white mb-6"
            >
              My Journey
            </motion.h3>
            
            <motion.div variants={itemVariants} className="space-y-4 text-gray-300 leading-relaxed">
              <p>
                I'm a Computer Science student with strong skills in <span className="text-primary-400 font-semibold">DSA</span>,
                <span className="text-primary-400 font-semibold"> Full-Stack Development</span>, and a solid foundation in
                <span className="text-primary-400 font-semibold"> finance</span>. I aim to solve real-world problems by combining
                technical expertise, business insight, and a growing interest in <span className="text-primary-400 font-semibold">GenAI</span>.
              </p>
              <p>
                <span className="text-primary-400 font-semibold">Education:</span> Bachelor of Technology in Computer Science & Engineering, KIIT University
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
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                data-stagger
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                className="glass p-6 rounded-xl hover:border-primary-500 transition-all duration-300"
              >
                <div className="flex items-center mb-4">
                  <achievement.icon className={`w-8 h-8 ${achievement.color} mr-3`} />
                  <h4 className="text-lg font-semibold text-white">{achievement.title}</h4>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed">
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
            className="text-2xl font-bold text-white mb-8"
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
            ].map((skill, index) => (
              <motion.span
                key={skill}
                whileHover={{ scale: 1.1 }}
                className="px-4 py-2 bg-dark-700 text-primary-400 rounded-full text-sm font-medium border border-primary-500/30 hover:border-primary-500 transition-all duration-300"
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