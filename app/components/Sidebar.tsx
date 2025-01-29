// app/components/Sidebar.tsx
'use client'

import { useAuth } from '@/app/lib/auth'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { db } from '@/app/lib/firebase'
import { collection, query, where, onSnapshot } from 'firebase/firestore'
import { ChevronLeft, ChevronRight, Layout, BookOpen, GraduationCap, Plus } from 'lucide-react'

export default function Sidebar() {
  const { user } = useAuth()
  const [isOpen, setIsOpen] = useState(true)
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

  return (
    <aside 
      className={`${
        isOpen ? 'w-64' : 'w-20'
      } bg-white border-r border-gray-200 transition-all duration-300 flex flex-col h-screen fixed`}
    >
      {/* Header */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-gray-100">
        {isOpen && (
          <Link href="/dashboard" className="text-lg font-semibold text-gray-900">
            Classroom
          </Link>
        )}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 hover:bg-gray-50 rounded-lg text-gray-500"
        >
          {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
        </button>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Main Navigation */}
        <nav className="space-y-1">
          {user?.role === 'teacher' && (
            <Link 
              href="/teacher" 
              className={`flex items-center space-x-3 p-2 rounded-lg transition-colors
                ${pathname === '/teacher' 
                  ? 'bg-blue-50 text-blue-600' 
                  : 'text-gray-600 hover:bg-gray-50'}`}
            >
              <Layout size={20} />
              {isOpen && <span>Teaching</span>}
            </Link>
          )}
          
          <Link 
            href="/dashboard" 
            className={`flex items-center space-x-3 p-2 rounded-lg transition-colors
              ${pathname === '/dashboard' 
                ? 'bg-blue-50 text-blue-600' 
                : 'text-gray-600 hover:bg-gray-50'}`}
          >
            <BookOpen size={20} />
            {isOpen && <span>Classes</span>}
          </Link>
        </nav>

        {/* Classes List */}
        <div>
          <div className="flex items-center justify-between mb-2">
            {isOpen && <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Your Classes</span>}
            {user?.role === 'teacher' && isOpen && (
              <Link 
                href="/teacher" 
                className="p-1 hover:bg-gray-50 rounded-lg text-gray-500"
              >
                <Plus size={16} />
              </Link>
            )}
          </div>

          <nav className="space-y-1">
            {classes.map(cls => (
              <Link
                key={cls.id}
                href={`/c/${cls.id}`}
                className={`flex items-center p-2 rounded-lg transition-colors
                  ${pathname === `/c/${cls.id}` 
                    ? 'bg-blue-50 text-blue-600' 
                    : 'text-gray-600 hover:bg-gray-50'}`}
              >
                {isOpen ? (
                  <span className="truncate">{cls.name}</span>
                ) : (
                  <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-700 font-medium">
                    {cls.name[0]}
                  </div>
                )}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* User Section */}
      <div className="p-4 border-t border-gray-100">
        <div className={`flex items-center ${!isOpen && 'justify-center'}`}>
          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
            {user?.email?.[0].toUpperCase()}
          </div>
          {isOpen && (
            <div className="ml-3 overflow-hidden">
              <p className="text-sm font-medium text-gray-900 truncate">{user?.email}</p>
              <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  )
}