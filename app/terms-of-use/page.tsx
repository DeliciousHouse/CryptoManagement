export default function TermsOfUsePage() {
  const effectiveDate = 'January 7, 2026'

  return (
    <main className="min-h-screen pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-4xl font-bold mb-6">Terms of Use</h1>
        <p className="text-sm text-gray-400 mb-8">Effective date: {effectiveDate}</p>

        <div className="space-y-8 text-gray-300 leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-2xl font-semibold text-foreground">1. Agreement</h2>
            <p>
              By accessing or using this website and its features (the “Service”), you agree to be
              bound by these Terms of Use. If you do not agree, do not use the Service.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold text-foreground">2. Informational tools (no advice)</h2>
            <p>
              The Service provides calculators, forecasts, scenario planning, and other information
              for informational purposes only. Nothing on the Service constitutes financial,
              investment, legal, tax, or accounting advice, and you should consult qualified
              professionals for advice specific to your situation.
            </p>
            <p>
              Estimates may not reflect real-world outcomes. Mining performance and profitability
              can vary due to network difficulty, Bitcoin price movements, fees, curtailment,
              downtime, pool luck, stale/reject/orphan rates, hardware variance, and many other
              factors.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold text-foreground">3. Eligibility</h2>
            <p>
              You must be legally able to enter into a binding agreement to use the Service. If you
              use the Service on behalf of an organization, you represent that you have authority to
              bind that organization to these Terms.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold text-foreground">4. Accounts and authentication</h2>
            <p>
              Some features may require signing in. You are responsible for maintaining the
              confidentiality of your credentials and for all activity that occurs under your
              account.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold text-foreground">5. Acceptable use</h2>
            <p>You agree not to:</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-300">
              <li>Use the Service in a way that violates applicable laws or regulations.</li>
              <li>
                Attempt to access, probe, or disrupt the Service, other users, or underlying systems
                (including via scraping, denial-of-service, or automated abuse).
              </li>
              <li>
                Upload or transmit malicious code, or attempt to reverse engineer or bypass
                security-related features.
              </li>
              <li>Misrepresent your identity or your affiliation with any person or entity.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold text-foreground">6. Your content and scenario data</h2>
            <p>
              If you save scenarios, layouts, or other inputs, you retain ownership of your content.
              You grant us a limited license to host, store, and process that content solely to
              operate and improve the Service.
            </p>
            <p>
              You are responsible for the content you submit and for ensuring you have the rights
              to provide it.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold text-foreground">7. Intellectual property</h2>
            <p>
              The Service (including its design, text, graphics, and software) is owned by us or our
              licensors and is protected by applicable intellectual property laws. You may not copy,
              modify, distribute, sell, or lease any part of the Service except as expressly
              permitted by these Terms.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold text-foreground">8. Third-party services and links</h2>
            <p>
              The Service may reference or link to third-party websites, APIs, or services. We do not
              control and are not responsible for third-party content, policies, or practices. Your
              use of third-party services is at your own risk and may be subject to separate terms.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold text-foreground">9. Disclaimer of warranties</h2>
            <p>
              The Service is provided “as is” and “as available.” To the maximum extent permitted by
              law, we disclaim all warranties, express or implied, including warranties of
              merchantability, fitness for a particular purpose, and non-infringement.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold text-foreground">10. Limitation of liability</h2>
            <p>
              To the maximum extent permitted by law, we will not be liable for any indirect,
              incidental, special, consequential, or punitive damages, or any loss of profits,
              revenues, data, goodwill, or other intangible losses arising out of or related to your
              use of (or inability to use) the Service.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold text-foreground">11. Changes to the Service or Terms</h2>
            <p>
              We may modify, suspend, or discontinue the Service at any time. We may also update
              these Terms from time to time. Continued use of the Service after changes become
              effective means you accept the updated Terms.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold text-foreground">12. Contact</h2>
            <p>
              Questions about these Terms? Contact us using the contact form on the homepage.
            </p>
          </section>
        </div>
      </div>
    </main>
  )
}


