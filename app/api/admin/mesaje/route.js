import prisma from '@/lib/prisma'

export async function GET() {
  const mesaje = await prisma.contactMessage.findMany({ orderBy: { createdAt: 'desc' } })
  return Response.json(mesaje)
}
