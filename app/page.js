import Banner from '@/components/Banner'
import ProductCard from '@/components/ProductCard'
import ProductSlider from '@/components/ProductSlider'
import BlogCard from '@/components/BlogCard'
import ReviewsSection from '@/components/ReviewsSection'
import Link from 'next/link'
import prisma from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Crissval – Magazin alimentar',
  description: 'Produse alimentare proaspete, naturale, de la producători locali.',
}

async function getHomeData() {
  const [discountProducts, bestProducts, blogPosts] = await Promise.all([
    prisma.product.findMany({
      where: { isDiscount: true },
      take: 8,
      include: { category: true },
      orderBy: { createdAt: 'desc' },
    }),
    prisma.product.findMany({
      where: { isBest: true },
      take: 8,
      include: { category: true },
      orderBy: { createdAt: 'desc' },
    }),
    prisma.blog.findMany({
      take: 3,
      orderBy: { createdAt: 'desc' },
    }),
  ])
  return { discountProducts, bestProducts, blogPosts }
}

export default async function HomePage() {
  const { discountProducts, bestProducts, blogPosts } = await getHomeData().catch(() => ({
    discountProducts: [],
    bestProducts: [],
    blogPosts: [],
  }))

  return (
    <>
      <Banner />
      <main className="container mx-auto px-4 py-12 space-y-16">
        {/* Reduceri */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Produse cu reduceri</h2>
            <Link href="/reduceri" className="text-sm text-green-600 font-medium hover:underline">
              Vezi toate →
            </Link>
          </div>
          {discountProducts.length === 0 ? (
            <p className="text-gray-500">Nu există reduceri active momentan.</p>
          ) : (
            <div className="px-6">
              <ProductSlider products={discountProducts} />
            </div>
          )}
        </section>

        {/* Cele mai vândute */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Cele mai vândute</h2>
            <Link href="/cele-mai-vandute" className="text-sm text-green-600 font-medium hover:underline">
              Vezi toate →
            </Link>
          </div>
          {bestProducts.length === 0 ? (
            <p className="text-gray-500">Nu există produse disponibile momentan.</p>
          ) : (
            <div className="px-6">
              <ProductSlider products={bestProducts} />
            </div>
          )}
        </section>
      </main>

      <ReviewsSection />

      <main className="container mx-auto px-4 py-12">
        {/* Blog */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Ultimele articole</h2>
            <Link href="/blog" className="text-sm text-green-600 font-medium hover:underline">
              Toate articolele →
            </Link>
          </div>
          {blogPosts.length === 0 ? (
            <p className="text-gray-500">Nu există articole momentan.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {blogPosts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </section>
      </main>
    </>
  )
}

