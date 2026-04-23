import prisma from '@/lib/prisma'
import ProductCard from '@/components/ProductCard'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Cele mai vândute – Crissval',
  description: 'Produsele preferate ale clienților Crissval.',
}

export default async function CeleMaiVandutePage() {
  const products = await prisma.product.findMany({
    where: { isBest: true },
    include: { category: true },
    orderBy: { createdAt: 'desc' },
  })

  return (
    <main className="container mx-auto px-4 py-10">
      <div className="flex items-center gap-3 mb-8">

        <div>
          <h1 className="text-3xl font-bold text-gray-800">Cele mai vândute</h1>
          <p className="text-gray-500 text-sm mt-1">Preferatele clienților noștri</p>
        </div>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-20 text-gray-500">

          <p className="text-lg font-medium">Nu există produse în această secțiune momentan.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </main>
  )
}
