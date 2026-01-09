export default function PrivacyPolicyPage() {
  const effectiveDate = 'January 7, 2026'

  return (
    <main className="min-h-screen pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-4xl font-bold mb-6">Privacy Policy</h1>
        <p className="text-sm text-gray-400 mb-8">Effective date: {effectiveDate}</p>

        <div className="space-y-8 text-gray-300 leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-2xl font-semibold text-foreground">1. Overview</h2>
            <p>
              This Privacy Policy explains how we collect, use, disclose, and protect information
              when you use this website and its features (the “Service”).
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold text-foreground">2. Information we collect</h2>
            <p>We may collect the following categories of information:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <span className="font-medium text-foreground">Information you provide</span> (for
                example, your name/email when submitting the contact form, and scenario names/inputs
                you save).
              </li>
              <li>
                <span className="font-medium text-foreground">Authentication information</span> if
                you sign in via an OAuth provider (for example, a provider identifier and basic
                profile information made available by the provider).
              </li>
              <li>
                <span className="font-medium text-foreground">Usage and device data</span> (for
                example, IP address, browser type, pages viewed, approximate location derived from
                IP, and timestamps) used to operate, secure, and improve the Service.
              </li>
              <li>
                <span className="font-medium text-foreground">Cookies and similar technologies</span>{' '}
                used for essential functionality such as authentication and session management. See
                our Cookie Policy for details.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold text-foreground">3. How we use information</h2>
            <p>We use information to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Provide and operate the Service (including saving and loading scenarios).</li>
              <li>Respond to inquiries and provide support.</li>
              <li>Maintain security, prevent fraud/abuse, and debug issues.</li>
              <li>Improve performance, features, and user experience.</li>
              <li>Comply with legal obligations and enforce our terms.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold text-foreground">4. How we share information</h2>
            <p>
              We do not sell your personal information. We may share information in the following
              situations:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <span className="font-medium text-foreground">Service providers</span> that help us
                run the Service (for example, hosting, storage, database, and authentication).
              </li>
              <li>
                <span className="font-medium text-foreground">Legal and safety</span> when required
                by law, lawful process, or to protect the rights, property, and safety of users or
                others.
              </li>
              <li>
                <span className="font-medium text-foreground">Business transfers</span> in
                connection with a merger, acquisition, reorganization, or sale of assets.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold text-foreground">5. Data retention</h2>
            <p>
              We retain information for as long as necessary to provide the Service, comply with
              legal obligations, resolve disputes, and enforce agreements. You may request deletion
              of your data (see “Your choices” below).
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold text-foreground">6. Security</h2>
            <p>
              We implement reasonable administrative, technical, and organizational safeguards
              designed to protect information. However, no method of transmission or storage is 100%
              secure, and we cannot guarantee absolute security.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold text-foreground">7. Your choices</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <span className="font-medium text-foreground">Cookies</span>: you can control cookies
                through your browser settings (note that disabling cookies may impact features).
              </li>
              <li>
                <span className="font-medium text-foreground">Access / deletion</span>: you may
                request access to or deletion of your personal information using the instructions on
                our Data Deletion page.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold text-foreground">8. Children’s privacy</h2>
            <p>
              The Service is not intended for children, and we do not knowingly collect personal
              information from children.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold text-foreground">9. Changes to this policy</h2>
            <p>
              We may update this Privacy Policy from time to time. The “Effective date” above
              indicates when it was last updated.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold text-foreground">10. Contact</h2>
            <p>
              Questions about this policy? Contact us using the contact form on the homepage.
            </p>
          </section>
        </div>
      </div>
    </main>
  )
}


