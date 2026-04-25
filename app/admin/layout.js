import AdminSidebar from './AdminSidebar'
import AdminMainWrapper from './AdminMainWrapper'

export const metadata = { title: 'Admin – Crissval' }

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-100">
      <AdminSidebar />
      <AdminMainWrapper>{children}</AdminMainWrapper>
    </div>
  )
}
