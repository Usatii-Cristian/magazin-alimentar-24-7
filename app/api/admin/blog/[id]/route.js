import prisma from '@/lib/prisma'

export async function GET(request, { params }) {
  const { id } = await params
  const post = await prisma.blog.findUnique({ where: { id } })
  if (!post) return Response.json({ error: 'Articol negăsit.' }, { status: 404 })
  return Response.json(post)
}

export async function PUT(request, { params }) {
  const { id } = await params
  const { title, slug, image, excerpt, content } = await request.json()

  const post = await prisma.blog.update({
    where: { id },
    data: {
      title: title.trim(),
      slug: slug.trim(),
      image: image.trim(),
      excerpt: excerpt?.trim() || null,
      content: content.trim(),
    },
  })
  return Response.json(post)
}

export async function DELETE(request, { params }) {
  const { id } = await params
  await prisma.blog.delete({ where: { id } })
  return Response.json({ ok: true })
}
