import assert from 'node:assert/strict'
import test from 'node:test'
import { calculateMiningProfit } from '../lib/calculations/profitability'

const inputs = {
  hashrate: 390,
  powerConsumption: 7.215,
  energyCost: 0.05,
  btcPrice: 91556.33,
  poolFee: 1,
}

test('returns the canonical investment used to calculate ROI', () => {
  const provided = calculateMiningProfit({ ...inputs, hardwareCostUsd: 25000 })
  const fallback = calculateMiningProfit(inputs)

  assert.equal(provided.investment, 25000)
  assert.equal(fallback.investment, fallback.yearlyCost * 10)
})
