import prisma from '@/lib/prisma'
import Navbar from './Navbar'

export default async function NavbarWrapper() {
  let megaMenuCategories = []
  try {
    megaMenuCategories = await prisma.category.findMany({
      include: { products: { orderBy: { name: 'asc' } } },
      orderBy: { name: 'asc' },
    })
  } catch {
    // render navbar without mega menu if DB unavailable
  }
  return <Navbar megaMenuCategories={megaMenuCategories} />
}
