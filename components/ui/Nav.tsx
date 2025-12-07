'use client'

import { useState } from 'react'
import Link from 'next/link'

export function Nav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-surface/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-xl md:text-2xl font-bold text-accent-mining">
            Mining Planner
          </Link>
          <div className="hidden md:flex items-center space-x-6">
            <Link
              href="/calculators"
              className="text-foreground hover:text-accent-mining transition-colors"
            >
              Calculators
            </Link>
            <Link
              href="/site-planner"
              className="text-foreground hover:text-accent-mining transition-colors"
            >
              Site Planner
            </Link>
            <Link
              href="/"
              className="text-foreground hover:text-accent-mining transition-colors"
            >
              Home
            </Link>
          </div>
          <button
            className="md:hidden text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 space-y-3 pb-4">
            <Link
              href="/calculators"
              className="block text-foreground hover:text-accent-mining transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Calculators
            </Link>
            <Link
              href="/site-planner"
              className="block text-foreground hover:text-accent-mining transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Site Planner
            </Link>
            <Link
              href="/"
              className="block text-foreground hover:text-accent-mining transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}

