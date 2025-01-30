// app/lib/auth-utils.ts
import { auth, db } from './firebase'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { User } from './types'

export async function createUserInFirestore(firebaseUser: any, role: 'student' | 'teacher' = 'student') {
  const userData: User = {
    uid: firebaseUser.uid,
    email: firebaseUser.email!,
    name: firebaseUser.displayName || undefined,
    role,
    enrolledClasses: [],
    teachingClasses: []  // Add this field for all users
  }
  await setDoc(doc(db, 'users', firebaseUser.uid), userData)
  return userData
}

export async function getUserFromFirestore(uid: string) {
  const docRef = doc(db, 'users', uid)
  const docSnap = await getDoc(docRef)
  return docSnap.exists() ? docSnap.data() as User : null
}

export function isProtectedRoute(pathname: string): boolean {
  return pathname.startsWith('/dashboard') || 
         pathname.startsWith('/teacher') || 
         pathname.startsWith('/c/')
}

export function canAccessTeacherRoute(user: User | null): boolean {
  return user?.role === 'teacher'
}