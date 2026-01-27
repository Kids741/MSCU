import Header from "@/components/header"
import Hero from "@/components/hero"
import About from "@/components/about"
import MissionVision from "@/components/mission-vision"
import ScriptureOfWeek from "@/components/scripture-of-week"
import UpcomingEvents from "@/components/upcoming-events"
import Resources from "@/components/resources"
import PhotoGallery from "@/components/photo-gallery"
import Testimonials from "@/components/testimonials"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <About />
      <MissionVision />
      <ScriptureOfWeek />
      <UpcomingEvents />
      <Resources />
      <PhotoGallery />
      <Testimonials />
      <Footer />
    </main>
  )
}
