'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import ProductForm from '../ProductForm'

export default function EditProdusPagina() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`/api/admin/produse/${id}`)
      .then(r => r.json())
      .then(data => { setProduct(data); setLoading(false) })
  }, [id])

  if (loading) return <div className="p-8 text-gray-400">Se încarcă...</div>
  if (!product || product.error) return <div className="p-8 text-red-500">Produs negăsit.</div>

  return (
    <div className="p-8">
      <h1 className="text-2xl font-extrabold text-gray-900 mb-6">Editează: {product.name}</h1>
      <ProductForm initialData={product} />
    </div>
  )
}
