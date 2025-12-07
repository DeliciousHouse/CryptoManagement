import Link from 'next/link'
import { Card } from '@/components/ui/Card'

const tools = [
  {
    title: 'Profitability Tools',
    description:
      'Calculate mining revenue, costs, and ROI with real-time market data.',
    link: '/calculators',
    icon: '💰',
  },
  {
    title: 'Site Capacity Planner',
    description:
      'Determine optimal container count and power requirements for your site.',
    link: '/calculators',
    icon: '⚡',
  },
  {
    title: '3D Layout Preview',
    description:
      'Visualize your mining site in 3D and optimize container placement.',
    link: '/site-planner',
    icon: '🏗️',
  },
]

export function OverviewCards() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
          Powerful Planning Tools
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tools.map((tool, index) => (
            <Link key={index} href={tool.link}>
              <Card hover className="h-full cursor-pointer">
                <div className="text-4xl mb-4">{tool.icon}</div>
                <h3 className="text-xl font-semibold mb-3">{tool.title}</h3>
                <p className="text-gray-400">{tool.description}</p>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

