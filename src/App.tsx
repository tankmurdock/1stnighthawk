import { lazy, Suspense, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import SmoothScroll, { useLenis } from "./components/layout/SmoothScroll";
import Nav from "./components/layout/Nav";
import Footer from "./components/layout/Footer";
import Cursor from "./components/ui/Interactive";
import Grain from "./components/layout/Grain";
import PageTransition from "./components/layout/PageTransition";

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
    </Routes>
  );
}

function RouteFallback() {
  return <div className="min-h-[70vh]" />;
}

export default function App() {
  return (
    <Router>
      <SmoothScroll>
        <ScrollToTop />
        <Grain />
        <Cursor />
        <Nav />
        <div className="overflow-x-hidden">
          <AnimatedRoutes />
          <Footer />
        </div>
      </SmoothScroll>
    </Router>
  );
}
