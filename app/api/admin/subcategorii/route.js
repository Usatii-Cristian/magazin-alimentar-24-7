import prisma from '@/lib/prisma'

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const categoryId = searchParams.get('categoryId')

    const subcategorii = await prisma.subcategory.findMany({
      where: categoryId ? { categoryId } : undefined,
      include: { category: true },
      orderBy: { name: 'asc' },
    })
    return Response.json(subcategorii)
  } catch (e) {
    return Response.json({ error: e.message }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    const { name, categoryId } = await request.json()
    if (!name?.trim() || !categoryId) {
      return Response.json({ error: 'Numele și categoria sunt obligatorii.' }, { status: 400 })
    }

    const sub = await prisma.subcategory.create({ data: { name: name.trim(), categoryId } })
    return Response.json(sub, { status: 201 })
  } catch (e) {
    return Response.json({ error: e.message }, { status: 500 })
  }
}
