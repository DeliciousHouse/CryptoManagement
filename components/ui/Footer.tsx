import Link from 'next/link'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-border bg-surface/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <div className="text-xl font-bold text-accent-mining mb-3">Mining Planner</div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Plan, design, and optimize Bitcoin mining infrastructure with calculators and 3D site
              visualization.
            </p>
          </div>

          <div>
            <div className="text-sm font-semibold text-foreground mb-3">Sitemap</div>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/"
                  className="text-gray-400 hover:text-accent-mining transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/calculators"
                  className="text-gray-400 hover:text-accent-mining transition-colors"
                >
                  Calculators
                </Link>
              </li>
              <li>
                <Link
                  href="/site-planner"
                  className="text-gray-400 hover:text-accent-mining transition-colors"
                >
                  Site Planner
                </Link>
              </li>
              <li>
                <Link
                  href="/scenarios/compare"
                  className="text-gray-400 hover:text-accent-mining transition-colors"
                >
                  Scenario Compare
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <div className="text-sm font-semibold text-foreground mb-3">Legal</div>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/terms-of-use"
                  className="text-gray-400 hover:text-accent-mining transition-colors"
                >
                  Terms of Use
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy-policy"
                  className="text-gray-400 hover:text-accent-mining transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/cookie-policy"
                  className="text-gray-400 hover:text-accent-mining transition-colors"
                >
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/disclaimer"
                  className="text-gray-400 hover:text-accent-mining transition-colors"
                >
                  Disclaimer
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <div className="text-sm font-semibold text-foreground mb-3">Contact</div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Questions or support? Use the contact form on the homepage.
            </p>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
          <div className="text-xs text-gray-500">
            © {year} Mining Planner. All rights reserved.
          </div>
          <div className="text-xs text-gray-500">
            This site is provided for informational purposes only and does not constitute financial
            advice.
          </div>
        </div>
      </div>
    </footer>
  )
}


