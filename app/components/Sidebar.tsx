'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { db } from '@/app/lib/firebase'
import { collection, query, where, onSnapshot } from 'firebase/firestore'
import { useAuth } from '@/app/lib/auth'
import { 
  Layout, 
  BookOpen, 
  Layers,
  GraduationCap,
  Code2,
  Users,
  Book
} from 'lucide-react'

export default function Sidebar() {
  const { user } = useAuth()
  const [classes, setClasses] = useState<any[]>([])
  const pathname = usePathname()

  useEffect(() => {
    if (!user?.uid) return

    const classesQuery = query(
      collection(db, 'classes'),
      where(user.role === 'teacher' ? 'teacherId' : 'studentIds', 
        user.role === 'teacher' ? '==' : 'array-contains', 
        user.uid
      )
    )

    return onSnapshot(classesQuery, (snapshot) => {
      setClasses(snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })))
    })
  }, [user])

  const isActive = (path: string) => {
    if (path === '/dashboard' || path === '/teacher') {
      return pathname === path
    }
    return pathname?.startsWith(path)
  }

  return (
    <aside className="w-64 bg-white border-r border-gray-200 fixed h-screen overflow-y-auto">
      <div className="p-6 border-b border-gray-200">
        <Link 
          href={user?.role === 'teacher' ? '/teacher' : '/dashboard'} 
          className="text-xl font-semibold text-gray-900 flex items-center gap-2"
        >
          <Layers className="h-6 w-6 text-teal-600" />
          Classroom
        </Link>
      </div>

      <nav className="p-4 space-y-1">
        {/* Main Navigation */}
        <div className="pb-4">
          {user?.role === 'teacher' && (
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
          )}
          
          <Link 
            href="/dashboard" 
            className={`flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-lg transition-colors
              ${isActive('/dashboard')
                ? 'bg-teal-50 text-teal-700' 
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
          >
            <BookOpen className="h-5 w-5" />
            <span>Classes</span>
          </Link>

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
    </aside>
  )
}