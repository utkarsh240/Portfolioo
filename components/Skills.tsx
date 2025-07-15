'use client'

import React from 'react'
import { Code, Database, Globe, Zap, Brain } from 'lucide-react'

const Skills = () => {
  const skillCategories = [
    {
      title: 'Programming Languages',
      icon: Code,
      color: 'text-primary-500',
      skills: ['Java', 'JavaScript', 'TypeScript', 'Python']
    },
    {
      title: 'Web Technologies',
      icon: Globe,
      color: 'text-primary-500',
      skills: ['React.js', 'Next.js', 'Express.js', 'Tailwind CSS', 'Node.js', 'HTML', 'CSS', 'Streamlit']
    },
    {
      title: 'Databases',
      icon: Database,
      color: 'text-electric-500',
      skills: ['MongoDB', 'SQL', 'Qdrant']
    },
    {
      title: 'AI/ML & APIs',
      icon: Brain,
      color: 'text-purple-500',
      skills: ['OpenAI GPT-4', 'LangChain', 'LangGraph']
    },
    {
      title: 'Tools/Platforms',
      icon: Zap,
      color: 'text-electric-500',
      skills: ['Git', 'GitHub', 'Postman', 'Docker', 'Vercel', 'Vite', 'Bunny.net', 'Arcjet', 'Better Auth']
    }
  ]

  return (
    <section id="skills" className="py-20 px-4 bg-dark-800">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold font-heading text-text-primary mb-12 text-center">Skills & Technologies</h2>
        
        <div className="space-y-8">
          {skillCategories.map((category) => (
            <div key={category.title} className="space-y-4">
              {/* Category Header */}
              <div className="flex items-center gap-3">
                <category.icon className={`w-6 h-6 ${category.color}`} />
                <h3 className="text-xl font-semibold text-text-primary">{category.title}</h3>
              </div>
              
              {/* Skills List */}
              <div className="flex flex-wrap gap-3 pl-9">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-4 py-2 bg-dark-700/50 text-text-secondary rounded-lg border border-dark-600 hover:border-primary-500/50 hover:text-primary-500 transition-all duration-200 text-sm font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Skills 