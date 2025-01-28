// app/lib/route-protection.tsx
'use client'

import { useEffect } from 'react'
import { useAuth } from './auth'
import { useRouter } from 'next/navigation'

export function TeacherRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (user && user.role !== 'teacher') {
      router.push('/dashboard')
    }
  }, [user])

  return user?.role === 'teacher' ? children : null
}

export function StudentRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      router.push('/auth/signin')
    }
  }, [user])

  return user ? children : null
}