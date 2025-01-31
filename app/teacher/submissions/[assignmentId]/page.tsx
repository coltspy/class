'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { db } from '@/app/lib/firebase'
import { doc, getDoc } from 'firebase/firestore'
import { Assignment, ClassData } from '@/app/lib/types'
import Link from 'next/link'
import { ArrowLeft, Clock, Users, Code, X, ExternalLink } from 'lucide-react'
import SplitCodeEditor from '@/app/components/SplitCodeEditor'

interface UserData {
  name?: string;
  email: string;
}

interface SubmissionWithUser {
  studentId: string;
  studentName: string;
  studentEmail: string;
  code: string;
  submittedAt: string;
}

export default function AssignmentSubmissionsPage() {
  const params = useParams()
  const [assignment, setAssignment] = useState<Assignment | null>(null)
  const [classData, setClassData] = useState<ClassData | null>(null)
  const [selectedSubmission, setSelectedSubmission] = useState<string | null>(null)
  const [submissions, setSubmissions] = useState<SubmissionWithUser[]>([])

  useEffect(() => {
    const fetchData = async () => {
      if (!params.assignmentId) return

      const assignmentDoc = await getDoc(doc(db, 'assignments', params.assignmentId as string))
      if (assignmentDoc.exists()) {
        const assignmentData = { id: assignmentDoc.id, ...assignmentDoc.data() } as Assignment
        setAssignment(assignmentData)

        const classDoc = await getDoc(doc(db, 'classes', assignmentData.classId))
        if (classDoc.exists()) {
          setClassData({ id: classDoc.id, ...classDoc.data() } as ClassData)
        }

        const submissionsData: SubmissionWithUser[] = []
        for (const [studentId, submission] of Object.entries(assignmentData.submissions || {})) {
          const userDoc = await getDoc(doc(db, 'users', studentId))
          const userData = userDoc.data() as UserData

          submissionsData.push({
            studentId,
            studentName: userData.name || 'Unknown',
            studentEmail: userData.email,
            code: submission.code,
            submittedAt: submission.submittedAt,
          })
        }

        setSubmissions(submissionsData)
      }
    }

    fetchData()
  }, [params.assignmentId])

  if (!assignment || !classData) return null

  const submissionCount = submissions.length
  const isPastDue = new Date(assignment.dueDate) < new Date()
  const currentSubmission = selectedSubmission ? 
    submissions.find(s => s.studentId === selectedSubmission) : null

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      <div className="px-8">
        {/* Navigation */}
        <div className="mb-8">
          <Link 
            href="/teacher/submissions"
            className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft size={16} className="mr-1" />
            Back to Submissions
          </Link>
        </div>

        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-8">
          <div className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                  {assignment.title}
                </h1>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span>{classData.name}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock size={16} />
                    {isPastDue ? 'Past due' : `Due ${new Date(assignment.dueDate).toLocaleDateString()}`}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users size={16} />
                    {submissionCount} / {classData.studentIds.length} submitted
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Submissions Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {submissions.map((submission) => (
            <button
              key={submission.studentId}
              onClick={() => setSelectedSubmission(submission.studentId)}
              className="w-full bg-white rounded-xl shadow-sm border border-gray-200 p-4 
                       hover:border-teal-500 hover:shadow-md transition-all text-left"
            >
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Code className="h-5 w-5 text-teal-600" />
                  <p className="font-medium text-gray-900">{submission.studentName}</p>
                </div>
                <p className="text-sm text-gray-500">{submission.studentEmail}</p>
                <p className="text-xs text-gray-400 mt-2">
                  Submitted {new Date(submission.submittedAt).toLocaleString()}
                </p>
                <div className="mt-3 text-sm text-teal-600 font-medium">
                  View Submission →
                </div>
              </div>
            </button>
          ))}

          {submissionCount === 0 && (
            <div className="col-span-full text-center py-12 bg-white rounded-xl shadow-sm border border-gray-200">
              <Code className="mx-auto h-12 w-12 text-gray-400" />
              <p className="mt-2 font-medium text-gray-900">No submissions yet</p>
            </div>
          )}
        </div>
      </div>

      {/* Code View Modal */}
      {selectedSubmission && currentSubmission && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl w-[90vw] h-[90vh] flex flex-col">
            {/* Modal Header */}
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <div>
                <h2 className="font-medium text-gray-900">{currentSubmission.studentName}'s Submission</h2>
                <p className="text-sm text-gray-500">
                  Submitted {new Date(currentSubmission.submittedAt).toLocaleString()}
                </p>
              </div>
              <button 
                onClick={() => setSelectedSubmission(null)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={20} className="text-gray-500" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="flex-1 p-6 overflow-hidden">
              <SplitCodeEditor
                code={assignment.submissions[selectedSubmission].code}
                onChange={() => {}}
                language={assignment.language}
                readOnly={true}
                testCases={assignment.testCases}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}