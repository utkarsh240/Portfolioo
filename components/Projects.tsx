'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Github, Video, FileText, Film } from 'lucide-react'
import { Card, CardContent, CardTitle } from '@/components/ui/card'

const Projects = () => {
  const projects = [
    {
      title: 'Screensend',
      description: 'Full-stack screen recording & video sharing platform built with Next.js, Bunny.net & Arcjet. Features Better Auth, video uploads, sharing via link, privacy settings, AI transcripts, and more.',
      technologies: ['Next.js', 'TypeScript', 'Bunny.net', 'Arcjet', 'Better Auth'],
      category: 'Full Stack',
      icon: Video,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',

      github: 'https://github.com/utkarsh240/screensend',
      features: [
        'Screen recording & video sharing',
        'Privacy settings & link sharing',
        'AI transcripts & Better Auth',
        'Video upload with Bunny.net'
      ]
    },
    {
      title: 'PDF Analysis',
      description: 'Built a PDF-based question answering system using Streamlit, LangChain, OpenAI (GPT-4), and Qdrant for intelligent document analysis.',
      technologies: ['Python', 'Streamlit', 'LangChain', 'OpenAI GPT-4', 'Qdrant'],
      category: 'AI/ML',
      icon: FileText,
      color: 'text-green-500',
      bgColor: 'bg-green-500/10',

      github: 'https://github.com/utkarsh240/Pdf_analysis',
      features: [
        'PDF document processing',
        'Question answering with GPT-4',
        'Vector search with Qdrant',
        'Interactive Streamlit interface'
      ]
    },
    {
      title: 'FilmFinder',
      description: 'Developed a responsive movie discovery app using React.js, Tailwind CSS, and Vite, integrated with the TMDB API for real-time movie data.',
      technologies: ['React.js', 'Tailwind CSS', 'Vite', 'TMDB API'],
      category: 'Frontend',
      icon: Film,
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10',

      github: 'https://github.com/utkarsh240/FilmFinder',
      features: [
        'Movie discovery & search',
        'Real-time data from TMDB API',
        'Responsive design',
        'Fast Vite build system'
      ]
    }
  ]

  return (
    <section id="projects" className="py-20 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-3xl md:text-4xl font-bold font-heading text-foreground mb-12"
        >
          Featured <span className="gradient-text">Projects</span>
        </motion.h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
            >
              <Card className="overflow-hidden hover:shadow-lg transition-all duration-300">
                {/* Project Icon/Header */}
                <div className={`relative h-48 ${project.bgColor} flex items-center justify-center`}>
                  <div className="p-4 rounded-lg bg-background/20">
                    <project.icon className={`w-12 h-12 ${project.color}`} />
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 bg-background/90 text-primary text-xs font-semibold rounded-full border border-primary/30">
                      {project.category}
                    </span>
                  </div>
                </div>

                {/* Project Content */}
                <CardContent className="p-6">
                  <CardTitle className="text-2xl font-bold text-foreground mb-3">{project.title}</CardTitle>
                  <p className="text-muted-foreground mb-4">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-muted text-primary text-xs font-semibold rounded-full border border-primary/30"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Features */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-foreground mb-2">Key Features:</h4>
                    <ul className="space-y-1">
                      {project.features.slice(0, 3).map((feature, idx) => (
                        <li key={idx} className="text-muted-foreground text-sm flex items-center">
                          <span className="w-1 h-1 bg-primary rounded-full mr-2"></span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Action Button */}
                  <div className="flex gap-3">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg text-sm font-semibold transition-all duration-300"
                    >
                      <Github size={16} />
                      View Code
                    </a>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects 