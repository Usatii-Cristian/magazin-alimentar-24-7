'use client'

import { useState, useEffect } from 'react'

export default function MesajePage() {
  const [mesaje, setMesaje] = useState([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState(null)

  async function load() {
    const res = await fetch('/api/admin/mesaje')
    const data = await res.json()
    setMesaje(Array.isArray(data) ? data : [])
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  async function markRead(id, read) {
    await fetch(`/api/admin/mesaje/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ read }),
    })
    load()
  }

  async function handleDelete(id) {
    if (!confirm('Ștergi mesajul?')) return
    await fetch(`/api/admin/mesaje/${id}`, { method: 'DELETE' })
    if (selected?.id === id) setSelected(null)
    load()
  }

  const unread = mesaje.filter(m => !m.read).length

  return (
    <div className="p-8">
      <div className="flex items-center gap-3 mb-6">
        <h1 className="text-2xl font-extrabold text-gray-900">Mesaje Contact</h1>
        {unread > 0 && (
          <span className="bg-rose-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">{unread} noi</span>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {loading ? (
            <p className="text-center py-10 text-gray-400">Se încarcă...</p>
          ) : mesaje.length === 0 ? (
            <p className="text-center py-10 text-gray-400">Nu există mesaje.</p>
          ) : (
            <ul className="divide-y divide-gray-50">
              {mesaje.map((m) => (
                <li
                  key={m.id}
                  onClick={() => { setSelected(m); if (!m.read) markRead(m.id, true) }}
                  className={`px-5 py-4 cursor-pointer hover:bg-gray-50 transition-colors ${selected?.id === m.id ? 'bg-green-50 border-l-4 border-green-600' : ''}`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      {!m.read && <span className="w-2 h-2 bg-rose-500 rounded-full shrink-0 mt-1" />}
                      <div className="min-w-0">
                        <p className={`text-sm font-semibold truncate ${m.read ? 'text-gray-700' : 'text-gray-900'}`}>{m.name}</p>
                        <p className="text-xs text-gray-400 truncate">{m.email}{m.phone ? ` · ${m.phone}` : ''}</p>
                        <p className="text-xs text-gray-500 mt-1 line-clamp-1">{m.message}</p>
                      </div>
                    </div>
                    <span className="text-xs text-gray-400 whitespace-nowrap shrink-0">
                      {new Date(m.createdAt).toLocaleDateString('ro-RO')}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {selected ? (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="font-bold text-gray-900">{selected.name}</h2>
                <a href={`mailto:${selected.email}`} className="text-sm text-green-600 hover:underline">{selected.email}</a>
                {selected.phone && (
                  <a href={`tel:${selected.phone}`} className="block text-sm text-green-600 hover:underline">{selected.phone}</a>
                )}
                <p className="text-xs text-gray-400 mt-1">{new Date(selected.createdAt).toLocaleString('ro-RO')}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => markRead(selected.id, !selected.read)}
                  className="text-xs font-medium px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-600"
                >
                  {selected.read ? 'Marchează necitit' : 'Marchează citit'}
                </button>
                <button onClick={() => handleDelete(selected.id)} className="text-xs font-medium px-3 py-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100">
                  Șterge
                </button>
              </div>
            </div>
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">{selected.message}</p>
            </div>
            <a
              href={`mailto:${selected.email}?subject=Re: Mesaj Crissval`}
              className="mt-4 inline-flex items-center gap-2 bg-green-700 hover:bg-green-600 text-white font-semibold px-5 py-2.5 rounded-xl text-sm transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Răspunde prin email
            </a>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex items-center justify-center text-gray-400 text-sm">
            Selectează un mesaj pentru a-l citi
          </div>
        )}
      </div>
    </div>
  )
}
