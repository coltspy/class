'use client'

import { useEffect, useState } from 'react'
import { collection, query, where, onSnapshot, doc, getDoc, updateDoc, arrayRemove, arrayUnion, getDocs, writeBatch } from 'firebase/firestore'
import { db } from '@/app/lib/firebase'
import { useAuth } from '@/app/lib/auth'
import { Assignment, ClassData } from '@/app/lib/types'
import Link from 'next/link'
import { 
  FileText, 
  ChevronRight, 
  Users, 
  Clock, 
  CheckCircle, 
  GraduationCap,
  MoreVertical,
  Shield,
  UserMinus,
  Plus
} from 'lucide-react'
import CreateClassModal from '@/app/components/CreateClassModal'

interface Student {
  uid: string;
  name?: string;
  email: string;
  role: 'student' | 'teacher';
}

export default function TeacherDashboard() {
  const { user } = useAuth()
  const [assignments, setAssignments] = useState<Assignment[]>([])
  const [classes, setClasses] = useState<ClassData[]>([])
  const [selectedClass, setSelectedClass] = useState<string>('all')
  const [students, setStudents] = useState<Record<string, Student[]>>({})
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [showCreateModal, setShowCreateModal] = useState(false)

  if (!user) return null

  useEffect(() => {
    if (!user?.uid) return

    const classesQuery = query(
      collection(db, 'classes'),
      where('teacherIds', 'array-contains', user.uid)
    )

    const unsubscribe = onSnapshot(classesQuery, async (snapshot) => {
      const classesData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as ClassData[]
      setClasses(classesData)

      // Fetch assignments once
      if (classesData.length > 0) {
        const assignmentsQuery = query(
          collection(db, 'assignments'),
          where('classId', 'in', classesData.map(c => c.id))
        )
        const assignmentsSnapshot = await getDocs(assignmentsQuery)
        setAssignments(assignmentsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Assignment[])
      } else {
        setAssignments([])
      }

      // Fetch students for each class
      const studentsData: Record<string, Student[]> = {}
      for (const classData of classesData) {
        if (classData.studentIds && classData.studentIds.length > 0) {
          const studentPromises = classData.studentIds.map(sid => 
            getDoc(doc(db, 'users', sid))
          )
          const studentDocs = await Promise.all(studentPromises)
          studentsData[classData.id] = studentDocs
            .filter(doc => doc.exists())
            .map(doc => ({
              uid: doc.id,
              ...doc.data()
            } as Student))
        } else {
          studentsData[classData.id] = []
        }
      }
      setStudents(studentsData)
    })

    return () => unsubscribe()
  }, [user?.uid])

  const handleRemoveStudent = async (classId: string, studentId: string) => {
    if (!confirm('Are you sure you want to remove this student from the class?')) return
    
    setIsProcessing(true)
    try {
      await updateDoc(doc(db, 'classes', classId), {
        studentIds: arrayRemove(studentId)
      })
      setActiveDropdown(null)
    } catch (error) {
      console.error('Error removing student:', error)
    }
    setIsProcessing(false)
  }

  const handleMakeTeacher = async (studentId: string) => {
    if (!confirm('Are you sure you want to make this student a teacher?')) return

    setIsProcessing(true)
    try {
      const batch = writeBatch(db)

      // Update user role
      batch.update(doc(db, 'users', studentId), {
        role: 'teacher',
      })

      // Update the current class to include the new teacher
      if (selectedClass !== 'all') {
        batch.update(doc(db, 'classes', selectedClass), {
          teacherIds: arrayUnion(studentId),
          studentIds: arrayRemove(studentId)
        })
      }

      await batch.commit()
      setActiveDropdown(null)
    } catch (error) {
      console.error('Error updating role:', error)
    }
    setIsProcessing(false)
  }

  const filteredAssignments = selectedClass === 'all' 
    ? assignments 
    : assignments.filter(a => a.classId === selectedClass)

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Class Management</h1>
        <button
          onClick={() => setShowCreateModal(true)}
          className="inline-flex items-center gap-2 bg-teal-600 text-white px-4 py-2 rounded-lg 
                    hover:bg-teal-700 transition-colors"
        >
          <Plus className="h-4 w-4" />
          Create Class
        </button>
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Students List */}
        <div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-lg font-semibold">
                {selectedClass === 'all' ? 'All Students' : 'Class Students'}
              </h2>
              {selectedClass !== 'all' && (
                <div className="text-sm text-gray-500">
                  Class Code: <span className="font-medium text-teal-600">
                    {classes.find(c => c.id === selectedClass)?.code}
                  </span>
                </div>
              )}
            </div>
            <div className="divide-y divide-gray-200">
              {selectedClass === 'all' ? (
                classes.map(cls => (
                  <div key={cls.id} className="p-6">
                    <h3 className="font-medium text-gray-900 mb-3">{cls.name}</h3>
                    {students[cls.id]?.map(student => (
                      <div key={student.uid} className="flex items-center gap-3 py-2">
                        <GraduationCap className="h-5 w-5 text-gray-400" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {student.name || 'Unnamed Student'}
                          </p>
                          <p className="text-sm text-gray-500">{student.email}</p>
                        </div>
                      </div>
                    ))}
                    {!students[cls.id]?.length && (
                      <p className="text-sm text-gray-500">No students enrolled</p>
                    )}
                  </div>
                ))
              ) : (
                students[selectedClass]?.map(student => (
                  <div key={student.uid} className="flex items-center justify-between p-4 hover:bg-gray-50 relative">
                    <div className="flex items-center gap-3">
                      <GraduationCap className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="font-medium text-gray-900">
                          {student.name || 'Unnamed Student'}
                        </p>
                        <p className="text-sm text-gray-500">{student.email}</p>
                      </div>
                    </div>
                    
                    <div className="relative">
                      <button
                        onClick={() => setActiveDropdown(activeDropdown === student.uid ? null : student.uid)}
                        className="p-1 hover:bg-gray-100 rounded-full"
                        disabled={isProcessing}
                      >
                        <MoreVertical className="h-5 w-5 text-gray-400" />
                      </button>

                      {activeDropdown === student.uid && (
                        <div className="absolute right-0 mt-1 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100">
                          <div className="py-1">
                            <button
                              onClick={() => handleMakeTeacher(student.uid)}
                              className="group flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                              disabled={isProcessing}
                            >
                              <Shield className="mr-3 h-5 w-5 text-gray-400 group-hover:text-teal-600" />
                              Make Teacher
                            </button>
                            <button
                              onClick={() => handleRemoveStudent(selectedClass, student.uid)}
                              className="group flex w-full items-center px-4 py-2 text-sm text-red-700 hover:bg-red-50"
                              disabled={isProcessing}
                            >
                              <UserMinus className="mr-3 h-5 w-5 text-red-400 group-hover:text-red-600" />
                              Remove from Class
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Assignments List */}
        <div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-lg font-semibold">Class Assignments</h2>
              <Link 
                href="/teacher/submissions"
                className="text-sm text-teal-600 hover:text-teal-700"
              >
                View all submissions
              </Link>
            </div>
            <div className="divide-y divide-gray-200">
              {filteredAssignments.map(assignment => {
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
                        {selectedClass === 'all' && (
                          <p className="text-sm text-gray-500 mb-1">{className}</p>
                        )}
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
                      <ChevronRight className="h-5 w-5 text-teal-600" />
                    </div>
                  </Link>
                )
              })}

              {filteredAssignments.length === 0 && (
                <div className="p-6 text-center text-gray-500">
                  <p>No assignments yet</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {showCreateModal && (
        <CreateClassModal 
          onClose={() => setShowCreateModal(false)} 
          teacherId={user.uid} 
        />
      )}
    </div>
  )
}