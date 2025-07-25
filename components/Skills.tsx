'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

const Skills = () => {
  const skillCategories = [
    {
      title: 'Languages',
      skills: [
        { name: 'Java', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg', color: 'bg-red-500' },
        { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg', color: 'bg-yellow-500' },
        { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg', color: 'bg-blue-500' },
        { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg', color: 'bg-blue-500' }
      ]
    },
    {
      title: 'Web Development',
      skills: [
        { name: 'HTML', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg', color: 'bg-orange-500' },
        { name: 'CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg', color: 'bg-blue-500' },
        { name: 'React.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', color: 'bg-blue-500' },
        { name: 'Next.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg', color: 'bg-black' },
        { name: 'Express.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg', color: 'bg-gray-500' },
        { name: 'Tailwind CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg', color: 'bg-blue-500' },
        { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg', color: 'bg-green-500' },
        { name: 'Streamlit', icon: 'https://streamlit.io/images/brand/streamlit-mark-color.png', color: 'bg-red-500' }
      ]
    },
    {
      title: 'Databases',
      skills: [
        { name: 'MongoDB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg', color: 'bg-green-500' },
        { name: 'SQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg', color: 'bg-blue-500' },
        { name: 'Qdrant', icon: 'https://qdrant.tech/favicon.ico', color: 'bg-purple-500' }
      ]
    },
    {
      title: 'AI/ML & APIs',
      skills: [
        { name: 'OpenAI GPT-4', icon: 'https://upload.wikimedia.org/wikipedia/commons/4/4d/OpenAI_Logo.svg', color: 'bg-green-500' },
        { name: 'LangChain', icon: 'https://python.langchain.com/img/favicon.ico', color: 'bg-blue-500' },
        { name: 'LangGraph', icon: 'https://python.langchain.com/img/favicon.ico', color: 'bg-blue-500' }
      ]
    },
    {
      title: 'Tools/Platforms',
      skills: [
        { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg', color: 'bg-orange-500' },
        { name: 'GitHub', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg', color: 'bg-black' },
        { name: 'Postman', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg', color: 'bg-orange-500' },
        { name: 'Docker', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg', color: 'bg-blue-500' },
        { name: 'Vercel', icon: 'https://assets.vercel.com/image/upload/q_auto/front/assets/design/vercel-triangle-black.svg', color: 'bg-black' },
        { name: 'Vite', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg', color: 'bg-purple-500' },
        { name: 'Bunny.net', icon: 'https://bunny.net/favicon.ico', color: 'bg-orange-500' },
        { name: 'Better Auth', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg', color: 'bg-orange-500' }
      ]
    }
  ]

  return (
    <section id="skills" className="py-8 px-4 sm:px-6 bg-background">
      <div className="max-w-6xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-xl md:text-2xl font-bold text-foreground mb-6 text-left"
        >
          Tech <span className="gradient-text">Skills</span>
        </motion.h2>
        
        <div className="space-y-6 sm:space-y-8">
          {skillCategories.map((category, index) => (
            <motion.div 
              key={category.title} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="space-y-3 sm:space-y-4"
            >
              {/* Category Header */}
              <h3 className="text-sm sm:text-base md:text-lg font-semibold text-foreground">{category.title}</h3>
              
              {/* Skills List */}
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {category.skills.map((skill) => (
                  <motion.div
                    key={skill.name}
                    whileHover={{ scale: 1.05, y: -2 }}
                    className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-1.5 sm:py-2 bg-secondary text-secondary-foreground rounded-full border border-border hover:border-blue-500/50 transition-all duration-300"
                  >
                    <div className="flex-shrink-0">
                      <Image 
                        src={skill.icon} 
                        alt={`${skill.name} logo`}
                        width={16}
                        height={16}
                        className="object-contain sm:w-5 sm:h-5"
                      />
                    </div>
                    <span className="font-medium text-xs sm:text-sm">{skill.name}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Skills 