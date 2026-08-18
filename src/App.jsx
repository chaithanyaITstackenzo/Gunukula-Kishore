import { useEffect, useState, Suspense, lazy } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import About from './components/About/About';
import Journey from './components/Journey/Journey';
import Responsibilities from './components/Responsibilities/Responsibilities';
import Achievements from './components/Achievements/Achievements';
import Footer from './components/Footer/Footer';
import LoadingScreen from './components/common/LoadingScreen';
import ScrollProgress from './components/common/ScrollProgress';
import CustomCursor from './components/common/CustomCursor';
import SectionFallback from './components/common/SectionFallback';
import StructuredData from './components/common/StructuredData';

// Code-split the heavier sections (Videos pulls in react-player's hls.js/dash.js,
// Gallery/Activities pull in Swiper) so the initial bundle stays lean.
const Activities = lazy(() => import('./components/Activities/Activities'));
const Gallery = lazy(() => import('./components/Gallery/Gallery'));
const Articles = lazy(() => import('./components/Articles/Articles'));
const Videos = lazy(() => import('./components/Videos/Videos'));
const Mission = lazy(() => import('./components/Mission/Mission'));
const Contact = lazy(() => import('./components/Contact/Contact'));

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init({ duration: 800, once: true, offset: 60 });
    const t = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <StructuredData />
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <LoadingScreen loading={loading} />
      <ScrollProgress />
       <CustomCursor />
      <Navbar />
      <main id="main-content">
        <Hero />
        <About />
        <Journey />
        <Responsibilities />
        <Achievements />
        <Suspense fallback={<SectionFallback />}><Activities /></Suspense>
        <Suspense fallback={<SectionFallback />}><Articles /></Suspense>
        <Suspense fallback={<SectionFallback />}><Gallery /></Suspense>
        <Suspense fallback={<SectionFallback />}><Videos /></Suspense>
        <Suspense fallback={<SectionFallback />}><Mission /></Suspense>
        <Suspense fallback={<SectionFallback />}><Contact /></Suspense>
      </main>
      <Footer />
    </>
  );
}