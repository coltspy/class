// app/c/[classId]/page.tsx
'use client'

import { useEffect, useState } from 'react'
import { db } from '@/app/lib/firebase'
import { doc, getDoc, collection, query, where, onSnapshot } from 'firebase/firestore'
import { useAuth } from '@/app/lib/auth'
import { CalendarDays, Users, MoreVertical } from 'lucide-react'

interface Assignment {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  createdAt: string;
}

export default function ClassPage({ params }: { params: { classId: string } }) {
  const [classData, setClassData] = useState<any>(null)
  const [assignments, setAssignments] = useState<Assignment[]>([])
  const { user } = useAuth()

  useEffect(() => {
    const fetchClass = async () => {
      const docRef = doc(db, 'classes', params.classId)
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        setClassData({ id: docSnap.id, ...docSnap.data() })
      }
    }
    fetchClass()

    // Listen for assignments
    const assignmentsQuery = query(
      collection(db, 'assignments'), 
      where('classId', '==', params.classId)
    )

    return onSnapshot(assignmentsQuery, (snapshot) => {
      setAssignments(snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Assignment[])
    })
  }, [params.classId])

  if (!classData) return null

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6 overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-blue-500 to-blue-600"></div>
        <div className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{classData.name}</h1>
              {user?.role === 'teacher' && (
                <p className="mt-1 text-sm text-gray-500">Class Code: {classData.code}</p>
              )}
            </div>
            <button className="p-2 hover:bg-gray-50 rounded-full">
              <MoreVertical size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Assignments */}
      <div className="space-y-4">
        {assignments.map((assignment) => (
          <div 
            key={assignment.id}
            className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-medium text-gray-900">{assignment.title}</h3>
                <p className="mt-1 text-sm text-gray-500">{assignment.description}</p>
                <div className="mt-3 flex items-center text-sm text-gray-500">
                  <CalendarDays size={16} className="mr-2" />
                  Due {new Date(assignment.dueDate).toLocaleDateString()}
                </div>
              </div>
              <button className="p-2 hover:bg-gray-50 rounded-full">
                <MoreVertical size={20} />
              </button>
            </div>
          </div>
        ))}

        {assignments.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No assignments yet</p>
          </div>
        )}
      </div>
    </div>
  )
}