'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { db } from '@/app/lib/firebase'
import { collection, query, where, onSnapshot } from 'firebase/firestore'
import { useAuth } from '@/app/lib/auth'
import { Layout, BookOpen, Layers } from 'lucide-react'

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

  return (
    <aside className="w-64 bg-gray-50 fixed h-screen overflow-y-auto">
      <div className="p-6">
        <Link href={user?.role === 'teacher' ? '/teacher' : '/dashboard'} 
              className="text-xl font-bold text-gray-900 flex items-center gap-2">
          <Layers className="h-6 w-6 text-blue-600" />
          Classroom
        </Link>
      </div>

      <nav className="mt-6 px-3 space-y-1">
        {user?.role === 'teacher' && (
          <Link 
            href="/teacher" 
            className={`flex items-center gap-3 px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              pathname === '/teacher' 
                ? 'bg-blue-50 text-blue-700' 
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <Layout className="h-5 w-5" />
            <span>Teaching</span>
          </Link>
        )}
        
        <Link 
          href="/dashboard" 
          className={`flex items-center gap-3 px-4 py-2 text-sm font-medium rounded-md transition-colors ${
            pathname === '/dashboard' 
              ? 'bg-blue-50 text-blue-700' 
              : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          <BookOpen className="h-5 w-5" />
          <span>Classes</span>
        </Link>

        <div className="pt-4 mt-4 border-t border-gray-200">
          <h3 className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Your Classes
          </h3>
          <div className="mt-3 space-y-1">
            {classes.map(cls => (
              <Link
                key={cls.id}
                href={`/c/${cls.id}`}
                className={`flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  pathname === `/c/${cls.id}` 
                    ? 'bg-blue-50 text-blue-700' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <span className="truncate">{cls.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </aside>
  )
}
