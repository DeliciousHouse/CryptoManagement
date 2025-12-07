import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Planner3D } from '@/components/site-planner/Planner3D'
import { MiningProfitability } from '@/components/calculators/MiningProfitability'
import { SiteCapacity } from '@/components/calculators/SiteCapacity'
import { prisma } from '@/lib/db/prisma'
import { deserializeScenario } from '@/lib/utils/scenario'

interface PageProps {
  params: { id: string }
}

export default async function ScenarioPage({ params }: PageProps) {
  const scenario = await prisma.scenario.findUnique({
    where: { id: params.id },
  })

  if (!scenario) {
    notFound()
  }

  const deserialized = deserializeScenario(scenario)

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-8">
          <Link href="/site-planner">
            <Button variant="outline" size="sm" className="mb-4">
              ← Back to Planner
            </Button>
          </Link>
          <h1 className="text-4xl font-bold mb-2">
            {deserialized.name || 'Unnamed Scenario'}
          </h1>
          <p className="text-gray-400">
            Created: {new Date(deserialized.createdAt!).toLocaleString()}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* 3D Preview */}
          <Card>
            <h2 className="text-2xl font-semibold mb-4">3D Site Layout</h2>
            <div className="h-96 bg-surface rounded-lg overflow-hidden">
              <Planner3D inputs={deserialized.plannerData} />
            </div>
          </Card>

          {/* Calculator Results */}
          <div className="space-y-6">
            <Card>
              <h2 className="text-2xl font-semibold mb-4">Calculator Data</h2>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Hashrate:</span>
                  <span>{deserialized.calculatorData.hashrate} TH/s</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Power:</span>
                  <span>{deserialized.calculatorData.powerConsumption} kW</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Energy Cost:</span>
                  <span>${deserialized.calculatorData.energyCost}/kWh</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">BTC Price:</span>
                  <span>${deserialized.calculatorData.btcPrice.toLocaleString()}</span>
                </div>
              </div>
            </Card>

            <Card>
              <h2 className="text-2xl font-semibold mb-4">Planner Data</h2>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Containers:</span>
                  <span>{deserialized.plannerData.containerCount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Generators:</span>
                  <span>{deserialized.plannerData.generatorCount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Site Size:</span>
                  <span>
                    {deserialized.plannerData.siteDimensions.width}m ×{' '}
                    {deserialized.plannerData.siteDimensions.length}m
                  </span>
                </div>
              </div>
            </Card>
          </div>
        </div>

        <div className="flex gap-4">
          <Link href="/site-planner">
            <Button variant="primary">Edit in Planner</Button>
          </Link>
          <Link href="/calculators">
            <Button variant="outline">View in Calculators</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

