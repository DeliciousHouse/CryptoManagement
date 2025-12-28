'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/Button'

type Layout = 'inline' | 'stack'

interface LoginButtonsProps {
  layout?: Layout
}

const providers = [
  { key: 'google', label: 'Continue with Google' },
  { key: 'github', label: 'Continue with GitHub' },
]

export function LoginButtons({ layout = 'inline' }: LoginButtonsProps) {
  const router = useRouter()

  const handleLogin = (provider: string) => {
    router.push(`/auth/${provider}/start`)
  }

  const containerClasses =
    layout === 'stack'
      ? 'flex flex-col gap-3'
      : 'flex flex-col sm:flex-row gap-3 items-center'

  return (
    <div className={containerClasses}>
      {providers.map((provider) => (
        <Button
          key={provider.key}
          variant="secondary"
          size="md"
          onClick={() => handleLogin(provider.key)}
          className="w-full sm:w-auto"
        >
          {provider.label}
        </Button>
      ))}
    </div>
  )
}
