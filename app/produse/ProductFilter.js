'use client'

import { useRouter, usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'

export default function ProductFilter({
  categories,
  subcategories,
  selectedCategory,
  selectedSubcategory,
  searchQuery = '',
  minPrice = '',
  maxPrice = '',
}) {
  const router = useRouter()
  const pathname = usePathname()
  const [localSearch, setLocalSearch] = useState(searchQuery)
  const [localMinPrice, setLocalMinPrice] = useState(minPrice || '0')
  const [localMaxPrice, setLocalMaxPrice] = useState(maxPrice || '1000')

  // Debounce search updates
  useEffect(() => {
    const timer = setTimeout(() => {
      updateFilters({ search: localSearch })
    }, 300)
    return () => clearTimeout(timer)
  }, [localSearch])

  function updateFilters(updates) {
    const params = new URLSearchParams()
    const newSearch = updates.search !== undefined ? updates.search : searchQuery
    const newMinPrice = updates.minPrice !== undefined ? updates.minPrice : minPrice
    const newMaxPrice = updates.maxPrice !== undefined ? updates.maxPrice : maxPrice

    if (selectedCategory) params.set('categorie', selectedCategory)
    if (selectedSubcategory) params.set('subcategorie', selectedSubcategory)
    if (newSearch) params.set('search', newSearch)
    if (newMinPrice && newMinPrice !== '0') params.set('minPrice', newMinPrice)
    if (newMaxPrice && newMaxPrice !== '1000') params.set('maxPrice', newMaxPrice)

    router.push(`${pathname}${params.toString() ? '?' + params.toString() : ''}`)
  }

  function setCategory(id) {
    const params = new URLSearchParams()
    if (id && id !== selectedCategory) params.set('categorie', id)
    if (selectedSubcategory) params.set('subcategorie', selectedSubcategory)
    if (searchQuery) params.set('search', searchQuery)
    if (minPrice) params.set('minPrice', minPrice)
    if (maxPrice) params.set('maxPrice', maxPrice)
    router.push(`${pathname}?${params.toString()}`)
  }

  function setSubcategory(sub) {
    const params = new URLSearchParams()
    if (selectedCategory) params.set('categorie', selectedCategory)
    if (sub && sub !== selectedSubcategory) params.set('subcategorie', sub)
    if (searchQuery) params.set('search', searchQuery)
    if (minPrice) params.set('minPrice', minPrice)
    if (maxPrice) params.set('maxPrice', maxPrice)
    router.push(`${pathname}?${params.toString()}`)
  }

  function clearFilters() {
    router.push(pathname)
    setLocalSearch('')
    setLocalMinPrice('0')
    setLocalMaxPrice('1000')
  }

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 sticky top-20">
      <div className="flex items-center justify-between mb-5">
        <h2 className="font-semibold text-gray-800 text-sm uppercase tracking-wide">
          Filtrează
        </h2>
        {(selectedCategory || selectedSubcategory || searchQuery || minPrice || maxPrice) && (
          <button
            onClick={clearFilters}
            className="text-xs text-red-500 hover:underline"
          >
            Șterge filtrele
          </button>
        )}
      </div>

      {/* Search */}
      <div className="mb-5">
        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
          Caută produs
        </h3>
        <div className="relative">
          <input
            type="text"
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            placeholder="Nume produs..."
            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
          <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      {/* Price Range */}
      <div className="mb-5">
        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">
          Preț (lei)
        </h3>
        <div className="space-y-3">
          {/* Range Slider */}
          <div className="relative">
            <input
              type="range"
              min="0"
              max="1000"
              step="1"
              value={localMinPrice}
              onChange={(e) => {
                const newMin = Math.min(parseFloat(e.target.value), parseFloat(localMaxPrice) - 1)
                setLocalMinPrice(newMin.toString())
                updateFilters({ minPrice: newMin.toString() })
              }}
              className="absolute w-full h-2 bg-transparent rounded-lg appearance-none cursor-pointer z-10 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-green-600 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-md [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-green-600 [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:shadow-md"
            />
            <input
              type="range"
              min="0"
              max="1000"
              step="1"
              value={localMaxPrice}
              onChange={(e) => {
                const newMax = Math.max(parseFloat(e.target.value), parseFloat(localMinPrice) + 1)
                setLocalMaxPrice(newMax.toString())
                updateFilters({ maxPrice: newMax.toString() })
              }}
              className="absolute w-full h-2 bg-transparent rounded-lg appearance-none cursor-pointer z-20 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-green-600 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-md [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-green-600 [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:shadow-md"
            />
            {/* Track background */}
            <div className="w-full h-2 bg-gray-200 rounded-lg"></div>
            {/* Active track */}
            <div
              className="absolute h-2 bg-green-500 rounded-lg"
              style={{
                left: `${(parseFloat(localMinPrice) / 1000) * 100}%`,
                right: `${100 - (parseFloat(localMaxPrice) / 1000) * 100}%`,
              }}
            ></div>
          </div>

          {/* Price Display */}
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span className="font-medium">{Math.round(parseFloat(localMinPrice))} lei.</span>
            <span className="text-gray-400">—</span>
            <span className="font-medium">{Math.round(parseFloat(localMaxPrice))} lei.</span>
          </div>
        </div>
      </div>

      {/* Categorii */}
      <div className="mb-5">
        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
          Categorie
        </h3>
        <ul className="space-y-1">
          {categories.map((cat) => (
            <li key={cat.id}>
              <button
                onClick={() => setCategory(cat.id)}
                className={`w-full text-left text-sm px-3 py-2 rounded-lg transition-colors ${
                  selectedCategory === cat.id
                    ? 'bg-green-100 text-green-700 font-semibold'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                {cat.name}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Subcategorii */}
      {subcategories.length > 0 && (
        <div>
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
            Subcategorie
          </h3>
          <ul className="space-y-1">
            {subcategories.map((sub) => (
              <li key={sub}>
                <button
                  onClick={() => setSubcategory(sub)}
                  className={`w-full text-left text-sm px-3 py-2 rounded-lg transition-colors ${
                    selectedSubcategory === sub
                      ? 'bg-green-100 text-green-700 font-semibold'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {sub}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
