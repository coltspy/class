// app/dashboard/layout.tsx
import { StudentRoute } from '../lib/route-protection'
import Sidebar from '../components/Sidebar'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <StudentRoute>
      <div className="flex h-screen">
        <Sidebar />
        <main className="flex-1 p-8 bg-gray-50 overflow-auto">
          {children}
        </main>
      </div>
    </StudentRoute>
  )
}
