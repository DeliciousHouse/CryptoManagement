'use client'

import { useState, useMemo } from 'react'
import { Input } from '@/components/ui/Input'
import { Card } from '@/components/ui/Card'
import { calculateSiteCapacity } from '@/lib/calculations/capacity'
import { CapacityInputs } from '@/lib/types'

export function SiteCapacity() {
  const [inputs, setInputs] = useState<CapacityInputs>({
    containerCount: 10,
    minersPerContainer: 100,
    powerPerMiner: 3.25, // kW (typical for modern ASIC)
    sitePowerCapacity: 5000, // kW
    hashratePerMiner: 0.1, // TH/s
  })

  const results = useMemo(() => calculateSiteCapacity(inputs), [inputs])

  const formatNumber = (value: number, decimals = 2) => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(value)
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <h2 className="text-3xl font-bold mb-8">Site Capacity Calculator</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Inputs */}
        <div className="space-y-6">
          <Card>
            <h3 className="text-xl font-semibold mb-6">Input Parameters</h3>
            <div className="space-y-4">
              <Input
                label="Container Count"
                type="number"
                value={inputs.containerCount}
                onChange={(e) =>
                  setInputs({
                    ...inputs,
                    containerCount: parseInt(e.target.value) || 0,
                  })
                }
              />
              <Input
                label="Miners per Container"
                type="number"
                value={inputs.minersPerContainer}
                onChange={(e) =>
                  setInputs({
                    ...inputs,
                    minersPerContainer: parseInt(e.target.value) || 0,
                  })
                }
              />
              <Input
                label="Power per Miner (kW)"
                type="number"
                step="0.01"
                value={inputs.powerPerMiner}
                onChange={(e) =>
                  setInputs({
                    ...inputs,
                    powerPerMiner: parseFloat(e.target.value) || 0,
                  })
                }
              />
              <Input
                label="Site Power Capacity (kW)"
                type="number"
                value={inputs.sitePowerCapacity}
                onChange={(e) =>
                  setInputs({
                    ...inputs,
                    sitePowerCapacity: parseFloat(e.target.value) || 0,
                  })
                }
              />
              <Input
                label="Hashrate per Miner (TH/s)"
                type="number"
                step="0.01"
                value={inputs.hashratePerMiner}
                onChange={(e) =>
                  setInputs({
                    ...inputs,
                    hashratePerMiner: parseFloat(e.target.value) || 0,
                  })
                }
              />
            </div>
          </Card>
        </div>

        {/* Results */}
        <div className="space-y-6">
          <Card>
            <h3 className="text-xl font-semibold mb-6 text-accent-power">
              Capacity Results
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-400">Total Hashrate:</span>
                <span className="font-semibold text-lg">
                  {formatNumber(results.totalHashrate)} TH/s
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Total Power Draw:</span>
                <span className="font-semibold text-lg">
                  {formatNumber(results.totalPowerDraw)} kW
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Power Utilization:</span>
                <span
                  className={`font-semibold text-lg ${
                    results.utilizationPercent > 90
                      ? 'text-red-400'
                      : results.utilizationPercent > 70
                      ? 'text-yellow-400'
                      : 'text-green-400'
                  }`}
                >
                  {formatNumber(results.utilizationPercent)}%
                </span>
              </div>
              <div className="pt-4 border-t border-border">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-400">Max Containers Possible:</span>
                  <span className="font-semibold text-lg">
                    {results.maxContainersPossible}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Remaining Capacity:</span>
                  <span
                    className={`font-semibold text-lg ${
                      results.remainingCapacity < 0 ? 'text-red-400' : 'text-green-400'
                    }`}
                  >
                    {formatNumber(results.remainingCapacity)} kW
                  </span>
                </div>
              </div>
            </div>
          </Card>

          <Card>
            <h3 className="text-xl font-semibold mb-4 text-accent-power">
              Power Utilization
            </h3>
            <div className="w-full bg-surface rounded-full h-4 mb-2">
              <div
                className={`h-4 rounded-full transition-all duration-300 ${
                  results.utilizationPercent > 90
                    ? 'bg-red-500'
                    : results.utilizationPercent > 70
                    ? 'bg-yellow-500'
                    : 'bg-green-500'
                }`}
                style={{ width: `${Math.min(results.utilizationPercent, 100)}%` }}
              />
            </div>
            <p className="text-sm text-gray-400">
              {results.utilizationPercent > 100
                ? 'Warning: Power capacity exceeded!'
                : results.utilizationPercent > 90
                ? 'High utilization - consider expanding capacity'
                : 'Optimal power utilization'}
            </p>
          </Card>
        </div>
      </div>
    </div>
  )
}

