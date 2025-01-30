'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '../lib/auth'
import { db } from '../lib/firebase'
import { collection, query, where, getDocs, doc, updateDoc, arrayUnion, onSnapshot } from 'firebase/firestore'
import Link from 'next/link'
import { Book, AlertCircle } from 'lucide-react'

interface Class {
  id: string
  name: string
  teacherId: string
}

export default function StudentDashboard() {
  const [classCode, setClassCode] = useState('')
  const [error, setError] = useState('')
  const [classes, setClasses] = useState<Class[]>([])
  const { user } = useAuth()

  useEffect(() => {
    if (!user?.uid) return

    const classesQuery = query(
      collection(db, 'classes'),
      where('studentIds', 'array-contains', user.uid)
    )

    return onSnapshot(classesQuery, (snapshot) => {
      setClasses(snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Class[])
    })
  }, [user?.uid])

  const joinClass = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    try {
      const classesRef = collection(db, 'classes')
      const q = query(classesRef, where('code', '==', classCode.toUpperCase()))
      const snapshot = await getDocs(q)

      if (snapshot.empty) {
        setError('Invalid class code')
        return
      }

      const classDoc = snapshot.docs[0]
      await updateDoc(doc(db, 'classes', classDoc.id), {
        studentIds: arrayUnion(user?.uid)
      })

      setClassCode('')
    } catch (error) {
      setError('Error joining class')
      console.error(error)
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Enrolled Classes */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Your Classes</h1>
        
        <div className="space-y-4">
          {classes.map(cls => (
            <Link
              key={cls.id}
              href={`/c/${cls.id}`}
              className="block bg-white p-4 rounded-xl shadow-sm border border-gray-200 
                       hover:border-teal-500 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Book className="h-5 w-5 text-teal-600" />
                <span className="font-medium text-gray-900">{cls.name}</span>
              </div>
            </Link>
          ))}

          {classes.length === 0 && (
            <p className="text-gray-500 text-center py-8">
              You haven't joined any classes yet
            </p>
          )}
        </div>
      </div>

      {/* Join Class Form */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Join a Class</h2>
        <form onSubmit={joinClass} className="space-y-4">
          <div className="flex gap-3">
            <input
              type="text"
              value={classCode}
              onChange={(e) => setClassCode(e.target.value.toUpperCase())}
              placeholder="Enter class code"
              className="flex-1 px-3 py-2 border border-gray-200 rounded-lg 
                       focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
            />
            <button 
              type="submit"
              className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 
                       transition-colors font-medium"
            >
              Join Class
            </button>
          </div>

          {error && (
            <div className="flex items-center gap-2 text-red-600 text-sm">
              <AlertCircle className="h-4 w-4" />
              <p>{error}</p>
            </div>
          )}
        </form>
      </div>
    </div>
  )
}