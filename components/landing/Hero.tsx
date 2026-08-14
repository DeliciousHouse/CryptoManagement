'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/Button'

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-accent-mining/10 via-transparent to-transparent" />
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center animate-fade-in">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-accent-mining to-accent-btc bg-clip-text text-transparent">
          Modular Bitcoin Mining Solutions
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto">
          Plan, design, and optimize your mining infrastructure with advanced
          tools and 3D visualization
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/site-planner">
            <Button size="lg" variant="primary">
              Plan your site
            </Button>
          </Link>
          <Link href="/calculators">
            <Button size="lg" variant="outline">
              Estimate profitability
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

