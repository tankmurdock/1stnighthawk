import { useState, useCallback } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import SmoothScroll from "./components/layout/SmoothScroll";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import CustomCursor from "./components/layout/CustomCursor";
import Preloader from "./components/layout/Preloader";
import PageTransition from "./components/layout/PageTransition";
import NoiseOverlay from "./components/shared/NoiseOverlay";
import ScrollProgress from "./components/shared/ScrollProgress";
import HomePage from "./pages/HomePage";
import WorkPage from "./pages/WorkPage";
import ContactPage from "./pages/ContactPage";

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
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
              <WorkPage />
            </PageTransition>
          }
        />
        <Route
          path="/contact"
          element={
            <PageTransition>
              <ContactPage />
            </PageTransition>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  const [introComplete, setIntroComplete] = useState(false);

  const handleIntroComplete = useCallback(() => {
    setIntroComplete(true);
  }, []);

  return (
    <Router>
      <SmoothScroll>
        <div className="min-h-screen bg-brand-navy">
          <Preloader onComplete={handleIntroComplete} />
          <CustomCursor />
          <NoiseOverlay />
          <ScrollProgress />
          <Navbar introComplete={introComplete} />
          <div className="overflow-x-hidden">
            <AnimatedRoutes />
            <Footer />
          </div>
        </div>
      </SmoothScroll>
    </Router>
  );
}

export default App;
