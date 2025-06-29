'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ExternalLink, Github, Play, Code, Database, Brain, TrendingUp } from 'lucide-react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register ScrollTrigger
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const Projects = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const sectionRef = useRef<HTMLElement>(null)
  const projectsRef = useRef<HTMLDivElement>(null)

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

    if (projectsRef.current) {
      // Stagger animation for projects
      const projects = projectsRef.current.querySelectorAll('[data-stagger]')
      gsap.fromTo(
        projects,
        { opacity: 0, y: 80, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: projectsRef.current,
            start: 'top 85%',
            end: 'bottom 15%',
            toggleActions: 'play none none reverse'
          }
        }
      )
    }
  }, [])

  const projects = [
    {
      title: 'FilmFinder',
      description: 'A responsive movie discovery app using React.js, Tailwind CSS, and Vite, integrated with the TMDB API for real-time movie data.',
      image: '/api/placeholder/400/250',
      technologies: ['React.js', 'Tailwind CSS', 'Vite', 'TMDB API', 'Appwrite'],
      category: 'Web Application',
      icon: Play,
      color: 'text-blue-400',
      bgColor: 'bg-blue-400/10',
      github: 'https://github.com/utkarsh240/FilmFinder',
      live: '#',
      features: [
        'Dynamic movie browsing and real-time search with debounce hook',
        'Secure authentication and data management with Appwrite',
        'Modern, reusable components with clean code practices',
        'Responsive design for all devices',
        'Integration with TMDB API for comprehensive movie data'
      ]
    },
    {
      title: 'PDF Analysis',
      description: 'A PDF-based question answering system using Streamlit, LangChain, OpenAI (GPT-4), and Qdrant for intelligent document processing.',
      image: '/api/placeholder/400/250',
      technologies: ['Python', 'Streamlit', 'LangChain', 'OpenAI GPT-4', 'Qdrant', 'Docker'],
      category: 'AI/ML Application',
      icon: Brain,
      color: 'text-purple-400',
      bgColor: 'bg-purple-400/10',
      github: 'https://github.com/utkarsh240/Pdf_analysis',
      live: '#',
      features: [
        'End-to-end workflow: PDF text extraction and smart chunking',
        'Vector embedding and retrieval-based response generation',
        'Context-specific querying with custom prompts',
        'MMR-based search for enhanced response relevance',
        'Containerized application using Docker for consistent deployment'
      ]
    },
    {
      title: 'BankNifty Algo Trading Strategy',
      description: 'An algorithmic trading strategy for BankNifty using historical data spanning 2017–2023 with extensive backtesting and live deployment.',
      image: '/api/placeholder/400/250',
      technologies: ['Python', 'AlgoTest', 'Quantiply', 'Historical Data Analysis', 'Backtesting'],
      category: 'Financial Technology',
      icon: TrendingUp,
      color: 'text-green-400',
      bgColor: 'bg-green-400/10',
      github: '#',
      live: '#',
      features: [
        'Historical data analysis spanning 2017-2023',
        'Extensive backtesting using AlgoTest and Quantiply platforms',
        'Parameter tuning and performance validation',
        'Live trading environment deployment',
        'Measurable improvements in trade execution and profitability'
      ]
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
    <section ref={sectionRef} id="projects" className="py-20 bg-dark-800">
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
            Featured <span className="gradient-text">Projects</span>
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-xl text-gray-400 max-w-3xl mx-auto"
          >
            A showcase of my recent work, demonstrating my skills in full-stack development, AI integration, and modern web technologies.
          </motion.p>
        </motion.div>

        <div ref={projectsRef} className="grid lg:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              data-stagger
              variants={itemVariants}
              whileHover={{ scale: 1.02, y: -5 }}
              className="glass rounded-xl overflow-hidden hover:border-primary-500 transition-all duration-300"
            >
              {/* Project Image */}
              <div className="relative h-48 bg-gradient-to-br from-primary-500/20 to-purple-500/20 flex items-center justify-center">
                <div className={`p-4 rounded-lg ${project.bgColor}`}>
                  <project.icon className={`w-12 h-12 ${project.color}`} />
                </div>
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 bg-dark-800 text-primary-400 text-xs font-medium rounded-full">
                    {project.category}
                  </span>
                </div>
              </div>

              {/* Project Content */}
              <div className="p-6">
                <h3 className="text-2xl font-bold text-white mb-3">{project.title}</h3>
                <p className="text-gray-400 mb-4 leading-relaxed">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-dark-700 text-primary-400 text-xs font-medium rounded-full border border-primary-500/30"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Features */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-white mb-2">Key Features:</h4>
                  <ul className="space-y-1">
                    {project.features.slice(0, 3).map((feature, idx) => (
                      <li key={idx} className="text-gray-400 text-sm flex items-center">
                        <span className="w-1 h-1 bg-primary-400 rounded-full mr-2"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  {project.github !== '#' && (
                    <motion.a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2 px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg text-sm font-medium transition-colors"
                    >
                      <Github size={16} />
                      View Code
                    </motion.a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects 