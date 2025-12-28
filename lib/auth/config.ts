import { OAuthProviderConfig } from './types'

const isProduction = process.env.NODE_ENV === 'production'

function requireEnv(name: string) {
  const value = process.env[name]
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`)
  }
  return value
}

function appBaseUrl() {
  const value =
    process.env.APP_URL || process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

  if (isProduction && value.startsWith('http://')) {
    throw new Error('APP_URL / NEXT_PUBLIC_APP_URL must be https in production')
  }

  return value.replace(/\/$/, '')
}

const providerDefaults: Record<string, Omit<OAuthProviderConfig, 'clientId' | 'clientSecret' | 'redirectUri'>> = {
  google: {
    name: 'Google',
    authorizationEndpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
    tokenEndpoint: 'https://oauth2.googleapis.com/token',
    userInfoEndpoint: 'https://www.googleapis.com/oauth2/v3/userinfo',
    scopes: ['openid', 'email', 'profile'],
    usePkce: true,
  },
  github: {
    name: 'GitHub',
    authorizationEndpoint: 'https://github.com/login/oauth/authorize',
    tokenEndpoint: 'https://github.com/login/oauth/access_token',
    userInfoEndpoint: 'https://api.github.com/user',
    scopes: ['read:user', 'user:email'],
    usePkce: true,
  },
}

export function getProviderConfig(providerKey: string): OAuthProviderConfig {
  const baseConfig = providerDefaults[providerKey]

  if (!baseConfig) {
    throw new Error('Unsupported OAuth provider')
  }

  const envPrefix = providerKey.toUpperCase()

  return {
    ...baseConfig,
    clientId: requireEnv(`${envPrefix}_CLIENT_ID`),
    clientSecret: requireEnv(`${envPrefix}_CLIENT_SECRET`),
    redirectUri: `${appBaseUrl()}/auth/${providerKey}/callback`,
  }
}

export function getAppBaseUrl() {
  return appBaseUrl()
}

export { isProduction }
