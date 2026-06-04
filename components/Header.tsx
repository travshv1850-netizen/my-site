import Link from 'next/link'

const navLinks = [
  { href: '/blog', label: 'Blog' },
  { href: '/works', label: 'Works' },
  { href: '/about', label: 'About' },
]

export default function Header() {
  return (
    <header className="border-b border-gray-100">
      <div className="max-w-2xl mx-auto px-6 py-5 flex items-center justify-between">
        <Link href="/" className="text-sm font-medium tracking-wide text-gray-900 hover:text-gray-600 transition-colors">
          shu.dev
        </Link>
        <nav className="flex items-center gap-7">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}
