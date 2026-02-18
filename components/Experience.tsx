'use client'

import { motion } from 'framer-motion'
import { Briefcase, Users } from 'lucide-react'

const experiences = [
  {
    company: 'Ekaant',
    role: 'Software Developer Intern',
    period: 'May 2024 - July 2024',
    description: 'Worked on scalable web applications using React.js, Tailwind CSS, TypeScript, Docker, and AWS. Collaborated with cross-functional teams to deliver robust solutions.',
    icon: Briefcase,
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
  },
  {
    company: 'WebXstreet',
    role: 'Cofounder',
    period: 'Feb 2022 - March 2023',
    description: 'Co-founded a web solutions startup, leading product development, client acquisition, and project delivery. Specialized in modern web technologies and business growth.',
    icon: Users,
    color: 'text-green-500',
    bgColor: 'bg-green-500/10',
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

const Experience = () => {
  return (
    <section id="experience" className="py-8 bg-background">
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
            Professional <span className="gradient-text">Experience</span>
          </motion.h2>

        </motion.div>
        
        <div className="space-y-6">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.company}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="border-b border-border pb-6 last:border-b-0"
            >
              <div className="flex flex-col sm:flex-row sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
                {/* Icon */}
                <div className="flex-shrink-0">
                  <div className={`p-2.5 sm:p-3 rounded-lg ${exp.bgColor} flex items-center justify-center`}>
                    <exp.icon className={`w-5 h-5 sm:w-6 sm:h-6 ${exp.color}`} />
                  </div>
                </div>
                
                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2 space-y-2 sm:space-y-0">
                    <h3 className="text-sm sm:text-base md:text-lg font-bold text-foreground">{exp.company}</h3>
                    <span className="text-xs sm:text-sm text-muted-foreground bg-muted px-2 sm:px-3 py-1 rounded-full self-start sm:self-auto">
                      {exp.period}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm md:text-base text-accent-blue font-semibold mb-2 sm:mb-3">{exp.role}</p>
                  <p className="text-muted-foreground leading-relaxed text-xs sm:text-sm">
                    {exp.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Experience 