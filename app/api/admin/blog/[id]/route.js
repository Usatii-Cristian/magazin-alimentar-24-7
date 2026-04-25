import prisma from '@/lib/prisma'

export async function GET(request, { params }) {
  try {
    const { id } = await params
    const post = await prisma.blog.findUnique({ where: { id } })
    if (!post) return Response.json({ error: 'Articol negăsit.' }, { status: 404 })
    return Response.json(post)
  } catch (e) {
    return Response.json({ error: e.message }, { status: 500 })
  }
}

export async function PUT(request, { params }) {
  try {
    const { id } = await params
    const { title, slug, image, excerpt, content } = await request.json()

    const post = await prisma.blog.update({
      where: { id },
      data: {
        title: title.trim(),
        slug: slug.trim(),
        image: image?.trim() || null,
        excerpt: excerpt?.trim() || null,
        content: content.trim(),
      },
    })
    return Response.json(post)
  } catch (e) {
    if (e.code === 'P2002') {
      return Response.json({ error: 'Un articol cu acest slug există deja.' }, { status: 409 })
    }
    if (e.code === 'P2025') {
      return Response.json({ error: 'Articol negăsit.' }, { status: 404 })
    }
    return Response.json({ error: e.message }, { status: 500 })
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = await params
    await prisma.blog.delete({ where: { id } })
    return Response.json({ ok: true })
  } catch (e) {
    if (e.code === 'P2025') {
      return Response.json({ error: 'Articol negăsit.' }, { status: 404 })
    }
    return Response.json({ error: e.message }, { status: 500 })
  }
}
