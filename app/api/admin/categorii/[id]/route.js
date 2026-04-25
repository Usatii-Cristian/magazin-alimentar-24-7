import prisma from '@/lib/prisma'

export async function PUT(request, { params }) {
  try {
    const { id } = await params
    const { name } = await request.json()
    if (!name?.trim()) return Response.json({ error: 'Numele este obligatoriu.' }, { status: 400 })

    const category = await prisma.category.update({ where: { id }, data: { name: name.trim() } })
    return Response.json(category)
  } catch (e) {
    if (e.code === 'P2002') {
      return Response.json({ error: 'O categorie cu acest nume există deja.' }, { status: 409 })
    }
    if (e.code === 'P2025') {
      return Response.json({ error: 'Categorie negăsită.' }, { status: 404 })
    }
    return Response.json({ error: e.message }, { status: 500 })
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = await params
    await prisma.category.delete({ where: { id } })
    return Response.json({ ok: true })
  } catch (e) {
    if (e.code === 'P2025') {
      return Response.json({ error: 'Categorie negăsită.' }, { status: 404 })
    }
    return Response.json({ error: e.message }, { status: 500 })
  }
}
