// app/c/[classId]/a/[assignmentId]/page.tsx
'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { db } from '@/app/lib/firebase'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { useAuth } from '@/app/lib/auth'
import { ArrowLeft, Save, CheckCircle } from 'lucide-react'
import Link from 'next/link'
import SplitCodeEditor from '@/app/components/SplitCodeEditor'
import { Assignment, ClassData } from '@/app/lib/types'

export default function AssignmentPage() {
  const params = useParams()
  const router = useRouter()
  const { user } = useAuth()
  const [assignment, setAssignment] = useState<Assignment | null>(null)
  const [classData, setClassData] = useState<ClassData | null>(null)
  const [code, setCode] = useState('')
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      if (!params.assignmentId || !params.classId) return

      const assignmentDoc = await getDoc(doc(db, 'assignments', params.assignmentId as string))
      if (assignmentDoc.exists()) {
        const assignmentData = {
          id: assignmentDoc.id,
          ...assignmentDoc.data()
        } as Assignment
        setAssignment(assignmentData)
        
        if (user?.uid && assignmentData.submissions?.[user.uid]?.code) {
          setCode(assignmentData.submissions[user.uid].code)
        } else {
          setCode(assignmentData.starterCode || '')
        }
      }

      const classDoc = await getDoc(doc(db, 'classes', params.classId as string))
      if (classDoc.exists()) {
        setClassData({ id: classDoc.id, ...classDoc.data() } as ClassData)
      }
    }

    fetchData()
  }, [params.assignmentId, params.classId, user?.uid])

  if (!assignment || !classData || !user) return null

  const isTeacher = user.role === 'teacher'
  const isSubmitted = assignment.submissions?.[user.uid]
  const isPastDue = new Date(assignment.dueDate) < new Date()

  const handleSubmit = async () => {
    if (!user || !assignment) return
    setSubmitting(true)

    try {
      await updateDoc(doc(db, 'assignments', assignment.id), {
        [`submissions.${user.uid}`]: {
          code,
          submittedAt: new Date().toISOString(),
          status: 'submitted'
        }
      })
    } catch (error) {
      console.error('Error submitting:', error)
    }

    setSubmitting(false)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Navigation */}
      <Link 
        href={`/c/${params.classId}`}
        className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 mb-6"
      >
        <ArrowLeft size={16} className="mr-1" />
        Back to {classData.name}
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-3 space-y-6">
          {/* Assignment Details */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">{assignment.title}</h1>
              <div className="prose max-w-none">
                {assignment.description}
              </div>
            </div>
          </div>

          {/* Code Editor */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="border-b border-gray-200 p-4 flex justify-between items-center bg-gray-50">
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-gray-700">JavaScript Playground</span>
                {!isTeacher && !isSubmitted && !isPastDue && (
                  <button
                    onClick={handleSubmit}
                    disabled={submitting}
                    className="flex items-center gap-1 px-3 py-1 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                  >
                    <Save size={14} />
                    Submit
                  </button>
                )}
              </div>
            </div>
            <div className="p-4">
            <SplitCodeEditor
              code={code}
              onChange={setCode}
              language={assignment.language}
              readOnly={Boolean(isSubmitted || isPastDue)} // Convert to boolean explicitly
              testCases={assignment.testCases}
            />
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold mb-4">
              {isTeacher ? 'Submissions' : 'Your Status'}
            </h2>
            
            {isTeacher ? (
              <div className="space-y-4">
                {Object.entries(assignment.submissions || {}).map(([studentId, submission]) => (
                  <div key={studentId} className="border-b pb-4 last:border-0">
                    <div>
                      <p className="font-medium">Student ID: {studentId}</p>
                      <p className="text-sm text-gray-500">
                        {new Date(submission.submittedAt).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
                {Object.keys(assignment.submissions || {}).length === 0 && (
                  <p className="text-sm text-gray-500">No submissions yet</p>
                )}
              </div>
            ) : (
              <div>
                {isSubmitted ? (
                  <div className="flex items-center gap-2 text-green-600">
                    <CheckCircle size={16} />
                    <span>Submitted</span>
                  </div>
                ) : isPastDue ? (
                  <div className="text-red-600">Past due</div>
                ) : (
                  <div className="text-yellow-600">Not submitted yet</div>
                )}
                <div className="mt-4 text-sm text-gray-500">
                  Due: {new Date(assignment.dueDate).toLocaleString()}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}