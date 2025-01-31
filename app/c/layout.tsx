import Sidebar from '@/app/components/Sidebar'

export default function ClassLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen">
      {/* Fixed width sidebar */}
      <div className="fixed inset-y-0 w-64 bg-white">
        <Sidebar />
      </div>
      
      {/* Main content */}
      <div className="flex-1 ml-64">
        <main className="w-full min-h-screen bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  )
}