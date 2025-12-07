import React from 'react'

interface CardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
}

export function Card({ children, className = '', hover = false }: CardProps) {
  return (
    <div
      className={`bg-surface-elevated rounded-xl p-6 border border-border ${
        hover ? 'transition-all duration-200 hover:border-accent-mining hover:shadow-lg hover:shadow-accent-mining/20' : ''
      } ${className}`}
    >
      {children}
    </div>
  )
}

