import React from 'react';
import SEO from '../components/SEO';
import FadeIn from '../components/FadeIn';
import DivisionForm from '../components/DivisionForm';
import divisions from '../data/divisions';

const div = divisions.find((d) => d.id === 'education');

export default function EducationEnroll() {
  return (
    <div data-division="education">
      <SEO
        title="Enroll | IQMS STEM SEED PARKS | SerajUlMaymar"
        description="Enroll for tutoring at IQMS STEM SEED PARKS. Fill in your details and connect with our coordinator via WhatsApp."
      />

      <section className="division-surface" style={{ borderBottom: '1px solid var(--ivory-200)' }}>
        <div className="container section-spacing" style={{ maxWidth: 640 }}>
          <FadeIn>
            <p className="mono-label" style={{ color: 'var(--accent)', marginBottom: 12 }}>
              IQMS STEM SEED PARKS · ENROLLMENT
            </p>
            <h1 style={{ marginBottom: 8 }}>Enroll for Tutoring</h1>
            <p style={{ marginBottom: 32 }}>
              Complete the form below. On submit, your details are formatted and
              WhatsApp opens so you can send them directly to our coordinator.
            </p>
          </FadeIn>

          <FadeIn>
            <DivisionForm config={div.formConfig} divisionName="Education" />
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
