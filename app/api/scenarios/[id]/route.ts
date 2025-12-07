import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'
import { deserializeScenario } from '@/lib/utils/scenario'

// GET /api/scenarios/[id] - Get single scenario
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const scenario = await prisma.scenario.findUnique({
      where: { id },
    })

    if (!scenario) {
      return NextResponse.json(
        { error: 'Scenario not found' },
        { status: 404 }
      )
    }

    const deserialized = deserializeScenario(scenario)
    return NextResponse.json(deserialized)
  } catch (error) {
    console.error('Error fetching scenario:', error)
    return NextResponse.json(
      { error: 'Failed to fetch scenario' },
      { status: 500 }
    )
  }
}

// DELETE /api/scenarios/[id] - Delete scenario
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    await prisma.scenario.delete({
      where: { id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting scenario:', error)
    return NextResponse.json(
      { error: 'Failed to delete scenario' },
      { status: 500 }
    )
  }
}

