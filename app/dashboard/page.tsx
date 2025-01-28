// app/dashboard/page.tsx
'use client'

import { useState } from 'react'
import { useAuth } from '../lib/auth'
import { db } from '../lib/firebase'
import { collection, query, where, getDocs, doc, updateDoc, arrayUnion } from 'firebase/firestore'

export default function StudentDashboard() {
  const [classCode, setClassCode] = useState('')
  const [error, setError] = useState('')
  const { user } = useAuth()

  const joinClass = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    try {
      const classesRef = collection(db, 'classes')
      const q = query(classesRef, where('code', '==', classCode.toUpperCase()))
      const snapshot = await getDocs(q)

      if (snapshot.empty) {
        setError('Invalid class code')
        return
      }

      const classDoc = snapshot.docs[0]
      await updateDoc(doc(db, 'classes', classDoc.id), {
        studentIds: arrayUnion(user?.uid)
      })

      setClassCode('')
    } catch (error) {
      setError('Error joining class')
      console.error(error)
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-8">Student Dashboard</h1>
      
      <form onSubmit={joinClass} className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Join a Class</h2>
        <div className="flex gap-4">
          <input
            type="text"
            value={classCode}
            onChange={(e) => setClassCode(e.target.value)}
            placeholder="Class Code"
            className="flex-1 p-2 border rounded"
            required
          />
          <button 
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Join
          </button>
        </div>
        {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}
      </form>
    </div>
  )
}