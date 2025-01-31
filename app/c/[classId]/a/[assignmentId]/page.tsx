'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { db } from '@/app/lib/firebase'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { useAuth } from '@/app/lib/auth'
import { ArrowLeft, Clock, FileText, CheckCircle, XCircle } from 'lucide-react'
import Link from 'next/link'
import SplitCodeEditor from '@/app/components/SplitCodeEditor'
import { Assignment, ClassData } from '@/app/lib/types'

interface SubmissionState {
  status: 'idle' | 'submitting' | 'success' | 'error';
  message?: string;
}

export default function AssignmentPage() {
  const params = useParams()
  const router = useRouter()
  const { user } = useAuth()
  
  const [assignment, setAssignment] = useState<Assignment | null>(null)
  const [classData, setClassData] = useState<ClassData | null>(null)
  const [code, setCode] = useState('')
  const [submissionState, setSubmissionState] = useState<SubmissionState>({ status: 'idle' })

  useEffect(() => {
    const fetchData = async () => {
      if (!params.assignmentId || !params.classId) return

      // Fetch assignment data
      const assignmentDoc = await getDoc(doc(db, 'assignments', params.assignmentId as string))
      if (assignmentDoc.exists()) {
        const assignmentData = {
          id: assignmentDoc.id,
          ...assignmentDoc.data()
        } as Assignment
        setAssignment(assignmentData)
        
        // Set initial code from submission or starter code
        if (user?.uid && assignmentData.submissions?.[user.uid]?.code) {
          setCode(assignmentData.submissions[user.uid].code)
        } else {
          setCode(assignmentData.starterCode || '')
        }
      }

      // Fetch class data
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
    setSubmissionState({ status: 'submitting' })

    try {
      await updateDoc(doc(db, 'assignments', assignment.id), {
        [`submissions.${user.uid}`]: {
          code,
          submittedAt: new Date().toISOString(),
          status: 'submitted'
        }
      })
      
      setSubmissionState({ 
        status: 'success', 
        message: 'Assignment submitted successfully!' 
      })
      
      // Redirect after 2 seconds
      setTimeout(() => {
        router.push(`/c/${params.classId}`)
      }, 2000)
    } catch (error) {
      setSubmissionState({ 
        status: 'error', 
        message: 'Error submitting assignment. Please try again.' 
      })
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      {/* Success/Error Notifications */}
      {submissionState.status === 'success' && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-6 flex items-center gap-3 shadow-lg">
            <CheckCircle className="text-emerald-600" size={24} />
            <p className="text-lg font-medium">{submissionState.message}</p>
          </div>
        </div>
      )}

      {submissionState.status === 'error' && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-6 flex items-center gap-3 shadow-lg">
            <XCircle className="text-red-600" size={24} />
            <p className="text-lg font-medium">{submissionState.message}</p>
          </div>
        </div>
      )}

      <div className="px-8">
        {/* Navigation */}
        <div className="py-6">
          <Link 
            href={`/c/${params.classId}`}
            className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft size={16} className="mr-1" />
            Back to {classData.name}
          </Link>
        </div>

        {/* Assignment Header */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="max-w-3xl">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              {assignment.title}
            </h1>
            
            <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
              <span className="flex items-center gap-1">
                <Clock size={16} />
                Due {new Date(assignment.dueDate).toLocaleDateString()}
              </span>
              <span className="flex items-center gap-1">
                <FileText size={16} />
                {assignment.points} points
              </span>
            </div>

            {/* Status Banners */}
            {isSubmitted && (
              <div className="mb-6 bg-emerald-50 border border-emerald-100 rounded-lg p-4 flex items-center gap-2 text-emerald-700">
                <CheckCircle size={20} />
                <div>
                  <p className="font-medium">Submitted</p>
                  <p className="text-sm text-emerald-600">
                    on {new Date(assignment.submissions[user.uid].submittedAt).toLocaleString()}
                  </p>
                </div>
              </div>
            )}

            {isPastDue && !isSubmitted && (
              <div className="mb-6 bg-red-50 border border-red-100 rounded-lg p-4 flex items-center gap-2 text-red-700">
                <XCircle size={20} />
                <div>
                  <p className="font-medium">Past Due</p>
                  <p className="text-sm text-red-600">
                    This assignment cannot be submitted
                  </p>
                </div>
              </div>
            )}

            <div className="prose max-w-none text-gray-600">
              {assignment.description}
            </div>
          </div>
        </div>

        {/* Code Editor */}
        <div className="max-w-[95%] mx-auto">
          <SplitCodeEditor
            code={code}
            onChange={setCode}
            language={assignment.language}
            readOnly={Boolean(isSubmitted || isPastDue)}
            testCases={assignment.testCases}
            onSubmit={!isSubmitted && !isPastDue ? handleSubmit : undefined}
          />
        </div>
      </div>
    </div>
  )
}