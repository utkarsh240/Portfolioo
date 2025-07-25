'use client'

import { motion } from 'framer-motion'
import { GraduationCap } from 'lucide-react'
import Image from 'next/image'

const education = [
  {
    institution: 'KIIT University',
    degree: 'B.Tech Computer Science and Engineering',
    period: '2021 - 2025',
    description: 'Pursuing Bachelor of Technology in Computer Science and Engineering with focus on software development, algorithms, and emerging technologies.',
    icon: GraduationCap,
    logoUrl: '/kiit-logo.jpg', // Official KIIT University logo
    color: 'text-purple-500',
    bgColor: 'bg-purple-500/10',
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}

const Education = () => {
  return (
    <section id="education" className="py-8 bg-muted/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-6"
        >
          <motion.h2
            variants={itemVariants}
            className="text-2xl md:text-3xl font-bold mb-4 text-foreground text-left"
          >
            Educational <span className="gradient-text">Background</span>
          </motion.h2>

        </motion.div>
        
        <div className="space-y-6">
          {education.map((edu, index) => (
            <motion.div
              key={edu.institution}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="border-b border-border pb-6 last:border-b-0"
            >
              <div className="flex items-start space-x-6">
                {/* Icon */}
                <div className="flex-shrink-0">
                  <div className={`p-3 rounded-lg ${edu.bgColor} flex items-center justify-center`}>
                    {edu.logoUrl ? (
                      <Image
                        src={edu.logoUrl}
                        alt={`${edu.institution} logo`}
                        width={32}
                        height={32}
                        className="object-contain"
                      />
                    ) : (
                      <edu.icon className={`w-6 h-6 ${edu.color}`} />
                    )}
                  </div>
                </div>
                
                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg md:text-xl font-bold text-foreground">{edu.institution}</h3>
                    <span className="text-sm text-muted-foreground bg-muted px-3 py-1 rounded-full">
                      {edu.period}
                    </span>
                  </div>
                  <p className="text-lg text-accent-purple font-semibold mb-3">{edu.degree}</p>
                  <p className="text-muted-foreground leading-relaxed">{edu.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Education 