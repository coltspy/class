'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Target, Check, Star, Trophy, Lightbulb } from 'lucide-react'

interface Challenge {
  title: string
  description: string
  initialCode: string
  testCases: {
    input: string
    expectedOutput: string
  }[]
}

interface Section {
  id: string
  title: string
  content: React.ReactNode
}

interface Introduction {
  title: string
  description: string
  goals: string[]
  tips: string[]
  content?: React.ReactNode
}

interface LessonTemplateProps {
  lessonTitle: string
  introduction: Introduction
  sections: Section[]
  challenges: Challenge[]
}

export default function LessonTemplate({ 
  lessonTitle,
  introduction,
  sections,
  challenges 
}: LessonTemplateProps) {
  const [activeSection, setActiveSection] = useState('introduction')
  const [progress, setProgress] = useState(0)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-teal-600 to-teal-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <Link href="/learn" className="inline-flex items-center text-white/80 hover:text-white">
              <ArrowLeft size={16} className="mr-1" />
              Back to Lessons
            </Link>
          </div>
          
          <div className="py-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-3xl"
            >
              <h1 className="text-4xl font-bold mb-6">{lessonTitle}</h1>
              <p className="text-xl text-white/90 mb-8">{introduction.description}</p>
              <div className="flex items-center gap-3">
                <div className="text-sm bg-white/10 px-3 py-1 rounded-full">Beginner Friendly</div>
                <div className="w-1 h-1 rounded-full bg-white/30" />
                <div className="text-sm text-white/80">~20 min</div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-12 gap-8">
          {/* Main Content */}
          <div className="col-span-12 lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSection}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                {activeSection === 'introduction' && (
                  <div className="space-y-8">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                      <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <Target className="w-5 h-5 text-teal-600" />
                        Learning Goals
                      </h2>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {introduction.goals.map((goal, index) => (
                          <div key={index} className="flex items-start gap-2">
                            <Check className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-600">{goal}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    {introduction.content && (
                      <div className="bg-gradient-to-br from-teal-50 to-emerald-50 rounded-xl shadow-sm border border-teal-100 p-8">
                        {introduction.content}
                      </div>
                    )}
                  </div>
                )}

                {sections.map(section => (
                  activeSection === section.id && (
                    <div key={section.id} className="space-y-8">
                      {section.content}
                    </div>
                  )
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Sidebar */}
          <div className="col-span-12 lg:col-span-4">
            <div className="sticky top-8 space-y-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-gray-900">Your Progress</h3>
                    <span className="text-teal-600 font-medium">{progress}%</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div 
                      className="bg-teal-600 h-2 rounded-full transition-all duration-500" 
                      style={{ width: `${progress}%` }} 
                    />
                  </div>
                </div>
                <div className="bg-teal-50 px-6 py-4 border-t border-teal-100">
                  <div className="flex items-center gap-2 text-sm text-teal-700">
                    <Trophy className="h-4 w-4" />
                    Keep going! You're doing great!
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                <div className="p-4 border-b border-gray-200">
                  <h3 className="font-semibold text-gray-900">Lesson Sections</h3>
                </div>
                <nav className="p-2">
                  <button
                    onClick={() => setActiveSection('introduction')}
                    className={`w-full text-left px-4 py-2 rounded-lg text-sm ${
                      activeSection === 'introduction'
                        ? 'bg-teal-50 text-teal-700 font-medium'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    Introduction
                  </button>
                  {sections.map(section => (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={`w-full text-left px-4 py-2 rounded-lg text-sm ${
                        activeSection === section.id
                          ? 'bg-teal-50 text-teal-700 font-medium'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      {section.title}
                    </button>
                  ))}
                </nav>
              </div>

              {introduction.tips && introduction.tips.length > 0 && (
                <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-xl shadow-sm border border-amber-100 p-6">
                  <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Lightbulb className="h-5 w-5 text-amber-600" />
                    Quick Tips
                  </h3>
                  <div className="space-y-3">
                    {introduction.tips.map((tip, index) => (
                      <div key={index} className="flex items-start gap-2 text-sm text-gray-700">
                        <Star className="h-4 w-4 text-amber-500 flex-shrink-0 mt-1" />
                        {tip}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}