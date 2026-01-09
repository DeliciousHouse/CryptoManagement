export default function CookiePolicyPage() {
  const effectiveDate = 'January 7, 2026'

  return (
    <main className="min-h-screen pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-4xl font-bold mb-6">Cookie Policy</h1>
        <p className="text-sm text-gray-400 mb-8">Effective date: {effectiveDate}</p>

        <div className="space-y-8 text-gray-300 leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-2xl font-semibold text-foreground">1. What cookies are</h2>
            <p>
              Cookies are small text files stored on your device. Similar technologies (such as
              local storage) may also be used to remember preferences and help the Service function.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold text-foreground">2. How we use cookies</h2>
            <p>We may use cookies and similar technologies for:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <span className="font-medium text-foreground">Essential functionality</span> (for
                example, authentication, session management, and security).
              </li>
              <li>
                <span className="font-medium text-foreground">Preferences</span> (for example,
                remembering basic settings where applicable).
              </li>
              <li>
                <span className="font-medium text-foreground">Diagnostics</span> (for example,
                measuring performance and identifying errors).
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold text-foreground">3. Managing cookies</h2>
            <p>
              You can control cookies through your browser settings. You can also delete existing
              cookies. If you disable cookies, some features of the Service may not function
              properly (for example, staying signed in).
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold text-foreground">4. Changes</h2>
            <p>
              We may update this Cookie Policy from time to time. The “Effective date” above
              indicates when it was last updated.
            </p>
          </section>
        </div>
      </div>
    </main>
  )
}


