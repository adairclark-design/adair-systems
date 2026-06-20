import { Capabilities } from "@/components/Capabilities";
import { CaseStudy } from "@/components/CaseStudy";
import { Hero } from "@/components/Hero";
import { Methodology } from "@/components/Methodology";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Capabilities />
      <Methodology />
      <CaseStudy />
      <Footer />
    </main>
  );
}
