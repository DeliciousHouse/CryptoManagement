export default function DisclaimerPage() {
  const effectiveDate = 'January 7, 2026'

  return (
    <main className="min-h-screen pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-4xl font-bold mb-6">Disclaimer</h1>
        <p className="text-sm text-gray-400 mb-8">Effective date: {effectiveDate}</p>

        <div className="space-y-8 text-gray-300 leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-2xl font-semibold text-foreground">1. No professional advice</h2>
            <p>
              The content, tools, calculators, and forecasts on this website are provided for
              informational purposes only and do not constitute financial, investment, legal, tax,
              or accounting advice. You should consult qualified professionals before making
              decisions.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold text-foreground">2. Assumptions and estimates</h2>
            <p>
              Calculations and forecasts are estimates based on user-provided inputs and/or external
              data sources. Results may differ materially from real-world outcomes due to changes in
              network difficulty, Bitcoin price, pool performance, fees, curtailment, downtime,
              stale/reject/orphan rates, hardware variance, and other variables.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold text-foreground">3. Risk acknowledgment</h2>
            <p>
              Bitcoin mining and related activities involve risk, including the risk of financial
              loss. You are solely responsible for your decisions and for verifying any information
              before relying on it.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold text-foreground">4. Third-party content</h2>
            <p>
              The Service may include or reference third-party content or data. We do not warrant
              the accuracy, completeness, or timeliness of third-party information.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold text-foreground">5. Use at your own risk</h2>
            <p>
              To the maximum extent permitted by law, we disclaim all warranties and will not be
              liable for losses or damages arising from your use of this website.
            </p>
          </section>
        </div>
      </div>
    </main>
  )
}


