// app/learn/layout.tsx
import Sidebar from '@/app/components/Sidebar'

export default function LearnLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 overflow-auto bg-gray-50 ml-64">
        {children}
      </main>
    </div>
  )
}