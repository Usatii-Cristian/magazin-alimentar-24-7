'use client'

import { useState } from 'react'

const options = [
  {
    label: 'Sună-ne',
    href: 'tel:+37369620052',
    bg: 'bg-green-500 hover:bg-green-400',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
      </svg>
    ),
  },
  {
    label: 'WhatsApp',
    href: 'https://wa.me/37369620052',
    bg: 'bg-[#25D366] hover:bg-[#20bd5a]',
    external: true,
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    ),
  },
  {
    label: 'Viber',
    href: 'viber://chat?number=%2B37369620052',
    bg: 'bg-[#7360F2] hover:bg-[#5f4fd4]',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M11.4 0C8.95.025 5.05.344 2.68 2.506.75 4.434-.097 7.254-.188 10.76c-.09 3.5-.177 10.065 6.18 11.9v2.726s-.04 1.032.641 1.24c.83.255 1.315-.533 2.107-1.386.434-.47 1.033-1.157 1.485-1.68 4.09.344 7.238-.44 7.594-.557.822-.268 5.481-.863 6.247-7.038C24.867 9.597 23.84 5.53 21.17 3.66c0 0-1.927-1.37-5.637-1.578-.497-.028-.999-.158-1.513-.152zm5.59 14.92c-.12-1.896-1.127-2.832-2.98-2.954a.286.286 0 0 0-.31.27l-.02.265a.294.294 0 0 0 .252.3c1.514.14 2.258.876 2.362 2.328a.3.3 0 0 0 .315.274l.268-.02a.295.295 0 0 0 .266-.31zm-5.697-1.03a.298.298 0 0 0-.356-.222l-.26.06a.297.297 0 0 0-.22.358c.404 1.762.44 2.86.104 4.063a.298.298 0 0 0 .204.367l.264.073a.298.298 0 0 0 .368-.21c.375-1.32.337-2.534-.104-4.49zm3.83 2.8a.27.27 0 0 0-.374.09l-.432.693a.268.268 0 0 1-.358.085 8.63 8.63 0 0 1-1.7-1.3 8.634 8.634 0 0 1-1.222-1.753.268.268 0 0 1 .083-.353l.663-.44a.27.27 0 0 0 .09-.373l-.94-1.442a.27.27 0 0 0-.374-.082c-.384.25-.724.575-.975.978-.242.39-.358.822-.35 1.258.02 1.055.584 2.152 1.538 3.204 1.007 1.11 2.1 1.748 3.16 1.845.44.04.87-.065 1.248-.305.388-.247.693-.587.93-.966a.27.27 0 0 0-.082-.38z" />
      </svg>
    ),
  },
  {
    label: 'Telegram',
    href: 'https://t.me/crissval',
    bg: 'bg-[#2AABEE] hover:bg-[#1a9ad9]',
    external: true,
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
      </svg>
    ),
  },
]

export default function FloatingContact() {
  const [open, setOpen] = useState(false)

  return (
    <div className="fixed bottom-6 right-5 z-50 flex flex-col items-end gap-3">
      {/* Options — slide up when open */}
      <div
        className={`flex flex-col items-end gap-2.5 transition-all duration-300 ${
          open ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
      >
        {options.map((opt) => (
          <a
            key={opt.label}
            href={opt.href}
            target={opt.external ? '_blank' : undefined}
            rel={opt.external ? 'noopener noreferrer' : undefined}
            className="flex items-center gap-2.5 group"
            onClick={() => setOpen(false)}
          >
            <span className="bg-white text-gray-700 text-xs font-semibold px-3 py-1.5 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              {opt.label}
            </span>
            <span className={`w-12 h-12 rounded-full text-white flex items-center justify-center shadow-lg transition-transform duration-200 group-hover:scale-110 ${opt.bg}`}>
              {opt.icon}
            </span>
          </a>
        ))}
      </div>

      {/* Main button */}
      <button
        onClick={() => setOpen(!open)}
        aria-label={open ? 'Închide' : 'Contactează-ne'}
        className={`flex items-center bg-gray-900 hover:bg-gray-800 text-white rounded-full shadow-xl transition-all duration-200 hover:shadow-2xl active:scale-95 ${open ? 'w-12 h-12 justify-center' : 'gap-2.5 pl-4 pr-3 h-12'}`}
      >
        {!open && (
          <span className="text-sm font-semibold whitespace-nowrap">
            Contactează-ne
          </span>
        )}
        <span className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${open ? 'bg-white/20' : 'bg-white/10'}`}>
          {open ? (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          )}
        </span>
      </button>
    </div>
  )
}
