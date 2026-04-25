import prisma from '@/lib/prisma'

export async function GET() {
  try {
    const mesaje = await prisma.contactMessage.findMany({ orderBy: { createdAt: 'desc' } })
    return Response.json(mesaje)
  } catch (e) {
    return Response.json({ error: e.message }, { status: 500 })
  }
}
