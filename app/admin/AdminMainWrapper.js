'use client'

import { usePathname } from 'next/navigation'

export default function AdminMainWrapper({ children }) {
  const pathname = usePathname()
  return (
    <main className={`min-h-screen ${pathname === '/admin/login' ? '' : 'md:ml-64'}`}>
      {children}
    </main>
  )
}
