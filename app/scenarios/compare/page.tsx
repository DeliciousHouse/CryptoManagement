'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { MiningScenario, ScenarioMetadata } from '@/lib/types'
import { calculateMiningProfit } from '@/lib/calculations/profitability'

interface ScenarioWithMetrics {
  scenario: MiningScenario
  monthlyRevenue: number
  monthlyCost: number
  monthlyProfit: number
  yearlyRoi: number
  paybackMonths: number | null
  totalHashrate: number
  totalPowerDraw: number
  powerUtilization: number
}

const formatNumber = (value: number, decimals = 2) =>
  new Intl.NumberFormat('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value)

const formatCurrency = (value: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value)

const formatPercent = (value: number) => `${formatNumber(value, 1)}%`

export default function ScenarioComparePage() {
  const [scenarios, setScenarios] = useState<ScenarioMetadata[]>([])
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [scenarioDetails, setScenarioDetails] = useState<Record<string, MiningScenario>>({})
  const scenarioDetailsRef = useRef<Record<string, MiningScenario>>({})
  const [loadingList, setLoadingList] = useState(true)
  const [loadingSelection, setLoadingSelection] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const loadScenarioList = () => {
    fetch('/api/scenarios')
      .then(async (res) => {
        if (!res.ok) {
          throw new Error(`Failed to load scenarios: ${res.status} ${res.statusText}`)
        }
        const data = await res.json()
        if (!Array.isArray(data)) {
          throw new Error('Invalid scenarios response format')
        }
        return data as ScenarioMetadata[]
      })
      .then((data) => {
        setScenarios(data)
        setLoadingList(false)
      })
      .catch((err) => {
        console.error('Failed to load scenarios', err)
        setError('Unable to load saved scenarios right now.')
        setLoadingList(false)
      })
  }

  useEffect(() => {
    loadScenarioList()
  }, [])

  useEffect(() => {
    const missingIds = selectedIds.filter((id) => !scenarioDetailsRef.current[id])
    if (missingIds.length === 0) return

    Promise.allSettled(
      missingIds.map(async (id) => {
        const res = await fetch(`/api/scenarios/${id}`)
        if (!res.ok) {
          throw new Error('Failed to fetch scenario')
        }
        const data = await res.json()
        return data as MiningScenario
      })
    )
      .then((results) => {
        const fetched = results.flatMap((result) =>
          result.status === 'fulfilled' ? [result.value] : []
        )

        if (fetched.length < results.length) {
          console.warn(`${results.length - fetched.length} scenario(s) failed to load`)
          setError(`${results.length - fetched.length} scenario(s) could not be loaded.`)
        }

        const next = { ...scenarioDetailsRef.current }
        for (const scenario of fetched) {
          next[scenario.id!] = scenario
        }
        scenarioDetailsRef.current = next
        setScenarioDetails(next)
      })
      .finally(() => setLoadingSelection(false))
  }, [selectedIds])

  const selectedScenarios: MiningScenario[] = selectedIds
    .map((id) => scenarioDetails[id])
    .filter(Boolean)

  const comparisonData: ScenarioWithMetrics[] = useMemo(() => {
    return selectedScenarios.map((scenario) => {
      const profit = calculateMiningProfit(scenario.calculatorData)
      const generatorCapacity = (scenario.plannerData?.generators || []).reduce(
        (total, generator) => total + (generator.capacity || 0),
        0
      )

      const paybackMonths =
        profit.monthlyProfit > 0
          ? profit.investment / profit.monthlyProfit
          : null

      const powerUtilization =
        generatorCapacity > 0
          ? (scenario.calculatorData.powerConsumption / generatorCapacity) * 100
          : 0

      return {
        scenario,
        monthlyRevenue: profit.monthlyRevenue,
        monthlyCost: profit.monthlyCost,
        monthlyProfit: profit.monthlyProfit,
        yearlyRoi: profit.roi,
        paybackMonths,
        totalHashrate: scenario.calculatorData.hashrate,
        totalPowerDraw: scenario.calculatorData.powerConsumption,
        powerUtilization,
      }
    })
  }, [selectedScenarios])

  const baseline = comparisonData[0]
  const maxProfitMagnitude = useMemo(() => {
    const maxValue = Math.max(
      1,
      ...comparisonData.map((item) => Math.abs(item.monthlyProfit))
    )
    return maxValue
  }, [comparisonData])

  const toggleSelection = (id: string) => {
    setError(null)
    const isSelected = selectedIds.includes(id)
    if (!isSelected && selectedIds.length >= 5) {
      setError('You can compare up to 5 scenarios at a time.')
      return
    }
    if (!isSelected && !scenarioDetailsRef.current[id]) {
      setLoadingSelection(true)
    }
    setSelectedIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((existing) => existing !== id)
      }
      return prev.length < 5 ? [...prev, id] : prev
    })
  }

  const formatDeltaRow = (value: number, baseValue?: number) => {
    if (typeof baseValue !== 'number') return '—'
    const delta = value - baseValue
    const absDelta = Math.abs(delta)
    const absBase = Math.abs(baseValue)

    // Treat very small deltas as effectively zero using a scale-aware threshold:
    // - for non-zero base values: small relative change (e.g. <0.1%)
    // - for zero base values: very small absolute change
    const relativeThreshold = 0.001 // 0.1%
    const absoluteThreshold = 1e-4
    const isEffectivelyZero =
      (absBase > 0 && absDelta / absBase < relativeThreshold) ||
      (absBase === 0 && absDelta < absoluteThreshold)

    if (isEffectivelyZero) return '±0'

    const prefix = delta > 0 ? '+' : '-'
    return `${prefix}${formatNumber(absDelta)}`
  }

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-6 space-y-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-wide text-accent-mining mb-2">
              Scenario Comparison
            </p>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Compare Saved Scenarios</h1>
            <p className="text-gray-400 max-w-3xl">
              Select between two and five saved scenarios to benchmark hashrate, power draw, profitability, and payoff timelines side by side. Calculations are recomputed locally using the stored inputs for each scenario.
            </p>
          </div>
          <Link href="/site-planner">
            <Button variant="outline" size="sm">Back to Planner</Button>
          </Link>
        </div>

        <Card>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-semibold">Select Scenarios</h2>
              <p className="text-gray-400 text-sm">Choose 2–5 scenarios to enable comparison.</p>
            </div>
            {loadingSelection && <span className="text-xs text-gray-400">Loading selection…</span>}
          </div>
          {loadingList ? (
            <p className="text-gray-400">Loading scenarios…</p>
          ) : error && scenarios.length === 0 ? (
            <div className="space-y-3">
              <p className="text-red-400">{error}</p>
              <Button
                onClick={() => {
                  setLoadingList(true)
                  setError(null)
                  loadScenarioList()
                }}
                variant="outline"
                size="sm"
              >
                Retry
              </Button>
            </div>
          ) : scenarios.length === 0 ? (
            <p className="text-gray-400">No saved scenarios available yet.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {scenarios.map((scenario) => {
                const selected = selectedIds.includes(scenario.id)
                return (
                  <Card
                    key={scenario.id}
                    hover
                    onClick={() => toggleSelection(scenario.id)}
                    className={`border ${selected ? 'border-accent-mining' : 'border-border'}`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold mb-1">
                          {scenario.name || 'Unnamed Scenario'}
                        </h3>
                        <p className="text-xs text-gray-400">
                          Saved {new Date(scenario.updatedAt).toLocaleDateString()}
                        </p>
                        {scenario.email && (
                          <p className="text-xs text-gray-500 mt-1">{scenario.email}</p>
                        )}
                      </div>
                      <input
                        type="checkbox"
                        checked={selected}
                        onChange={(event) => {
                          event.stopPropagation()
                          toggleSelection(scenario.id)
                        }}
                        className="w-5 h-5 accent-orange-500"
                      />
                    </div>
                  </Card>
                )
              })}
            </div>
          )}
          <div className="mt-4 flex items-center justify-between text-sm text-gray-400">
            <span>
              {selectedIds.length < 2
                ? 'Select at least two scenarios to start comparing.'
                : `${selectedIds.length} scenarios selected`}
            </span>
            {error && <span className="text-red-400">{error}</span>}
          </div>
        </Card>

        {comparisonData.length >= 2 ? (
          <div className="space-y-6">
            <Card className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr>
                    <th className="text-left px-4 py-3 text-sm font-semibold text-gray-300">Metric</th>
                    {comparisonData.map((item) => (
                      <th
                        key={item.scenario.id}
                        className="text-left px-4 py-3 text-sm font-semibold text-gray-300"
                      >
                        {item.scenario.name || 'Scenario'}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr>
                    <td className="px-4 py-3 text-sm text-gray-400">Total hashrate (TH/s)</td>
                    {comparisonData.map((item) => (
                      <td key={item.scenario.id} className="px-4 py-3 font-semibold">
                        {formatNumber(item.totalHashrate)}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-sm text-gray-400">Total power draw (kW)</td>
                    {comparisonData.map((item) => (
                      <td key={item.scenario.id} className="px-4 py-3 font-semibold">
                        {formatNumber(item.totalPowerDraw)}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-sm text-gray-400">Monthly revenue</td>
                    {comparisonData.map((item) => (
                      <td key={item.scenario.id} className="px-4 py-3 font-semibold">
                        {formatCurrency(item.monthlyRevenue)}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-sm text-gray-400">Monthly cost</td>
                    {comparisonData.map((item) => (
                      <td key={item.scenario.id} className="px-4 py-3 font-semibold">
                        {formatCurrency(item.monthlyCost)}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-sm text-gray-400">Monthly profit</td>
                    {comparisonData.map((item) => (
                      <td
                        key={item.scenario.id}
                        className={`px-4 py-3 font-semibold ${
                          item.monthlyProfit >= 0 ? 'text-green-400' : 'text-red-400'
                        }`}
                      >
                        {formatCurrency(item.monthlyProfit)}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-sm text-gray-400">ROI (%)</td>
                    {comparisonData.map((item) => (
                      <td key={item.scenario.id} className="px-4 py-3 font-semibold">
                        {formatPercent(item.yearlyRoi)}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-sm text-gray-400">Payback months</td>
                    {comparisonData.map((item) => (
                      <td key={item.scenario.id} className="px-4 py-3 font-semibold">
                        {item.paybackMonths ? `${formatNumber(item.paybackMonths, 1)} mo` : 'N/A'}
                      </td>
                    ))}
                  </tr>
                  <tr className="bg-surface">
                    <td className="px-4 py-3 text-xs text-gray-400">Δ vs first selection</td>
                    {comparisonData.map((item) => (
                      <td key={item.scenario.id} className="px-4 py-3 text-xs text-gray-300">
                        {baseline
                          ? `${formatDeltaRow(item.totalHashrate, baseline.totalHashrate)} TH/s · ${formatDeltaRow(item.totalPowerDraw, baseline.totalPowerDraw)} kW · ${formatDeltaRow(item.monthlyProfit, baseline.monthlyProfit)} profit`
                          : '—'}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <h3 className="text-lg font-semibold mb-4">Monthly Profit</h3>
                <div className="space-y-3">
                  {comparisonData.map((item) => {
                    const width = Math.max(
                      6,
                      (Math.abs(item.monthlyProfit) / maxProfitMagnitude) * 100
                    )
                    return (
                      <div key={item.scenario.id}>
                        <div className="flex justify-between text-sm text-gray-300 mb-1">
                          <span>{item.scenario.name || 'Scenario'}</span>
                          <span className={item.monthlyProfit >= 0 ? 'text-green-400' : 'text-red-400'}>
                            {formatCurrency(item.monthlyProfit)}
                          </span>
                        </div>
                        <div className="w-full bg-surface rounded-full h-3 overflow-hidden">
                          <div
                            className={`h-3 ${
                              item.monthlyProfit >= 0 ? 'bg-green-500' : 'bg-red-500'
                            }`}
                            style={{ width: `${Math.min(width, 100)}%` }}
                          />
                        </div>
                      </div>
                    )
                  })}
                </div>
              </Card>

              <Card>
                <h3 className="text-lg font-semibold mb-4">Power Utilization</h3>
                <div className="space-y-3">
                  {comparisonData.map((item) => {
                    const cappedUtilization = Math.min(item.powerUtilization, 100)
                    const width = Math.max(4, cappedUtilization)
                    const isOverCapacity = item.powerUtilization > 100
                    return (
                      <div key={item.scenario.id}>
                        <div className="flex justify-between text-sm text-gray-300 mb-1">
                          <span>{item.scenario.name || 'Scenario'}</span>
                          <span className={
                            item.powerUtilization > 100
                              ? 'text-red-400'
                              : item.powerUtilization > 85
                              ? 'text-yellow-300'
                              : 'text-green-400'
                          }>
                            {formatPercent(item.powerUtilization)}{isOverCapacity ? ' ⚠️' : ''}
                          </span>
                        </div>
                        <div className="w-full bg-surface rounded-full h-3 overflow-hidden">
                          <div
                            className={`h-3 ${
                              item.powerUtilization > 100
                                ? 'bg-red-500'
                                : item.powerUtilization > 85
                                ? 'bg-yellow-400'
                                : 'bg-green-500'
                            }`}
                            style={{ width: `${Math.min(width, 100)}%` }}
                          />
                        </div>
                      </div>
                    )
                  })}
                </div>
                <p className="text-xs text-gray-500 mt-3">
                  Utilization is estimated from total generator capacity versus the scenario&apos;s stored power draw. When no generators are defined, utilization defaults to 0%.
                </p>
              </Card>
            </div>
          </div>
        ) : (
          <Card>
            <p className="text-gray-400">Select at least two scenarios to see a side-by-side comparison.</p>
          </Card>
        )}
      </div>
    </div>
  )
}
