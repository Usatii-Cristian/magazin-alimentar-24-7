import prisma from '@/lib/prisma'

export async function GET() {
  try {
    const categorii = await prisma.category.findMany({
      include: { subcategories: true },
      orderBy: { name: 'asc' },
    })
    return Response.json(categorii)
  } catch (e) {
    return Response.json({ error: e.message }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    const { name } = await request.json()
    if (!name?.trim()) return Response.json({ error: 'Numele este obligatoriu.' }, { status: 400 })

    const category = await prisma.category.create({ data: { name: name.trim() } })
    return Response.json(category, { status: 201 })
  } catch (e) {
    if (e.code === 'P2002') {
      return Response.json({ error: 'O categorie cu acest nume există deja.' }, { status: 409 })
    }
    return Response.json({ error: e.message }, { status: 500 })
  }
}
