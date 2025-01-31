'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  Code2, 
  Variable, 
  GitBranch, 
  Repeat, 
  Box, 
  Parentheses,
  Binary,
  ChevronRight
} from 'lucide-react'

type Difficulty = 'Beginner' | 'Intermediate' | 'Advanced';

interface Lesson {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  difficulty: Difficulty;
  estimatedTime: string;
  category: string;
}

const lessons: Lesson[] = [
  {
    id: 'variables',
    title: 'Variables & Data Types',
    description: 'Learn how to store and manipulate different types of data in programming.',
    icon: <Variable className="w-6 h-6" />,
    difficulty: 'Beginner',
    estimatedTime: '30 min',
    category: 'Fundamentals'
  },
  {
    id: 'conditionals',
    title: 'Conditionals',
    description: 'Master if statements and logical operations to control program flow.',
    icon: <GitBranch className="w-6 h-6" />,
    difficulty: 'Beginner',
    estimatedTime: '45 min',
    category: 'Control Flow'
  },
  {
    id: 'loops',
    title: 'Loops & Iterations',
    description: 'Explore different ways to repeat actions in your code efficiently.',
    icon: <Repeat className="w-6 h-6" />,
    difficulty: 'Beginner',
    estimatedTime: '40 min',
    category: 'Control Flow'
  },
  {
    id: 'functions',
    title: 'Functions',
    description: 'Learn to write reusable blocks of code and organize your programs.',
    icon: <Parentheses className="w-6 h-6" />,
    difficulty: 'Intermediate',
    estimatedTime: '60 min',
    category: 'Functions'
  },
  {
    id: 'arrays',
    title: 'Arrays & Objects',
    description: 'Work with collections of data and complex data structures.',
    icon: <Box className="w-6 h-6" />,
    difficulty: 'Intermediate',
    estimatedTime: '50 min',
    category: 'Data Structures'
  },
  {
    id: 'algorithms',
    title: 'Basic Algorithms',
    description: 'Solve common programming problems with fundamental algorithms.',
    icon: <Binary className="w-6 h-6" />,
    difficulty: 'Advanced',
    estimatedTime: '90 min',
    category: 'Algorithms'
  }
]

export default function LearnPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const categories = ['All', ...new Set(lessons.map(lesson => lesson.category))]

  const filteredLessons = selectedCategory === 'All' 
    ? lessons 
    : lessons.filter(lesson => lesson.category === selectedCategory)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-8 py-8">
        {/* Header */}
        <div className="max-w-4xl mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-3">
            Interactive Coding Lessons
          </h1>
          <p className="text-gray-600 text-lg">
            Master programming fundamentals with hands-on practice and instant feedback.
          </p>
        </div>

        {/* Category Pills */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-1.5 inline-flex gap-2 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all
                ${selectedCategory === category 
                  ? 'bg-teal-50 text-teal-700 ring-1 ring-teal-600/20' 
                  : 'text-gray-600 hover:bg-gray-50'
                }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Lessons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLessons.map((lesson) => (
            <div
              key={lesson.id}
              className="group bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden
                        transition-all duration-300 hover:shadow-md hover:-translate-y-1 hover:border-teal-500"
            >
              <div className="p-6">
                <div className="w-12 h-12 bg-teal-50 rounded-lg flex items-center justify-center
                              text-teal-600 mb-4 transition-transform group-hover:scale-110">
                  {lesson.icon}
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {lesson.title}
                </h3>
                
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {lesson.description}
                </p>

                <div className="flex justify-end mt-4">
                  <Link
                    href={`/learn/${lesson.id}`}
                    className="inline-flex items-center text-sm text-teal-600 font-medium 
                              hover:text-teal-700 group/link"
                  >
                    Start
                    <ChevronRight className="w-4 h-4 ml-1 transition-transform 
                                          group-hover/link:translate-x-0.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}