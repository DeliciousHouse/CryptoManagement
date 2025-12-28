'use client'

import { useState, useMemo } from 'react'
import { Input } from '@/components/ui/Input'
import { Card } from '@/components/ui/Card'
import { calculateMiningProfit } from '@/lib/calculations/profitability'
import { CalculatorInputs } from '@/lib/types'
import { buildRewardForecasts } from '@/lib/utils/rewardForecasts'

export function MiningProfitability() {
  const [inputs, setInputs] = useState<CalculatorInputs>({
    hashrate: 390, // TH/s
    powerConsumption: 7.215, // kW
    energyCost: 0.05, // $/kWh
    btcPrice: 91556.33, // USD
    poolFee: 1, // %
    networkDifficulty: 149301205959700.0,
    blockRewardBtc: 3.13,
    hardwareCostUsd: 13699.0,
  })

  const results = useMemo(() => calculateMiningProfit(inputs), [inputs])
  const rewardForecasts = useMemo(
    () => buildRewardForecasts(results, inputs),
    [results, inputs]
  )

  const formatUsd = (value: number) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value)

  const formatNumber2 = (value: number) =>
    new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value)

  const formatBtc = (value: number) => value.toFixed(8)

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
                step="0.01"
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
              <Input
                label="Network Difficulty"
                type="number"
                step="0.01"
                value={inputs.networkDifficulty ?? ''}
                onChange={(e) =>
                  setInputs({
                    ...inputs,
                    networkDifficulty:
                      e.target.value === '' ? undefined : parseFloat(e.target.value) || 0,
                  })
                }
              />
              <Input
                label="Block Reward (BTC)"
                type="number"
                step="0.01"
                value={inputs.blockRewardBtc ?? ''}
                onChange={(e) =>
                  setInputs({
                    ...inputs,
                    blockRewardBtc:
                      e.target.value === '' ? undefined : parseFloat(e.target.value) || 0,
                  })
                }
              />
              <Input
                label="Hardware Cost (USD)"
                type="number"
                step="0.01"
                value={inputs.hardwareCostUsd ?? ''}
                onChange={(e) =>
                  setInputs({
                    ...inputs,
                    hardwareCostUsd:
                      e.target.value === '' ? undefined : parseFloat(e.target.value) || 0,
                  })
                }
              />
            </div>
          </Card>
        </div>

        {/* Results */}
        <div className="space-y-6">
          <h2 className="text-2xl md:text-3xl font-bold text-center">
            Bitcoin Mining Reward Forecasts
          </h2>

          <Card className="p-0 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="min-w-[860px] w-full">
                <thead className="bg-surface border-b border-border">
                  <tr>
                    <th className="text-left px-4 py-3 text-sm font-semibold text-foreground">
                      Time Frame
                    </th>
                    <th className="text-right px-4 py-3 text-sm font-semibold text-foreground">
                      BTC Reward
                    </th>
                    <th className="text-right px-4 py-3 text-sm font-semibold text-foreground">
                      Revenue USD*
                    </th>
                    <th className="text-right px-4 py-3 text-sm font-semibold text-foreground">
                      Power Cost (in USD)
                    </th>
                    <th className="text-right px-4 py-3 text-sm font-semibold text-foreground">
                      Pool Fees (in USD)
                    </th>
                    <th className="text-right px-4 py-3 text-sm font-semibold text-foreground">
                      Profit (in USD)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {rewardForecasts.map((row) => (
                    <tr key={row.timeFrame} className="border-b border-border last:border-0">
                      <td className="px-4 py-3 text-sm text-foreground font-medium">
                        {row.timeFrame}
                      </td>
                      <td className="px-4 py-3 text-sm text-foreground text-right tabular-nums">
                        {formatBtc(row.btcReward)}
                      </td>
                      <td className="px-4 py-3 text-sm text-foreground text-right tabular-nums">
                        {formatUsd(row.revenueUsd)}
                      </td>
                      <td className="px-4 py-3 text-sm text-foreground text-right tabular-nums">
                        {formatUsd(row.powerCostUsd)}
                      </td>
                      <td className="px-4 py-3 text-sm text-foreground text-right tabular-nums">
                        {formatUsd(row.poolFeesUsd)}
                      </td>
                      <td className="px-4 py-3 text-sm text-foreground text-right tabular-nums font-semibold">
                        {formatUsd(row.profitUsd)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="px-4 pb-4 pt-3 border-t border-border">
              <div className="text-xs text-gray-400">
                * Bitcoin Price at $
                {inputs.btcPrice.toLocaleString('en-US', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}{' '}
                USD
              </div>
              <div className="text-xs text-gray-500 mt-2 leading-relaxed">
                Disclaimer: The estimated mining rewards are based on a statistical calculation using the values entered and do not account for difficulty and/or exchange rate fluctuations, stale/reject/orphan rates, and/or a pool’s mining luck.
              </div>
            </div>
          </Card>

          <h2 className="text-2xl md:text-3xl font-bold text-center">
            Bitcoin Mining Calculator Inputs
          </h2>

          <Card className="p-0 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="min-w-[720px] w-full">
                <thead className="bg-surface border-b border-border">
                  <tr>
                    <th className="text-left px-4 py-3 text-sm font-semibold text-foreground">
                      Bitcoin Mining Difficulty
                    </th>
                    <th className="text-left px-4 py-3 text-sm font-semibold text-foreground">
                      Bitcoin Block Reward
                    </th>
                    <th className="text-left px-4 py-3 text-sm font-semibold text-foreground">
                      Bitcoin Price
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border">
                    <td className="px-4 py-3 text-sm text-foreground tabular-nums">
                      {formatNumber2(inputs.networkDifficulty ?? 0)}
                    </td>
                    <td className="px-4 py-3 text-sm text-foreground tabular-nums">
                      {formatNumber2(inputs.blockRewardBtc ?? 0)} BTC
                    </td>
                    <td className="px-4 py-3 text-sm text-foreground tabular-nums">
                      {formatUsd(inputs.btcPrice)} (BTC to USD)
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="overflow-x-auto border-t border-border">
              <table className="min-w-[920px] w-full">
                <thead className="bg-surface border-b border-border">
                  <tr>
                    <th className="text-left px-4 py-3 text-sm font-semibold text-foreground">
                      Bitcoin Mining Hashrate
                    </th>
                    <th className="text-left px-4 py-3 text-sm font-semibold text-foreground">
                      Bitcoin Mining Hardware Watts
                    </th>
                    <th className="text-left px-4 py-3 text-sm font-semibold text-foreground">
                      Bitcoin Mining Hardware Cost
                    </th>
                    <th className="text-left px-4 py-3 text-sm font-semibold text-foreground">
                      Electricity Costs
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="px-4 py-3 text-sm text-foreground tabular-nums">
                      {formatNumber2(inputs.hashrate)} TH/s
                    </td>
                    <td className="px-4 py-3 text-sm text-foreground tabular-nums">
                      {new Intl.NumberFormat('en-US').format(
                        Math.round((inputs.powerConsumption || 0) * 1000)
                      )}{' '}
                      Watts
                    </td>
                    <td className="px-4 py-3 text-sm text-foreground tabular-nums">
                      {formatUsd(inputs.hardwareCostUsd ?? 0)}
                    </td>
                    <td className="px-4 py-3 text-sm text-foreground tabular-nums">
                      {formatUsd(inputs.energyCost)} per kWh
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Card>

          <Card>
            <h3 className="text-xl font-semibold mb-6 text-accent-mining">
              Daily Results
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-400">Revenue:</span>
                <span className="font-semibold text-lg">
                  {formatUsd(results.dailyRevenue)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Cost:</span>
                <span className="font-semibold text-lg">
                  {formatUsd(results.dailyCost)}
                </span>
              </div>
              <div className="flex justify-between pt-4 border-t border-border">
                <span className="text-gray-400">Profit:</span>
                <span
                  className={`font-bold text-xl ${
                    results.dailyProfit >= 0 ? 'text-green-400' : 'text-red-400'
                  }`}
                >
                  {formatUsd(results.dailyProfit)}
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
                  {formatUsd(results.monthlyRevenue)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Cost:</span>
                <span className="font-semibold text-lg">
                  {formatUsd(results.monthlyCost)}
                </span>
              </div>
              <div className="flex justify-between pt-4 border-t border-border">
                <span className="text-gray-400">Profit:</span>
                <span
                  className={`font-bold text-xl ${
                    results.monthlyProfit >= 0 ? 'text-green-400' : 'text-red-400'
                  }`}
                >
                  {formatUsd(results.monthlyProfit)}
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
                  {formatUsd(results.yearlyRevenue)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Cost:</span>
                <span className="font-semibold text-lg">
                  {formatUsd(results.yearlyCost)}
                </span>
              </div>
              <div className="flex justify-between pt-4 border-t border-border">
                <span className="text-gray-400">Profit:</span>
                <span
                  className={`font-bold text-xl ${
                    results.yearlyProfit >= 0 ? 'text-green-400' : 'text-red-400'
                  }`}
                >
                  {formatUsd(results.yearlyProfit)}
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
