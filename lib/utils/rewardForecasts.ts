import { CalculatorInputs, ProfitResult } from '@/lib/types'

export type RewardForecastTimeFrame = 'Hourly' | 'Daily' | 'Weekly' | 'Monthly' | 'Annually'

export interface RewardForecastRow {
  timeFrame: RewardForecastTimeFrame
  btcReward: number
  revenueUsd: number
  powerCostUsd: number
  poolFeesUsd: number
  profitUsd: number
}

function safeFeeMultiplier(poolFeePercent: number) {
  const fee = Number.isFinite(poolFeePercent) ? poolFeePercent : 0
  return 1 - Math.min(Math.max(fee, 0), 100) / 100
}

/**
 * Build the "Bitcoin Mining Reward Forecasts" table rows from the current calculator state.
 *
 * Notes:
 * - BTC rewards are derived from the canonical monthly yield assumption: `btcPerMonthPerTh`.
 * - Revenue shown in the table is **gross** (before pool fee), matching the pool fee breakdown.
 * - Profit is computed as: revenue - power cost - pool fee.
 */
export function buildRewardForecasts(
  result: ProfitResult,
  inputs: CalculatorInputs
): RewardForecastRow[] {
  const totalHashrateTh = inputs.hashrate
  const btcPriceUsd = inputs.btcPrice
  const poolFeePercent = inputs.poolFee

  const monthlyBTC = totalHashrateTh * result.btcPerMonthPerTh
  const dailyBTC = monthlyBTC / 30
  const hourlyBTC = dailyBTC / 24
  const weeklyBTC = dailyBTC * 7
  const annualBTC = monthlyBTC * 12

  const hourlyRevenueGross = hourlyBTC * btcPriceUsd
  const dailyRevenueGross = dailyBTC * btcPriceUsd
  const weeklyRevenueGross = weeklyBTC * btcPriceUsd
  const monthlyRevenueGross = monthlyBTC * btcPriceUsd
  const annualRevenueGross = annualBTC * btcPriceUsd

  const hourlyPowerCost = result.dailyCost / 24
  const dailyPowerCost = result.dailyCost
  const weeklyPowerCost = result.dailyCost * 7
  const monthlyPowerCost = result.monthlyCost
  const annualPowerCost = result.monthlyCost * 12

  const feeMultiplier = safeFeeMultiplier(poolFeePercent)
  const dailyRevenueNet = result.dailyRevenue // existing calc is net-after-fee
  const dailyPoolFeesUsd =
    feeMultiplier > 0 ? dailyRevenueNet * (1 / feeMultiplier - 1) : dailyRevenueGross

  const hourlyPoolFeesUsd = dailyPoolFeesUsd / 24
  const weeklyPoolFeesUsd = dailyPoolFeesUsd * 7
  const monthlyPoolFeesUsd = dailyPoolFeesUsd * 30
  const annualPoolFeesUsd = monthlyPoolFeesUsd * 12

  const hourlyProfit = hourlyRevenueGross - hourlyPowerCost - hourlyPoolFeesUsd
  const dailyProfit = dailyRevenueGross - dailyPowerCost - dailyPoolFeesUsd
  const weeklyProfit = weeklyRevenueGross - weeklyPowerCost - weeklyPoolFeesUsd
  const monthlyProfit = monthlyRevenueGross - monthlyPowerCost - monthlyPoolFeesUsd
  const annualProfit = annualRevenueGross - annualPowerCost - annualPoolFeesUsd

  return [
    {
      timeFrame: 'Hourly',
      btcReward: hourlyBTC,
      revenueUsd: hourlyRevenueGross,
      powerCostUsd: hourlyPowerCost,
      poolFeesUsd: hourlyPoolFeesUsd,
      profitUsd: hourlyProfit,
    },
    {
      timeFrame: 'Daily',
      btcReward: dailyBTC,
      revenueUsd: dailyRevenueGross,
      powerCostUsd: dailyPowerCost,
      poolFeesUsd: dailyPoolFeesUsd,
      profitUsd: dailyProfit,
    },
    {
      timeFrame: 'Weekly',
      btcReward: weeklyBTC,
      revenueUsd: weeklyRevenueGross,
      powerCostUsd: weeklyPowerCost,
      poolFeesUsd: weeklyPoolFeesUsd,
      profitUsd: weeklyProfit,
    },
    {
      timeFrame: 'Monthly',
      btcReward: monthlyBTC,
      revenueUsd: monthlyRevenueGross,
      powerCostUsd: monthlyPowerCost,
      poolFeesUsd: monthlyPoolFeesUsd,
      profitUsd: monthlyProfit,
    },
    {
      timeFrame: 'Annually',
      btcReward: annualBTC,
      revenueUsd: annualRevenueGross,
      powerCostUsd: annualPowerCost,
      poolFeesUsd: annualPoolFeesUsd,
      profitUsd: annualProfit,
    },
  ]
}


