'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function BlogAdminPage() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  async function load() {
    const res = await fetch('/api/admin/blog')
    const data = await res.json()
    setPosts(Array.isArray(data) ? data : [])
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  async function handleDelete(id, title) {
    if (!confirm(`Ștergi articolul "${title}"?`)) return
    await fetch(`/api/admin/blog/${id}`, { method: 'DELETE' })
    load()
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-extrabold text-gray-900">Blog</h1>
        <Link href="/admin/blog/nou" className="bg-green-700 hover:bg-green-600 text-white font-semibold px-5 py-2.5 rounded-xl text-sm transition-colors">
          + Articol nou
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {loading ? (
          <p className="text-center py-10 text-gray-400">Se încarcă...</p>
        ) : posts.length === 0 ? (
          <p className="text-center py-10 text-gray-400">Nu există articole.</p>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left px-5 py-3 font-semibold text-gray-600">Titlu</th>
                <th className="text-left px-5 py-3 font-semibold text-gray-600">Slug</th>
                <th className="text-left px-5 py-3 font-semibold text-gray-600">Data</th>
                <th className="px-5 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {posts.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50/50">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      {p.image && <img src={p.image} alt="" className="w-10 h-10 object-cover rounded-lg shrink-0" />}
                      <p className="font-medium text-gray-800 line-clamp-1">{p.title}</p>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-gray-400 text-xs font-mono">{p.slug}</td>
                  <td className="px-5 py-3.5 text-gray-500">
                    {new Date(p.createdAt).toLocaleDateString('ro-RO')}
                  </td>
                  <td className="px-5 py-3.5 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link href={`/admin/blog/${p.id}`} className="text-blue-600 hover:text-blue-800 font-medium text-xs px-3 py-1.5 rounded-lg hover:bg-blue-50">
                        Editează
                      </Link>
                      <button onClick={() => handleDelete(p.id, p.title)} className="text-red-600 hover:text-red-800 font-medium text-xs px-3 py-1.5 rounded-lg hover:bg-red-50">
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
