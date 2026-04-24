import prisma from '@/lib/prisma'

export async function PUT(request, { params }) {
  const { id } = await params
  const { name } = await request.json()
  if (!name?.trim()) return Response.json({ error: 'Numele este obligatoriu.' }, { status: 400 })

  const category = await prisma.category.update({ where: { id }, data: { name: name.trim() } })
  return Response.json(category)
}

export async function DELETE(request, { params }) {
  const { id } = await params
  await prisma.category.delete({ where: { id } })
  return Response.json({ ok: true })
}
