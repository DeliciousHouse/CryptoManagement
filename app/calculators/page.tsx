import { Tabs } from '@/components/ui/Tabs'
import { MiningProfitability } from '@/components/calculators/MiningProfitability'
import { SiteCapacity } from '@/components/calculators/SiteCapacity'

export default function CalculatorsPage() {
  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="max-w-7xl mx-auto">
        <div className="px-6 mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Mining Calculators</h1>
          <p className="text-xl text-gray-400">
            Calculate profitability and plan your site capacity
          </p>
        </div>
        <Tabs
          tabs={[
            {
              id: 'profitability',
              label: 'Profitability Calculator',
              content: <MiningProfitability />,
            },
            {
              id: 'capacity',
              label: 'Site Capacity Calculator',
              content: <SiteCapacity />,
            },
          ]}
        />
      </div>
    </div>
  )
}

