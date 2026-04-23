import prisma from '@/lib/prisma'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export const dynamic = 'force-dynamic'

function formatDate(date) {
  return new Date(date).toLocaleDateString('ro-RO', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const post = await prisma.blog.findUnique({ where: { slug } })
  if (!post) return { title: 'Articol negăsit – Crissval' }
  return {
    title: `${post.title} – Crissval Blog`,
    description: post.content.slice(0, 150),
  }
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params
  const post = await prisma.blog.findUnique({ where: { slug } })

  if (!post) notFound()

  const related = await prisma.blog.findMany({
    where: { slug: { not: slug } },
    orderBy: { createdAt: 'desc' },
    take: 3,
  })

  return (
    <>
      <main className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          {/* Back Button */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-medium text-green-600 hover:text-green-700 transition-colors mb-8 group"
          >
            <svg className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Înapoi la blog
          </Link>

          {/* Article Header */}
          <article className="bg-white rounded-3xl shadow-xl overflow-hidden mb-8">
            {/* Hero Image */}
            <div className="relative w-full h-64 md:h-96 bg-gradient-to-br from-gray-100 to-gray-200">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 800px"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>

              {/* Date Badge */}
              <div className="absolute top-6 left-6 bg-white/95 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg">
                <p className="text-sm font-semibold text-gray-700">{formatDate(post.createdAt)}</p>
              </div>
            </div>

            {/* Content */}
            <div className="p-8 md:p-12">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                {post.title}
              </h1>

              <div className="prose prose-lg prose-green max-w-none">
                {post.content.split('\n\n').map((paragraph, i) => (
                  <p key={i} className="text-gray-700 leading-relaxed mb-6 last:mb-0">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </article>

          {/* Related Articles */}
          {related.length > 0 && (
            <section className="mb-16">
              <div className="text-center mb-12">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                  Articole similare
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Descoperă mai multe articole interesante din blogul nostru
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {related.map((article) => (
                  <article key={article.id} className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-2">
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={article.image}
                        alt={article.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-full px-3 py-1 shadow-md">
                        <p className="text-xs font-semibold text-gray-700">{formatDate(article.createdAt)}</p>
                      </div>
                    </div>

                    <div className="p-6">
                      <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-green-600 transition-colors">
                        {article.title}
                      </h3>
                      <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                        {article.content.slice(0, 120)}...
                      </p>
                      <Link
                        href={`/blog/${article.slug}`}
                        className="inline-flex items-center gap-2 text-sm font-semibold text-green-600 hover:text-green-700 transition-colors group"
                      >
                        Citește mai mult
                        <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          )}

          {/* Back to Blog CTA */}
          <div className="text-center mb-16">
            <Link
              href="/blog"
              className="inline-flex items-center gap-3 bg-green-600 hover:bg-green-700 text-white font-semibold py-4 px-8 rounded-full transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              Vezi toate articolele
            </Link>
          </div>
        </div>
      </main>
    </>
  )
}
