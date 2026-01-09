export default function AccessibilityPage() {
  const effectiveDate = 'January 7, 2026'

  return (
    <main className="min-h-screen pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-4xl font-bold mb-6">Accessibility Statement</h1>
        <p className="text-sm text-gray-400 mb-8">Effective date: {effectiveDate}</p>

        <div className="space-y-8 text-gray-300 leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-2xl font-semibold text-foreground">Our commitment</h2>
            <p>
              We are committed to providing a website that is accessible to the broadest possible
              audience, regardless of technology or ability. We aim to improve usability and
              accessibility over time.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold text-foreground">Conformance goals</h2>
            <p>
              We strive to follow the Web Content Accessibility Guidelines (WCAG) and recognized best
              practices for accessibility. Because the Service evolves, some content may not yet be
              fully accessible.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold text-foreground">Feedback and assistance</h2>
            <p>
              If you experience difficulty accessing any part of the site or have suggestions to
              improve accessibility, please contact us using the contact form on the homepage. When
              possible, include the page URL, what you were trying to do, and your browser/device.
            </p>
          </section>
        </div>
      </div>
    </main>
  )
}

