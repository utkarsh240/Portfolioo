'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Github } from 'lucide-react'
import Section from './Section'

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

export default function GitHubContributions() {
  const [contributions, setContributions] = useState<number[][]>([])
  const [loading, setLoading] = useState(true)

  const generateMockContributions = (): number[][] => {
    const mockData: number[][] = []
    for (let week = 0; week < 52; week++) {
      const weekData: number[] = []
      for (let day = 0; day < 7; day++) {
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
        const token = process.env.NEXT_PUBLIC_GITHUB_TOKEN

        if (!token) {
          setContributions(generateMockContributions())
          setLoading(false)
          return
        }

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

        if (!response.ok) throw new Error('Failed to fetch')

        const data: GitHubResponse = await response.json()
        if (data.errors || !data.data?.user?.contributionsCollection?.contributionCalendar?.weeks) {
          throw new Error('Invalid response')
        }

        const weeks = data.data.user.contributionsCollection.contributionCalendar.weeks
        const contributionData = weeks.map((week) =>
          week.contributionDays.map((day) => day.contributionCount)
        )

        setContributions(contributionData)
      } catch (err) {
        setContributions(generateMockContributions())
      } finally {
        setLoading(false)
      }
    }

    fetchContributions()
  }, [])

  const getContributionColor = (level: number) => {
    if (level === 0) return 'bg-white/5 border border-white/5'
    if (level <= 3) return 'bg-lime-900/40 border border-lime-800'
    if (level <= 6) return 'bg-lime-700/60 border border-lime-600'
    if (level <= 9) return 'bg-lime-500/80 border border-lime-400'
    return 'bg-lime-400 border border-lime-300 shadow-[0_0_10px_rgba(163,230,53,0.5)]'
  }

  return (
    <Section id="github" className="py-24">
      <div className="max-w-7xl mx-auto px-6 flex flex-col items-center">
        <h2 className="text-3xl md:text-5xl font-heading font-bold tracking-tight text-white mb-8 text-center">
          Development <span className="text-lime-400">Activity</span>
        </h2>

        <div className="w-full max-w-4xl bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 sm:p-8 hover:-translate-y-2 hover:border-lime-400 hover:shadow-[0_20px_40px_-15px_rgba(163,230,53,0.1)] transition-all duration-300">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-lg border border-white/10 bg-white/5 flex items-center justify-center">
              <Github className="text-white" size={24} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white leading-tight">utkarsh240</h3>
              <p className="text-sm font-mono tracking-widest uppercase text-lime-400 mt-1">GitHub Contributions</p>
            </div>
          </div>

          {loading ? (
            <div className="animate-pulse flex gap-1 overflow-hidden opacity-50">
              {Array.from({ length: 52 }).map((_, i) => (
                <div key={i} className="flex flex-col gap-1">
                  {Array.from({ length: 7 }).map((_, j) => (
                    <div key={j} className="h-3 w-3 bg-black/10 dark:bg-white/10 rounded-sm" />
                  ))}
                </div>
              ))}
            </div>
          ) : (
            <div className="flex gap-1 overflow-x-auto pb-4 custom-scrollbar">
              {contributions.map((week, weekIndex) => (
                <div key={weekIndex} className="flex flex-col gap-1 shrink-0">
                  {week.map((day, dayIndex) => (
                    <motion.div
                      key={dayIndex}
                      initial={{ opacity: 0, scale: 0.5 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.2,
                        delay: (weekIndex * 7 + dayIndex) * 0.002
                      }}
                      className={`h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-[2px] ${getContributionColor(day)} transition-colors duration-200`}
                      title={`${day} contributions`}
                    />
                  ))}
                </div>
              ))}
            </div>
          )}

          <div className="flex items-center justify-end mt-4 gap-2 text-xs text-muted-foreground">
            <span>Less</span>
            <div className="flex gap-1">
              <div className="h-3 w-3 rounded-[2px] bg-black/5 dark:bg-white/5 border border-white/5" />
              <div className="h-3 w-3 rounded-[2px] bg-emerald-900/40 border border-emerald-800" />
              <div className="h-3 w-3 rounded-[2px] bg-emerald-700/60 border border-emerald-600" />
              <div className="h-3 w-3 rounded-[2px] bg-emerald-500/80 border border-emerald-400" />
              <div className="h-3 w-3 rounded-[2px] bg-emerald-400 border border-emerald-300 shadow-[0_0_10px_rgba(52,211,153,0.5)]" />
            </div>
            <span>More</span>
          </div>
        </div>
      </div>
    </Section>
  )
}