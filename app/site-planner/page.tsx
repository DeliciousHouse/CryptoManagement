'use client'

import { useState } from 'react'
import { Planner3D } from '@/components/site-planner/Planner3D'
import { PlannerControls } from '@/components/site-planner/PlannerControls'
import { ScenarioSaveLoad } from '@/components/site-planner/ScenarioSaveLoad'
import { PlannerInputs, MiningScenario, CalculatorInputs } from '@/lib/types'

const defaultInputs: PlannerInputs = {
  containerCount: 5,
  generatorCount: 2,
  siteDimensions: {
    width: 100,
    length: 100,
    height: 10,
  },
  layoutParameters: {
    rows: 2,
    columns: 3,
    spacing: 5,
    containerWidth: 6,
    containerLength: 12,
    containerHeight: 2.6,
  },
  containers: [],
  generators: [],
}

export default function SitePlannerPage() {
  const [inputs, setInputs] = useState<PlannerInputs>(defaultInputs)
  const [calculatorData, setCalculatorData] = useState<CalculatorInputs | undefined>()

  const handleLoadScenario = (scenario: MiningScenario) => {
    setInputs(scenario.plannerData)
    setCalculatorData(scenario.calculatorData)
  }

  return (
    <div className="h-screen pt-16 flex flex-col md:flex-row">
      {/* 3D Canvas */}
      <div className="flex-1 relative min-h-[400px] md:min-h-0">
        <Planner3D inputs={inputs} />
      </div>

      {/* Controls Panel */}
      <div className="w-full md:w-96 bg-surface-elevated border-t md:border-t-0 md:border-l border-border flex flex-col max-h-[50vh] md:max-h-none">
        <div className="flex-1 overflow-y-auto">
          <PlannerControls inputs={inputs} onInputsChange={setInputs} />
        </div>
        <div className="border-t border-border p-4 flex-shrink-0">
          <ScenarioSaveLoad
            calculatorData={calculatorData}
            plannerData={inputs}
            onLoad={handleLoadScenario}
          />
        </div>
      </div>
    </div>
  )
}

