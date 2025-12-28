'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { CalculatorInputs, PlannerInputs } from '@/lib/types'

interface CalculatorSaveButtonProps {
  calculatorData: CalculatorInputs
  plannerData?: PlannerInputs
}

export function CalculatorSaveButton({
  calculatorData,
  plannerData,
}: CalculatorSaveButtonProps) {
  const [showSave, setShowSave] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [saving, setSaving] = useState(false)

  const handleSave = async () => {
    setSaving(true)
    try {
      const response = await fetch('/api/scenarios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name || undefined,
          email: email || undefined,
          calculatorData,
          plannerData: plannerData || {
            containerCount: 0,
            generatorCount: 0,
            siteDimensions: { width: 0, length: 0, height: 0 },
            layoutParameters: {
              rows: 0,
              columns: 0,
              spacing: 0,
              containerWidth: 0,
              containerLength: 0,
              containerHeight: 0,
            },
            containers: [],
            generators: [],
          },
        }),
      })

      if (response.ok) {
        const data = await response.json()
        const url = `${window.location.origin}/scenarios/${data.id}`
        navigator.clipboard.writeText(url)
        alert(`Scenario saved! Shareable link: ${url}`)
        setShowSave(false)
        setName('')
        setEmail('')
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

  if (!showSave) {
    return (
      <Button variant="primary" onClick={() => setShowSave(true)}>
        Save Scenario
      </Button>
    )
  }

  return (
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
        <Button variant="primary" size="sm" onClick={handleSave} disabled={saving}>
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
  )
}
