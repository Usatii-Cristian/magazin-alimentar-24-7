import prisma from '@/lib/prisma'

export async function GET(request, { params }) {
  const { id } = await params
  const product = await prisma.product.findUnique({
    where: { id },
    include: { category: true },
  })
  if (!product) return Response.json({ error: 'Produs negăsit.' }, { status: 404 })
  return Response.json(product)
}

export async function PUT(request, { params }) {
  const { id } = await params
  const body = await request.json()
  const { name, slug, price, oldPrice, image, categoryId, subcategory, isBest, isDiscount, description, ingredients, nutrition } = body

  const product = await prisma.product.update({
    where: { id },
    data: {
      name: name.trim(),
      slug: slug.trim(),
      price: parseFloat(price),
      oldPrice: oldPrice ? parseFloat(oldPrice) : null,
      image: image.trim(),
      categoryId,
      subcategory: subcategory?.trim() || '',
      isBest: !!isBest,
      isDiscount: !!isDiscount,
      description: description?.trim() || null,
      ingredients: ingredients?.trim() || null,
      nutrition: nutrition && Object.values(nutrition).some(Boolean) ? nutrition : null,
    },
    include: { category: true },
  })
  return Response.json(product)
}

export async function DELETE(request, { params }) {
  const { id } = await params
  await prisma.product.delete({ where: { id } })
  return Response.json({ ok: true })
}
