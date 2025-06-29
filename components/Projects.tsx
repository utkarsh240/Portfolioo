'use client'

import { useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { Github, Play, Brain, TrendingUp, LucideIcon } from 'lucide-react'
import { gsap } from 'gsap'
import { useCursorEffects } from '@/hooks/useCursorEffects'
import { useGSAPProximity } from '@/hooks/useGSAPProximity'

const Projects = () => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const sectionRef = useRef<HTMLElement>(null)
  const projectsRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const { rawX, rawY } = useCursorEffects()

  // Animate heading on cursor proximity
  useGSAPProximity(headingRef, (proximity: number) => ({
    scale: 1 + proximity * 0.03,
    color: proximity > 0.7 ? '#8BC34A' : '#F0F0F0',
    textShadow: proximity > 0.7 ? '0 0 18px rgba(139, 195, 74, 0.6)' : 'none',
  }))

  const projects = [
    {
      title: 'FilmFinder',
      description: 'A responsive movie discovery app using React.js, Tailwind CSS, and Vite, integrated with the TMDB API for real-time movie data.',
      image: '/api/placeholder/400/250',
      technologies: ['React.js', 'Tailwind CSS', 'Vite', 'TMDB API', 'Appwrite'],
      category: 'Web Application',
      icon: Play,
      color: 'text-primary-500',
      bgColor: 'bg-primary-500/10',
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
      color: 'text-electric-500',
      bgColor: 'bg-electric-500/10',
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
      color: 'text-primary-500',
      bgColor: 'bg-primary-500/10',
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
            ref={headingRef}
            variants={itemVariants}
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{ transition: 'color 0.4s, text-shadow 0.4s' }}
          >
            Featured <span className="gradient-text">Projects</span>
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-xl text-text-secondary max-w-3xl mx-auto"
          >
            A showcase of my recent work, demonstrating my skills in full-stack development, AI integration, and modern web technologies.
          </motion.p>
        </motion.div>

        <div ref={projectsRef} className="grid lg:grid-cols-2 gap-8">
          {projects.map((project) => (
            <ProjectCard key={project.title} project={project} rawX={rawX} rawY={rawY} />
          ))}
        </div>
      </div>
    </section>
  )
}

interface ProjectCardProps {
  project: {
    title: string
    description: string
    image: string
    technologies: string[]
    category: string
    icon: LucideIcon
    color: string
    bgColor: string
    github: string
    live: string
    features: string[]
  }
  rawX: number
  rawY: number
}

const ProjectCard = ({ project, rawX, rawY }: ProjectCardProps) => {
  const imgRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    if (!imgRef.current) return
    
    const animateImage = () => {
      const rect = imgRef.current!.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dx = rawX - cx
      const dy = rawY - cy
      const dist = Math.sqrt(dx * dx + dy * dy)
      const maxDist = Math.sqrt(window.innerWidth ** 2 + window.innerHeight ** 2) / 2
      const proximity = 1 - Math.min(dist / maxDist, 1)
      
      gsap.to(imgRef.current, {
        filter: `saturate(${1 + proximity * 0.3}) brightness(${1 + proximity * 0.1})`,
        scale: 1 + proximity * 0.01,
        boxShadow: proximity > 0.7 ? '0 4px 32px rgba(139, 195, 74, 0.3)' : 'none',
        duration: 0.4,
        ease: 'power2.out',
      })
    }
    
    const frameId = requestAnimationFrame(animateImage)
    
    return () => {
      cancelAnimationFrame(frameId)
    }
  }, [rawX, rawY])

  // 3D tilt effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    
    const rotateX = (y - centerY) / 10
    const rotateY = (centerX - x) / 10
    
    gsap.to(cardRef.current, {
      rotateX: rotateX,
      rotateY: rotateY,
      duration: 0.3,
      ease: 'power2.out',
    })
  }

  const handleMouseLeave = () => {
    if (!cardRef.current) return
    
    gsap.to(cardRef.current, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.5,
      ease: 'power2.out',
    })
  }
  
  return (
    <motion.div
      ref={cardRef}
      data-stagger
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
      }}
      whileHover={{ scale: 1.02, y: -5 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="glass rounded-xl overflow-hidden hover:border-primary-500/50 transition-all duration-300 hover-3d"
      style={{ transformStyle: 'preserve-3d' }}
    >
      {/* Project Image */}
      <div
        ref={imgRef}
        className="relative h-48 bg-gradient-to-br from-primary-500/20 to-electric-500/20 flex items-center justify-center"
        style={{ transition: 'filter 0.5s, box-shadow 0.5s' }}
      >
        <div className={`p-4 rounded-lg ${project.bgColor}`}>
          <project.icon className={`w-12 h-12 ${project.color}`} />
        </div>
        <div className="absolute top-4 right-4">
          <span className="px-3 py-1 bg-dark-800/90 backdrop-blur-sm text-primary-500 text-xs font-semibold rounded-full border border-primary-500/30">
            {project.category}
          </span>
        </div>
      </div>

      {/* Project Content */}
      <div className="p-6">
        <h3 className="text-2xl font-bold text-text-primary mb-3">{project.title}</h3>
        <p className="text-text-secondary mb-4 leading-relaxed">
          {project.description}
        </p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 bg-dark-700 text-primary-500 text-xs font-semibold rounded-full border border-primary-500/30 hover:border-primary-500/60 transition-colors duration-300"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Features */}
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-text-primary mb-2">Key Features:</h4>
          <ul className="space-y-1">
            {project.features.slice(0, 3).map((feature, idx) => (
              <li key={idx} className="text-text-secondary text-sm flex items-center">
                <span className="w-1 h-1 bg-primary-500 rounded-full mr-2"></span>
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
              className="flex items-center gap-2 px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg text-sm font-semibold transition-all duration-300 hover:shadow-lg"
            >
              <Github size={16} />
              View Code
            </motion.a>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default Projects 