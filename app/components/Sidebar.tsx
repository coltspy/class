// app/components/Sidebar.tsx
'use client'

import { useAuth } from '@/app/lib/auth'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { db } from '@/app/lib/firebase'
import { collection, query, where, onSnapshot } from 'firebase/firestore'
import { BookOpen, Layout, Plus } from 'lucide-react'

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
      } bg-white border-r border-gray-200 transition-all duration-300 flex flex-col`}
    >
      <div className="p-4 border-b border-gray-100 flex items-center justify-between">
        <Link href={user?.role === 'teacher' ? '/teacher' : '/dashboard'} 
              className={`font-medium text-gray-900 ${!isOpen && 'hidden'}`}>
          Classroom
        </Link>
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 hover:bg-gray-50 rounded-md"
        >
          {isOpen ? '←' : '→'}
        </button>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {user?.role === 'teacher' && (
          <Link 
            href="/teacher" 
            className={`flex items-center space-x-2 p-2 rounded-md transition-colors
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
          className={`flex items-center space-x-2 p-2 rounded-md transition-colors
            ${pathname === '/dashboard' 
              ? 'bg-blue-50 text-blue-600' 
              : 'text-gray-600 hover:bg-gray-50'}`}
        >
          <BookOpen size={20} />
          {isOpen && <span>Enrolled</span>}
        </Link>

        <div className="pt-4 mt-4 border-t border-gray-100">
          <div className="flex items-center justify-between mb-4">
            {isOpen && <span className="text-sm text-gray-500">Your classes</span>}
            {user?.role === 'teacher' && (
              <Link 
                href="/teacher" 
                className="p-1 hover:bg-gray-50 rounded-md text-gray-500"
              >
                <Plus size={18} />
              </Link>
            )}
          </div>
          
          {classes.map(cls => (
            <Link
              key={cls.id}
              href={`/c/${cls.id}`}
              className={`flex items-center mb-1 p-2 rounded-md transition-colors
                ${pathname === `/c/${cls.id}` 
                  ? 'bg-blue-50 text-blue-600' 
                  : 'text-gray-600 hover:bg-gray-50'}`}
            >
              {isOpen ? (
                <span className="truncate">{cls.name}</span>
              ) : (
                <span className="w-8 h-8 flex items-center justify-center rounded-md bg-gray-100">
                  {cls.name[0]}
                </span>
              )}
            </Link>
          ))}
        </div>
      </nav>
    </aside>
  )
}