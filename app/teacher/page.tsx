// app/teacher/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '../lib/auth'
import { db } from '../lib/firebase'
import { addDoc, collection, query, where, onSnapshot } from 'firebase/firestore'
import { Users, Pencil, Plus, Clock } from 'lucide-react'
import Link from 'next/link'
import CreateAssignmentModal from '../components/CreateAssignmentModal'

interface Class {
  id: string;
  name: string;
  code: string;
  studentIds: string[];
}

export default function TeacherDashboard() {
  const [className, setClassName] = useState('')
  const [classes, setClasses] = useState<Class[]>([])
  const [selectedClass, setSelectedClass] = useState<string | null>(null)
  const [showCreateModal, setShowCreateModal] = useState(false)
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
      })) as Class[])
    })
  }, [user])

  const createClass = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!className.trim()) return

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
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Teacher Dashboard</h1>
        <button
          onClick={() => setShowCreateModal(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          New Assignment
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Create Class Form */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Create New Class</h2>
              <form onSubmit={createClass} className="space-y-4">
                <input
                  type="text"
                  value={className}
                  onChange={(e) => setClassName(e.target.value)}
                  placeholder="Enter class name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button 
                  type="submit"
                  className="w-full bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
                >
                  Create Class
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Classes Grid */}
        <div className="lg:col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {classes.map((cls) => (
              <div 
                key={cls.id} 
                className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{cls.name}</h3>
                      <p className="text-sm text-gray-500">Code: {cls.code}</p>
                    </div>
                    <button
                      onClick={() => {
                        setSelectedClass(cls.id)
                        setShowCreateModal(true)
                      }}
                      className="p-2 hover:bg-gray-50 rounded-full"
                    >
                      <Pencil className="h-4 w-4 text-gray-500" />
                    </button>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-gray-600">
                      <Users className="h-4 w-4 mr-2" />
                      <span>{cls.studentIds?.length || 0} students</span>
                    </div>
                  </div>

                  <Link
                    href={`/c/${cls.id}`}
                    className="mt-4 inline-block w-full text-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    View Class
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {showCreateModal && selectedClass && (
        <CreateAssignmentModal
          classId={selectedClass}
          onClose={() => {
            setShowCreateModal(false)
            setSelectedClass(null)
          }}
        />
      )}
    </div>
  )
}