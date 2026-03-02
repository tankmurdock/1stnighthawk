import { Suspense, useState, useEffect } from "react";
import Hero3D from "../components/home/Hero3D";
import BrandIntro from "../components/home/BrandIntro";
import HeroContent from "../components/home/HeroContent";
import Services from "../components/home/Services";
import FeaturedWork from "../components/home/FeaturedWork";
import TestimonialsMarquee from "../components/home/TestimonialsMarquee";
import HomeCTA from "../components/home/HomeCTA";

function HeroFallback() {
  return (
    <div className="absolute inset-0 bg-gradient-to-b from-brand-navy via-surface-300 to-brand-navy" />
  );
}

export default function HomePage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <main>
      <BrandIntro />

      <section className="relative min-h-screen overflow-hidden">
        <Suspense fallback={<HeroFallback />}>
          <Hero3D mousePosition={mousePosition} />
        </Suspense>
        <HeroContent />
      </section>

      <Services />
      <FeaturedWork />
      <TestimonialsMarquee />
      <HomeCTA />
    </main>
  );
}
