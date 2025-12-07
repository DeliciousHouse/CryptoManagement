import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'
import { serializeScenario, deserializeScenario } from '@/lib/utils/scenario'
import { z } from 'zod'

const createScenarioSchema = z.object({
  name: z.string().optional(),
  email: z.string().email().optional(),
  calculatorData: z.object({
    hashrate: z.number(),
    powerConsumption: z.number(),
    energyCost: z.number(),
    btcPrice: z.number(),
    poolFee: z.number(),
  }),
  plannerData: z.object({
    containerCount: z.number(),
    generatorCount: z.number(),
    siteDimensions: z.object({
      width: z.number(),
      length: z.number(),
      height: z.number().optional(),
    }),
    layoutParameters: z.object({
      rows: z.number(),
      columns: z.number(),
      spacing: z.number(),
      containerWidth: z.number(),
      containerLength: z.number(),
      containerHeight: z.number(),
    }),
    containers: z.array(z.any()),
    generators: z.array(z.any()),
  }),
})

// GET /api/scenarios - List recent scenarios
export async function GET() {
  try {
    const scenarios = await prisma.scenario.findMany({
      take: 20,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    })

    return NextResponse.json(scenarios)
  } catch (error) {
    console.error('Error fetching scenarios:', error)
    return NextResponse.json(
      { error: 'Failed to fetch scenarios' },
      { status: 500 }
    )
  }
}

// POST /api/scenarios - Create new scenario
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validated = createScenarioSchema.parse(body)

    const scenario = await prisma.scenario.create({
      data: {
        name: validated.name,
        email: validated.email,
        calculatorData: validated.calculatorData,
        plannerData: validated.plannerData,
      },
    })

    return NextResponse.json({ id: scenario.id }, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid input', details: error.issues },
        { status: 400 }
      )
    }

    console.error('Error creating scenario:', error)
    return NextResponse.json(
      { error: 'Failed to create scenario' },
      { status: 500 }
    )
  }
}

