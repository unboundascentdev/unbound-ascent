import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import Problem from "@/components/Problem";
import Qualifier from "@/components/Qualifier";
import Testimonials from "@/components/Testimonials";
import Process from "@/components/Process";
import About from "@/components/About";
import Cta from "@/components/Cta";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <Problem />
        <Qualifier />
        <Testimonials />
        <Process />
        <About />
        <Cta />
      </main>
      <Footer />
    </>
  );
}
