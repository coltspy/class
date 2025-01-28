// app/c/layout.tsx
import Sidebar from '@/app/components/Sidebar'

export default function ClassLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 overflow-auto p-6 bg-gray-50">
        {children}
      </main>
    </div>
  )
}