'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

const Contact = () => {
  return (
    <section id="contact" className="py-8 px-4 sm:px-6 bg-background">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-left mb-6"
        >
          <h2 className="text-xl md:text-2xl font-bold font-heading text-foreground mb-3 sm:mb-4">
            Get in <span className="gradient-text">Touch</span>
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
            Have an idea, collaboration, or just want to say hi?<br />
            Drop me a message.
          </p>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-2xl mx-auto"
        >
          <Card className="shadow-lg">
            <CardContent className="p-4 sm:p-6 lg:p-8">
              <form className="flex flex-col gap-4 sm:gap-6">
                {/* Name and Phone in 2-column grid for larger screens */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  <div className="space-y-1.5 sm:space-y-2">
                    <label className="text-xs sm:text-sm font-medium text-foreground">Full Name</label>
                    <input 
                      type="text" 
                      placeholder="Utkarsh Gupta" 
                      className="w-full bg-background border border-border rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-foreground font-body focus:border-primary focus:outline-none transition-colors duration-200 text-xs sm:text-sm" 
                    />
                  </div>
                  <div className="space-y-1.5 sm:space-y-2">
                    <label className="text-xs sm:text-sm font-medium text-foreground">Phone Number</label>
                    <input 
                      type="tel" 
                      placeholder="+91 1234567890" 
                      className="w-full bg-background border border-border rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-foreground font-body focus:border-primary focus:outline-none transition-colors duration-200 text-xs sm:text-sm" 
                    />
                  </div>
                </div>
                
                {/* Email field - full width */}
                <div className="space-y-1.5 sm:space-y-2">
                  <label className="text-xs sm:text-sm font-medium text-foreground">Email</label>
                  <input 
                    type="email" 
                    placeholder="example@email.com" 
                    className="w-full bg-background border border-border rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-foreground font-body focus:border-primary focus:outline-none transition-colors duration-200 text-xs sm:text-sm" 
                  />
                </div>
                
                {/* Message field - full width */}
                <div className="space-y-1.5 sm:space-y-2">
                  <label className="text-xs sm:text-sm font-medium text-foreground">Message</label>
                  <textarea 
                    placeholder="Type your message here..." 
                    rows={4} 
                    className="w-full bg-background border border-border rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-foreground font-body focus:border-primary focus:outline-none transition-colors duration-200 resize-none text-xs sm:text-sm" 
                  />
                </div>
                
                <div className="flex justify-start pt-2">
                  <Button type="submit" className="font-heading px-4 sm:px-6 py-2 text-xs sm:text-sm">
                    Send Message
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </motion.div>


      </div>
    </section>
  )
}

export default Contact 