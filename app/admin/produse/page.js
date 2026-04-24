'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function ProduseAdminPage() {
  const [produse, setProduse] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  async function load() {
    const res = await fetch('/api/admin/produse')
    setProduse(await res.json())
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  async function handleDelete(id, name) {
    if (!confirm(`Ștergi produsul "${name}"?`)) return
    await fetch(`/api/admin/produse/${id}`, { method: 'DELETE' })
    load()
  }

  const filtered = produse.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.category?.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-extrabold text-gray-900">Produse</h1>
        <Link
          href="/admin/produse/nou"
          className="bg-green-700 hover:bg-green-600 text-white font-semibold px-5 py-2.5 rounded-xl text-sm transition-colors"
        >
          + Produs nou
        </Link>
      </div>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Caută produs sau categorie..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full max-w-sm border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {loading ? (
          <p className="text-center py-10 text-gray-400">Se încarcă...</p>
        ) : filtered.length === 0 ? (
          <p className="text-center py-10 text-gray-400">Nu există produse.</p>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left px-5 py-3 font-semibold text-gray-600">Produs</th>
                <th className="text-left px-5 py-3 font-semibold text-gray-600">Categorie</th>
                <th className="text-right px-5 py-3 font-semibold text-gray-600">Preț</th>
                <th className="text-center px-5 py-3 font-semibold text-gray-600">Status</th>
                <th className="px-5 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50/50">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      {p.image && (
                        <div className="w-10 h-10 rounded-lg overflow-hidden bg-gray-100 shrink-0">
                          <img src={p.image} alt="" className="w-full h-full object-cover" />
                        </div>
                      )}
                      <div>
                        <p className="font-medium text-gray-800 line-clamp-1">{p.name}</p>
                        <p className="text-xs text-gray-400">{p.slug}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-gray-500">
                    {p.category?.name}
                    {p.subcategory && <span className="block text-xs text-gray-400">{p.subcategory}</span>}
                  </td>
                  <td className="px-5 py-3 text-right font-semibold text-gray-800">
                    {p.price.toFixed(2)} lei
                    {p.oldPrice && <span className="block text-xs text-gray-400 line-through">{p.oldPrice.toFixed(2)}</span>}
                  </td>
                  <td className="px-5 py-3 text-center">
                    <div className="flex items-center justify-center gap-1.5 flex-wrap">
                      {p.isBest && <span className="bg-amber-100 text-amber-700 text-xs font-semibold px-2 py-0.5 rounded-full">Popular</span>}
                      {p.isDiscount && <span className="bg-red-100 text-red-600 text-xs font-semibold px-2 py-0.5 rounded-full">Reducere</span>}
                    </div>
                  </td>
                  <td className="px-5 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link href={`/admin/produse/${p.id}`} className="text-blue-600 hover:text-blue-800 font-medium text-xs px-3 py-1.5 rounded-lg hover:bg-blue-50">
                        Editează
                      </Link>
                      <button onClick={() => handleDelete(p.id, p.name)} className="text-red-600 hover:text-red-800 font-medium text-xs px-3 py-1.5 rounded-lg hover:bg-red-50">
                        Șterge
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
