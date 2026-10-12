import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Location from "@/components/Location";
import Implantation from "@/components/Implantation";
import Access from "@/components/Access";
import SocialZone from "@/components/SocialZone";
import Amenities from "@/components/Amenities";
import Gallery from "@/components/Gallery";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import RevealObserver from "@/components/RevealObserver";

export default function Home() {
  return (
    <>
      <a href="#contenido" className="skip-link">
        Saltar al contenido
      </a>
      <Header />
      <main id="contenido">
        <Hero />
        <About />
        <Location />
        <Implantation />
        <Access />
        <SocialZone />
        <Amenities />
        <Gallery />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
      <RevealObserver />
    </>
  );
}
