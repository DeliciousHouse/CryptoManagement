import crypto from 'crypto'
import { NextResponse } from 'next/server'
import { isProduction } from './config'

const SESSION_COOKIE_NAME = 'session_token'
const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 30 // 30 days

function sessionSecret() {
  const secret = process.env.SESSION_SECRET
  if (!secret) {
    throw new Error('SESSION_SECRET is required to sign session cookies')
  }
  return secret
}

function sign(value: string) {
  return crypto.createHmac('sha256', sessionSecret()).update(value).digest('base64url')
}

export function setSessionCookie(
  response: NextResponse,
  payload: { userId: string; provider: string }
) {
  const data = {
    ...payload,
    expiresAt: Date.now() + SESSION_MAX_AGE_SECONDS * 1000,
  }

  const encoded = Buffer.from(JSON.stringify(data)).toString('base64url')
  const signature = sign(encoded)

  response.cookies.set(SESSION_COOKIE_NAME, `${encoded}.${signature}`, {
    httpOnly: true,
    secure: isProduction,
    sameSite: 'lax',
    maxAge: SESSION_MAX_AGE_SECONDS,
    path: '/',
  })

  return response
}

export function clearSessionCookie(response: NextResponse) {
  response.cookies.set(SESSION_COOKIE_NAME, '', {
    httpOnly: true,
    secure: isProduction,
    sameSite: 'lax',
    maxAge: 0,
    path: '/',
  })
}

export { SESSION_COOKIE_NAME }
