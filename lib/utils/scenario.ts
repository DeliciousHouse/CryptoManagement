import {
  MiningScenario,
  CalculatorInputs,
  PlannerInputs,
} from '@/lib/types'

/**
 * Serialize a complete scenario to JSON format for database storage
 */
export function serializeScenario(scenario: MiningScenario): {
  calculatorData: CalculatorInputs
  plannerData: PlannerInputs
} {
  return {
    calculatorData: scenario.calculatorData,
    plannerData: scenario.plannerData,
  }
}

/**
 * Deserialize database JSON to MiningScenario
 */
export function deserializeScenario(data: {
  calculatorData: unknown
  plannerData: unknown
  id: string
  name?: string | null
  email?: string | null
  createdAt: Date
  updatedAt: Date
}): MiningScenario {
  // Prisma Json fields can be null; normalize to empty objects for safer casting.
  const calculatorData =
    data.calculatorData && typeof data.calculatorData === 'object'
      ? (data.calculatorData as CalculatorInputs)
      : ({} as CalculatorInputs)

  const plannerData =
    data.plannerData && typeof data.plannerData === 'object'
      ? (data.plannerData as PlannerInputs)
      : ({} as PlannerInputs)

  return {
    id: data.id,
    name: data.name || undefined,
    email: data.email || undefined,
    calculatorData,
    plannerData,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
  }
}
