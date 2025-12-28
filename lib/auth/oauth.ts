import crypto from 'crypto'
import { NextRequest, NextResponse } from 'next/server'
import { OAuthProviderConfig, OAuthStateCookie, ProviderUserProfile } from './types'
import { isProduction } from './config'

const STATE_COOKIE_NAME = 'oauth_state'

function randomString(length = 96) {
  return crypto.randomBytes(length).toString('base64url')
}

function pkceChallenge(codeVerifier: string) {
  return crypto.createHash('sha256').update(codeVerifier).digest('base64url')
}

export function buildAuthorizationUrl(config: OAuthProviderConfig) {
  const state = crypto.randomUUID()
  const codeVerifier = randomString(64)
  const codeChallenge = pkceChallenge(codeVerifier)

  const url = new URL(config.authorizationEndpoint)
  url.searchParams.set('client_id', config.clientId)
  url.searchParams.set('redirect_uri', config.redirectUri)
  url.searchParams.set('response_type', 'code')
  url.searchParams.set('scope', config.scopes.join(' '))
  url.searchParams.set('state', state)
  url.searchParams.set('code_challenge', codeChallenge)
  url.searchParams.set('code_challenge_method', 'S256')

  if (config.name === 'Google') {
    url.searchParams.set('access_type', 'offline')
    url.searchParams.set('prompt', 'consent')
  }

  return {
    authorizationUrl: url.toString(),
    state,
    codeVerifier,
  }
}

export function persistStateCookie(response: NextResponse, payload: OAuthStateCookie) {
  response.cookies.set(STATE_COOKIE_NAME, JSON.stringify(payload), {
    httpOnly: true,
    secure: isProduction,
    sameSite: 'lax',
    maxAge: 600,
    path: `/auth/${payload.provider}`,
  })
}

export function readStateCookie(request: NextRequest) {
  const raw = request.cookies.get(STATE_COOKIE_NAME)?.value
  if (!raw) return null

  try {
    return JSON.parse(raw) as OAuthStateCookie
  } catch {
    return null
  }
}

export function clearStateCookie(response: NextResponse, provider: string) {
  response.cookies.set(STATE_COOKIE_NAME, '', {
    httpOnly: true,
    secure: isProduction,
    sameSite: 'lax',
    maxAge: 0,
    path: `/auth/${provider}`,
  })
}

export async function exchangeCodeForToken(
  config: OAuthProviderConfig,
  code: string,
  codeVerifier: string
) {
  const body = new URLSearchParams({
    client_id: config.clientId,
    client_secret: config.clientSecret,
    code,
    grant_type: 'authorization_code',
    redirect_uri: config.redirectUri,
    code_verifier: codeVerifier,
  })

  const tokenResponse = await fetch(config.tokenEndpoint, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body,
    cache: 'no-store',
  })

  if (!tokenResponse.ok) {
    const message = await tokenResponse.text()
    throw new Error(`Token exchange failed: ${message}`)
  }

  const json = await tokenResponse.json()
  const accessToken = json.access_token || json.accessToken

  if (!accessToken) {
    throw new Error('Missing access token in provider response')
  }

  return {
    accessToken: accessToken as string,
    idToken: json.id_token as string | undefined,
  }
}

export async function fetchProviderProfile(
  config: OAuthProviderConfig,
  accessToken: string
): Promise<ProviderUserProfile> {
  const userInfoResponse = await fetch(config.userInfoEndpoint, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: 'application/json',
      'User-Agent': 'cryptocoin-app',
    },
    cache: 'no-store',
  })

  if (!userInfoResponse.ok) {
    const message = await userInfoResponse.text()
    throw new Error(`Failed to fetch user profile: ${message}`)
  }

  const data = await userInfoResponse.json()

  if (config.name === 'Google') {
    return {
      email: data.email,
      name: data.name,
      avatarUrl: data.picture,
      providerUserId: data.sub,
    }
  }

  if (config.name === 'GitHub') {
    let email = data.email as string | null
    if (!email) {
      const emailsResponse = await fetch('https://api.github.com/user/emails', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: 'application/vnd.github+json',
          'User-Agent': 'cryptocoin-app',
        },
        cache: 'no-store',
      })

      if (emailsResponse.ok) {
        const emails = (await emailsResponse.json()) as Array<{
          email: string
          primary: boolean
          verified: boolean
        }>
        const primary = emails.find((entry) => entry.primary && entry.verified)
        email = primary?.email ?? emails.find((entry) => entry.verified)?.email ?? null
      }
    }

    return {
      email: email ?? '',
      name: data.name || data.login,
      avatarUrl: data.avatar_url,
      providerUserId: data.id?.toString?.() ?? '',
    }
  }

  throw new Error('Unsupported provider')
}

export { STATE_COOKIE_NAME }
