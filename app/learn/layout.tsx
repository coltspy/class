import Sidebar from '@/app/components/Sidebar'

export default function LearnLayout({
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
      
      {/* Main content - with left margin to account for sidebar */}
      <div className="flex-1 ml-64">
        <main className="w-full min-h-screen">
          {children}
        </main>
      </div>
    </div>
  )
}