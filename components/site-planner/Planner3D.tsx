'use client'

import { PlannerInputs } from '@/lib/types'
import { Scene3D } from './Scene3D'

interface Planner3DProps {
  inputs: PlannerInputs
}

export function Planner3D({ inputs }: Planner3DProps) {
  return (
    <div className="w-full h-full bg-surface">
      <Scene3D
        containers={inputs.containers}
        generators={inputs.generators}
        siteDimensions={inputs.siteDimensions}
      />
    </div>
  )
}

