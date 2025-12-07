'use client'

import { useState, useMemo } from 'react'
import { Input } from '@/components/ui/Input'
import { Card } from '@/components/ui/Card'
import { calculateMiningProfit } from '@/lib/calculations/profitability'
import { CalculatorInputs } from '@/lib/types'

export function MiningProfitability() {
  const [inputs, setInputs] = useState<CalculatorInputs>({
    hashrate: 100, // TH/s
    powerConsumption: 3000, // kW
    energyCost: 0.05, // $/kWh
    btcPrice: 60000, // USD
    poolFee: 1, // %
  })

  const results = useMemo(() => calculateMiningProfit(inputs), [inputs])

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <h2 className="text-3xl font-bold mb-8">Mining Profitability Calculator</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Inputs */}
        <div className="space-y-6">
          <Card>
            <h3 className="text-xl font-semibold mb-6">Input Parameters</h3>
            <div className="space-y-4">
              <Input
                label="Hashrate (TH/s)"
                type="number"
                value={inputs.hashrate}
                onChange={(e) =>
                  setInputs({ ...inputs, hashrate: parseFloat(e.target.value) || 0 })
                }
              />
              <Input
                label="Power Consumption (kW)"
                type="number"
                value={inputs.powerConsumption}
                onChange={(e) =>
                  setInputs({
                    ...inputs,
                    powerConsumption: parseFloat(e.target.value) || 0,
                  })
                }
              />
              <Input
                label="Energy Cost ($/kWh)"
                type="number"
                step="0.001"
                value={inputs.energyCost}
                onChange={(e) =>
                  setInputs({
                    ...inputs,
                    energyCost: parseFloat(e.target.value) || 0,
                  })
                }
              />
              <Input
                label="Bitcoin Price (USD)"
                type="number"
                value={inputs.btcPrice}
                onChange={(e) =>
                  setInputs({
                    ...inputs,
                    btcPrice: parseFloat(e.target.value) || 0,
                  })
                }
              />
              <Input
                label="Pool Fee (%)"
                type="number"
                step="0.1"
                value={inputs.poolFee}
                onChange={(e) =>
                  setInputs({
                    ...inputs,
                    poolFee: parseFloat(e.target.value) || 0,
                  })
                }
              />
            </div>
          </Card>
        </div>

        {/* Results */}
        <div className="space-y-6">
          <Card>
            <h3 className="text-xl font-semibold mb-6 text-accent-mining">
              Daily Results
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-400">Revenue:</span>
                <span className="font-semibold text-lg">
                  {formatCurrency(results.dailyRevenue)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Cost:</span>
                <span className="font-semibold text-lg">
                  {formatCurrency(results.dailyCost)}
                </span>
              </div>
              <div className="flex justify-between pt-4 border-t border-border">
                <span className="text-gray-400">Profit:</span>
                <span
                  className={`font-bold text-xl ${
                    results.dailyProfit >= 0 ? 'text-green-400' : 'text-red-400'
                  }`}
                >
                  {formatCurrency(results.dailyProfit)}
                </span>
              </div>
            </div>
          </Card>

          <Card>
            <h3 className="text-xl font-semibold mb-6 text-accent-mining">
              Monthly Results
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-400">Revenue:</span>
                <span className="font-semibold text-lg">
                  {formatCurrency(results.monthlyRevenue)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Cost:</span>
                <span className="font-semibold text-lg">
                  {formatCurrency(results.monthlyCost)}
                </span>
              </div>
              <div className="flex justify-between pt-4 border-t border-border">
                <span className="text-gray-400">Profit:</span>
                <span
                  className={`font-bold text-xl ${
                    results.monthlyProfit >= 0 ? 'text-green-400' : 'text-red-400'
                  }`}
                >
                  {formatCurrency(results.monthlyProfit)}
                </span>
              </div>
            </div>
          </Card>

          <Card>
            <h3 className="text-xl font-semibold mb-6 text-accent-mining">
              Yearly Results
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-400">Revenue:</span>
                <span className="font-semibold text-lg">
                  {formatCurrency(results.yearlyRevenue)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Cost:</span>
                <span className="font-semibold text-lg">
                  {formatCurrency(results.yearlyCost)}
                </span>
              </div>
              <div className="flex justify-between pt-4 border-t border-border">
                <span className="text-gray-400">Profit:</span>
                <span
                  className={`font-bold text-xl ${
                    results.yearlyProfit >= 0 ? 'text-green-400' : 'text-red-400'
                  }`}
                >
                  {formatCurrency(results.yearlyProfit)}
                </span>
              </div>
              <div className="flex justify-between pt-4 border-t border-border">
                <span className="text-gray-400">ROI:</span>
                <span
                  className={`font-bold text-xl ${
                    results.roi >= 0 ? 'text-green-400' : 'text-red-400'
                  }`}
                >
                  {results.roi.toFixed(2)}%
                </span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

