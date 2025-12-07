'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Log to console for now (as per plan)
    console.log('Contact form submission:', formData)

    // In production, this would POST to /api/contact
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setFormData({ name: '', email: '', message: '' })
    }, 3000)
  }

  return (
    <section className="py-24 px-6">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
          Get in Touch
        </h2>
        <p className="text-xl text-gray-400 text-center mb-12">
          Have questions? We'd love to hear from you.
        </p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label="Name"
            type="text"
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
            required
          />
          <Input
            label="Email"
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            required
          />
          <div className="w-full">
            <label className="block text-sm font-medium text-foreground mb-2">
              Message
            </label>
            <textarea
              className="w-full px-4 py-2 bg-surface border border-border rounded-lg text-foreground placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-accent-mining focus:border-transparent transition-all min-h-[120px]"
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
              required
            />
          </div>
          <Button type="submit" variant="primary" size="lg" className="w-full">
            {submitted ? 'Message Sent!' : 'Send Message'}
          </Button>
        </form>
      </div>
    </section>
  )
}

