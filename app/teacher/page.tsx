// app/teacher/page.tsx
'use client'

import { useEffect, useState } from 'react'
import { collection, query, where, onSnapshot } from 'firebase/firestore'
import { db } from '@/app/lib/firebase'
import { useAuth } from '@/app/lib/auth'
import { Assignment, ClassData } from '@/app/lib/types'
import Link from 'next/link'
import { FileText, ChevronRight, Users, Clock, CheckCircle } from 'lucide-react'

export default function TeacherDashboard() {
  const { user } = useAuth()
  const [assignments, setAssignments] = useState<Assignment[]>([])
  const [classes, setClasses] = useState<ClassData[]>([])

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

  const recentAssignments = assignments
    .sort((a, b) => new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime())
    .slice(0, 5)

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 ml-64">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Teacher Dashboard</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Classes Overview */}
        <div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold">Your Classes</h2>
            </div>
            <div className="divide-y divide-gray-200">
              {classes.map(cls => (
                <Link
                  key={cls.id}
                  href={`/c/${cls.id}`}
                  className="block p-6 hover:bg-gray-50"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium text-gray-900">{cls.name}</h3>
                      <p className="text-sm text-gray-500">
                        {cls.studentIds?.length || 0} students
                      </p>
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-lg font-semibold">Recent Assignments</h2>
              <Link 
                href="/teacher/submissions"
                className="text-sm text-blue-600 hover:text-blue-700"
              >
                View all
              </Link>
            </div>
            <div className="divide-y divide-gray-200">
              {recentAssignments.map(assignment => {
                const className = classes.find(c => c.id === assignment.classId)?.name
                const submissionCount = Object.keys(assignment.submissions || {}).length
                const totalStudents = classes.find(c => c.id === assignment.classId)?.studentIds?.length || 0

                return (
                  <Link
                    key={assignment.id}
                    href={`/teacher/submissions/${assignment.id}`}
                    className="block p-6 hover:bg-gray-50"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm text-gray-500 mb-1">{className}</p>
                        <h3 className="font-medium text-gray-900">{assignment.title}</h3>
                        <div className="mt-2 flex items-center gap-4 text-sm">
                          <span className="flex items-center gap-1 text-gray-500">
                            <CheckCircle className="h-4 w-4" />
                            {submissionCount} / {totalStudents} submitted
                          </span>
                          <span className="flex items-center gap-1 text-gray-500">
                            <Clock className="h-4 w-4" />
                            Due {new Date(assignment.dueDate).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      <ChevronRight className="h-5 w-5 text-gray-400" />
                    </div>
                  </Link>
                )
              })}

              {recentAssignments.length === 0 && (
                <div className="p-6 text-center text-gray-500">
                  <p>No assignments yet</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}