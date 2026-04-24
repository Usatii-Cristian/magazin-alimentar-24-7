'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

function slugify(text) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

export default function BlogForm({ initialData = null }) {
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    title: initialData?.title || '',
    slug: initialData?.slug || '',
    image: initialData?.image || '',
    excerpt: initialData?.excerpt || '',
    content: initialData?.content || '',
  })

  function set(key, value) { setForm(f => ({ ...f, [key]: value })) }

  function handleTitleChange(e) {
    const title = e.target.value
    setForm(f => ({ ...f, title, slug: initialData ? f.slug : slugify(title) }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setSaving(true)
    try {
      const url = initialData ? `/api/admin/blog/${initialData.id}` : '/api/admin/blog'
      const method = initialData ? 'PUT' : 'POST'
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) { setError(data.error || 'Eroare.'); return }
      router.push('/admin/blog')
    } finally {
      setSaving(false)
    }
  }

  const inp = 'w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent'

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-5">
      {error && <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl">{error}</div>}

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-4">
        <div>
          <label className="block text-sm font-semibold text-gray-600 mb-1.5">Titlu *</label>
          <input type="text" required value={form.title} onChange={handleTitleChange} className={inp} placeholder="Titlul articolului" />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-600 mb-1.5">Slug URL *</label>
          <input type="text" required value={form.slug} onChange={e => set('slug', e.target.value)} className={inp} placeholder="titlul-articolului" />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-600 mb-1.5">URL imagine *</label>
          <input type="url" required value={form.image} onChange={e => set('image', e.target.value)} className={inp} placeholder="https://..." />
          {form.image && <img src={form.image} alt="" className="mt-2 h-24 rounded-xl object-cover border border-gray-100" />}
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-600 mb-1.5">Rezumat (excerpt)</label>
          <textarea rows={2} value={form.excerpt} onChange={e => set('excerpt', e.target.value)} className={`${inp} resize-none`} placeholder="Scurtă descriere afișată în lista de blog..." />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-600 mb-1.5">Conținut *</label>
          <textarea rows={12} required value={form.content} onChange={e => set('content', e.target.value)} className={`${inp} resize-y`} placeholder="Conținutul complet al articolului..." />
        </div>
      </div>

      <div className="flex items-center gap-3 pb-6">
        <button type="submit" disabled={saving} className="bg-green-700 hover:bg-green-600 disabled:opacity-60 text-white font-bold px-8 py-3 rounded-xl transition-colors text-sm">
          {saving ? 'Se salvează...' : initialData ? 'Actualizează articol' : 'Publică articol'}
        </button>
        <button type="button" onClick={() => router.push('/admin/blog')} className="text-gray-500 hover:text-gray-700 font-medium px-5 py-3 rounded-xl text-sm">
          Anulează
        </button>
      </div>
    </form>
  )
}
