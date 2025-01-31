'use client'

import { useAuth } from './lib/auth'
import Link from 'next/link'
import { Layers, ArrowRight } from 'lucide-react'

export default function Home() {
  const { user } = useAuth()

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50">
      <div className="text-center space-y-8 px-4">
        <div className="flex items-center justify-center gap-3 mb-8">
          <Layers className="h-12 w-12 text-teal-600" />
          <h1 className="text-4xl font-bold text-gray-900">Classroom</h1>
        </div>
        
        <p className="text-xl text-gray-600 max-w-md mx-auto">
          A modern platform for learning and teaching programming
        </p>

        {user ? (
          <Link 
            href="/dashboard" 
            className="inline-flex items-center px-6 py-3 bg-teal-600 text-white 
                     font-medium rounded-lg hover:bg-teal-700 transition-colors
                     shadow-sm hover:shadow gap-2 text-lg"
          >
            Go to Dashboard
            <ArrowRight className="w-5 h-5" />
          </Link>
        ) : (
          <div className="space-y-4">
            <Link 
              href="/auth/signin" 
              className="inline-flex items-center px-6 py-3 bg-teal-600 text-white 
                       font-medium rounded-lg hover:bg-teal-700 transition-colors 
                       shadow-sm hover:shadow gap-2 text-lg"
            >
              Get Started
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}