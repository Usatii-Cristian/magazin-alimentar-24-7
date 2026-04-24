import prisma from '@/lib/prisma'

export async function GET() {
  const categorii = await prisma.category.findMany({
    include: { subcategories: true },
    orderBy: { name: 'asc' },
  })
  return Response.json(categorii)
}

export async function POST(request) {
  const { name } = await request.json()
  if (!name?.trim()) return Response.json({ error: 'Numele este obligatoriu.' }, { status: 400 })

  const category = await prisma.category.create({ data: { name: name.trim() } })
  return Response.json(category, { status: 201 })
}
