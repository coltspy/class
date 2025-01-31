'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { db } from '@/app/lib/firebase'
import { collection, query, where, onSnapshot, doc, getDoc } from 'firebase/firestore'
import { useAuth } from '@/app/lib/auth'
import { 
  Layout, 
  BookOpen, 
  Layers,
  GraduationCap,
  Book
} from 'lucide-react'
import { ClassData } from '@/app/lib/types'

export default function Sidebar() {
  const { user } = useAuth()
  const [classes, setClasses] = useState<ClassData[]>([])
  const pathname = usePathname()

  useEffect(() => {
    if (!user?.uid) return

    // Query classes based on user role
    const classesQuery = user.role === 'teacher'
      ? query(
          collection(db, 'classes'),
          where('teacherIds', 'array-contains', user.uid)
        )
      : query(
          collection(db, 'classes'),
          where('studentIds', 'array-contains', user.uid)
        );

    const unsubscribe = onSnapshot(classesQuery, (snapshot) => {
      setClasses(snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as ClassData[])
    })

    return () => unsubscribe()
  }, [user?.uid, user?.role])

  const isActive = (path: string) => {
    return pathname?.startsWith(path)
  }

  if (!user) return null

  return (
    <div className="h-full flex flex-col border-r border-gray-200">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <Link 
          href={user.role === 'teacher' ? '/teacher' : '/dashboard'} 
          className="text-xl font-semibold text-gray-900 flex items-center gap-2"
        >
          <Layers className="h-6 w-6 text-teal-600" />
          Classroom
        </Link>
      </div>

      {/* Scrollable navigation area */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Main Navigation */}
        <div className="space-y-1">
          {user.role === 'teacher' ? (
            <Link 
              href="/teacher" 
              className={`flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-lg transition-colors
                ${isActive('/teacher')
                  ? 'bg-teal-50 text-teal-700' 
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
            >
              <Layout className="h-5 w-5" />
              <span>Teaching</span>
            </Link>
          ) : (
            <Link 
              href="/dashboard" 
              className={`flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-lg transition-colors
                ${isActive('/dashboard')
                  ? 'bg-teal-50 text-teal-700' 
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
            >
              <BookOpen className="h-5 w-5" />
              <span>Dashboard</span>
            </Link>
          )}

          <Link 
            href="/learn" 
            className={`flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-lg transition-colors
              ${isActive('/learn')
                ? 'bg-teal-50 text-teal-700' 
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
          >
            <GraduationCap className="h-5 w-5" />
            <span>Learn</span>
          </Link>
        </div>

        {/* Classes Section */}
        <div className="pt-4 border-t border-gray-200">
          <h3 className="px-4 mb-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Your Classes
          </h3>
          <div className="space-y-1">
            {classes.map(cls => (
              <Link
                key={cls.id}
                href={`/c/${cls.id}`}
                className={`flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-lg transition-colors
                  ${isActive(`/c/${cls.id}`)
                    ? 'bg-teal-50 text-teal-700' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
              >
                <Book className="h-4 w-4" />
                <span className="truncate">{cls.name}</span>
              </Link>
            ))}

            {classes.length === 0 && (
              <p className="px-4 py-2 text-sm text-gray-500">
                No classes yet
              </p>
            )}
          </div>
        </div>
      </nav>
    </div>
  )
}