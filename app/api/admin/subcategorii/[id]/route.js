import prisma from '@/lib/prisma'

export async function PUT(request, { params }) {
  const { id } = await params
  const { name, categoryId } = await request.json()
  if (!name?.trim() || !categoryId) {
    return Response.json({ error: 'Numele și categoria sunt obligatorii.' }, { status: 400 })
  }

  const sub = await prisma.subcategory.update({
    where: { id },
    data: { name: name.trim(), categoryId },
  })
  return Response.json(sub)
}

export async function DELETE(request, { params }) {
  const { id } = await params
  await prisma.subcategory.delete({ where: { id } })
  return Response.json({ ok: true })
}
