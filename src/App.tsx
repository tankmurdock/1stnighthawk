import { lazy, Suspense, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import SmoothScroll, { useLenis } from "./components/layout/SmoothScroll";
import Nav from "./components/layout/Nav";
import Footer from "./components/layout/Footer";
import Grain from "./components/layout/Grain";
import PageTransition from "./components/layout/PageTransition";
import { site } from "./lib/content";
import { usePageTitle } from "./hooks/usePageTitle";

import HomePage from "./pages/HomePage";

// Route-level code splitting — the 3D and lab bundles never load on
// the pages that don't need them.
const WorkPage = lazy(() => import("./pages/WorkPage"));
const WorkDetailPage = lazy(() => import("./pages/WorkDetailPage"));
const LabPage = lazy(() => import("./pages/LabPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  const lenis = useLenis();

  useEffect(() => {
    if (hash) {
      // let the target render before scrolling to it
      const id = hash.replace("#", "");
      requestAnimationFrame(() => {
        const el = document.getElementById(id);
        if (el) {
          if (lenis) lenis.scrollTo(el, { offset: -80 });
          else el.scrollIntoView({ block: "start" });
        }
      });
      return;
    }

    if (lenis) lenis.scrollTo(0, { immediate: true });
    else window.scrollTo(0, 0);
  }, [pathname, hash, lenis]);

  return null;
}

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <Routes location={location} key={location.pathname}>
      <Route
        path="/"
        element={
          <PageTransition>
            <HomePage />
          </PageTransition>
        }
      />
      <Route
        path="/work"
        element={
          <PageTransition>
            <Suspense fallback={<RouteFallback />}>
              <WorkPage />
            </Suspense>
          </PageTransition>
        }
      />
      <Route
        path="/work/:slug"
        element={
          <PageTransition>
            <Suspense fallback={<RouteFallback />}>
              <WorkDetailPage />
            </Suspense>
          </PageTransition>
        }
      />
      <Route
        path="/lab"
        element={
          <PageTransition>
            <Suspense fallback={<RouteFallback />}>
              <LabPage />
            </Suspense>
          </PageTransition>
        }
      />
      <Route
        path="/contact"
        element={
          <PageTransition>
            <Suspense fallback={<RouteFallback />}>
              <ContactPage />
            </Suspense>
          </PageTransition>
        }
      />
        <Route
          path="*"
          element={
            <PageTransition>
              <NotFoundPage />
            </PageTransition>
          }
        />
      </Routes>
  );
}

function RouteFallback() {
  return <div className="min-h-[70vh]" />;
}

/* Any unknown URL lands here rather than on a blank screen. With the
   vercel.json rewrite, a typo'd link renders inside the real shell. */
function NotFoundPage() {
  usePageTitle(`Page not found — ${site.name}`);

  return (
    <main className="flex min-h-[75vh] flex-col items-center justify-center px-6 py-32 text-center">
      <p className="label mb-6 text-sodium/70">404</p>
      <h1 className="display max-w-[16ch] text-[clamp(2rem,5.5vw,4rem)] text-bone">
        This page isn&rsquo;t part of the build.
      </h1>
      <p className="mt-6 max-w-md font-sans text-[15px] leading-relaxed text-bone/50">
        The link may be old, or I may have moved something. The good stuff is
        one click away.
      </p>
      <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
        <Link
          to="/work"
          className="bg-bone px-7 py-4 font-mono text-[11px] uppercase tracking-[0.2em] text-void transition-colors duration-300 hover:bg-sodium"
        >
          See the work
        </Link>
        <Link
          to="/"
          className="border border-haze px-7 py-4 font-mono text-[11px] uppercase tracking-[0.2em] text-bone/70 transition-colors duration-300 hover:border-sodium/60 hover:text-bone"
        >
          Back home
        </Link>
      </div>
    </main>
  );
}

export default function App() {
  return (
    <Router>
      <SmoothScroll>
        <ScrollToTop />
        <Grain />
        <Nav />
        <div className="overflow-x-hidden">
          <AnimatedRoutes />
          <Footer />
        </div>
      </SmoothScroll>
    </Router>
  );
}
