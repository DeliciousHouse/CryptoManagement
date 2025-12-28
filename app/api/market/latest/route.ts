import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'

export const dynamic = 'force-dynamic'

type LatestMarketResponse = {
  btcPriceUsd: number
  difficulty: number
  blockRewardBtc: number
  updatedAt: string
}

const TTL_MS = 10 * 60 * 1000 // 10 minutes (requirement: 5–15 minutes)

let memoryCache: { value: LatestMarketResponse; fetchedAt: number } | null = null
let inFlight: Promise<LatestMarketResponse> | null = null

function isFresh(ts: number) {
  return Date.now() - ts < TTL_MS
}

async function fetchWithTimeout(url: string, timeoutMs = 10_000) {
  const controller = new AbortController()
  const id = setTimeout(() => controller.abort(), timeoutMs)
  try {
    return await fetch(url, { signal: controller.signal })
  } finally {
    clearTimeout(id)
  }
}

async function fetchExternalMarketData(): Promise<Omit<LatestMarketResponse, 'updatedAt'>> {
  const [priceRes, difficultyRes, rewardRes] = await Promise.all([
    fetchWithTimeout(
      'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd'
    ),
    fetchWithTimeout('https://api.blockchain.info/q/getdifficulty?cors=true'),
    fetchWithTimeout('https://api.blockchain.info/q/bcperblock?cors=true'),
  ])

  if (!priceRes.ok) throw new Error(`Failed to fetch BTC price: ${priceRes.status}`)
  if (!difficultyRes.ok)
    throw new Error(`Failed to fetch difficulty: ${difficultyRes.status}`)
  if (!rewardRes.ok) throw new Error(`Failed to fetch block reward: ${rewardRes.status}`)

  const priceJson = (await priceRes.json()) as { bitcoin?: { usd?: number } }
  const btcPriceUsd = priceJson.bitcoin?.usd
  if (typeof btcPriceUsd !== 'number') throw new Error('Invalid BTC price response')

  const difficultyText = await difficultyRes.text()
  const difficulty = Number(difficultyText)
  if (!Number.isFinite(difficulty)) throw new Error('Invalid difficulty response')

  const rewardSatsText = await rewardRes.text()
  const blockRewardSats = Number(rewardSatsText)
  if (!Number.isFinite(blockRewardSats)) throw new Error('Invalid block reward response')

  const blockRewardBtc = blockRewardSats / 1e8

  return { btcPriceUsd, difficulty, blockRewardBtc }
}

async function getLatestMarketSnapshot(): Promise<LatestMarketResponse> {
  if (memoryCache && isFresh(memoryCache.fetchedAt)) return memoryCache.value

  // Try DB cache first (falls back to memory-only if DB isn't configured)
  try {
    const latest = await prisma.marketSnapshot.findFirst({
      orderBy: { createdAt: 'desc' },
    })

    if (latest && isFresh(latest.createdAt.getTime())) {
      const value: LatestMarketResponse = {
        btcPriceUsd: latest.btcPriceUsd,
        difficulty: latest.difficulty,
        blockRewardBtc: latest.blockRewardBtc,
        updatedAt: latest.createdAt.toISOString(),
      }
      memoryCache = { value, fetchedAt: latest.createdAt.getTime() }
      return value
    }
  } catch {
    // Ignore DB errors; we'll still serve data using in-memory caching.
  }

  const data = await fetchExternalMarketData()
  const nowIso = new Date().toISOString()

  // Store snapshot in DB if possible
  try {
    const created = await prisma.marketSnapshot.create({
      data,
    })

    const value: LatestMarketResponse = {
      btcPriceUsd: created.btcPriceUsd,
      difficulty: created.difficulty,
      blockRewardBtc: created.blockRewardBtc,
      updatedAt: created.createdAt.toISOString(),
    }
    memoryCache = { value, fetchedAt: created.createdAt.getTime() }
    return value
  } catch {
    const value: LatestMarketResponse = { ...data, updatedAt: nowIso }
    memoryCache = { value, fetchedAt: Date.now() }
    return value
  }
}

export async function GET() {
  try {
    if (!inFlight) {
      inFlight = getLatestMarketSnapshot().finally(() => {
        inFlight = null
      })
    }

    const latest = await inFlight
    return NextResponse.json(latest)
  } catch (error) {
    console.error('Error fetching latest market data:', error)
    return NextResponse.json({ error: 'Failed to fetch market data' }, { status: 500 })
  }
}




