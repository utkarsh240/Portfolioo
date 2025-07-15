'use client'

import React from 'react'
import { Github, Video, FileText, Film } from 'lucide-react'

const Projects = () => {
  const projects = [
    {
      title: 'Screensend',
      description: 'Full-stack screen recording & video sharing platform built with Next.js, Bunny.net & Arcjet. Features Better Auth, video uploads, sharing via link, privacy settings, AI transcripts, and more.',
      technologies: ['Next.js', 'TypeScript', 'Bunny.net', 'Arcjet', 'Better Auth'],
      category: 'Full Stack',
      icon: Video,
      color: 'text-primary-500',
      bgColor: 'bg-primary-500/10',
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
      color: 'text-electric-500',
      bgColor: 'bg-electric-500/10',
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
      color: 'text-primary-500',
      bgColor: 'bg-primary-500/10',
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
    <section id="projects" className="py-20 px-4 bg-dark-900">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold font-heading text-text-primary mb-12 text-center">Featured Projects</h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <div key={project.title} className="bg-dark-800 rounded-xl border border-dark-700 hover:border-primary-500 transition-all duration-300 overflow-hidden">
              {/* Project Icon/Header */}
              <div className={`relative h-48 ${project.bgColor} flex items-center justify-center`}>
                <div className={`p-4 rounded-lg bg-dark-800/20`}>
                  <project.icon className={`w-12 h-12 ${project.color}`} />
                </div>
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 bg-dark-800/90 text-primary-500 text-xs font-semibold rounded-full border border-primary-500/30">
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
                      className="px-3 py-1 bg-dark-700 text-primary-500 text-xs font-semibold rounded-full border border-primary-500/30"
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

                {/* Action Button */}
                <div className="flex gap-3">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg text-sm font-semibold transition-all duration-300"
                  >
                    <Github size={16} />
                    View Code
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects 