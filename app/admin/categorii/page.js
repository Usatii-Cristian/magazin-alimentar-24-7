'use client'

import { useState, useEffect } from 'react'

export default function CategoriiPage() {
  const [categorii, setCategorii] = useState([])
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState({ name: '' })
  const [editId, setEditId] = useState(null)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  async function load() {
    const res = await fetch('/api/admin/categorii')
    setCategorii(await res.json())
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  function startEdit(cat) {
    setEditId(cat.id)
    setForm({ name: cat.name })
    setError('')
  }

  function cancelEdit() {
    setEditId(null)
    setForm({ name: '' })
    setError('')
  }

  async function handleSave(e) {
    e.preventDefault()
    setError('')
    setSaving(true)
    try {
      const url = editId ? `/api/admin/categorii/${editId}` : '/api/admin/categorii'
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
    if (!confirm('Ștergi categoria? Produsele asociate vor rămâne fără categorie.')) return
    await fetch(`/api/admin/categorii/${id}`, { method: 'DELETE' })
    load()
  }

  return (
    <div className="p-8 max-w-2xl">
      <h1 className="text-2xl font-extrabold text-gray-900 mb-6">Categorii</h1>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
        <h2 className="font-bold text-gray-700 mb-4">{editId ? 'Editează categoria' : 'Categorie nouă'}</h2>
        {error && <p className="text-red-600 text-sm mb-3">{error}</p>}
        <form onSubmit={handleSave} className="flex gap-3">
          <input
            type="text"
            required
            placeholder="Nume categorie"
            value={form.name}
            onChange={e => setForm({ name: e.target.value })}
            className="flex-1 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button type="submit" disabled={saving} className="bg-green-700 hover:bg-green-600 text-white font-semibold px-5 py-2.5 rounded-xl text-sm transition-colors disabled:opacity-60">
            {saving ? '...' : editId ? 'Salvează' : 'Adaugă'}
          </button>
          {editId && (
            <button type="button" onClick={cancelEdit} className="text-gray-500 hover:text-gray-700 px-3 py-2.5 rounded-xl text-sm">
              Anulează
            </button>
          )}
        </form>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {loading ? (
          <p className="text-center py-10 text-gray-400">Se încarcă...</p>
        ) : categorii.length === 0 ? (
          <p className="text-center py-10 text-gray-400">Nu există categorii încă.</p>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left px-5 py-3 font-semibold text-gray-600">Categorie</th>
                <th className="text-center px-5 py-3 font-semibold text-gray-600">Subcategorii</th>
                <th className="text-center px-5 py-3 font-semibold text-gray-600">Produse</th>
                <th className="px-5 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {categorii.map((cat) => (
                <tr key={cat.id} className="hover:bg-gray-50/50">
                  <td className="px-5 py-3.5 font-medium text-gray-800">{cat.name}</td>
                  <td className="px-5 py-3.5 text-center text-gray-500">{cat.subcategories?.length || 0}</td>
                  <td className="px-5 py-3.5 text-center text-gray-500">{cat.products?.length || 0}</td>
                  <td className="px-5 py-3.5 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => startEdit(cat)} className="text-blue-600 hover:text-blue-800 font-medium text-xs px-3 py-1.5 rounded-lg hover:bg-blue-50">
                        Editează
                      </button>
                      <button onClick={() => handleDelete(cat.id)} className="text-red-600 hover:text-red-800 font-medium text-xs px-3 py-1.5 rounded-lg hover:bg-red-50">
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
