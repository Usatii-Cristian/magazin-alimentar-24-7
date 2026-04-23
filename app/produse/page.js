import prisma from '@/lib/prisma'
import ProductCard from '@/components/ProductCard'
import ProductFilter from './ProductFilter'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Produse – Crissval',
  description: 'Toate produsele noastre alimentare proaspete.',
}

export default async function ProdusePage({ searchParams }) {
  const { categorie, subcategorie, search, minPrice, maxPrice } = await searchParams

  const [products, categories] = await Promise.all([
    prisma.product.findMany({
      where: {
        ...(categorie    ? { categoryId:  categorie }    : {}),
        ...(subcategorie ? { subcategory: subcategorie } : {}),
        ...(search ? {
          OR: [
            { name: { contains: search, mode: 'insensitive' } },
            { description: { contains: search, mode: 'insensitive' } },
            { ingredients: { contains: search, mode: 'insensitive' } },
          ]
        } : {}),
        ...(minPrice || maxPrice ? {
          price: {
            ...(minPrice ? { gte: parseFloat(minPrice) } : {}),
            ...(maxPrice ? { lte: parseFloat(maxPrice) } : {}),
          }
        } : {}),
      },
      include: { category: true },
      orderBy: { createdAt: 'desc' },
    }),
    prisma.category.findMany({
      include: {
        products: { select: { subcategory: true } },
      },
      orderBy: { name: 'asc' },
    }),
  ])

  const selectedCategory = categories.find((c) => c.id === categorie)
  const subcategories = selectedCategory
    ? [...new Set(selectedCategory.products.map((p) => p.subcategory))].sort()
    : []

  return (
    <main className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Toate produsele</h1>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <aside className="w-full md:w-56 shrink-0">
          <ProductFilter
            categories={categories}
            subcategories={subcategories}
            selectedCategory={categorie || ''}
            selectedSubcategory={subcategorie || ''}
            searchQuery={search || ''}
            minPrice={minPrice || '0'}
            maxPrice={maxPrice || '1000'}
          />
        </aside>

        {/* Grid */}
        <section className="flex-1">
          <p className="text-sm text-gray-500 mb-4">
            {products.length} {products.length === 1 ? 'produs găsit' : 'produse găsite'}
          </p>

          {products.length === 0 ? (
            <div className="text-center py-20 text-gray-500">

              <p className="text-lg font-medium">Nu am găsit produse pentru filtrele selectate.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
              {products.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  )
}
