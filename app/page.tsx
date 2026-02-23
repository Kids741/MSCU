import Navbar from "@/components/navbar"
import Hero from "@/components/hero"
import About from "@/components/about"
import MissionVision from "@/components/mission-vision"
import UpcomingEvents from "@/components/upcoming-events"
import Resources from "@/components/resources"
import PhotoGallery from "@/components/photo-gallery"
import Testimonials from "@/components/testimonials"
import Footer from "@/components/footer"
import ThemeOfYear from "@/components/ThemeOfYear"

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <About />
      <MissionVision />
      <ThemeOfYear />
      <UpcomingEvents />
      <Resources />
      <PhotoGallery />
      <Testimonials />
      <Footer />
    </main>
  )
}
