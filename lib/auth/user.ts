import type { User } from '@prisma/client'
import { prisma } from '@/lib/db/prisma'
import { ProviderUserProfile } from './types'

export async function upsertUserFromOAuth(
  provider: string,
  profile: ProviderUserProfile
): Promise<User> {
  if (!profile.email) {
    throw new Error('Email address is required to create an account')
  }

  const existingByProvider = await prisma.user.findUnique({
    where: {
      oauthProvider_oauthProviderUserId: {
        oauthProvider: provider,
        oauthProviderUserId: profile.providerUserId,
      },
    },
  })

  if (existingByProvider) {
    return existingByProvider
  }

  const existingByEmail = await prisma.user.findUnique({
    where: { email: profile.email },
  })

  if (existingByEmail) {
    return prisma.user.update({
      where: { id: existingByEmail.id },
      data: {
        oauthProvider: provider,
        oauthProviderUserId: profile.providerUserId,
        name: profile.name ?? existingByEmail.name,
        avatarUrl: profile.avatarUrl ?? existingByEmail.avatarUrl,
      },
    })
  }

  return prisma.user.create({
    data: {
      email: profile.email,
      name: profile.name ?? null,
      avatarUrl: profile.avatarUrl ?? null,
      oauthProvider: provider,
      oauthProviderUserId: profile.providerUserId,
    },
  })
}
