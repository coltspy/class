// app/c/[classId]/page.tsx
'use client'

import { useEffect, useState } from 'react'
import { db } from '@/app/lib/firebase'
import { doc, getDoc, collection, query, where, onSnapshot } from 'firebase/firestore'
import { useAuth } from '@/app/lib/auth'
import { Calendar, Users, MoreVertical, Plus, FileText, ChevronDown, Code, CheckCircle } from 'lucide-react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import CreateAssignmentModal from '@/app/components/CreateAssignmentModal'
import { User, Assignment } from '@/app/lib/types'

interface ClassData {
  id: string;
  name: string;
  code: string;
  teacherId: string;
  studentIds: string[];
}

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

    const assignmentsQuery = query(
      collection(db, 'assignments'), 
      where('classId', '==', classId)
    )

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
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-8">
        <div className="h-32 bg-gradient-to-r from-blue-500 to-blue-600 relative">
          {isTeacher && (
            <button 
              className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg backdrop-blur-sm flex items-center gap-2"
              onClick={() => setShowCreateModal(true)}
            >
              <Plus size={18} />
              Create Assignment
            </button>
          )}
        </div>
        <div className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{classData.name}</h1>
              <div className="mt-2 flex items-center gap-4">
                <span className="text-sm text-gray-500 flex items-center gap-1">
                  <Users size={16} />
                  {classData.studentIds?.length || 0} students
                </span>
                {isTeacher && (
                  <span className="text-sm text-gray-500">
                    Class Code: {classData.code}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Assignments List */}
      <div className="space-y-4">
        {assignments.map((assignment) => (
          <div 
            key={assignment.id}
            className="bg-white rounded-xl shadow-sm border border-gray-200"
          >
            <div 
              className="p-6 cursor-pointer"
              onClick={() => setExpandedAssignment(
                expandedAssignment === assignment.id ? null : assignment.id
              )}
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <Code size={20} className="text-blue-600" />
                    <h3 className="text-lg font-medium text-gray-900">
                      {assignment.title}
                    </h3>
                  </div>
                  <p className="mt-1 text-sm text-gray-500">{assignment.description}</p>
                  <div className="mt-3 flex items-center gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <Calendar size={16} />
                      Due {new Date(assignment.dueDate).toLocaleDateString()}
                    </span>
                    <span>{assignment.points} points</span>
                  </div>
                </div>
                <ChevronDown 
                  size={20} 
                  className={`transform transition-transform ${
                    expandedAssignment === assignment.id ? 'rotate-180' : ''
                  }`}
                />
              </div>
            </div>

            {/* Expanded View */}
            {expandedAssignment === assignment.id && (
              <div className="border-t border-gray-200 p-6 bg-gray-50">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h4 className="text-sm font-medium text-gray-700">
                      {isTeacher ? 'Student Submissions' : 'Your Submission'}
                    </h4>
                    <Link
                      href={`/c/${classId}/a/${assignment.id}`}
                      className="text-sm text-blue-600 hover:underline"
                    >
                      {isTeacher ? 'View All' : 'View Assignment'}
                    </Link>
                  </div>

                  {isTeacher ? (
                    <div className="bg-white rounded-lg p-4 border border-gray-200">
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-500">
                          Submitted: {getSubmissionStatus(assignment).completed} / {getSubmissionStatus(assignment).total}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-white rounded-lg p-4 border border-gray-200">
                      {assignment.submissions && assignment.submissions[user.uid] ? (
                        <div className="flex items-center gap-2 text-green-600">
                          <CheckCircle size={16} />
                          <span className="text-sm">Submitted</span>
                        </div>
                      ) : (
                        <div className="text-sm text-gray-500">
                          Not submitted yet
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}

        {assignments.length === 0 && (
          <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-200">
            <FileText className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No assignments yet</h3>
          </div>
        )}
      </div>

      {showCreateModal && (
        <CreateAssignmentModal
          classId={classId}
          onClose={() => setShowCreateModal(false)}
        />
      )}
    </div>
  )
}