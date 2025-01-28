// app/teacher/layout.tsx
import { TeacherRoute } from '../lib/route-protection'
import Sidebar from '../components/Sidebar'

export default function TeacherLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <TeacherRoute>
      <div className="flex h-screen">
        <Sidebar />
        <main className="flex-1 p-8 bg-gray-50 overflow-auto">
          {children}
        </main>
      </div>
    </TeacherRoute>
  )
}