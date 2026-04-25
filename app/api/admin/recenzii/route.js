import prisma from '@/lib/prisma'

export async function GET() {
  try {
    const recenzii = await prisma.review.findMany({ orderBy: { createdAt: 'desc' } })
    return Response.json(recenzii)
  } catch (e) {
    return Response.json({ error: e.message }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    const { name, rating, text, product } = await request.json()
    if (!name?.trim() || !text?.trim()) {
      return Response.json({ error: 'Numele și textul sunt obligatorii.' }, { status: 400 })
    }

    const review = await prisma.review.create({
      data: {
        name: name.trim(),
        rating: parseInt(rating) || 5,
        text: text.trim(),
        product: product?.trim() || null,
      },
    })
    return Response.json(review, { status: 201 })
  } catch (e) {
    return Response.json({ error: e.message }, { status: 500 })
  }
}
