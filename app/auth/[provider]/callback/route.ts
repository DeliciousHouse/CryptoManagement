import { NextResponse, type NextRequest } from 'next/server'
import { getAppBaseUrl, getProviderConfig } from '@/lib/auth/config'
import {
  clearStateCookie,
  exchangeCodeForToken,
  fetchProviderProfile,
  readStateCookie,
} from '@/lib/auth/oauth'
import { setSessionCookie } from '@/lib/auth/session'
import { upsertUserFromOAuth } from '@/lib/auth/user'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ provider: string }> }
) {
  const { provider } = await params
  const code = request.nextUrl.searchParams.get('code')
  const state = request.nextUrl.searchParams.get('state')

  if (!code || !state) {
    return NextResponse.json(
      { error: 'Missing authorization code or state parameter' },
      { status: 400 }
    )
  }

  let config
  try {
    config = getProviderConfig(provider)
  } catch (error) {
    console.error('Unsupported provider:', error)
    return NextResponse.json({ error: 'Unsupported provider' }, { status: 400 })
  }

  const savedState = readStateCookie(request)
  if (!savedState || savedState.state !== state || savedState.provider !== provider) {
    return NextResponse.json({ error: 'Invalid OAuth state' }, { status: 400 })
  }

  try {
    const tokens = await exchangeCodeForToken(config, code, savedState.codeVerifier)
    const profile = await fetchProviderProfile(config, tokens.accessToken)
    const user = await upsertUserFromOAuth(provider, profile)

    const response = NextResponse.redirect(getAppBaseUrl())
    clearStateCookie(response, provider)
    setSessionCookie(response, { userId: user.id, provider })

    return response
  } catch (error) {
    console.error('OAuth callback error:', error)
    return NextResponse.json({ error: 'OAuth callback failed' }, { status: 400 })
  }
}
