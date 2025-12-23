'use client'

import { useEffect, useCallback } from 'react'
import { Input } from '@/components/ui/Input'
import { Card } from '@/components/ui/Card'
import {
  PlannerInputs,
  SiteDimensions,
  LayoutParameters,
  ContainerConfig,
  GeneratorConfig,
} from '@/lib/types'

interface PlannerControlsProps {
  inputs: PlannerInputs
  onInputsChange: (inputs: PlannerInputs) => void
}

export function PlannerControls({
  inputs,
  onInputsChange,
}: PlannerControlsProps) {
  const regenerateLayout = useCallback(
    (layoutParams?: LayoutParameters) => {
      const params = layoutParams || inputs.layoutParameters
      const containers: ContainerConfig[] = []
      const generators: GeneratorConfig[] = []

      // Generate container positions in grid
      const containerWidth = params.containerWidth
      const containerLength = params.containerLength
      const spacing = params.spacing

      // Ensure the grid can actually fit the requested container count.
      // Default rows/columns are small (2x3 => 6), so we auto-expand rows as containerCount increases.
      const safeColumns = Math.max(1, params.columns)
      const neededRows = safeColumns > 0 ? Math.ceil(inputs.containerCount / safeColumns) : 1
      const safeRows = Math.max(1, Math.max(params.rows, neededRows))
      const effectiveParams: LayoutParameters = {
        ...params,
        rows: safeRows,
        columns: safeColumns,
      }

      let containerIndex = 0
      for (
        let row = 0;
        row < effectiveParams.rows && containerIndex < inputs.containerCount;
        row++
      ) {
        for (
          let col = 0;
          col < effectiveParams.columns && containerIndex < inputs.containerCount;
          col++
        ) {
          const x = col * (containerWidth + spacing) + containerWidth / 2
          const y = row * (containerLength + spacing) + containerLength / 2
          containers.push({
            id: `container-${containerIndex}`,
            x,
            y,
            z: 0,
            rotation: 0,
            minersPerContainer: 100,
            powerPerMiner: 3.25,
          })
          containerIndex++
        }
      }

      // Generate generator positions (place them around the perimeter)
      const genSpacing = Math.max(
        inputs.siteDimensions.width,
        inputs.siteDimensions.length
      ) / (inputs.generatorCount + 1)

      for (let i = 0; i < inputs.generatorCount; i++) {
        const angle = (i / inputs.generatorCount) * Math.PI * 2
        const radius =
          Math.min(inputs.siteDimensions.width, inputs.siteDimensions.length) /
            2 -
          5
        generators.push({
          id: `generator-${i}`,
          x: inputs.siteDimensions.width / 2 + Math.cos(angle) * radius,
          y: inputs.siteDimensions.length / 2 + Math.sin(angle) * radius,
          z: 0,
          rotation: (angle * 180) / Math.PI,
          capacity: 1000, // kW per generator
        })
      }

      onInputsChange({
        ...inputs,
        containers,
        generators,
        layoutParameters: effectiveParams,
      })
    },
    [inputs, onInputsChange]
  )

  // Regenerate layout when key parameters change
  useEffect(() => {
    regenerateLayout()
  }, [
    inputs.containerCount,
    inputs.generatorCount,
    inputs.siteDimensions.width,
    inputs.siteDimensions.length,
  ])

  const updateSiteDimensions = (updates: Partial<SiteDimensions>) => {
    onInputsChange({
      ...inputs,
      siteDimensions: { ...inputs.siteDimensions, ...updates },
    })
  }

  const updateLayoutParameters = (updates: Partial<LayoutParameters>) => {
    const newParams = { ...inputs.layoutParameters, ...updates }
    regenerateLayout(newParams)
  }

  const handleContainerCountChange = (count: number) => {
    onInputsChange({ ...inputs, containerCount: count })
  }

  const handleGeneratorCountChange = (count: number) => {
    onInputsChange({ ...inputs, generatorCount: count })
  }

  return (
    <div className="h-full overflow-y-auto p-6 space-y-6">
      <h2 className="text-2xl font-bold mb-6">Site Configuration</h2>

      <Card>
        <h3 className="text-lg font-semibold mb-4">Site Dimensions</h3>
        <div className="space-y-4">
          <Input
            label="Width (meters)"
            type="number"
            value={inputs.siteDimensions.width}
            onChange={(e) =>
              updateSiteDimensions({ width: parseFloat(e.target.value) || 0 })
            }
          />
          <Input
            label="Length (meters)"
            type="number"
            value={inputs.siteDimensions.length}
            onChange={(e) =>
              updateSiteDimensions({ length: parseFloat(e.target.value) || 0 })
            }
          />
          <Input
            label="Height (meters)"
            type="number"
            value={inputs.siteDimensions.height || 10}
            onChange={(e) =>
              updateSiteDimensions({ height: parseFloat(e.target.value) || 0 })
            }
          />
        </div>
      </Card>

      <Card>
        <h3 className="text-lg font-semibold mb-4">Containers</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Container Count: {inputs.containerCount}
            </label>
            <input
              type="range"
              min="0"
              max="50"
              value={inputs.containerCount}
              onChange={(e) =>
                handleContainerCountChange(parseInt(e.target.value))
              }
              className="w-full"
            />
          </div>
        </div>
      </Card>

      <Card>
        <h3 className="text-lg font-semibold mb-4">Generators</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Generator Count: {inputs.generatorCount}
            </label>
            <input
              type="range"
              min="0"
              max="20"
              value={inputs.generatorCount}
              onChange={(e) =>
                handleGeneratorCountChange(parseInt(e.target.value))
              }
              className="w-full"
            />
          </div>
        </div>
      </Card>

      <Card>
        <h3 className="text-lg font-semibold mb-4">Layout Parameters</h3>
        <div className="space-y-4">
          <Input
            label="Rows"
            type="number"
            value={inputs.layoutParameters.rows}
            onChange={(e) =>
              updateLayoutParameters({
                rows: parseInt(e.target.value) || 1,
              })
            }
          />
          <Input
            label="Columns"
            type="number"
            value={inputs.layoutParameters.columns}
            onChange={(e) =>
              updateLayoutParameters({
                columns: parseInt(e.target.value) || 1,
              })
            }
          />
          <Input
            label="Spacing (meters)"
            type="number"
            step="0.1"
            value={inputs.layoutParameters.spacing}
            onChange={(e) =>
              updateLayoutParameters({
                spacing: parseFloat(e.target.value) || 0,
              })
            }
          />
        </div>
      </Card>
    </div>
  )
}
