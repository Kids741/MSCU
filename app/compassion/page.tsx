import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import CompassionHero from "@/components/compassion/compassion-hero"
import CompassionSundayBanner from "@/components/compassion/compassion-sunday-banner"
import VerseCarousel from "@/components/compassion/verse-carousel"
import PaybillSection from "@/components/compassion/paybill-section"
import AssistanceSection from "@/components/compassion/assistance-section"
import AnonymousMessageForm from "@/components/compassion/anonymous-message-form"
import CompassionContact from "@/components/compassion/compassion-contact"

export default function CompassionPage() {
  return (
    <main>
      <Navbar />
      <CompassionHero />
      <CompassionSundayBanner />
      <VerseCarousel />
      <PaybillSection />
      <AssistanceSection />
      <AnonymousMessageForm />
      <CompassionContact />
      <Footer />
    </main>
  )
}
