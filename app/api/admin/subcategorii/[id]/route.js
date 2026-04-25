import prisma from '@/lib/prisma'

export async function PUT(request, { params }) {
  try {
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
  } catch (e) {
    if (e.code === 'P2025') {
      return Response.json({ error: 'Subcategorie negăsită.' }, { status: 404 })
    }
    return Response.json({ error: e.message }, { status: 500 })
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = await params
    await prisma.subcategory.delete({ where: { id } })
    return Response.json({ ok: true })
  } catch (e) {
    if (e.code === 'P2025') {
      return Response.json({ error: 'Subcategorie negăsită.' }, { status: 404 })
    }
    return Response.json({ error: e.message }, { status: 500 })
  }
}
