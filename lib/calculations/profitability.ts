import { CalculatorInputs, ProfitResult } from '@/lib/types'

/**
 * Calculate Bitcoin mining profitability based on inputs
 * Uses simplified mining formulas (actual mining depends on network difficulty)
 */
export function calculateMiningProfit(inputs: CalculatorInputs): ProfitResult {
  const {
    hashrate, // TH/s
    powerConsumption, // kW
    energyCost, // $/kWh
    btcPrice, // USD
    poolFee, // percentage
    hardwareCostUsd, // optional capex
  } = inputs

  // Simplified BTC/day calculation
  // In reality, this depends on network difficulty and block rewards
  // Using a rough estimate: 1 TH/s ≈ 0.000006 BTC/day (approximate, varies)
  const BTC_PER_DAY_PER_TH = 0.000006
  const btcPerMonthPerTh = BTC_PER_DAY_PER_TH * 30
  const dailyBTC = hashrate * BTC_PER_DAY_PER_TH

  // Apply pool fee
  const dailyBTCAfterFee = dailyBTC * (1 - poolFee / 100)

  // Calculate revenue
  const dailyRevenue = dailyBTCAfterFee * btcPrice

  // Calculate costs (24 hours * energy cost per kWh * power in kW)
  const dailyCost = 24 * energyCost * powerConsumption

  // Calculate profit
  const dailyProfit = dailyRevenue - dailyCost

  // Monthly and yearly calculations
  const monthlyRevenue = dailyRevenue * 30
  const monthlyCost = dailyCost * 30
  const monthlyProfit = monthlyRevenue - monthlyCost

  // Annualize from the canonical 30-day month, to match the forecasts table (12-month year)
  const yearlyRevenue = monthlyRevenue * 12
  const yearlyCost = monthlyCost * 12
  const yearlyProfit = yearlyRevenue - yearlyCost

  // ROI calculation (yearly profit / initial investment estimate)
  // If the user provides hardware cost, use it as the investment baseline; otherwise fallback to a rough estimate.
  const estimatedInvestment =
    typeof hardwareCostUsd === 'number' && hardwareCostUsd > 0 ? hardwareCostUsd : yearlyCost * 10
  const roi = estimatedInvestment > 0 ? (yearlyProfit / estimatedInvestment) * 100 : 0

  return {
    dailyRevenue,
    dailyCost,
    dailyProfit,
    monthlyRevenue,
    monthlyCost,
    monthlyProfit,
    yearlyRevenue,
    yearlyCost,
    yearlyProfit,
    roi,
    btcPerMonthPerTh,
  }
}

