'use client'

import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import Section from './Section'
import ScrambleText from './ScrambleText'
import ActivityGraph from './ActivityGraph'
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
    <Section id="skills" className="py-32 relative">
      <div className="max-w-6xl mx-auto px-6 relative z-10" ref={containerRef}>

        <div className="mb-20">
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-white/[0.06] bg-white/[0.03] text-xs text-lime-400 font-medium tracking-wide mb-8 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-lime-400 animate-pulse shadow-[0_0_8px_rgba(163,230,53,0.8)]" />
            System Architecture
          </div>
          <h2 className="text-4xl md:text-6xl font-heading font-bold tracking-headline leading-headline text-white mb-5">
            <ScrambleText text="Technical" /> <span className="text-gradient-accent">Arsenal</span>
          </h2>
          <p className="text-gray-400 text-[15px] max-w-xl leading-relaxed">
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
                className={`skill-card group glass-card glass-card-hover rounded-[1.5rem] p-8 hover:shadow-[0_20px_50px_rgba(0,0,0,0.4)] ${getCategorySpan(index)} relative overflow-hidden`}
              >
                {/* Subtle hover gradient wash */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#0ff]/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                <div className="flex items-center gap-4 mb-8 relative z-10">
                  <div className="w-11 h-11 rounded-xl border border-white/[0.06] bg-white/[0.03] flex items-center justify-center text-gray-500 group-hover:text-[#0ff] group-hover:border-[#0ff]/30 shrink-0 transition-premium">
                    <Icon size={20} className="group-hover:drop-shadow-[0_0_8px_rgba(0,255,255,0.6)]" />
                  </div>
                  <h3 className="text-xl font-semibold text-white tracking-subhead">{category.title}</h3>
                </div>

                <div className="flex flex-wrap gap-2.5">
                  {category.skills.map((skill) => (
                    <div
                      key={skill.name}
                      className="flex items-center gap-2 px-3.5 py-2 bg-white/[0.02] border border-white/[0.06] rounded-lg hover:border-[#0ff]/30 hover:bg-white/[0.05] group/skill transition-premium"
                    >
                      <img
                        src={skill.icon}
                        alt={`${skill.name} logo`}
                        className={`w-4 h-4 object-contain opacity-70 group-hover/skill:opacity-100 transition-opacity ${skill.invert ? 'invert' : ''}`}
                        loading="lazy"
                        decoding="async"
                      />
                      <span className="text-[13px] font-medium text-gray-400 group-hover/skill:text-gray-200 transition-colors">
                        {skill.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}

          {/* Full-width Activity Graph Bento component */}
          <div className="md:col-span-2 lg:col-span-3">
            <ActivityGraph />
          </div>
        </div>
      </div>
    </Section>
  )
}