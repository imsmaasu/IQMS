import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import WhatsAppFloatingButton from './components/WhatsAppButton';
import Home from './pages/Home';
import SubjectsLevels from './pages/SubjectsLevels';
import Enroll from './pages/Enroll';
import NotFound from './pages/NotFound';

/**
 * IQMS STEM SEED PARKS
 * Phase 1 Application Root
 * 
 * Future-proof modular structure:
 * - Plug tutor directory / profiles in /tutors
 * - Plug student dashboard in /dashboard
 * - Plug authentication in /auth
 */
export default function App() {
  return (
    <div className="app-wrapper" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Route change scroll reset */}
      <ScrollToTop />

      {/* Sticky Navigation Header */}
      <Navbar />

      {/* Main Page Routing */}
      <main style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/subjects-and-levels" element={<SubjectsLevels />} />
          <Route path="/enroll" element={<Enroll />} />
          
          {/* 404 Catch-All Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      {/* Shared Academic Footer */}
      <Footer />

      {/* Universal Floating WhatsApp Quick Chat Button */}
      <WhatsAppFloatingButton />
    </div>
  );
}
