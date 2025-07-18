'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Code, Database, Globe, Zap, Brain, Shield } from 'lucide-react'
import Image from 'next/image'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

// Technology logos mapping
const technologyLogos: { [key: string]: string } = {
  'Java': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg',
  'JavaScript': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
  'TypeScript': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
  'Python': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
  'React.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
  'Next.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg',
  'Express.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg',
  'Tailwind CSS': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg',
  'Node.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
  'HTML': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
  'CSS': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg',
  'MongoDB': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
  'SQL': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg',
  'Git': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
  'GitHub': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg',
  'Postman': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg',
  'Docker': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',
  'Vercel': 'https://assets.vercel.com/image/upload/q_auto/front/assets/design/vercel-triangle-black.svg',
  'Vite': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg',
  'Streamlit': 'https://streamlit.io/images/brand/streamlit-mark-color.png',
  'OpenAI GPT-4': 'https://upload.wikimedia.org/wikipedia/commons/4/4d/OpenAI_Logo.svg',
  'LangChain': 'https://python.langchain.com/img/favicon.ico',
  'LangGraph': 'https://python.langchain.com/img/favicon.ico',
  'Qdrant': 'https://qdrant.tech/favicon.ico',
  'Bunny.net': 'https://bunny.net/favicon.ico',
  'Arcjet': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/security/security-original.svg',
  'Better Auth': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg',
}

const Skills = () => {
  const skillCategories = [
    {
      title: 'Programming Languages',
      icon: Code,
      color: 'text-blue-500',
      skills: ['Java', 'JavaScript', 'TypeScript', 'Python']
    },
    {
      title: 'Web Technologies',
      icon: Globe,
      color: 'text-green-500',
      skills: ['React.js', 'Next.js', 'Express.js', 'Tailwind CSS', 'Node.js', 'HTML', 'CSS', 'Streamlit']
    },
    {
      title: 'Databases',
      icon: Database,
      color: 'text-purple-500',
      skills: ['MongoDB', 'SQL', 'Qdrant']
    },
    {
      title: 'AI/ML & APIs',
      icon: Brain,
      color: 'text-orange-500',
      skills: ['OpenAI GPT-4', 'LangChain', 'LangGraph']
    },
    {
      title: 'Tools/Platforms',
      icon: Zap,
      color: 'text-pink-500',
      skills: ['Git', 'GitHub', 'Postman', 'Docker', 'Vercel', 'Vite', 'Bunny.net', 'Arcjet', 'Better Auth']
    }
  ]

  return (
    <section id="skills" className="py-20 px-4 bg-muted/30">
      <div className="max-w-4xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-3xl md:text-4xl font-bold font-heading text-foreground mb-12"
        >
          Skills & <span className="gradient-text">Technologies</span>
        </motion.h2>
        
        <div className="space-y-8">
          {skillCategories.map((category, index) => (
            <motion.div 
              key={category.title} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="space-y-4"
            >
              {/* Category Header */}
              <div className="flex items-center gap-3">
                <category.icon className={`w-6 h-6 ${category.color}`} />
                <h3 className="text-xl font-semibold text-foreground">{category.title}</h3>
              </div>
              
              {/* Skills List */}
              <TooltipProvider>
                <div className="flex flex-wrap gap-3 pl-9">
                  {category.skills.map((skill) => (
                    <Tooltip key={skill}>
                      <TooltipTrigger asChild>
                        <motion.div
                          whileHover={{ scale: 1.02, y: -2 }}
                          className="flex items-center gap-3 px-4 py-3 bg-card/50 border border-border/50 text-foreground rounded-xl hover:bg-card hover:border-primary/50 hover:shadow-lg transition-all duration-300 text-sm font-medium cursor-pointer backdrop-blur-sm"
                        >
                          {skill === 'Arcjet' ? (
                            <div className="flex-shrink-0">
                              <Shield className="w-[18px] h-[18px] text-blue-500" />
                            </div>
                          ) : technologyLogos[skill] ? (
                            <div className="flex-shrink-0">
                              <Image 
                                src={technologyLogos[skill]} 
                                alt={`${skill} logo`}
                                width={18}
                                height={18}
                                className="object-contain"
                              />
                            </div>
                          ) : (
                            <div className="w-[18px] h-[18px] flex-shrink-0" />
                          )}
                          <span className="font-medium">{skill}</span>
                        </motion.div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{skill}</p>
                      </TooltipContent>
                    </Tooltip>
                  ))}
                </div>
              </TooltipProvider>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Skills 