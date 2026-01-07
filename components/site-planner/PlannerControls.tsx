'use client'

import { useEffect, useCallback, useMemo, useState } from 'react'
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
  const [layoutError, setLayoutError] = useState<string | null>(null)

  const sanitizeFinite = (value: number, fallback = 0) =>
    Number.isFinite(value) ? value : fallback

  const clampMin = (value: number, min: number) => Math.max(min, value)

  const effectiveLayoutParams = useMemo(() => {
    const params = inputs.layoutParameters

    const safeContainerWidth = clampMin(sanitizeFinite(params.containerWidth, 6), 0.1)
    const safeContainerLength = clampMin(sanitizeFinite(params.containerLength, 12), 0.1)
    const safeContainerHeight = clampMin(sanitizeFinite(params.containerHeight, 2.6), 0.1)
    const safeSpacing = clampMin(sanitizeFinite(params.spacing, 0), 0)
    const safeColumns = Math.max(1, Math.floor(sanitizeFinite(params.columns, 1)))

    const safeContainerCount = clampMin(Math.floor(sanitizeFinite(inputs.containerCount, 0)), 0)
    const neededRows = safeColumns > 0 ? Math.ceil(safeContainerCount / safeColumns) : 1
    const safeRows = Math.max(1, Math.floor(sanitizeFinite(params.rows, 1)), neededRows)

    return {
      ...params,
      rows: safeRows,
      columns: safeColumns,
      spacing: safeSpacing,
      containerWidth: safeContainerWidth,
      containerLength: safeContainerLength,
      containerHeight: safeContainerHeight,
    }
  }, [inputs.containerCount, inputs.layoutParameters])

  const layoutFit = useMemo(() => {
    const siteWidth = clampMin(sanitizeFinite(inputs.siteDimensions.width, 0), 0)
    const siteLength = clampMin(sanitizeFinite(inputs.siteDimensions.length, 0), 0)

    const cols = effectiveLayoutParams.columns
    const rows = effectiveLayoutParams.rows
    const w = effectiveLayoutParams.containerWidth
    const l = effectiveLayoutParams.containerLength
    const s = effectiveLayoutParams.spacing

    const gridWidth = cols * w + Math.max(0, cols - 1) * s
    const gridLength = rows * l + Math.max(0, rows - 1) * s

    const fitsWidth = gridWidth <= siteWidth
    const fitsLength = gridLength <= siteLength

    return {
      siteWidth,
      siteLength,
      gridWidth,
      gridLength,
      fits: fitsWidth && fitsLength,
      fitsWidth,
      fitsLength,
    }
  }, [effectiveLayoutParams, inputs.siteDimensions.length, inputs.siteDimensions.width])

  const regenerateLayout = useCallback(
    (layoutParams?: LayoutParameters) => {
      setLayoutError(null)

      const params = layoutParams || inputs.layoutParameters
      const containers: ContainerConfig[] = []
      const generators: GeneratorConfig[] = []

      // Generate container positions in grid
      const containerWidth = clampMin(sanitizeFinite(params.containerWidth, 6), 0.1)
      const containerLength = clampMin(sanitizeFinite(params.containerLength, 12), 0.1)
      const spacing = clampMin(sanitizeFinite(params.spacing, 0), 0)

      // Ensure the grid can actually fit the requested container count.
      // Default rows/columns are small (2x3 => 6), so we auto-expand rows as containerCount increases.
      const safeColumns = Math.max(1, Math.floor(sanitizeFinite(params.columns, 1)))
      const safeContainerCount = clampMin(Math.floor(sanitizeFinite(inputs.containerCount, 0)), 0)
      const neededRows = safeColumns > 0 ? Math.ceil(safeContainerCount / safeColumns) : 1
      const safeRows = Math.max(1, Math.floor(sanitizeFinite(params.rows, 1)), neededRows)
      const effectiveParams: LayoutParameters = {
        ...params,
        rows: safeRows,
        columns: safeColumns,
        spacing,
        containerWidth,
        containerLength,
      }

      let containerIndex = 0
      for (
        let row = 0;
        row < effectiveParams.rows && containerIndex < safeContainerCount;
        row++
      ) {
        for (
          let col = 0;
          col < effectiveParams.columns && containerIndex < safeContainerCount;
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
      const siteWidth = clampMin(sanitizeFinite(inputs.siteDimensions.width, 0), 0)
      const siteLength = clampMin(sanitizeFinite(inputs.siteDimensions.length, 0), 0)
      const safeGeneratorCount = clampMin(Math.floor(sanitizeFinite(inputs.generatorCount, 0)), 0)

      const genSpacing = Math.max(siteWidth, siteLength) / (safeGeneratorCount + 1)

      for (let i = 0; i < safeGeneratorCount; i++) {
        const angle = safeGeneratorCount > 0 ? (i / safeGeneratorCount) * Math.PI * 2 : 0
        const radius =
          Math.max(0, Math.min(siteWidth, siteLength) / 2 - 5)
        generators.push({
          id: `generator-${i}`,
          x: siteWidth / 2 + Math.cos(angle) * radius,
          y: siteLength / 2 + Math.sin(angle) * radius,
          z: 0,
          rotation: (angle * 180) / Math.PI,
          capacity: 1000, // kW per generator
        })
      }

      try {
        onInputsChange({
          ...inputs,
          containerCount: safeContainerCount,
          generatorCount: safeGeneratorCount,
          containers,
          generators,
          layoutParameters: effectiveParams,
          siteDimensions: {
            ...inputs.siteDimensions,
            width: siteWidth,
            length: siteLength,
            height: clampMin(sanitizeFinite(inputs.siteDimensions.height ?? 10, 10), 0),
          },
        })
      } catch (e) {
        console.error('Failed to regenerate layout:', e)
        setLayoutError('Unable to regenerate layout. Please check your inputs and try again.')
      }
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
    const width = updates.width ?? inputs.siteDimensions.width
    const length = updates.length ?? inputs.siteDimensions.length
    const height = updates.height ?? inputs.siteDimensions.height

    onInputsChange({
      ...inputs,
      siteDimensions: {
        ...inputs.siteDimensions,
        ...updates,
        width: clampMin(sanitizeFinite(width, 0), 0),
        length: clampMin(sanitizeFinite(length, 0), 0),
        height: height === undefined ? undefined : clampMin(sanitizeFinite(height, 0), 0),
      },
    })
  }

  const updateLayoutParameters = (updates: Partial<LayoutParameters>) => {
    const newParams = {
      ...inputs.layoutParameters,
      ...updates,
      rows: updates.rows ?? inputs.layoutParameters.rows,
      columns: updates.columns ?? inputs.layoutParameters.columns,
      spacing: updates.spacing ?? inputs.layoutParameters.spacing,
    }
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

      {!layoutFit.fits && (
        <div className="p-4 rounded-lg border border-yellow-500/40 bg-yellow-500/10">
          <div className="font-semibold text-yellow-300 mb-1">Layout Warning</div>
          <div className="text-sm text-yellow-200/90 leading-relaxed">
            The current container grid footprint exceeds your site dimensions.
            {!layoutFit.fitsWidth && (
              <>
                {' '}
                Required width: {layoutFit.gridWidth.toFixed(1)}m (site width: {layoutFit.siteWidth.toFixed(1)}m).
              </>
            )}
            {!layoutFit.fitsLength && (
              <>
                {' '}
                Required length: {layoutFit.gridLength.toFixed(1)}m (site length: {layoutFit.siteLength.toFixed(1)}m).
              </>
            )}
          </div>
          <div className="text-xs text-yellow-200/80 mt-2">
            Tip: Increase site width/length, reduce spacing, or reduce columns/rows.
          </div>
        </div>
      )}

      {layoutError && (
        <div className="p-4 rounded-lg border border-red-500/40 bg-red-500/10">
          <div className="font-semibold text-red-300 mb-1">Planner Error</div>
          <div className="text-sm text-red-200/90">{layoutError}</div>
        </div>
      )}

      <Card>
        <h3 className="text-lg font-semibold mb-4">Site Dimensions</h3>
        <div className="space-y-4">
          <Input
            label="Width (meters)"
            type="number"
            min={0}
            value={inputs.siteDimensions.width}
            onChange={(e) =>
              updateSiteDimensions({ width: parseFloat(e.target.value) || 0 })
            }
          />
          <Input
            label="Length (meters)"
            type="number"
            min={0}
            value={inputs.siteDimensions.length}
            onChange={(e) =>
              updateSiteDimensions({ length: parseFloat(e.target.value) || 0 })
            }
          />
          <Input
            label="Height (meters)"
            type="number"
            min={0}
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
            min={1}
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
            min={1}
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
            min={0}
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
