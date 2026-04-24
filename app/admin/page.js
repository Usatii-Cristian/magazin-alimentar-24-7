import prisma from '@/lib/prisma'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

async function getStats() {
  const [produse, categorii, blog, recenzii, mesaje, mesajeNecitite] = await Promise.all([
    prisma.product.count(),
    prisma.category.count(),
    prisma.blog.count(),
    prisma.review.count(),
    prisma.contactMessage.count(),
    prisma.contactMessage.count({ where: { read: false } }),
  ])
  return { produse, categorii, blog, recenzii, mesaje, mesajeNecitite }
}

const cards = [
  { label: 'Produse', key: 'produse', href: '/admin/produse', color: 'bg-blue-500', icon: '📦' },
  { label: 'Categorii', key: 'categorii', href: '/admin/categorii', color: 'bg-violet-500', icon: '🏷️' },
  { label: 'Articole Blog', key: 'blog', href: '/admin/blog', color: 'bg-amber-500', icon: '📝' },
  { label: 'Recenzii', key: 'recenzii', href: '/admin/recenzii', color: 'bg-emerald-500', icon: '⭐' },
  { label: 'Mesaje', key: 'mesaje', href: '/admin/mesaje', color: 'bg-rose-500', icon: '✉️' },
]

export default async function AdminDashboard() {
  const stats = await getStats().catch(() => ({ produse: 0, categorii: 0, blog: 0, recenzii: 0, mesaje: 0, mesajeNecitite: 0 }))

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-extrabold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">Bun venit în panoul de administrare Crissval.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-10">
        {cards.map((card) => (
          <Link
            key={card.key}
            href={card.href}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow group"
          >
            <div className={`w-10 h-10 ${card.color} rounded-xl flex items-center justify-center text-lg mb-3`}>
              {card.icon}
            </div>
            <p className="text-2xl font-extrabold text-gray-900">
              {stats[card.key]}
              {card.key === 'mesaje' && stats.mesajeNecitite > 0 && (
                <span className="ml-2 text-sm font-bold text-rose-500">({stats.mesajeNecitite} noi)</span>
              )}
            </p>
            <p className="text-sm text-gray-500 mt-0.5 group-hover:text-green-700 transition-colors">{card.label}</p>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="font-bold text-gray-800 mb-4">Acțiuni rapide</h2>
          <div className="space-y-2">
            {[
              { href: '/admin/produse/nou', label: '+ Produs nou' },
              { href: '/admin/blog/nou', label: '+ Articol nou' },
              { href: '/admin/recenzii', label: '+ Recenzie nouă' },
              { href: '/admin/categorii', label: '+ Categorie nouă' },
            ].map((a) => (
              <Link
                key={a.href}
                href={a.href}
                className="block px-4 py-2.5 rounded-xl text-sm font-medium text-green-700 hover:bg-green-50 transition-colors"
              >
                {a.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="font-bold text-gray-800 mb-4">Link-uri site</h2>
          <div className="space-y-2">
            {[
              { href: '/', label: 'Pagina principală' },
              { href: '/produse', label: 'Produse' },
              { href: '/blog', label: 'Blog' },
              { href: '/contact', label: 'Contact' },
            ].map((a) => (
              <a
                key={a.href}
                href={a.href}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
              >
                <svg className="w-3.5 h-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                {a.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
