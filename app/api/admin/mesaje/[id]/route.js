import prisma from '@/lib/prisma'

export async function PUT(request, { params }) {
  const { id } = await params
  const { read } = await request.json()
  const msg = await prisma.contactMessage.update({ where: { id }, data: { read: !!read } })
  return Response.json(msg)
}

export async function DELETE(request, { params }) {
  const { id } = await params
  await prisma.contactMessage.delete({ where: { id } })
  return Response.json({ ok: true })
}
