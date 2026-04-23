import Link from 'next/link'
import Image from 'next/image'

export default function Banner() {
  return (
    <section className="relative overflow-hidden bg-gray-950 min-h-[520px] md:min-h-[600px] flex items-center">

      {/* Background image */}
      <Image
        src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=1600&q=80&auto=format&fit=crop"
        alt="Produse alimentare proaspete"
        fill
        priority
        className="object-cover object-center opacity-40"
        sizes="100vw"
      />

      {/* Gradient overlay — stronger on left for text legibility */}
      <div className="absolute inset-0 bg-gradient-to-r from-gray-950/90 via-gray-950/60 to-transparent" />

      {/* Content */}
      <div className="relative container mx-auto px-4 py-20 md:py-28">
        <div className="max-w-xl">

          {/* Heading */}
          <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-[1.1] tracking-tight mb-5">
            Produse naturale<br />
            <span className="text-green-400">de calitate</span>
          </h1>

          {/* Subtext */}
          <p className="text-gray-300 text-base md:text-lg leading-relaxed mb-8 max-w-md">
            Descoperă gama noastră de produse alimentare proaspete — pâine artizanală,
            lactate, fructe, legume și multe altele, de la producători locali.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/produse"
              className="inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-400 text-white font-semibold px-7 py-3.5 rounded-xl transition-colors text-sm shadow-lg shadow-green-900/40"
            >
              Explorează produsele
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link
              href="/reduceri"
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold px-7 py-3.5 rounded-xl transition-colors text-sm backdrop-blur-sm"
            >
              Reduceri active
            </Link>
          </div>
        </div>
      </div>

      {/* Rounded bottom wave */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-none">
        <svg
          viewBox="0 0 1440 48"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="w-full h-10 md:h-12 block"
        >
          <path
            d="M0,48 C480,10 960,10 1440,48 L1440,48 L0,48 Z"
            fill="#f9fafb"
          />
        </svg>
      </div>
    </section>
  )
}
