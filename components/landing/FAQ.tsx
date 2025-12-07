'use client'

import { useState } from 'react'

const faqs = [
  {
    question: 'What is containerized Bitcoin mining?',
    answer:
      'Containerized mining involves deploying Bitcoin mining hardware in purpose-built shipping containers. This approach offers mobility, scalability, and optimized cooling and power distribution.',
  },
  {
    question: 'How do I calculate mining profitability?',
    answer:
      'Use our profitability calculator to input your hashrate, power consumption, energy costs, and current Bitcoin price. The tool calculates daily, monthly, and yearly revenue projections.',
  },
  {
    question: 'Can I plan my site layout in 3D?',
    answer:
      'Yes! Our 3D site planner allows you to place containers and generators on a virtual site, adjust layout parameters, and visualize your deployment before installation.',
  },
  {
    question: 'How accurate are the calculations?',
    answer:
      'Our calculators use industry-standard formulas and real-time market data. However, actual mining results depend on network difficulty, pool performance, and market volatility.',
  },
  {
    question: 'Can I save my scenarios?',
    answer:
      'Yes, you can save your calculator inputs and site layouts as scenarios. Each scenario gets a unique shareable link that you can access anytime.',
  },
]

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section className="py-24 px-6 bg-surface-elevated">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-surface border border-border rounded-lg overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-surface-elevated transition-colors"
              >
                <span className="font-semibold text-lg">{faq.question}</span>
                <span className="text-2xl text-gray-400">
                  {openIndex === index ? '−' : '+'}
                </span>
              </button>
              {openIndex === index && (
                <div className="px-6 py-4 text-gray-400 border-t border-border">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

