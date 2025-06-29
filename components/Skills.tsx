'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Code, Database, Zap, Globe } from 'lucide-react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register ScrollTrigger
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const Skills = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const sectionRef = useRef<HTMLElement>(null)
  const categoriesRef = useRef<HTMLDivElement>(null)
  const additionalSkillsRef = useRef<HTMLDivElement>(null)

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

    if (categoriesRef.current) {
      // Stagger animation for skill categories
      const categories = categoriesRef.current.querySelectorAll('[data-stagger]')
      gsap.fromTo(
        categories,
        { opacity: 0, y: 50, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: categoriesRef.current,
            start: 'top 85%',
            end: 'bottom 15%',
            toggleActions: 'play none none reverse'
          }
        }
      )
    }

    if (additionalSkillsRef.current) {
      // Stagger animation for additional skills
      const skills = additionalSkillsRef.current.querySelectorAll('[data-stagger]')
      gsap.fromTo(
        skills,
        { opacity: 0, y: 30, scale: 0.8 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.05,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: additionalSkillsRef.current,
            start: 'top 90%',
            end: 'bottom 10%',
            toggleActions: 'play none none reverse'
          }
        }
      )
    }
  }, [])

  const skillCategories = [
    {
      title: 'Programming Languages',
      icon: Code,
      color: 'text-blue-400',
      bgColor: 'bg-blue-400/10',
      skills: ['Java', 'JavaScript', 'TypeScript', 'Python']
    },
    {
      title: 'Databases',
      icon: Database,
      color: 'text-green-400',
      bgColor: 'bg-green-400/10',
      skills: ['MongoDB', 'SQL', 'Qdrant']
    },
    {
      title: 'Web Technologies',
      icon: Globe,
      color: 'text-purple-400',
      bgColor: 'bg-purple-400/10',
      skills: ['React.js', 'Next.js', 'Express.js', 'Tailwind CSS', 'Node.js', 'HTML/CSS']
    },
    {
      title: 'Tools/Platforms',
      icon: Zap,
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-400/10',
      skills: ['Git', 'GitHub', 'MS Office', 'Postman', 'Docker', 'Vercel']
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
    <section ref={sectionRef} id="skills" className="py-20 bg-dark-900">
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
            Skills & <span className="gradient-text">Expertise</span>
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-xl text-gray-400 max-w-3xl mx-auto"
          >
            A comprehensive toolkit of technologies and frameworks I use to bring ideas to life.
          </motion.p>
        </motion.div>

        <div ref={categoriesRef} className="grid lg:grid-cols-2 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              data-stagger
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              className="glass p-6 rounded-xl hover:border-primary-500 transition-all duration-300"
            >
              <div className="flex items-center mb-6">
                <div className={`p-3 rounded-lg ${category.bgColor} mr-4`}>
                  <category.icon className={`w-6 h-6 ${category.color}`} />
                </div>
                <h3 className="text-xl font-bold text-white">{category.title}</h3>
              </div>

              <div className="flex flex-wrap gap-3">
                {category.skills.map((skill, skillIndex) => (
                  <motion.span
                    key={skill}
                    whileHover={{ scale: 1.05, y: -2 }}
                    className="px-4 py-2 bg-dark-700 text-gray-300 rounded-lg text-sm font-medium border border-dark-600 hover:border-primary-500 transition-all duration-300"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Skills Grid */}
        <motion.div
          ref={additionalSkillsRef}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mt-16"
        >
          <motion.h3
            variants={itemVariants}
            className="text-2xl font-bold text-white text-center mb-8"
          >
            Additional Technologies
          </motion.h3>
          
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4"
          >
            {[
              'Vite', 'Appwrite', 'Streamlit', 'LangChain', 'OpenAI', 'Docker',
              'AlgoTest', 'Quantiply', 'Historical Data', 'Backtesting', 'Vector DB',
              'API Integration', 'Responsive Design', 'Clean Code', 'UX Design'
            ].map((tech, index) => (
              <motion.div
                key={tech}
                data-stagger
                whileHover={{ scale: 1.05, y: -2 }}
                className="px-4 py-3 bg-dark-700 text-gray-300 rounded-lg text-center text-sm font-medium border border-dark-600 hover:border-primary-500 transition-all duration-300"
              >
                {tech}
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Skills 