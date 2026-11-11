import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import Construction from './pages/Construction';
import Software from './pages/Software';
import Education from './pages/Education';
import EducationEnroll from './pages/EducationEnroll';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import DivisionPage from './pages/DivisionPage';
import divisions from './data/divisions';

const MarriageBureau = lazy(() => import('./pages/MarriageBureau'));

// Map of custom override components for existing divisions
const customDivisionPages = {
  construction: <Construction />,
  software: <Software />,
  education: <Education />,
  marriage: (
    <Suspense
      fallback={
        <div className="container section-spacing" style={{ textAlign: 'center' }}>
          Loading Marriage Bureau…
        </div>
      }
    >
      <MarriageBureau />
    </Suspense>
  ),
};

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          
          {/* Dynamic division routes derived directly from divisions.js */}
          {divisions.map((div) => {
            const pageElement = customDivisionPages[div.id] || (
              <DivisionPage division={div} />
            );
            return (
              <Route
                key={div.id}
                path={`/${div.slug}`}
                element={pageElement}
              />
            );
          })}

          <Route path="/education/enroll" element={<EducationEnroll />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
