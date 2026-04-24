'use client'

import { useState, useEffect } from 'react'
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

const emptyNutrition = { per: '100g', energy: '', protein: '', fat: '', saturatedFat: '', carbs: '', sugars: '', fiber: '', salt: '' }

export default function ProductForm({ initialData = null }) {
  const router = useRouter()
  const [categorii, setCategorii] = useState([])
  const [subcategorii, setSubcategorii] = useState([])
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const [form, setForm] = useState({
    name: initialData?.name || '',
    slug: initialData?.slug || '',
    price: initialData?.price?.toString() || '',
    oldPrice: initialData?.oldPrice?.toString() || '',
    image: initialData?.image || '',
    categoryId: initialData?.categoryId || '',
    subcategory: initialData?.subcategory || '',
    isBest: initialData?.isBest || false,
    isDiscount: initialData?.isDiscount || false,
    description: initialData?.description || '',
    ingredients: initialData?.ingredients || '',
    nutrition: initialData?.nutrition ? { ...emptyNutrition, ...initialData.nutrition } : { ...emptyNutrition },
  })

  const [showNutrition, setShowNutrition] = useState(!!initialData?.nutrition)

  useEffect(() => {
    fetch('/api/admin/categorii').then(r => r.json()).then(cats => {
      setCategorii(cats)
      if (!form.categoryId && cats.length) setForm(f => ({ ...f, categoryId: cats[0].id }))
    })
  }, [])

  useEffect(() => {
    if (!form.categoryId) return
    fetch(`/api/admin/subcategorii?categoryId=${form.categoryId}`)
      .then(r => r.json())
      .then(setSubcategorii)
  }, [form.categoryId])

  function set(key, value) {
    setForm(f => ({ ...f, [key]: value }))
  }

  function setNutrition(key, value) {
    setForm(f => ({ ...f, nutrition: { ...f.nutrition, [key]: value } }))
  }

  function handleNameChange(e) {
    const name = e.target.value
    setForm(f => ({ ...f, name, slug: initialData ? f.slug : slugify(name) }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setSaving(true)
    try {
      const url = initialData ? `/api/admin/produse/${initialData.id}` : '/api/admin/produse'
      const method = initialData ? 'PUT' : 'POST'
      const payload = {
        ...form,
        nutrition: showNutrition ? form.nutrition : null,
      }
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = await res.json()
      if (!res.ok) { setError(data.error || 'Eroare la salvare.'); return }
      router.push('/admin/produse')
    } finally {
      setSaving(false)
    }
  }

  const nutritionFields = [
    { key: 'per', label: 'Per (ex: 100g)', placeholder: '100g' },
    { key: 'energy', label: 'Energie (kcal)', placeholder: '0' },
    { key: 'protein', label: 'Proteine (g)', placeholder: '0' },
    { key: 'fat', label: 'Grăsimi (g)', placeholder: '0' },
    { key: 'saturatedFat', label: 'Grăsimi saturate (g)', placeholder: '0' },
    { key: 'carbs', label: 'Carbohidrați (g)', placeholder: '0' },
    { key: 'sugars', label: 'Zahăruri (g)', placeholder: '0' },
    { key: 'fiber', label: 'Fibre (g)', placeholder: '0' },
    { key: 'salt', label: 'Sare (g)', placeholder: '0' },
  ]

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
      {error && <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl">{error}</div>}

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-4">
        <h2 className="font-bold text-gray-700">Informații generale</h2>

        <Field label="Nume produs *">
          <input type="text" required value={form.name} onChange={handleNameChange} className={input} placeholder="Ex: Lapte integral 3.5%" />
        </Field>

        <Field label="Slug URL *">
          <input type="text" required value={form.slug} onChange={e => set('slug', e.target.value)} className={input} placeholder="lapte-integral-3-5" />
        </Field>

        <div className="grid grid-cols-2 gap-4">
          <Field label="Preț (lei) *">
            <input type="number" required step="0.01" min="0" value={form.price} onChange={e => set('price', e.target.value)} className={input} placeholder="0.00" />
          </Field>
          <Field label="Preț vechi (lei)">
            <input type="number" step="0.01" min="0" value={form.oldPrice} onChange={e => set('oldPrice', e.target.value)} className={input} placeholder="Optional" />
          </Field>
        </div>

        <Field label="URL imagine *">
          <input type="url" required value={form.image} onChange={e => set('image', e.target.value)} className={input} placeholder="https://..." />
          {form.image && (
            <img src={form.image} alt="" className="mt-2 h-24 w-24 object-cover rounded-xl border border-gray-100" />
          )}
        </Field>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-4">
        <h2 className="font-bold text-gray-700">Categorie</h2>

        <Field label="Categorie *">
          <select required value={form.categoryId} onChange={e => set('categoryId', e.target.value)} className={input}>
            {categorii.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </Field>

        <Field label="Subcategorie">
          {subcategorii.length > 0 ? (
            <select value={form.subcategory} onChange={e => set('subcategory', e.target.value)} className={input}>
              <option value="">-- Fără subcategorie --</option>
              {subcategorii.map(s => <option key={s.id} value={s.name}>{s.name}</option>)}
            </select>
          ) : (
            <input type="text" value={form.subcategory} onChange={e => set('subcategory', e.target.value)} className={input} placeholder="Subcategorie (text liber)" />
          )}
        </Field>

        <div className="flex gap-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={form.isBest} onChange={e => set('isBest', e.target.checked)} className="w-4 h-4 accent-green-600" />
            <span className="text-sm font-medium text-gray-700">Cel mai vândut</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={form.isDiscount} onChange={e => set('isDiscount', e.target.checked)} className="w-4 h-4 accent-green-600" />
            <span className="text-sm font-medium text-gray-700">La reducere</span>
          </label>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-4">
        <h2 className="font-bold text-gray-700">Detalii</h2>

        <Field label="Descriere">
          <textarea rows={3} value={form.description} onChange={e => set('description', e.target.value)} className={`${input} resize-none`} placeholder="Descriere produs..." />
        </Field>

        <Field label="Ingrediente">
          <textarea rows={3} value={form.ingredients} onChange={e => set('ingredients', e.target.value)} className={`${input} resize-none`} placeholder="Lista ingrediente..." />
        </Field>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-gray-700">Valori nutriționale</h2>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={showNutrition} onChange={e => setShowNutrition(e.target.checked)} className="w-4 h-4 accent-green-600" />
            <span className="text-sm text-gray-600">Activează</span>
          </label>
        </div>

        {showNutrition && (
          <div className="grid grid-cols-2 gap-3">
            {nutritionFields.map(f => (
              <Field key={f.key} label={f.label}>
                <input
                  type={f.key === 'per' ? 'text' : 'number'}
                  step="0.01"
                  min="0"
                  value={form.nutrition[f.key]}
                  onChange={e => setNutrition(f.key, e.target.value)}
                  className={input}
                  placeholder={f.placeholder}
                />
              </Field>
            ))}
          </div>
        )}
      </div>

      <div className="flex items-center gap-3 pb-6">
        <button type="submit" disabled={saving} className="bg-green-700 hover:bg-green-600 disabled:opacity-60 text-white font-bold px-8 py-3 rounded-xl transition-colors text-sm">
          {saving ? 'Se salvează...' : initialData ? 'Actualizează produs' : 'Creează produs'}
        </button>
        <button type="button" onClick={() => router.push('/admin/produse')} className="text-gray-500 hover:text-gray-700 font-medium px-5 py-3 rounded-xl text-sm">
          Anulează
        </button>
      </div>
    </form>
  )
}

function Field({ label, children }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-600 mb-1.5">{label}</label>
      {children}
    </div>
  )
}

const input = 'w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent'
