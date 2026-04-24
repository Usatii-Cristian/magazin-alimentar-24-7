'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import BlogForm from '../BlogForm'

export default function EditBlogPage() {
  const { id } = useParams()
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`/api/admin/blog/${id}`)
      .then(r => r.json())
      .then(data => { setPost(data); setLoading(false) })
  }, [id])

  if (loading) return <div className="p-8 text-gray-400">Se încarcă...</div>
  if (!post || post.error) return <div className="p-8 text-red-500">Articol negăsit.</div>

  return (
    <div className="p-8">
      <h1 className="text-2xl font-extrabold text-gray-900 mb-6">Editează: {post.title}</h1>
      <BlogForm initialData={post} />
    </div>
  )
}
