import prisma from '@/lib/prisma'

export async function GET() {
  const recenzii = await prisma.review.findMany({ orderBy: { createdAt: 'desc' } })
  return Response.json(recenzii)
}

export async function POST(request) {
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
}
