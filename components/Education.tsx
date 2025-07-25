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
    <section id="education" className="pt-4 pb-8 bg-muted/30">
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
            className="text-xl md:text-2xl font-bold mb-4 text-foreground text-left"
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
              <div className="flex flex-col sm:flex-row sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
                {/* Icon */}
                <div className="flex-shrink-0">
                  <div className={`p-2.5 sm:p-3 rounded-lg ${edu.bgColor} flex items-center justify-center`}>
                    {edu.logoUrl ? (
                      <Image
                        src={edu.logoUrl}
                        alt={`${edu.institution} logo`}
                        width={28}
                        height={28}
                        className="object-contain sm:w-8 sm:h-8"
                      />
                    ) : (
                      <edu.icon className={`w-5 h-5 sm:w-6 sm:h-6 ${edu.color}`} />
                    )}
                  </div>
                </div>
                
                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2 space-y-2 sm:space-y-0">
                    <h3 className="text-sm sm:text-base md:text-lg font-bold text-foreground">{edu.institution}</h3>
                    <span className="text-xs sm:text-sm text-muted-foreground bg-muted px-2 sm:px-3 py-1 rounded-full self-start sm:self-auto">
                      {edu.period}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm md:text-base text-accent-purple font-semibold mb-2 sm:mb-3">{edu.degree}</p>
                  <p className="text-muted-foreground leading-relaxed text-xs sm:text-sm">{edu.description}</p>
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