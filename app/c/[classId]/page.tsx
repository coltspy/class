// app/c/[classId]/page.tsx
'use client'

import { useEffect, useState } from 'react'
import { db } from '@/app/lib/firebase'
import { doc, getDoc, collection, query, where, onSnapshot } from 'firebase/firestore'
import { useAuth } from '@/app/lib/auth'
import { Calendar, Users, Plus, FileText, ChevronDown, Code, CheckCircle, ExternalLink } from 'lucide-react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import CreateAssignmentModal from '@/app/components/CreateAssignmentModal'
import { Assignment, ClassData } from '@/app/lib/types'

export default function ClassPage() {
  const params = useParams()
  const [classData, setClassData] = useState<ClassData | null>(null)
  const [assignments, setAssignments] = useState<Assignment[]>([])
  const [showCreateModal, setShowCreateModal] = useState(false)
  const { user } = useAuth()
  const classId = params?.classId as string
  const [expandedAssignment, setExpandedAssignment] = useState<string | null>(null)

  useEffect(() => {
    if (!classId) return

    const fetchClass = async () => {
      const docRef = doc(db, 'classes', classId)
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        setClassData({ id: docSnap.id, ...docSnap.data() } as ClassData)
      }
    }
    fetchClass()

    const assignmentsQuery = query(collection(db, 'assignments'), where('classId', '==', classId))

    return onSnapshot(assignmentsQuery, (snapshot) => {
      setAssignments(snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Assignment[])
    })
  }, [classId])

  if (!classData || !user) return null

  const isTeacher = user.role === 'teacher'

  const getSubmissionStatus = (assignment: Assignment) => {
    if (!assignment.submissions) return { total: 0, completed: 0 }
    const total = classData.studentIds?.length || 0
    const completed = Object.keys(assignment.submissions).length
    return { total, completed }
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden mb-8">
        <div className="px-6 py-12 bg-gradient-to-r from-blue-600 to-blue-700 relative">
          <h1 className="text-3xl font-bold text-white mb-2">{classData.name}</h1>
          <div className="flex items-center gap-4 text-blue-100">
            <span className="flex items-center gap-1">
              <Users className="h-5 w-5" />
              {classData.studentIds?.length || 0} students
            </span>
            {isTeacher && (
              <span className="flex items-center gap-1">
                <Code className="h-5 w-5" />
                Class Code: {classData.code}
              </span>
            )}
          </div>
          {isTeacher && (
            <button
              className="absolute top-4 right-4 bg-white text-blue-600 px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-50 transition-colors duration-200 ease-in-out flex items-center gap-2"
              onClick={() => setShowCreateModal(true)}
            >
              <Plus className="h-4 w-4" />
              Create Assignment
            </button>
          )}
        </div>
      </div>

      {/* Assignments List */}
      <div className="space-y-6">
        {assignments.map((assignment) => {
          const submissionStatus = getSubmissionStatus(assignment)
          
          return (
            <div
              key={assignment.id}
              className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden transition-all duration-200 ease-in-out hover:shadow-md"
            >
              <div
                className="p-6 cursor-pointer"
                onClick={() => setExpandedAssignment(
                  expandedAssignment === assignment.id ? null : assignment.id
                )}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <Code className="h-6 w-6 text-blue-600" />
                      <h3 className="text-lg font-semibold text-gray-900">
                        {assignment.title}
                      </h3>
                    </div>
                    <p className="text-sm text-gray-600">{assignment.description}</p>
                    <div className="mt-4 flex items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        Due {new Date(assignment.dueDate).toLocaleDateString()}
                      </span>
                      <span className="flex items-center gap-1">
                        <FileText className="h-4 w-4" />
                        {assignment.points} points
                      </span>
                    </div>
                  </div>
                  <ChevronDown
                    className={`h-5 w-5 text-gray-400 transform transition-transform ${
                      expandedAssignment === assignment.id ? "rotate-180" : ""
                    }`}
                  />
                </div>
              </div>

              {/* Expanded View */}
              {expandedAssignment === assignment.id && (
                <div className="border-t border-gray-200 p-6 bg-gray-50">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="text-sm font-medium text-gray-700">
                      {isTeacher ? 'Submission Overview' : 'Your Submission'}
                    </h4>
                    {isTeacher ? (
                      <Link
                        href={`/teacher/submissions/${assignment.id}`}
                        className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700"
                      >
                        View All Submissions
                        <ExternalLink className="h-4 w-4" />
                      </Link>
                    ) : (
                      <Link
                        href={`/c/${classId}/a/${assignment.id}`}
                        className="text-sm font-medium text-blue-600 hover:text-blue-700"
                      >
                        View Assignment
                      </Link>
                    )}
                  </div>

                  {isTeacher ? (
                    <div className="bg-white rounded-lg p-4 border border-gray-200">
                      <div className="flex items-center gap-4">
                        <div className="text-sm text-gray-600">
                          Submitted: {submissionStatus.completed} / {submissionStatus.total}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-white rounded-lg p-4 border border-gray-200">
                      {assignment.submissions && assignment.submissions[user.uid] ? (
                        <div className="flex items-center gap-2 text-green-600">
                          <CheckCircle className="h-5 w-5" />
                          <span className="text-sm font-medium">Submitted</span>
                        </div>
                      ) : (
                        <div className="text-sm text-gray-600">Not submitted yet</div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          )
        })}

        {assignments.length === 0 && (
          <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-200">
            <FileText className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No assignments yet</h3>
            <p className="mt-1 text-sm text-gray-500">Get started by creating a new assignment.</p>
          </div>
        )}
      </div>

      {showCreateModal && (
        <CreateAssignmentModal classId={classId} onClose={() => setShowCreateModal(false)} />
      )}
    </div>
  )
}