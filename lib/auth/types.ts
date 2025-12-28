export interface OAuthProviderConfig {
  name: string
  authorizationEndpoint: string
  tokenEndpoint: string
  userInfoEndpoint: string
  scopes: string[]
  usePkce: boolean
  clientId: string
  clientSecret: string
  redirectUri: string
}

export interface OAuthStateCookie {
  state: string
  codeVerifier: string
  provider: string
}

export interface ProviderUserProfile {
  email: string
  name?: string | null
  avatarUrl?: string | null
  providerUserId: string
}
