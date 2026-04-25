import prisma from '@/lib/prisma'

export async function PUT(request, { params }) {
  try {
    const { id } = await params
    const { read } = await request.json()
    const msg = await prisma.contactMessage.update({ where: { id }, data: { read: !!read } })
    return Response.json(msg)
  } catch (e) {
    if (e.code === 'P2025') {
      return Response.json({ error: 'Mesaj negăsit.' }, { status: 404 })
    }
    return Response.json({ error: e.message }, { status: 500 })
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = await params
    await prisma.contactMessage.delete({ where: { id } })
    return Response.json({ ok: true })
  } catch (e) {
    if (e.code === 'P2025') {
      return Response.json({ error: 'Mesaj negăsit.' }, { status: 404 })
    }
    return Response.json({ error: e.message }, { status: 500 })
  }
}
