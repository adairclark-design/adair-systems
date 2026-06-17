import { Capabilities } from "@/components/Capabilities";
import { CaseStudy } from "@/components/CaseStudy";
import { Hero } from "@/components/Hero";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Capabilities />
      <CaseStudy />
      <Footer />
    </main>
  );
}
