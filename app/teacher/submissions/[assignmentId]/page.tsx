'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { db } from '@/app/lib/firebase'
import { doc, getDoc, collection, getDocs, query, where } from 'firebase/firestore'
import { Assignment, ClassData } from '@/app/lib/types'
import Link from 'next/link'
import { ArrowLeft, Clock, Users, Code } from 'lucide-react'
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

  return (
    <div className="min-h-screen bg-gray-50 pb-12 ml-64">
      <div className="max-w-7xl mx-auto px-6 py-8">
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

        <div className="grid grid-cols-5 gap-8">
          {/* Submissions List */}
          <div className="col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 h-fit">
            <div className="p-4 border-b border-gray-200">
              <h2 className="font-medium text-gray-900">Submissions</h2>
            </div>
            <div className="divide-y divide-gray-200">
              {submissions.map((submission) => (
                <button
                  key={submission.studentId}
                  onClick={() => setSelectedSubmission(submission.studentId)}
                  className={`w-full text-left p-4 hover:bg-gray-50 ${
                    selectedSubmission === submission.studentId ? 'bg-teal-50 border-l-4 border-l-teal-600' : ''
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">{submission.studentName}</p>
                      <p className="text-sm text-gray-500">{submission.studentEmail}</p>
                      <p className="text-xs text-gray-400 mt-1">
                        Submitted {new Date(submission.submittedAt).toLocaleString()}
                      </p>
                    </div>
                    <Code size={16} className="text-gray-400" />
                  </div>
                </button>
              ))}

              {submissionCount === 0 && (
                <div className="p-4 text-center text-gray-500">
                  No submissions yet
                </div>
              )}
            </div>
          </div>

          {/* Code View */}
          <div className="col-span-3">
            {selectedSubmission ? (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <SplitCodeEditor
                  code={assignment.submissions[selectedSubmission].code}
                  onChange={() => {}}
                  language={assignment.language}
                  readOnly={true}
                  testCases={assignment.testCases}
                />
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center text-gray-500">
                <Code size={24} className="mx-auto mb-4 text-gray-400" />
                <p className="font-medium text-gray-900">Select a submission</p>
                <p className="text-sm mt-1">Click on a submission to view the code</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}