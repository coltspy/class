// app/page.tsx
'use client'

import { useAuth } from './lib/auth'
import Link from 'next/link'

export default function Home() {
  const { user } = useAuth()

  return (
    <div className="flex min-h-screen items-center justify-center">
      {user ? (
        <Link href="/dashboard" className="bg-blue-500 text-white p-4 rounded">
          Go to Dashboard
        </Link>
      ) : (
        <Link href="/auth/signin" className="bg-blue-500 text-white p-4 rounded">
          Sign In
        </Link>
      )}
    </div>
  )
}