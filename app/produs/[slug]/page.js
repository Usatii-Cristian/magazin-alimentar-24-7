import prisma from '@/lib/prisma'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import ProductCard from '@/components/ProductCard'

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }) {
  const { slug } = await params
  const product = await prisma.product.findUnique({
    where: { slug },
    include: { category: true },
  })
  if (!product) return { title: 'Produs negăsit – Crissval' }
  return {
    title: `${product.name} – Crissval`,
    description: `${product.name} din categoria ${product.category.name}. Preț: ${product.price.toFixed(2)} lei.`,
  }
}

export default async function ProdusPagina({ params }) {
  const { slug } = await params

  const product = await prisma.product.findUnique({
    where: { slug },
    include: { category: true },
  })

  if (!product) notFound()

  const discount = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : null

  const related = await prisma.product.findMany({
    where: { categoryId: product.categoryId, slug: { not: slug } },
    include: { category: true },
    take: 4,
    orderBy: { createdAt: 'desc' },
  })

  return (
    <>
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 h-11 flex items-center gap-2 text-sm text-gray-400">
          <Link href="/" className="hover:text-green-700 transition-colors">Acasă</Link>
          <span>/</span>
          <Link href="/produse" className="hover:text-green-700 transition-colors">Produse</Link>
          <span>/</span>
          <Link
            href={`/produse?categorie=${encodeURIComponent(product.category.name)}`}
            className="hover:text-green-700 transition-colors"
          >
            {product.category.name}
          </Link>
          <span>/</span>
          <span className="text-gray-700 font-medium truncate max-w-[200px]">{product.name}</span>
        </div>
      </div>

      <main className="bg-gray-50 min-h-screen">
        {/* Product section */}
        <div className="container mx-auto px-4 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">

            {/* Image panel */}
            <div className="lg:sticky lg:top-24">
              <div className="relative h-72 lg:h-auto lg:aspect-square rounded-3xl overflow-hidden bg-white shadow-lg">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
                {discount && (
                  <span className="absolute top-5 left-5 bg-red-500 text-white font-bold px-3 py-1.5 rounded-full text-sm shadow-md">
                    -{discount}%
                  </span>
                )}
              </div>
            </div>

            {/* Details panel */}
            <div className="flex flex-col gap-6 pt-2">
              {/* Category + subcategory */}
              <div className="flex items-center gap-2 flex-wrap">
                <Link
                  href={`/produse?categorie=${encodeURIComponent(product.category.name)}`}
                  className="text-xs font-semibold uppercase tracking-widest text-green-600 hover:text-green-700 transition-colors"
                >
                  {product.category.name}
                </Link>
                {product.subcategory && (
                  <>
                    <span className="text-gray-300">·</span>
                    <span className="text-xs font-medium text-gray-400 uppercase tracking-widest">
                      {product.subcategory}
                    </span>
                  </>
                )}
              </div>

              {/* Title */}
              <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight">
                {product.name}
              </h1>

              {/* Badges */}
              {(product.isBest || product.isDiscount) && (
                <div className="flex items-center gap-2 flex-wrap">
                  {product.isBest && (
                    <span className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-700 border border-amber-200 text-xs font-semibold px-3 py-1.5 rounded-full">
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                      Cel mai vândut
                    </span>
                  )}
                  {product.isDiscount && (
                    <span className="inline-flex items-center gap-1.5 bg-red-50 text-red-600 border border-red-200 text-xs font-semibold px-3 py-1.5 rounded-full">
                      Preț redus
                    </span>
                  )}
                </div>
              )}

              {/* Divider */}
              <div className="border-t border-gray-200" />

              {/* Price block */}
              <div className="flex items-end gap-4 flex-wrap">
                <span className="text-4xl font-extrabold text-gray-900 leading-none">
                  {product.price.toFixed(2)}
                  <span className="text-xl font-semibold text-gray-500 ml-1">lei</span>
                </span>
                {product.oldPrice && (
                  <div className="flex flex-col">
                    <span className="text-gray-400 line-through text-lg leading-none">
                      {product.oldPrice.toFixed(2)} lei
                    </span>
                    <span className="text-red-500 text-xs font-semibold mt-1">
                      Economisești {(product.oldPrice - product.price).toFixed(2)} lei
                    </span>
                  </div>
                )}
              </div>

              {/* Info box */}
              <div className="rounded-2xl border border-gray-200 bg-white divide-y divide-gray-100 overflow-hidden">
                <div className="flex items-start gap-4 p-4">
                  <div className="w-9 h-9 rounded-xl bg-green-50 flex items-center justify-center shrink-0 mt-0.5">
                    <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-800">Disponibil în magazin</p>
                    <p className="text-sm text-gray-500 mt-0.5">Str. Câmpului 12 · Luni–Sâmbătă 08:00–20:00</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4">
                  <div className="w-9 h-9 rounded-xl bg-green-50 flex items-center justify-center shrink-0 mt-0.5">
                    <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-800">Calitate garantată</p>
                    <p className="text-sm text-gray-500 mt-0.5">Produse proaspete de la producători locali verificați</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4">
                  <div className="w-9 h-9 rounded-xl bg-green-50 flex items-center justify-center shrink-0 mt-0.5">
                    <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-800">Comenzi prin telefon</p>
                    <a href="tel:+37369620052" className="text-sm text-green-600 hover:underline mt-0.5 block">
                      +373 696 20 052
                    </a>
                  </div>
                </div>
              </div>

              {/* Description */}
              {product.description && (
                <details className="group rounded-2xl border border-gray-200 bg-white overflow-hidden">
                  <summary className="flex items-center justify-between px-5 py-4 cursor-pointer select-none list-none">
                    <span className="text-sm font-bold text-gray-900 uppercase tracking-wider">Descriere</span>
                    <svg className="w-4 h-4 text-gray-400 transition-transform duration-200 group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <div className="px-5 pb-5">
                    <p className="text-sm text-gray-600 leading-relaxed">{product.description}</p>
                  </div>
                </details>
              )}

              {/* Ingredients */}
              {product.ingredients && (
                <details className="group rounded-2xl border border-gray-200 bg-white overflow-hidden">
                  <summary className="flex items-center justify-between px-5 py-4 cursor-pointer select-none list-none">
                    <span className="text-sm font-bold text-gray-900 uppercase tracking-wider">Ingrediente</span>
                    <svg className="w-4 h-4 text-gray-400 transition-transform duration-200 group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <div className="px-5 pb-5">
                    <p className="text-sm text-gray-600 leading-relaxed">{product.ingredients}</p>
                  </div>
                </details>
              )}

              {/* Nutrition */}
              {product.nutrition && (
                <details className="group rounded-2xl border border-gray-200 bg-white overflow-hidden">
                  <summary className="flex items-center justify-between px-5 py-4 cursor-pointer select-none list-none">
                    <span className="text-sm font-bold text-gray-900 uppercase tracking-wider">
                      Valori nutriționale
                      <span className="ml-2 text-xs font-normal text-gray-400 normal-case">
                        la {product.nutrition.per}
                      </span>
                    </span>
                    <svg className="w-4 h-4 text-gray-400 flex-shrink-0 transition-transform duration-200 group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <div className="px-5 pb-5">
                    <div className="divide-y divide-gray-100 text-sm">
                      {[
                        { label: 'Energie', value: `${product.nutrition.energy} kcal` },
                        { label: 'Proteine', value: `${product.nutrition.protein} g` },
                        { label: 'Grăsimi', value: `${product.nutrition.fat} g`, sub: product.nutrition.saturatedFat != null ? `din care saturate ${product.nutrition.saturatedFat} g` : null },
                        { label: 'Carbohidrați', value: `${product.nutrition.carbs} g`, sub: product.nutrition.sugars != null ? `din care zahăruri ${product.nutrition.sugars} g` : null },
                        product.nutrition.fiber > 0 && { label: 'Fibre', value: `${product.nutrition.fiber} g` },
                        { label: 'Sare', value: `${product.nutrition.salt} g` },
                      ].filter(Boolean).map(({ label, value, sub }) => (
                        <div key={label} className="flex items-start justify-between py-2">
                          <div>
                            <span className="text-gray-700">{label}</span>
                            {sub && <p className="text-xs text-gray-400 mt-0.5 pl-3">— {sub}</p>}
                          </div>
                          <span className="font-semibold text-gray-900 tabular-nums">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </details>
              )}

              {/* CTA */}
              <a
                href="tel:+37369620052"
                className="flex items-center justify-center gap-2 w-full bg-green-600 hover:bg-green-500 text-white font-bold py-4 rounded-2xl transition-colors text-base shadow-md shadow-green-200"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                </svg>
                Comandă prin telefon
              </a>
            </div>
          </div>
        </div>

        {/* Related products */}
        {related.length > 0 && (
          <div className="border-t border-gray-200 bg-white">
            <div className="container mx-auto px-4 py-12">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-extrabold text-gray-900">
                  Mai multe din <span className="text-green-700">{product.category.name}</span>
                </h2>
                <Link
                  href={`/produse?categorie=${encodeURIComponent(product.category.name)}`}
                  className="text-sm font-semibold text-green-700 hover:text-green-600 flex items-center gap-1 transition-colors"
                >
                  Vezi toate
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-3">
                {related.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  )
}
