'use client'

import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { Github, ExternalLink, Video, MessageSquare, FileText } from 'lucide-react'
import Section from './Section'
import ProjectCard3D from './ProjectCard3D'
import ScrambleText from './ScrambleText'

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
    <ProjectCard3D key={project.title} project={project} />
  )

  return (
    <Section id="projects" className="py-24">
      <div className="max-w-7xl mx-auto px-6" ref={containerRef}>

        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <h2 className="text-3xl md:text-5xl font-heading font-bold tracking-tight text-white mb-4">
              <ScrambleText text="Featured" /> <span className="text-lime-400">Projects</span>
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