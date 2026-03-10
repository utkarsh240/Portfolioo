'use client'

import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { Github, ExternalLink, Video, MessageSquare, FileText } from 'lucide-react'
import Section from './Section'

const projects = [
  {
    title: 'DecorAI – AI Architectural Visualization SaaS',
    description:
      'Full-stack AI SaaS that transforms 2D floor plans into photorealistic 3D renders using a dual-model pipeline with Claude for spatial reasoning and Gemini for image generation.',
    technologies: ['React', 'TypeScript', 'Puter.js', 'Claude', 'Gemini'],
    github: 'https://github.com/utkarsh240/decorai',
    demo: '#',
    icon: Video,
  },
  {
    title: 'TimeBox – Real-Time Ephemeral Chat',
    description:
      'Privacy-first real-time chat system using WebSockets with Redis-backed pub/sub and strict two-user isolation per room. Zero message persistence.',
    technologies: ['Next.js', 'Bun', 'Elysia', 'Redis', 'WebSockets'],
    github: 'https://github.com/utkarsh240/TimeBox',
    demo: '#',
    icon: MessageSquare,
  },
  {
    title: 'AI PDF Analysis System',
    description:
      'RAG pipeline for semantic PDF analysis using LangChain, GPT-4, and Qdrant vector search. Handles 1,000+ page documents and large scale embeddings.',
    technologies: ['Python', 'Streamlit', 'LangChain', 'GPT-4', 'Qdrant'],
    github: 'https://github.com/utkarsh240/Pdf_analysis',
    demo: '#',
    icon: FileText,
  }
]

export default function Projects() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.project-card',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
          },
        }
      )
    }, containerRef)

    return () => ctx.revert()
  }, [])

  const renderCard = (project: any) => (
    <div
      key={project.title}
      className="project-card group flex flex-col bg-white/5 border border-white/10 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-2 hover:border-lime-400 hover:shadow-[0_20px_40px_-15px_rgba(163,230,53,0.1)]"
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-lime-400/50 transition-colors">
            <project.icon className="text-white group-hover:text-lime-400 transition-colors" size={20} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white leading-tight mb-1 line-clamp-2">
              {project.title}
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {project.github && project.github !== '#' && (
            <a href={project.github} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full hover:bg-white/10 transition-colors border border-white/5">
              <Github size={16} className="text-gray-400 hover:text-white" />
            </a>
          )}
          {project.demo && project.demo !== '#' && (
            <a href={project.demo} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full hover:bg-white/10 transition-colors border border-white/5">
              <ExternalLink size={16} className="text-gray-400 hover:text-white" />
            </a>
          )}
        </div>
      </div>

      <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-1">
        {project.description}
      </p>

      <div className="flex flex-wrap gap-2 mt-auto">
        {project.technologies.map((tech: string) => (
          <span
            key={tech}
            className="px-2 py-1 text-[10px] uppercase font-mono tracking-wider text-gray-400 border border-white/10 rounded bg-white/5"
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  )

  return (
    <Section id="projects" className="py-24">
      <div className="max-w-7xl mx-auto px-6" ref={containerRef}>

        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <h2 className="text-4xl lg:text-5xl font-heading font-bold tracking-tight text-white mb-4">
              Featured <span className="text-lime-400">Projects</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl">
              Here are some of my recent projects where I've combined modern web technologies with AI and scalable system design.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map(renderCard)}
        </div>
      </div>
    </Section>
  )
}