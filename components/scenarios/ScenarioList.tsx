'use client'

import { useState, useEffect } from 'react'
import { ScenarioMetadata } from '@/lib/types'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'

interface ScenarioListProps {
  onSelect: (id: string) => void
  onClose: () => void
}

export function ScenarioList({ onSelect, onClose }: ScenarioListProps) {
  const [scenarios, setScenarios] = useState<ScenarioMetadata[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/scenarios')
      .then((res) => res.json())
      .then((data) => {
        setScenarios(data)
        setLoading(false)
      })
      .catch((error) => {
        console.error('Error loading scenarios:', error)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return (
      <div className="p-6">
        <p className="text-gray-400">Loading scenarios...</p>
      </div>
    )
  }

  if (scenarios.length === 0) {
    return (
      <div className="p-6">
        <p className="text-gray-400">No saved scenarios found.</p>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold">Load Scenario</h3>
        <Button variant="outline" size="sm" onClick={onClose}>
          Close
        </Button>
      </div>
      <div className="space-y-2 max-h-96 overflow-y-auto">
        {scenarios.map((scenario) => (
          <Card
            key={scenario.id}
            hover
            className="cursor-pointer"
            onClick={() => onSelect(scenario.id)}
          >
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-semibold mb-1">
                  {scenario.name || 'Unnamed Scenario'}
                </h4>
                <p className="text-sm text-gray-400">
                  {new Date(scenario.createdAt).toLocaleDateString()}
                </p>
              </div>
              <Button
                variant="secondary"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation()
                  onSelect(scenario.id)
                }}
              >
                Load
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

