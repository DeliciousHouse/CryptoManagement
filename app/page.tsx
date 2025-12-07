import { Hero } from '@/components/landing/Hero'
import { WhySection } from '@/components/landing/WhySection'
import { ProcessSection } from '@/components/landing/ProcessSection'
import { OverviewCards } from '@/components/landing/OverviewCards'
import { FAQ } from '@/components/landing/FAQ'
import { ContactForm } from '@/components/landing/ContactForm'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <WhySection />
      <ProcessSection />
      <OverviewCards />
      <FAQ />
      <ContactForm />
    </main>
  )
}
