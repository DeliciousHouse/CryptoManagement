import { NextResponse, type NextRequest } from 'next/server'
import { buildAuthorizationUrl, persistStateCookie } from '@/lib/auth/oauth'
import { getProviderConfig } from '@/lib/auth/config'

export async function GET(_request: NextRequest, { params }: { params: { provider: string } }) {
  try {
    const config = getProviderConfig(params.provider)
    const { authorizationUrl, state, codeVerifier } = buildAuthorizationUrl(config)

    const response = NextResponse.redirect(authorizationUrl)
    persistStateCookie(response, { state, codeVerifier, provider: params.provider })

    return response
  } catch (error) {
    console.error('OAuth start error:', error)
    return NextResponse.json({ error: 'Unable to start OAuth flow' }, { status: 400 })
  }
}
