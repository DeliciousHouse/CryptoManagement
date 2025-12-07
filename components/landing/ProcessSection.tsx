const steps = [
  {
    number: '01',
    title: 'Site Assessment',
    description:
      'We evaluate your location, power availability, and infrastructure requirements.',
  },
  {
    number: '02',
    title: 'Design & Engineering',
    description:
      'Our team designs an optimized layout using advanced planning tools and 3D visualization.',
  },
  {
    number: '03',
    title: 'Deployment',
    description:
      'Containerized units are delivered and installed with minimal site disruption.',
  },
  {
    number: '04',
    title: 'Operations',
    description:
      'Ongoing monitoring and optimization ensure maximum efficiency and profitability.',
  },
]

export function ProcessSection() {
  return (
    <section className="py-24 px-6 bg-surface-elevated">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
          Our Process
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="text-6xl font-bold text-accent-mining/20 mb-4">
                {step.number}
              </div>
              <h3 className="text-2xl font-semibold mb-3">{step.title}</h3>
              <p className="text-gray-400">{step.description}</p>
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-full w-full h-0.5 bg-border transform translate-x-4" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

