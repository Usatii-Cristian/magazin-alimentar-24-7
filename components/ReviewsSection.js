'use client'

import { useState, useEffect, useRef, useCallback } from 'react'

const reviews = [
  {
    id: 1,
    name: 'Maria Ionescu',
    location: 'Chișinău',
    avatar: 'MI',
    color: 'bg-emerald-500',
    rating: 5,
    text: 'Produse absolut delicioase! Pâinea lor artizanală este cea mai bună pe care am gustat-o. Calitate superioară și prețuri foarte accesibile. Recomand cu toată inima!',
    product: 'Pâine artizanală',
  },
  {
    id: 2,
    name: 'Alexandru Popa',
    location: 'Bălți',
    avatar: 'AP',
    color: 'bg-blue-500',
    rating: 5,
    text: 'Cumpăr de la Crissval de aproape un an. Legumele sunt mereu proaspete, parcă direct din grădină. Ouăle de la ei sunt galbene și gustoase — nu am mai văzut așa ceva în alt magazin.',
    product: 'Legume & Ouă ecologice',
  },
  {
    id: 3,
    name: 'Elena Vrabie',
    location: 'Orhei',
    avatar: 'EV',
    color: 'bg-violet-500',
    rating: 5,
    text: 'Brânza telemea este exact cum ne plăcea bunicii noastre — sărată perfect, cremă și aromată. Sunt încântată că am găsit un magazin care chiar respectă calitatea tradițională.',
    product: 'Brânză telemea',
  },
  {
    id: 4,
    name: 'Ion Cojocaru',
    location: 'Strășeni',
    avatar: 'IC',
    color: 'bg-amber-500',
    rating: 5,
    text: 'Fructele de sezon sunt mereu proaspete și au gust adevărat. Merele Ionatan de la Crissval îmi amintesc de cele din copilărie. Calitate garantată, vânzători amabili!',
    product: 'Fructe de sezon',
  },
  {
    id: 5,
    name: 'Natalia Rusu',
    location: 'Chișinău',
    avatar: 'NR',
    color: 'bg-rose-500',
    rating: 5,
    text: 'Iaurtul natural este pur și simplu delicios — fără aditivi, fără conservanți. Copiii mei îl cer în fiecare dimineață. Mulțumesc Crissval pentru că există!',
    product: 'Iaurt natural',
  },
  {
    id: 6,
    name: 'Dumitru Manta',
    location: 'Cahul',
    avatar: 'DM',
    color: 'bg-teal-500',
    rating: 5,
    text: 'Calitate excelentă la toate produsele. Smântâna lor e groasă și bogată, cum nu mai găsești la alte magazine. Prețurile cu reduceri sunt un bonus extraordinar!',
    product: 'Smântână 20%',
  },
]

function Stars({ count = 5 }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

export default function ReviewsSection() {
  const [current, setCurrent] = useState(0)
  const [perView, setPerView] = useState(3)
  const timerRef = useRef(null)

  useEffect(() => {
    const update = () => setPerView(window.innerWidth < 640 ? 1 : window.innerWidth < 1024 ? 2 : 3)
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  const maxIdx = Math.max(0, reviews.length - perView)

  useEffect(() => {
    setCurrent((c) => Math.min(c, maxIdx))
  }, [maxIdx])

  const startTimer = useCallback(() => {
    clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      setCurrent((c) => (c >= maxIdx ? 0 : c + 1))
    }, 4000)
  }, [maxIdx])

  useEffect(() => {
    startTimer()
    return () => clearInterval(timerRef.current)
  }, [startTimer])

  const goTo = (i) => {
    setCurrent(Math.min(Math.max(i, 0), maxIdx))
    startTimer()
  }

  const translateX = -(current * (100 / perView))

  return (
    <section className="bg-gradient-to-br from-green-700 to-green-900 py-16 overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-green-300 mb-3">
            Ce spun clienții noștri
          </span>
          <h2 className="text-3xl font-extrabold text-white">Recenzii</h2>
        </div>

        {/* Slider */}
        <div className="relative px-8">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(${translateX}%)` }}
            >
              {reviews.map((r) => (
                <div
                  key={r.id}
                  style={{ width: `${100 / perView}%` }}
                  className="shrink-0 px-3"
                >
                  <div className="bg-white rounded-2xl p-6 flex flex-col gap-4 h-full shadow-sm">
                    {/* Stars */}
                    <Stars count={r.rating} />

                    {/* Text */}
                    <p className="text-gray-600 text-sm leading-relaxed flex-1">
                      "{r.text}"
                    </p>

                    {/* Footer */}
                    <div className="flex items-center gap-3 pt-3 border-t border-gray-100">
                      <div className={`w-9 h-9 rounded-full ${r.color} flex items-center justify-center text-white text-xs font-bold shrink-0`}>
                        {r.avatar}
                      </div>
                      <div>
                        <p className="text-gray-800 font-semibold text-sm">{r.name}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Arrows */}
          {maxIdx > 0 && (
            <>
              <button
                onClick={() => goTo(current <= 0 ? maxIdx : current - 1)}
                aria-label="Anterior"
                className="absolute -left-1 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 border border-white/30 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white hover:text-green-700 transition-all duration-200"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={() => goTo(current >= maxIdx ? 0 : current + 1)}
                aria-label="Următor"
                className="absolute -right-1 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 border border-white/30 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white hover:text-green-700 transition-all duration-200"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}
        </div>

        {/* Dots */}
        {maxIdx > 0 && (
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: maxIdx + 1 }).map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Pagina ${i + 1}`}
                className={`h-3 rounded-full transition-all duration-300 ${
                  i === current ? 'bg-white w-8' : 'bg-white/30 w-3 hover:bg-white/60'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
