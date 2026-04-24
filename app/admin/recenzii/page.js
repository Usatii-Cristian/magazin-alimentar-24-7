'use client'

import { useState, useEffect } from 'react'

const EMPTY = { name: '', rating: '5', text: '', product: '' }

export default function RecenziiPage() {
  const [recenzii, setRecenzii] = useState([])
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState({ ...EMPTY })
  const [editId, setEditId] = useState(null)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  async function load() {
    const res = await fetch('/api/admin/recenzii')
    setRecenzii(await res.json())
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  function startEdit(r) {
    setEditId(r.id)
    setForm({ name: r.name, rating: String(r.rating), text: r.text, product: r.product || '' })
    setError('')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function cancelEdit() {
    setEditId(null)
    setForm({ ...EMPTY })
    setError('')
  }

  async function handleSave(e) {
    e.preventDefault()
    setError('')
    setSaving(true)
    try {
      const url = editId ? `/api/admin/recenzii/${editId}` : '/api/admin/recenzii'
      const method = editId ? 'PUT' : 'POST'
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) { setError(data.error || 'Eroare.'); return }
      cancelEdit()
      load()
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete(id) {
    if (!confirm('Ștergi recenzia?')) return
    await fetch(`/api/admin/recenzii/${id}`, { method: 'DELETE' })
    load()
  }

  const inp = 'w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500'

  return (
    <div className="p-8">
      <h1 className="text-2xl font-extrabold text-gray-900 mb-6">Recenzii</h1>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6 max-w-2xl">
        <h2 className="font-bold text-gray-700 mb-4">{editId ? 'Editează recenzia' : 'Recenzie nouă'}</h2>
        {error && <p className="text-red-600 text-sm mb-3">{error}</p>}
        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-1.5">Nume client *</label>
              <input type="text" required value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} className={inp} placeholder="Maria Ionescu" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-1.5">Notă *</label>
              <select value={form.rating} onChange={e => setForm(f => ({ ...f, rating: e.target.value }))} className={inp}>
                {[5,4,3,2,1].map(n => <option key={n} value={n}>{'⭐'.repeat(n)} ({n})</option>)}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1.5">Produs (opțional)</label>
            <input type="text" value={form.product} onChange={e => setForm(f => ({ ...f, product: e.target.value }))} className={inp} placeholder="Ex: Lapte integral" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1.5">Text recenzie *</label>
            <textarea rows={3} required value={form.text} onChange={e => setForm(f => ({ ...f, text: e.target.value }))} className={`${inp} resize-none`} placeholder="Textul recenziei..." />
          </div>
          <div className="flex gap-3">
            <button type="submit" disabled={saving} className="bg-green-700 hover:bg-green-600 disabled:opacity-60 text-white font-semibold px-5 py-2.5 rounded-xl text-sm transition-colors">
              {saving ? '...' : editId ? 'Actualizează' : 'Adaugă recenzie'}
            </button>
            {editId && <button type="button" onClick={cancelEdit} className="text-gray-500 px-4 py-2.5 rounded-xl text-sm">Anulează</button>}
          </div>
        </form>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {loading ? (
          <p className="text-center py-10 text-gray-400">Se încarcă...</p>
        ) : recenzii.length === 0 ? (
          <p className="text-center py-10 text-gray-400">Nu există recenzii.</p>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left px-5 py-3 font-semibold text-gray-600">Client</th>
                <th className="text-left px-5 py-3 font-semibold text-gray-600">Recenzie</th>
                <th className="text-center px-5 py-3 font-semibold text-gray-600">Notă</th>
                <th className="text-left px-5 py-3 font-semibold text-gray-600">Data</th>
                <th className="px-5 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {recenzii.map((r) => (
                <tr key={r.id} className="hover:bg-gray-50/50">
                  <td className="px-5 py-3.5 font-medium text-gray-800 whitespace-nowrap">{r.name}</td>
                  <td className="px-5 py-3.5 text-gray-600 max-w-xs line-clamp-2">{r.text}</td>
                  <td className="px-5 py-3.5 text-center text-amber-500">{'⭐'.repeat(r.rating)}</td>
                  <td className="px-5 py-3.5 text-gray-400 text-xs whitespace-nowrap">{new Date(r.createdAt).toLocaleDateString('ro-RO')}</td>
                  <td className="px-5 py-3.5 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => startEdit(r)} className="text-blue-600 hover:text-blue-800 font-medium text-xs px-3 py-1.5 rounded-lg hover:bg-blue-50">Editează</button>
                      <button onClick={() => handleDelete(r.id)} className="text-red-600 hover:text-red-800 font-medium text-xs px-3 py-1.5 rounded-lg hover:bg-red-50">Șterge</button>
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
