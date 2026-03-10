'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Github, Video, FileText, MessageSquare } from 'lucide-react'
import { Card, CardContent, CardTitle } from '@/components/ui/card'

const Projects = () => {
  const projects = [
    {
      title: 'DecorAI – AI Architectural Visualization SaaS',
      description:
        'Full-stack AI SaaS that transforms 2D floor plans into photorealistic 3D renders using a dual-model pipeline with Claude for spatial reasoning and Gemini for image generation.',
      technologies: ['React', 'TypeScript', 'Puter.js', 'Claude', 'Gemini'],
      category: 'AI SaaS',
      icon: Video,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',

      github: 'https://github.com/your-username/decorai',
      features: [
        'Transforms 2D floor plans into photorealistic 3D renders',
        'Serverless render workers with Puter.js and permanent file hosting',
        'Persistent KV metadata storage and global community feed',
        'Dual-model AI pipeline combining Claude and Gemini'
      ]
    },
    {
      title: 'TimeBox – Real-Time Ephemeral Chat System',
      description:
        'Privacy-first real-time chat system using WebSockets with Redis-backed pub/sub and strict two-user isolation per room.',
      technologies: ['Next.js', 'Bun', 'Elysia', 'Redis', 'WebSockets'],
      category: 'Realtime',
      icon: MessageSquare,
      color: 'text-emerald-500',
      bgColor: 'bg-emerald-500/10',

      github: 'https://github.com/utkarsh240/TimeBox',
      features: [
        'WebSocket-based architecture with Redis pub/sub for sub-100ms delivery',
        'Room-based communication with strict two-user isolation',
        'Automatic 10-minute message expiration via Redis TTL',
        'Zero message persistence for privacy-friendly data handling'
      ]
    },
    {
      title: 'AI PDF Analysis System – RAG Pipeline',
      description:
        'Retrieval-Augmented Generation pipeline for semantic PDF analysis using LangChain, GPT-4, and Qdrant vector search, exposed via a Streamlit UI.',
      technologies: ['Python', 'Streamlit', 'LangChain', 'GPT-4', 'Qdrant'],
      category: 'RAG / LLM',
      icon: FileText,
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10',

      github: 'https://github.com/utkarsh240/Pdf_analysis',
      features: [
        'RAG pipeline with LangChain + Qdrant vector search',
        'Handles 1,000+ page documents and 50,000+ embeddings',
        'Semantic querying and AI-generated summaries',
        'Reduces manual document analysis time significantly'
      ]
    }
  ]

  return (
    <section id="projects" className="py-8 px-4 sm:px-6 bg-background">
      <div className="max-w-6xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-xl md:text-2xl font-bold font-heading text-foreground mb-6 text-left"
        >
          Featured <span className="gradient-text">Projects</span>
        </motion.h2>
        <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
            >
              <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 h-full">
                {/* Project Icon/Header */}
                <div className={`relative h-32 sm:h-40 lg:h-48 ${project.bgColor} flex items-center justify-center`}>
                  <div className="p-3 sm:p-4 rounded-lg bg-background/20">
                    <project.icon className={`w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 ${project.color}`} />
                  </div>
                  <div className="absolute top-2 sm:top-4 right-2 sm:right-4">
                    <span className="px-2 sm:px-3 py-1 bg-background/90 text-primary text-xs font-semibold rounded-full border border-primary/30">
                      {project.category}
                    </span>
                  </div>
                </div>

                {/* Project Content */}
                <CardContent className="p-4 sm:p-6">
                  <CardTitle className="text-sm sm:text-base md:text-lg font-bold text-foreground mb-2 sm:mb-3">{project.title}</CardTitle>
                  <p className="text-muted-foreground mb-3 sm:mb-4 text-xs sm:text-sm">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 sm:px-3 py-1 bg-muted text-primary text-xs font-semibold rounded-full border border-primary/30"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Features */}
                  <div className="mb-4 sm:mb-6">
                    <h4 className="text-xs sm:text-sm font-semibold text-foreground mb-2">Key Features:</h4>
                    <ul className="space-y-1">
                      {project.features.slice(0, 3).map((feature, idx) => (
                        <li key={idx} className="text-muted-foreground text-xs sm:text-sm flex items-center">
                          <span className="w-1 h-1 bg-primary rounded-full mr-2 flex-shrink-0"></span>
                          <span className="line-clamp-2">{feature}</span>
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
                      className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg text-xs sm:text-sm font-semibold transition-all duration-300"
                    >
                      <Github size={14} className="sm:w-4 sm:h-4" />
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