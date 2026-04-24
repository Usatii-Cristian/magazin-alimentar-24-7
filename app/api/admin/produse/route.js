import prisma from '@/lib/prisma'

export async function GET() {
  const produse = await prisma.product.findMany({
    include: { category: true },
    orderBy: { createdAt: 'desc' },
  })
  return Response.json(produse)
}

export async function POST(request) {
  const body = await request.json()
  const { name, slug, price, oldPrice, image, categoryId, subcategory, isBest, isDiscount, description, ingredients, nutrition } = body

  if (!name?.trim() || !slug?.trim() || !price || !image?.trim() || !categoryId) {
    return Response.json({ error: 'Câmpurile obligatorii lipsesc.' }, { status: 400 })
  }

  const product = await prisma.product.create({
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
  return Response.json(product, { status: 201 })
}
