import prisma from '@/lib/prisma'

export async function PUT(request, { params }) {
  try {
    const { id } = await params
    const { name, rating, text, product } = await request.json()

    const review = await prisma.review.update({
      where: { id },
      data: {
        name: name.trim(),
        rating: parseInt(rating) || 5,
        text: text.trim(),
        product: product?.trim() || null,
      },
    })
    return Response.json(review)
  } catch (e) {
    if (e.code === 'P2025') {
      return Response.json({ error: 'Recenzie negăsită.' }, { status: 404 })
    }
    return Response.json({ error: e.message }, { status: 500 })
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = await params
    await prisma.review.delete({ where: { id } })
    return Response.json({ ok: true })
  } catch (e) {
    if (e.code === 'P2025') {
      return Response.json({ error: 'Recenzie negăsită.' }, { status: 404 })
    }
    return Response.json({ error: e.message }, { status: 500 })
  }
}
