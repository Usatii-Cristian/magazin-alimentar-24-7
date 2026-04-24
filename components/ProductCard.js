import Link from 'next/link'
import Image from 'next/image'

export default function ProductCard({ product }) {
  const discountPct = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : null

  return (
    <Link
      href={`/produs/${product.slug}`}
      className="group relative flex flex-col bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 aspect-[3/4] block"
    >
      {/* Full-card image */}
      <Image
        src={product.image}
        alt={product.name}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-110"
        sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
      />

      {/* Persistent gradient — bottom */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

      {/* Badges — top left */}
      <div className="absolute top-3 left-3 flex flex-col items-start gap-1.5 w-fit">
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

      {/* Content — pinned to bottom */}
      <div className="absolute bottom-0 inset-x-0 p-4 flex flex-col gap-1">
        <p className="text-[10px] uppercase tracking-widest text-green-300 font-semibold truncate">
          {product.category?.name}{product.subcategory ? ` · ${product.subcategory}` : ''}
        </p>
        <h3 className="text-sm font-bold text-white line-clamp-2 leading-snug">
          {product.name}
        </h3>

        <div className="flex items-center justify-between mt-2">
          <div className="flex items-baseline gap-1.5">
            <span className="text-white font-extrabold text-base leading-none">
              {product.price.toFixed(2)}
              <span className="text-xs font-medium ml-0.5 text-white/80">lei</span>
            </span>
            {product.oldPrice && (
              <span className="text-white/50 line-through text-xs">
                {product.oldPrice.toFixed(2)}
              </span>
            )}
          </div>
          <span className="w-8 h-8 flex items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm text-white group-hover:bg-green-500 transition-colors duration-200">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  )
}
