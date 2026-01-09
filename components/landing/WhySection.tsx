import { Card } from '@/components/ui/Card'

const benefits = [
  {
    title: 'Scalability',
    description:
      'Easily expand your mining operation by adding modular units as your needs grow.',
  },
  {
    title: 'Mobility',
    description:
      'Deploy mining infrastructure quickly and relocate containers to optimal locations.',
  },
  {
    title: 'Efficiency',
    description:
      'Optimize power consumption and cooling with purpose-built container designs.',
  },
  {
    title: 'Cost Control',
    description:
      'Reduce capital expenditure and operational costs through modular deployment.',
  },
]

export function WhySection() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
          Why Modular Bitcoin Mining?
        </h2>
        <p className="text-xl text-gray-400 text-center mb-16 max-w-2xl mx-auto">
          Modern mining operations require flexibility, efficiency, and
          scalability. Modular solutions deliver all three.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <Card key={index} hover>
              <h3 className="text-xl font-semibold mb-3 text-accent-mining">
                {benefit.title}
              </h3>
              <p className="text-gray-400">{benefit.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

