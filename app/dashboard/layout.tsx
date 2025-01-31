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
      <div className="flex min-h-screen">
        {/* Fixed width sidebar */}
        <div className="fixed inset-y-0 w-64 bg-white">
          <Sidebar />
        </div>
        
        {/* Main content - with left margin to account for sidebar */}
        <div className="flex-1 ml-64">
          <main className="w-full min-h-screen bg-gray-50 p-8">
            {children}
          </main>
        </div>
      </div>
    </StudentRoute>
  )
}