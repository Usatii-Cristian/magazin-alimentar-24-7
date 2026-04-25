'use client'

import { useState, useEffect } from 'react'

export default function SubcategoriiPage() {
  const [subcategorii, setSubcategorii] = useState([])
  const [categorii, setCategorii] = useState([])
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState({ name: '', categoryId: '' })
  const [editId, setEditId] = useState(null)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  async function load() {
    const [subRes, catRes] = await Promise.all([
      fetch('/api/admin/subcategorii'),
      fetch('/api/admin/categorii'),
    ])
    const subData = await subRes.json()
    setSubcategorii(Array.isArray(subData) ? subData : [])
    const cats = await catRes.json()
    setCategorii(Array.isArray(cats) ? cats : [])
    if (cats.length && !form.categoryId) setForm(f => ({ ...f, categoryId: cats[0].id }))
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  function startEdit(sub) {
    setEditId(sub.id)
    setForm({ name: sub.name, categoryId: sub.categoryId })
    setError('')
  }

  function cancelEdit() {
    setEditId(null)
    setForm({ name: '', categoryId: categorii[0]?.id || '' })
    setError('')
  }

  async function handleSave(e) {
    e.preventDefault()
    setError('')
    setSaving(true)
    try {
      const url = editId ? `/api/admin/subcategorii/${editId}` : '/api/admin/subcategorii'
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
    if (!confirm('Ștergi subcategoria?')) return
    await fetch(`/api/admin/subcategorii/${id}`, { method: 'DELETE' })
    load()
  }

  return (
    <div className="p-8 max-w-2xl">
      <h1 className="text-2xl font-extrabold text-gray-900 mb-6">Subcategorii</h1>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
        <h2 className="font-bold text-gray-700 mb-4">{editId ? 'Editează subcategoria' : 'Subcategorie nouă'}</h2>
        {error && <p className="text-red-600 text-sm mb-3">{error}</p>}
        <form onSubmit={handleSave} className="flex flex-col sm:flex-row gap-3">
          <select
            required
            value={form.categoryId}
            onChange={e => setForm(f => ({ ...f, categoryId: e.target.value }))}
            className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            {categorii.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
          <input
            type="text"
            required
            placeholder="Nume subcategorie"
            value={form.name}
            onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
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
        ) : subcategorii.length === 0 ? (
          <p className="text-center py-10 text-gray-400">Nu există subcategorii încă.</p>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left px-5 py-3 font-semibold text-gray-600">Subcategorie</th>
                <th className="text-left px-5 py-3 font-semibold text-gray-600">Categorie</th>
                <th className="px-5 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {subcategorii.map((sub) => (
                <tr key={sub.id} className="hover:bg-gray-50/50">
                  <td className="px-5 py-3.5 font-medium text-gray-800">{sub.name}</td>
                  <td className="px-5 py-3.5 text-gray-500">{sub.category?.name || '-'}</td>
                  <td className="px-5 py-3.5 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => startEdit(sub)} className="text-blue-600 hover:text-blue-800 font-medium text-xs px-3 py-1.5 rounded-lg hover:bg-blue-50">
                        Editează
                      </button>
                      <button onClick={() => handleDelete(sub.id)} className="text-red-600 hover:text-red-800 font-medium text-xs px-3 py-1.5 rounded-lg hover:bg-red-50">
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
