'use client'

import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import Section from './Section'
import { Code2, Globe, Server, Database, BrainCircuit, Wrench } from 'lucide-react'

// Map categories to icons
const categoryIcons: Record<string, React.ElementType> = {
  'Languages': Code2,
  'Web Development': Globe,
  'Backend & APIs': Server,
  'Databases': Database,
  'AI/ML & APIs': BrainCircuit,
  'Tools/Platforms': Wrench,
}

const skillCategories = [
  {
    title: 'Languages',
    skills: [
      { name: 'Java', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg' },
      { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
      { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
      { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
      { name: 'C#', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg' },
    ]
  },
  {
    title: 'Web Development',
    skills: [
      { name: 'HTML', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
      { name: 'CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
      { name: 'React.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
      { name: 'Next.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg', invert: true },
      { name: 'Angular', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg' },
      { name: 'Tailwind CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg' },
      { name: 'Streamlit', icon: 'https://streamlit.io/images/brand/streamlit-mark-color.png' }
    ]
  },
  {
    title: 'Backend & APIs',
    skills: [
      { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
      { name: 'Express.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg', invert: true },
      { name: 'Bun', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bun/bun-original.svg' },
      { name: '.NET', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dotnetcore/dotnetcore-original.svg' },
      { name: 'GraphQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg' },
    ]
  },
  {
    title: 'Databases',
    skills: [
      { name: 'MongoDB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
      { name: 'MySQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
      { name: 'PostgreSQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
      { name: 'Redis', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg' },
      { name: 'Qdrant', icon: 'https://qdrant.tech/favicon.ico' }
    ]
  },
  {
    title: 'AI/ML & APIs',
    skills: [
      { name: 'OpenAI GPT-4', icon: 'https://upload.wikimedia.org/wikipedia/commons/4/4d/OpenAI_Logo.svg', invert: true },
      { name: 'LangChain', icon: '/logos/langchain.svg' },
      { name: 'LangGraph', icon: '/logos/langgraph.svg' }
    ]
  },
  {
    title: 'Tools/Platforms',
    skills: [
      { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
      { name: 'GitHub', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg', invert: true },
      { name: 'Postman', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg' },
      { name: 'Docker', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
      { name: 'AWS (EC2, S3)', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg', invert: true },
      { name: 'GitHub Actions', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/githubactions/githubactions-original.svg' },
      { name: 'Vercel', icon: 'https://assets.vercel.com/image/upload/q_auto/front/assets/design/vercel-triangle-black.svg', invert: true },
      { name: 'Vite', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg' },
      { name: 'Bunny.net', icon: 'https://bunny.net/favicon.ico' },
      { name: 'Better Auth', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg' }
    ]
  }
]

export default function Skills() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.skill-card',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
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

  return (
    <Section id="skills" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6 relative z-10" ref={containerRef}>

        <div className="mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs text-lime-400 font-medium tracking-wide mb-6">
            <span className="w-2 h-2 rounded-full bg-lime-400 animate-pulse" />
            System Architecture
          </div>
          <h2 className="text-3xl md:text-5xl font-heading font-bold tracking-tight text-white mb-6">
            Technical <span className="text-lime-400">Arsenal.</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl">
            The core technologies and tools I leverage to build scalable, high-performance web applications and AI systems.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, index) => {
            const Icon = categoryIcons[category.title] || Code2

            // Bento-box styling: break symmetry based on category
            const getCategorySpan = (idx: number) => {
              switch (idx) {
                case 1: return 'md:col-span-2 lg:col-span-2' // Web Dev
                case 5: return 'md:col-span-2 lg:col-span-3' // Tools
                default: return 'col-span-1' // Languages, Backend, DBs, AI/ML
              }
            }

            return (
              <div
                key={category.title}
                className={`skill-card group bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 hover:border-lime-400/30 transition-colors duration-300 shadow-2xl shadow-black/50 ${getCategorySpan(index)}`}
              >
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-2xl border border-white/10 bg-white/5 flex items-center justify-center text-gray-400 group-hover:text-lime-400 group-hover:border-lime-400/30 transition-colors shrink-0">
                    <Icon size={24} />
                  </div>
                  <h3 className="text-2xl font-bold text-white">{category.title}</h3>
                </div>

                <div className="flex flex-wrap gap-3">
                  {category.skills.map((skill) => (
                    <div
                      key={skill.name}
                      className="flex items-center gap-2.5 px-4 py-2.5 bg-black/40 border border-white/10 rounded-xl hover:border-lime-400/50 hover:bg-lime-400/5 transition-all duration-300 group/skill"
                    >
                      <img
                        src={skill.icon}
                        alt={`${skill.name} logo`}
                        className={`w-5 h-5 object-contain opacity-80 group-hover/skill:opacity-100 transition-opacity ${skill.invert ? 'invert' : ''}`}
                        loading="lazy"
                        decoding="async"
                      />
                      <span className="text-sm font-medium text-gray-300 group-hover/skill:text-lime-400 transition-colors">
                        {skill.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </Section>
  )
}