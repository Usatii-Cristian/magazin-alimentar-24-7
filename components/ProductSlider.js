'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import ProductCard from './ProductCard'

export default function ProductSlider({ products }) {
  const [current, setCurrent] = useState(0)
  const [perView, setPerView] = useState(4)
  const timerRef = useRef(null)

  useEffect(() => {
    const update = () => setPerView(window.innerWidth < 640 ? 2 : window.innerWidth < 1280 ? 4 : 5)
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  const maxIdx = Math.max(0, products.length - perView)

  // Clamp current if perView changes and current is now out of range
  useEffect(() => {
    setCurrent((c) => Math.min(c, maxIdx))
  }, [maxIdx])

  const startTimer = useCallback(
    (fromIdx) => {
      clearInterval(timerRef.current)
      timerRef.current = setInterval(() => {
        setCurrent((c) => (c >= maxIdx ? 0 : c + 1))
      }, 3500)
    },
    [maxIdx]
  )

  useEffect(() => {
    startTimer()
    return () => clearInterval(timerRef.current)
  }, [startTimer])

  const goTo = (i) => {
    const clamped = Math.min(Math.max(i, 0), maxIdx)
    setCurrent(clamped)
    startTimer()
  }

  const goPrev = () => goTo(current <= 0 ? maxIdx : current - 1)
  const goNext = () => goTo(current >= maxIdx ? 0 : current + 1)

  const translateX = -(current * (100 / perView))

  return (
    <div className="relative">
      {/* Track */}
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(${translateX}%)` }}
        >
          {products.map((p) => (
            <div
              key={p.id}
              style={{ width: `${100 / perView}%` }}
              className="shrink-0 px-2"
            >
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      </div>

      {/* Arrow prev */}
      {maxIdx > 0 && (
        <>
          <button
            onClick={goPrev}
            aria-label="Anterior"
            className="absolute -left-5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-lg border border-gray-100 flex items-center justify-center text-gray-500 hover:bg-green-600 hover:text-white hover:border-transparent transition-all duration-200 z-10"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Arrow next */}
          <button
            onClick={goNext}
            aria-label="Următor"
            className="absolute -right-5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-lg border border-gray-100 flex items-center justify-center text-gray-500 hover:bg-green-600 hover:text-white hover:border-transparent transition-all duration-200 z-10"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}

      {/* Dots */}
      {maxIdx > 0 && (
        <div className="flex justify-center gap-2 mt-5">
          {Array.from({ length: maxIdx + 1 }).map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Pagina ${i + 1}`}
              className={`h-3 rounded-full transition-all duration-300 ${
                i === current ? 'bg-green-600 w-8' : 'bg-gray-300 w-3 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
