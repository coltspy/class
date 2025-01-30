'use client'

import { useEffect, useState } from 'react'
import { collection, query, where, onSnapshot } from 'firebase/firestore'
import { db } from '@/app/lib/firebase'
import { useAuth } from '@/app/lib/auth'
import { Assignment, ClassData } from '@/app/lib/types'
import Link from 'next/link'
import { FileText, ChevronRight, Users, Clock } from 'lucide-react'

export default function TeacherSubmissionsPage() {
  const { user } = useAuth()
  const [assignments, setAssignments] = useState<Assignment[]>([])
  const [classes, setClasses] = useState<ClassData[]>([])
  const [selectedClass, setSelectedClass] = useState<string>('all')

  useEffect(() => {
    if (!user?.uid) return

    const classesQuery = query(
      collection(db, 'classes'),
      where('teacherId', '==', user.uid)
    )

    const classesUnsubscribe = onSnapshot(classesQuery, (snapshot) => {
      const classesData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as ClassData[]
      setClasses(classesData)

      const assignmentsQuery = query(
        collection(db, 'assignments'),
        where('classId', 'in', classesData.map(c => c.id))
      )

      const assignmentsUnsubscribe = onSnapshot(assignmentsQuery, (snapshot) => {
        setAssignments(snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Assignment[])
      })

      return () => assignmentsUnsubscribe()
    })

    return () => classesUnsubscribe()
  }, [user?.uid])

  const groupedAssignments = classes.reduce((acc, cls) => {
    acc[cls.id] = assignments.filter(a => a.classId === cls.id)
    return acc
  }, {} as Record<string, Assignment[]>)

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 ml-64">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Submissions Overview</h1>
      </div>

      {/* Class Tabs */}
      <div className="border-b border-gray-200 mb-8">
        <div className="flex space-x-8">
          <button
            onClick={() => setSelectedClass('all')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              selectedClass === 'all'
                ? 'border-teal-600 text-teal-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            All Classes
          </button>
          {classes.map(cls => (
            <button
              key={cls.id}
              onClick={() => setSelectedClass(cls.id)}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                selectedClass === cls.id
                  ? 'border-teal-600 text-teal-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {cls.name}
            </button>
          ))}
        </div>
      </div>

      {/* Class Sections */}
      <div className="space-y-12">
        {selectedClass === 'all' ? (
          // Show all classes
          classes.map(cls => (
            <div key={cls.id} className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold text-gray-900">{cls.name}</h2>
                <span className="text-sm text-gray-500">
                  {groupedAssignments[cls.id]?.length || 0} assignments
                </span>
              </div>
              
              {/* Assignments for this class */}
              {groupedAssignments[cls.id]?.map(assignment => (
                <AssignmentCard 
                  key={assignment.id} 
                  assignment={assignment} 
                  className={cls.name}
                />
              ))}
            </div>
          ))
        ) : (
          // Show selected class
          <div className="space-y-6">
            {groupedAssignments[selectedClass]?.map(assignment => (
              <AssignmentCard 
                key={assignment.id} 
                assignment={assignment}
                className={classes.find(c => c.id === selectedClass)?.name || ''}
              />
            ))}
          </div>
        )}

        {/* Empty State */}
        {assignments.length === 0 && (
          <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-200">
            <FileText className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No assignments yet</h3>
            <p className="mt-1 text-sm text-gray-500">
              Create assignments to see student submissions
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

// Assignment Card Component
function AssignmentCard({ 
  assignment, 
  className 
}: { 
  assignment: Assignment; 
  className: string; 
}) {
  const submissionCount = Object.keys(assignment.submissions || {}).length
  const isPastDue = new Date(assignment.dueDate) < new Date()

  return (
    <Link
      href={`/c/${assignment.classId}/a/${assignment.id}`}
      className="block bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all"
    >
      <div className="p-6">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {assignment.title}
            </h3>
            
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1 text-sm text-gray-500">
                <Users className="h-4 w-4" />
                {submissionCount} submissions
              </span>
              <span className="flex items-center gap-1 text-sm text-gray-500">
                <Clock className="h-4 w-4" />
                {isPastDue ? 'Past due' : `Due ${new Date(assignment.dueDate).toLocaleDateString()}`}
              </span>
            </div>
          </div>
          <ChevronRight className="h-5 w-5 text-teal-600" />
        </div>
      </div>
    </Link>
  )
}