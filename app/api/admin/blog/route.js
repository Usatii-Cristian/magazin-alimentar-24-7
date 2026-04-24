import prisma from '@/lib/prisma'

export async function GET() {
  const posts = await prisma.blog.findMany({ orderBy: { createdAt: 'desc' } })
  return Response.json(posts)
}

export async function POST(request) {
  const { title, slug, image, excerpt, content } = await request.json()
  if (!title?.trim() || !slug?.trim() || !image?.trim() || !content?.trim()) {
    return Response.json({ error: 'Câmpurile obligatorii lipsesc.' }, { status: 400 })
  }

  const post = await prisma.blog.create({
    data: {
      title: title.trim(),
      slug: slug.trim(),
      image: image.trim(),
      excerpt: excerpt?.trim() || null,
      content: content.trim(),
    },
  })
  return Response.json(post, { status: 201 })
}
