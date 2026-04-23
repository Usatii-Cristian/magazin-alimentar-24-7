'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links = [
  { href: '/',                 label: 'Acasă' },
  { href: '/produse',          label: 'Produse' },
  { href: '/reduceri',         label: 'Reduceri' },
  { href: '/cele-mai-vandute', label: 'Cele mai vândute' },
  { href: '/blog',             label: 'Blog' },
  { href: '/contact',          label: 'Contact' },
]

function PhoneDropdown() {
  const [open, setOpen] = useState(false)

  const options = [
    {
      label: 'Sună direct',
      href: 'tel:+37369620052',
      bg: 'hover:bg-green-50',
      color: 'text-green-700',
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
        </svg>
      ),
    },
    {
      label: 'WhatsApp',
      href: 'https://wa.me/37369620052',
      bg: 'hover:bg-green-50',
      color: 'text-emerald-600',
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      ),
    },
    {
      label: 'Viber',
      href: 'viber://chat?number=%2B37369620052',
      bg: 'hover:bg-purple-50',
      color: 'text-purple-600',
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M11.398.002C9.76.028 5.958.344 3.67 2.437 1.806 4.296.983 7.001.9 10.34c-.083 3.34-.166 9.605 5.874 11.33h.005l-.005 2.598s-.038.985.612 1.184c.79.243 1.254-.508 2.008-1.322.414-.447.985-1.103 1.415-1.6 3.9.328 6.897-.42 7.235-.531.785-.255 5.228-.823 5.95-6.716.743-6.073-.361-9.906-2.928-11.631 0 0-1.836-1.307-5.367-1.505-.472-.027-.951-.151-1.441-.145zM11.47 2.16c.428-.004.858.1 1.285.125 3.137.172 4.728 1.306 4.728 1.306 2.15 1.462 3.092 4.778 2.447 10.049-.613 5.035-4.224 5.357-4.877 5.567-.278.09-2.977.737-6.306.528 0 0-2.5 3.015-3.28 3.797-.123.123-.267.172-.364.148-.136-.033-.174-.199-.172-.44l.022-3.773c-.003 0-.003 0 0 0-5.177-1.44-4.867-6.877-4.796-9.768.07-2.89.755-5.24 2.363-6.837C4.21 1.392 7.555.893 9.45.87l.022-.002c.464-.013.955.012 1.413-.086a.51.51 0 01.585.378zm.14 2.67c-.32-.006-.64.12-.875.346A1.175 1.175 0 0011 6.347c0 .648.527 1.175 1.175 1.175s1.175-.527 1.175-1.175c0-.329-.136-.626-.352-.841a1.178 1.178 0 00-.814-.334c-.19-.004-.38.01-.574-.12zm-4.08.69a1.15 1.15 0 00-1.15 1.15 1.15 1.15 0 001.15 1.15 1.15 1.15 0 001.15-1.15 1.15 1.15 0 00-1.15-1.15zm8.3 0a1.15 1.15 0 00-1.15 1.15 1.15 1.15 0 001.15 1.15 1.15 1.15 0 001.15-1.15 1.15 1.15 0 00-1.15-1.15z" />
        </svg>
      ),
    },
  ]

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        onBlur={() => setTimeout(() => setOpen(false), 150)}
        className="flex items-center gap-1.5 hover:text-white transition-colors"
      >
        <svg className="w-3 h-3 shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
        </svg>
        <span>+373 696 20 052</span>
        <svg
          className={`w-2.5 h-2.5 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
        </svg>
      </button>

      {open && (
        <div className="absolute top-full right-0 mt-1.5 w-44 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-50 overflow-hidden">
          {options.map((opt) => (
            <a
              key={opt.label}
              href={opt.href}
              target={opt.href.startsWith('http') ? '_blank' : undefined}
              rel={opt.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className={`flex items-center gap-3 px-4 py-2.5 text-sm font-medium ${opt.color} ${opt.bg} transition-colors`}
            >
              {opt.icon}
              {opt.label}
            </a>
          ))}
        </div>
      )}
    </div>
  )
}

function TopBar() {
  return (
    <div className="bg-green-900 text-green-200 text-xs hidden md:block">
      <div className="container mx-auto px-4 h-8 flex items-center justify-between gap-4">
        {/* Left: address */}
        <a
          href="https://maps.app.goo.gl/ZKoTE1CadBJSaN1C9"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 hover:text-white transition-colors truncate"
        >
          <svg className="w-3 h-3 shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
          </svg>
          <span>Vezi pe hartă</span>
        </a>

        {/* Right: phone dropdown + email */}
        <div className="flex items-center gap-5 shrink-0">
          <PhoneDropdown />

          <a
            href="mailto:usatiiarcadie@gmail.com"
            className="flex items-center gap-1.5 hover:text-white transition-colors"
          >
            <svg className="w-3 h-3 shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
            </svg>
            <span>usatiiarcadie@gmail.com</span>
          </a>
        </div>
      </div>
    </div>
  )
}

export default function Navbar({ megaMenuCategories = [] }) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [megaOpen, setMegaOpen] = useState(false)
  const megaTimerRef = useRef(null)
  const pathname = usePathname()

  const openMega = () => { clearTimeout(megaTimerRef.current); setMegaOpen(true) }
  const closeMega = () => { megaTimerRef.current = setTimeout(() => setMegaOpen(false), 150) }

  useEffect(() => {
    const onScroll = () => { setScrolled(window.scrollY > 10); setMegaOpen(false) }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mobile menu and mega menu on route change
  useEffect(() => { setOpen(false); setMegaOpen(false) }, [pathname])

  return (
    <header className="sticky top-0 z-50 relative">
      <TopBar />
      <nav
        className={`transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-md shadow-md text-gray-800'
            : 'bg-green-700 text-white shadow-sm'
        }`}
      >
      {/* Top bar */}
      <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">

        {/* Logo */}
        <Link
          href="/"
          className={`flex items-center gap-2 font-extrabold text-xl tracking-tight transition-colors ${
            scrolled ? 'text-green-700 hover:text-green-600' : 'text-white hover:text-green-100'
          }`}
        >
          <span>Crissval</span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-1">
          {links.map((l) => {
            const isActive = pathname === l.href
            const isProduse = l.href === '/produse'
            return (
              <li
                key={l.href}
                onMouseEnter={isProduse ? openMega : closeMega}
              >
                <Link
                  href={l.href}
                  className={`relative flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                    isActive || (isProduse && megaOpen)
                      ? scrolled
                        ? 'bg-green-100 text-green-700'
                        : 'bg-white/20 text-white'
                      : scrolled
                        ? 'text-gray-600 hover:bg-gray-100 hover:text-green-700'
                        : 'text-green-100 hover:bg-white/15 hover:text-white'
                  }`}
                >
                  {l.label}
                  {isProduse && (
                    <svg
                      className={`w-3 h-3 transition-transform duration-200 ${megaOpen ? 'rotate-180' : ''}`}
                      fill="currentColor" viewBox="0 0 20 20"
                    >
                      <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                    </svg>
                  )}
                  {isActive && !isProduse && (
                    <span
                      className={`absolute bottom-0.5 left-1/2 -translate-x-1/2 h-0.5 w-4 rounded-full ${
                        scrolled ? 'bg-green-600' : 'bg-white'
                      }`}
                    />
                  )}
                </Link>
              </li>
            )
          })}
        </ul>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(!open)}
          aria-label="Deschide meniu"
          className={`md:hidden w-9 h-9 flex flex-col items-center justify-center gap-1.5 rounded-lg transition-colors ${
            scrolled ? 'hover:bg-gray-100' : 'hover:bg-white/15'
          }`}
        >
          <span
            className={`block h-0.5 w-5 rounded-full transition-all duration-300 origin-center ${
              scrolled ? 'bg-gray-700' : 'bg-white'
            } ${open ? 'rotate-45 translate-y-2' : ''}`}
          />
          <span
            className={`block h-0.5 w-5 rounded-full transition-all duration-300 ${
              scrolled ? 'bg-gray-700' : 'bg-white'
            } ${open ? 'opacity-0 scale-x-0' : ''}`}
          />
          <span
            className={`block h-0.5 w-5 rounded-full transition-all duration-300 origin-center ${
              scrolled ? 'bg-gray-700' : 'bg-white'
            } ${open ? '-rotate-45 -translate-y-2' : ''}`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        } ${scrolled ? 'bg-white border-t border-gray-100' : 'bg-green-800 border-t border-green-600/50'}`}
      >
        <ul className="container mx-auto px-4 py-3 flex flex-col gap-0.5">
          {links.map((l) => {
            const isActive = pathname === l.href
            return (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    isActive
                      ? scrolled
                        ? 'bg-green-100 text-green-700'
                        : 'bg-white/20 text-white'
                      : scrolled
                        ? 'text-gray-700 hover:bg-gray-50'
                        : 'text-green-100 hover:bg-white/10'
                  }`}
                >
                  <span className="text-base w-5 text-center">{l.icon}</span>
                  {l.label}
                  {isActive && (
                    <span className="ml-auto w-1.5 h-1.5 rounded-full bg-green-500" />
                  )}
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </nav>

      {/* Mega menu panel */}
      {megaOpen && megaMenuCategories.length > 0 && (
        <div
          className="absolute top-full left-0 w-full bg-white shadow-2xl border-t-2 border-green-600 z-40 hidden md:block"
          onMouseEnter={openMega}
          onMouseLeave={closeMega}
        >
          <div className="container mx-auto px-4 py-8">
            <div
              className="grid gap-8"
              style={{ gridTemplateColumns: `repeat(${megaMenuCategories.length}, minmax(0, 1fr))` }}
            >
              {megaMenuCategories.map((cat) => {
                const bySub = cat.products.reduce((acc, p) => {
                  const key = p.subcategory || 'Altele'
                  if (!acc[key]) acc[key] = []
                  acc[key].push(p)
                  return acc
                }, {})
                return (
                  <div key={cat.id}>
                    <Link
                      href={`/produse?categorie=${encodeURIComponent(cat.name)}`}
                      onClick={() => setMegaOpen(false)}
                      className="block text-sm font-extrabold text-gray-900 uppercase tracking-wider pb-2 mb-3 border-b-2 border-green-500 hover:text-green-700 transition-colors"
                    >
                      {cat.name}
                    </Link>
                    {Object.entries(bySub).map(([sub, products]) => (
                      <div key={sub} className="mb-4">
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">
                          {sub}
                        </p>
                        {products.map((p) => (
                          <Link
                            key={p.id}
                            href={`/produs/${p.slug}`}
                            onClick={() => setMegaOpen(false)}
                            className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-green-700 py-0.5 truncate transition-colors group/item"
                          >
                            <span className="w-1 h-1 rounded-full bg-gray-300 group-hover/item:bg-green-500 shrink-0 transition-colors" />
                            {p.name}
                          </Link>
                        ))}
                      </div>
                    ))}
                  </div>
                )
              })}
            </div>

            <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
              <p className="text-xs text-gray-400">Produse proaspete și naturale, direct de la producători locali</p>
              <Link
                href="/produse"
                onClick={() => setMegaOpen(false)}
                className="text-sm font-bold text-green-700 hover:text-green-600 flex items-center gap-1 transition-colors"
              >
                Toate produsele
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
