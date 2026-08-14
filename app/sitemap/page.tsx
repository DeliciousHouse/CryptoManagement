import Link from 'next/link'

const links: Array<{ href: string; label: string; description?: string }> = [
  { href: '/', label: 'Home' },
  { href: '/calculators', label: 'Calculators' },
  { href: '/site-planner', label: 'Site Planner' },
  { href: '/scenarios/compare', label: 'Scenario Compare' },
  { href: '/terms-of-use', label: 'Terms of Use' },
  { href: '/privacy-policy', label: 'Privacy Policy' },
  { href: '/cookie-policy', label: 'Cookie Policy' },
  { href: '/disclaimer', label: 'Disclaimer' },
  { href: '/accessibility', label: 'Accessibility Statement' },
  { href: '/data-deletion', label: 'Data Deletion' },
]

export default function SitemapPage() {
  return (
    <main className="min-h-screen pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-4xl font-bold mb-6">Sitemap</h1>
        <p className="text-gray-300 mb-10">
          A quick index of the main pages on this site.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="border border-border rounded-lg bg-surface hover:bg-surface-elevated transition-colors p-4"
            >
              <div className="font-semibold text-foreground">{l.label}</div>
              <div className="text-sm text-gray-400">{l.href}</div>
              {l.description ? (
                <div className="text-sm text-gray-400 mt-2">{l.description}</div>
              ) : null}
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}

