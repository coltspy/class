// app/teacher/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '../lib/auth'
import { db } from '../lib/firebase'
import { addDoc, collection, query, where, onSnapshot } from 'firebase/firestore'
import { Users, Clock, BookOpen } from 'lucide-react'

export default function TeacherDashboard() {
  const [className, setClassName] = useState('')
  const [classes, setClasses] = useState<any[]>([])
  const { user } = useAuth()

  useEffect(() => {
    if (!user?.uid) return
    
    const classesQuery = query(
      collection(db, 'classes'),
      where('teacherId', '==', user.uid)
    )

    return onSnapshot(classesQuery, (snapshot) => {
      setClasses(snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })))
    })
  }, [user])

  const createClass = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await addDoc(collection(db, 'classes'), {
        name: className,
        teacherId: user?.uid,
        studentIds: [],
        code: Math.random().toString(36).substring(2, 8).toUpperCase(),
        createdAt: new Date().toISOString()
      })
      setClassName('')
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Create Class Section */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h2 className="text-lg font-semibold mb-4">Create New Class</h2>
        <form onSubmit={createClass} className="flex gap-4">
          <input
            type="text"
            value={className}
            onChange={(e) => setClassName(e.target.value)}
            placeholder="Class Name"
            className="flex-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
          <button 
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Create
          </button>
        </form>
      </div>

      {/* Classes Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {classes.map(cls => (
          <div key={cls.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-semibold text-gray-900">{cls.name}</h3>
              <span className="text-sm text-gray-500">Code: {cls.code}</span>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center text-gray-600">
                <Users size={18} className="mr-2" />
                <span>{cls.studentIds?.length || 0} students</span>
              </div>
              
              <div className="flex items-center text-gray-600">
                <Clock size={18} className="mr-2" />
                <span>Created {new Date(cls.createdAt).toLocaleDateString()}</span>
              </div>
              
              <div className="flex items-center text-gray-600">
                <BookOpen size={18} className="mr-2" />
                <span>0 assignments</span>
              </div>
            </div>

            <button
              onClick={() => window.location.href = `/c/${cls.id}`}
              className="mt-4 w-full bg-gray-50 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              View Class
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}