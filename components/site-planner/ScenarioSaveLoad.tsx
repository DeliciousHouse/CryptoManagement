'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { ScenarioList } from '@/components/scenarios/ScenarioList'
import { MiningScenario, CalculatorInputs, PlannerInputs } from '@/lib/types'

interface ScenarioSaveLoadProps {
  calculatorData?: CalculatorInputs
  plannerData: PlannerInputs
  onLoad: (scenario: MiningScenario) => void
}

export function ScenarioSaveLoad({
  calculatorData,
  plannerData,
  onLoad,
}: ScenarioSaveLoadProps) {
  const [showSave, setShowSave] = useState(false)
  const [showLoad, setShowLoad] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  const handleSave = async () => {
    if (!calculatorData) {
      alert('No calculator data to save')
      return
    }

    setSaving(true)
    try {
      const response = await fetch('/api/scenarios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name || undefined,
          email: email || undefined,
          calculatorData,
          plannerData,
        }),
      })

      if (response.ok) {
        const data = await response.json()
        setSaved(true)
        setShowSave(false)
        setTimeout(() => setSaved(false), 3000)

        // Copy shareable link to clipboard
        const url = `${window.location.origin}/scenarios/${data.id}`
        navigator.clipboard.writeText(url)
        alert(`Scenario saved! Shareable link copied to clipboard: ${url}`)
      } else {
        throw new Error('Failed to save scenario')
      }
    } catch (error) {
      console.error('Error saving scenario:', error)
      alert('Failed to save scenario')
    } finally {
      setSaving(false)
    }
  }

  const handleLoad = async (id: string) => {
    try {
      const response = await fetch(`/api/scenarios/${id}`)
      if (response.ok) {
        const scenario = await response.json()
        onLoad(scenario)
        setShowLoad(false)
      } else {
        throw new Error('Failed to load scenario')
      }
    } catch (error) {
      console.error('Error loading scenario:', error)
      alert('Failed to load scenario')
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <Button
          variant="primary"
          onClick={() => setShowSave(!showSave)}
          disabled={!calculatorData}
        >
          Save Scenario
        </Button>
        <Button variant="outline" onClick={() => setShowLoad(!showLoad)}>
          Load Scenario
        </Button>
      </div>

      {showSave && (
        <div className="p-4 bg-surface-elevated rounded-lg border border-border space-y-4">
          <h4 className="font-semibold">Save Scenario</h4>
          <Input
            label="Scenario Name (optional)"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="My Mining Site"
          />
          <Input
            label="Email (optional)"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
          />
          <div className="flex gap-2">
            <Button
              variant="primary"
              size="sm"
              onClick={handleSave}
              disabled={saving}
            >
              {saving ? 'Saving...' : 'Save'}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setShowSave(false)
                setName('')
                setEmail('')
              }}
            >
              Cancel
            </Button>
          </div>
        </div>
      )}

      {showLoad && (
        <div className="bg-surface-elevated rounded-lg border border-border">
          <ScenarioList onSelect={handleLoad} onClose={() => setShowLoad(false)} />
        </div>
      )}

      {saved && (
        <div className="p-3 bg-green-500/20 border border-green-500 rounded-lg text-green-400 text-sm">
          Scenario saved successfully!
        </div>
      )}
    </div>
  )
}

