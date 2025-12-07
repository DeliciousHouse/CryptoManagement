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
  calculatorData: any
  plannerData: any
  id: string
  name?: string | null
  email?: string | null
  createdAt: Date
  updatedAt: Date
}): MiningScenario {
  return {
    id: data.id,
    name: data.name || undefined,
    email: data.email || undefined,
    calculatorData: data.calculatorData as CalculatorInputs,
    plannerData: data.plannerData as PlannerInputs,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
  }
}

