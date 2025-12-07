import { CapacityInputs, CapacityResult } from '@/lib/types'

/**
 * Calculate site capacity and power utilization
 */
export function calculateSiteCapacity(inputs: CapacityInputs): CapacityResult {
  const {
    containerCount,
    minersPerContainer,
    powerPerMiner,
    sitePowerCapacity,
    hashratePerMiner,
  } = inputs

  // Calculate total hashrate
  const totalHashrate = containerCount * minersPerContainer * hashratePerMiner

  // Calculate total power draw
  const totalPowerDraw = containerCount * minersPerContainer * powerPerMiner

  // Calculate utilization percentage
  const utilizationPercent =
    sitePowerCapacity > 0 ? (totalPowerDraw / sitePowerCapacity) * 100 : 0

  // Calculate maximum containers possible based on power capacity
  const maxMinersPossible = Math.floor(sitePowerCapacity / powerPerMiner)
  const maxContainersPossible = Math.floor(maxMinersPossible / minersPerContainer)

  // Calculate remaining capacity
  const remainingCapacity = sitePowerCapacity - totalPowerDraw

  return {
    totalHashrate,
    totalPowerDraw,
    utilizationPercent,
    maxContainersPossible,
    remainingCapacity,
  }
}

