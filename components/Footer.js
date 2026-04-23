import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-green-900 text-green-100 mt-auto">
      <div className="container mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h2 className="text-xl font-bold text-white mb-3">Crissval</h2>
          <p className="text-sm text-green-300 leading-relaxed">
            Magazin alimentar cu produse proaspete, naturale și de calitate,
            aduse direct de la producători locali.
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-white mb-4">Navigare rapidă</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/produse" className="text-green-300 hover:text-white transition-colors">
                Toate produsele
              </Link>
            </li>
            <li>
              <Link href="/reduceri" className="text-green-300 hover:text-white transition-colors">
                Reduceri
              </Link>
            </li>
            <li>
              <Link href="/cele-mai-vandute" className="text-green-300 hover:text-white transition-colors">
                Cele mai vândute
              </Link>
            </li>
            <li>
              <Link href="/blog" className="text-green-300 hover:text-white transition-colors">
                Blog
              </Link>
            </li>
            <li>
              <Link href="/contact" className="text-green-300 hover:text-white transition-colors">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-white mb-4">Contact</h3>
          <ul className="space-y-2 text-sm text-green-300">
            <li>
              <a
                href="https://maps.app.goo.gl/ZKoTE1CadBJSaN1C9"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                Vezi locația pe hartă
              </a>
            </li>
            <li>
              <a href="tel:+37369620052" className="hover:text-white transition-colors">
                +373 696 20 052
              </a>
            </li>
            <li>
              <a href="mailto:usatiiarcadie@gmail.com" className="hover:text-white transition-colors">
                usatiiarcadie@gmail.com
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-green-700 py-4 text-center text-xs text-green-400">
        © {new Date().getFullYear()} Crissval. Toate drepturile rezervate.
      </div>
    </footer>
  )
}
