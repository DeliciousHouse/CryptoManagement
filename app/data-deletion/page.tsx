import Link from 'next/link'

export default function DataDeletionPage() {
  const effectiveDate = 'January 7, 2026'

  return (
    <main className="min-h-screen pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-4xl font-bold mb-6">Data Deletion</h1>
        <p className="text-sm text-gray-400 mb-8">Effective date: {effectiveDate}</p>

        <div className="space-y-8 text-gray-300 leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-2xl font-semibold text-foreground">Requesting deletion</h2>
            <p>
              You can request deletion of personal information associated with your use of the
              Service. To do so, submit a request using the contact form on the homepage.
            </p>
            <p>
              Please include enough information for us to locate your account or saved scenarios
              (for example, the email address used to sign in). We may need to verify your request
              before processing it.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold text-foreground">What we may delete</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Account identifiers used for authentication.</li>
              <li>Saved scenarios, site layouts, and associated metadata.</li>
              <li>Contact form submissions and support communications.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold text-foreground">What we may retain</h2>
            <p>
              We may retain limited information when necessary to comply with legal obligations,
              resolve disputes, enforce agreements, or maintain security (for example, records of
              abuse prevention).
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold text-foreground">Related policies</h2>
            <p>
              See our{' '}
              <Link href="/privacy-policy" className="text-accent-mining hover:underline">
                Privacy Policy
              </Link>{' '}
              for more information about how we handle personal information.
            </p>
          </section>
        </div>
      </div>
    </main>
  )
}

