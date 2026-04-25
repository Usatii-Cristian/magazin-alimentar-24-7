import prisma from '@/lib/prisma'

export async function GET(request, { params }) {
  try {
    const { id } = await params
    const product = await prisma.product.findUnique({
      where: { id },
      include: { category: true },
    })
    if (!product) return Response.json({ error: 'Produs negăsit.' }, { status: 404 })
    return Response.json(product)
  } catch (e) {
    return Response.json({ error: e.message }, { status: 500 })
  }
}

export async function PUT(request, { params }) {
  try {
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
        image: image?.trim() || null,
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
  } catch (e) {
    if (e.code === 'P2002') {
      return Response.json({ error: 'Un produs cu acest slug există deja.' }, { status: 409 })
    }
    if (e.code === 'P2025') {
      return Response.json({ error: 'Produs negăsit.' }, { status: 404 })
    }
    return Response.json({ error: e.message }, { status: 500 })
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = await params
    await prisma.product.delete({ where: { id } })
    return Response.json({ ok: true })
  } catch (e) {
    if (e.code === 'P2025') {
      return Response.json({ error: 'Produs negăsit.' }, { status: 404 })
    }
    return Response.json({ error: e.message }, { status: 500 })
  }
}
