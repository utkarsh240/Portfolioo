'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Github } from 'lucide-react'

// Define proper types for GitHub contribution data
interface ContributionDay {
  contributionCount: number
  date: string
}

interface ContributionWeek {
  contributionDays: ContributionDay[]
}

interface GitHubResponse {
  data: {
    user: {
      contributionsCollection: {
        contributionCalendar: {
          weeks: ContributionWeek[]
        }
      }
    }
  }
  errors?: Array<{ message: string }>
}

const GitHubContributions = () => {
  const [contributions, setContributions] = useState<number[][]>([])
  const [loading, setLoading] = useState(true)
  const [useFallback, setUseFallback] = useState(false)

  // Generate mock contribution data for fallback
  const generateMockContributions = (): number[][] => {
    const mockData: number[][] = []
    for (let week = 0; week < 52; week++) {
      const weekData: number[] = []
      for (let day = 0; day < 7; day++) {
        // Generate random contribution counts (0-10)
        weekData.push(Math.floor(Math.random() * 11))
      }
      mockData.push(weekData)
    }
    return mockData
  }

  useEffect(() => {
    const fetchContributions = async () => {
      try {
        setLoading(true)
        
        // Check if GitHub token exists
        const token = process.env.NEXT_PUBLIC_GITHUB_TOKEN
        if (!token) {
          console.warn('GitHub token not found, using fallback data')
          setContributions(generateMockContributions())
          setUseFallback(true)
          setLoading(false)
          return
        }

        // Fetch contribution data from GitHub GraphQL API
        const response = await fetch('https://api.github.com/graphql', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({
            query: `
              query {
                user(login: "utkarsh240") {
                  contributionsCollection {
                    contributionCalendar {
                      totalContributions
                      weeks {
                        contributionDays {
                          contributionCount
                          date
                        }
                      }
                    }
                  }
                }
              }
            `
          })
        })

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`)
        }

        const data: GitHubResponse = await response.json()
        
        if (data.errors) {
          throw new Error(data.errors[0].message)
        }

        if (!data.data?.user?.contributionsCollection?.contributionCalendar?.weeks) {
          throw new Error('Invalid response format from GitHub API')
        }

        const weeks = data.data.user.contributionsCollection.contributionCalendar.weeks
        const contributionData = weeks.map((week: ContributionWeek) => 
          week.contributionDays.map((day: ContributionDay) => day.contributionCount)
        )

        setContributions(contributionData)
        setLoading(false)
      } catch (err) {
        console.error('Error fetching contributions:', err)
        // Use fallback data instead of showing error
        setContributions(generateMockContributions())
        setUseFallback(true)
        setLoading(false)
      }
    }

    fetchContributions()
  }, [])

  const getContributionColor = (level: number) => {
    if (level === 0) return 'bg-gray-800'
    if (level <= 3) return 'bg-green-900'
    if (level <= 6) return 'bg-green-700'
    if (level <= 9) return 'bg-green-500'
    return 'bg-green-300'
  }

  if (loading) {
    return (
      <section className="py-8 px-4 bg-background">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              GitHub <span className="gradient-text">Contributions</span>
            </h2>
            <div className="flex justify-center">
              <div className="bg-gray-900 p-6 rounded-lg shadow-lg">
                <div className="flex items-center gap-2 mb-4">
                  <Github className="w-5 h-5 text-white" />
                  <span className="text-white text-sm font-medium">utkarsh240</span>
                </div>
                <div className="text-white">Loading contributions...</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-8 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-left mb-6"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            GitHub <span className="gradient-text">Contributions</span>
          </h2>
          {useFallback && (
            <p className="text-yellow-400 text-sm mt-2">
              Showing sample data (GitHub API not configured)
            </p>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex justify-center"
        >
          <div className="bg-gray-900 p-6 rounded-lg shadow-lg">
            <div className="flex items-center gap-2 mb-4">
              <Github className="w-5 h-5 text-white" />
              <span className="text-white text-sm font-medium">utkarsh240</span>
            </div>
            
            <div className="flex gap-1">
              {contributions.map((week, weekIndex) => (
                <div key={weekIndex} className="flex flex-col gap-1">
                  {week.map((day, dayIndex) => (
                    <motion.div
                      key={dayIndex}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ 
                        duration: 0.3, 
                        delay: (weekIndex * 7 + dayIndex) * 0.01 
                      }}
                      className={`w-3 h-3 rounded-sm ${getContributionColor(day)} hover:scale-125 transition-transform duration-200`}
                      title={`${day} contributions`}
                    />
                  ))}
                </div>
              ))}
            </div>
            
            <div className="flex items-center justify-between mt-4 text-xs text-gray-400">
              <span>Less</span>
              <div className="flex gap-1">
                <div className="w-3 h-3 rounded-sm bg-gray-800"></div>
                <div className="w-3 h-3 rounded-sm bg-green-900"></div>
                <div className="w-3 h-3 rounded-sm bg-green-700"></div>
                <div className="w-3 h-3 rounded-sm bg-green-500"></div>
                <div className="w-3 h-3 rounded-sm bg-green-300"></div>
              </div>
              <span>More</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-4"
        >
          <a
            href="https://github.com/utkarsh240"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors duration-300"
          >
            <Github size={20} />
            View Full Profile
          </a>
        </motion.div>
      </div>
    </section>
  )
}

export default GitHubContributions 