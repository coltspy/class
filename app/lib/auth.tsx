// app/lib/auth.tsx
'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { onAuthStateChanged, signInWithPopup, GoogleAuthProvider, 
  createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from './firebase'
import { useRouter } from 'next/navigation'
import { User } from './types'
import { createUserInFirestore, getUserFromFirestore, canAccessTeacherRoute } from './auth-utils'

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signUpWithEmail: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    return onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const userData = await getUserFromFirestore(firebaseUser.uid)
        if (userData) {
          setUser(userData)
          if (window.location.pathname.startsWith('/teacher') && !canAccessTeacherRoute(userData)) {
            router.push('/dashboard')
          }
        } else {
          const newUser = await createUserInFirestore(firebaseUser)
          setUser(newUser)
          router.push('/dashboard')
        }
      } else {
        setUser(null)
      }
      setLoading(false)
    })
  }, [])

  const signInWithEmail = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password)
  }

  const signUpWithEmail = async (email: string, password: string) => {
    const { user: firebaseUser } = await createUserWithEmailAndPassword(auth, email, password)
    await createUserInFirestore(firebaseUser)
  }

  const signInWithGoogle = async () => {
    const { user: firebaseUser } = await signInWithPopup(auth, new GoogleAuthProvider())
    const userData = await getUserFromFirestore(firebaseUser.uid)
    if (!userData) {
      await createUserInFirestore(firebaseUser)
    }
  }

  const signOut = async () => {
    await auth.signOut()
    router.push('/auth/signin')
  }

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading,
      signInWithGoogle,
      signInWithEmail,
      signUpWithEmail,
      signOut
    }}>
      {!loading && children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)