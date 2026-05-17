import Link from 'next/link'
import Image from 'next/image'

export default function ProductCard({ product, className = '' }) {
  const discountPct = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : null

  return (
    <Link
      href={`/produs/${product.slug}`}
      className={`group flex flex-col bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${className}`}
    >
      {/* Image — 1:1 */}
      <div className="relative w-full aspect-square bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
        {product.image ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <svg className="w-12 h-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}

        {/* Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col items-start gap-1.5">
          {discountPct && (
            <span className="bg-gradient-to-r from-red-500 to-rose-400 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow">
              -{discountPct}%
            </span>
          )}
          {product.isBest && (
            <span className="bg-gradient-to-r from-amber-400 to-yellow-300 text-amber-900 text-xs font-bold px-2.5 py-1 rounded-full shadow">
              Popular
            </span>
          )}
        </div>
      </div>

      {/* Text — sub imagine */}
      <div className="flex flex-col flex-1 p-3 gap-1">
        <p className="text-[10px] uppercase tracking-widest text-green-600 font-semibold truncate">
          {product.category?.name}{product.subcategory ? ` · ${product.subcategory}` : ''}
        </p>
        <h3 className="text-sm font-bold text-gray-900 line-clamp-2 leading-snug group-hover:text-green-700 transition-colors">
          {product.name}
        </h3>

        <div className="flex items-center justify-between mt-auto pt-2">
          <div className="flex items-baseline gap-1.5">
            <span className="text-gray-900 font-extrabold text-base leading-none">
              {product.price.toFixed(2)}
              <span className="text-xs font-medium ml-0.5 text-gray-500">lei</span>
            </span>
            {product.oldPrice && (
              <span className="text-gray-400 line-through text-xs">
                {product.oldPrice.toFixed(2)}
              </span>
            )}
          </div>
          <span className="w-8 h-8 flex items-center justify-center rounded-xl bg-gray-100 text-gray-600 group-hover:bg-green-500 group-hover:text-white transition-colors duration-200">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  )
}
