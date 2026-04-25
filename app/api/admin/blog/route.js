import prisma from '@/lib/prisma'

export async function GET() {
  try {
    const posts = await prisma.blog.findMany({ orderBy: { createdAt: 'desc' } })
    return Response.json(posts)
  } catch (e) {
    return Response.json({ error: e.message }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    const { title, slug, image, excerpt, content } = await request.json()
    if (!title?.trim() || !slug?.trim() || !content?.trim()) {
      return Response.json({ error: 'Câmpurile obligatorii lipsesc.' }, { status: 400 })
    }

    const post = await prisma.blog.create({
      data: {
        title: title.trim(),
        slug: slug.trim(),
        image: image?.trim() || null,
        excerpt: excerpt?.trim() || null,
        content: content.trim(),
      },
    })
    return Response.json(post, { status: 201 })
  } catch (e) {
    if (e.code === 'P2002') {
      return Response.json({ error: 'Un articol cu acest slug există deja.' }, { status: 409 })
    }
    return Response.json({ error: e.message }, { status: 500 })
  }
}
