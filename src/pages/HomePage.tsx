import { lazy, Suspense } from "react";
import Hero from "../components/home/Hero";

const Sections = lazy(() => import("../components/home/Sections"));

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Suspense fallback={null}>
        <Sections />
      </Suspense>
    </main>
  );
}
