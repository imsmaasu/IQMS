import React from 'react';
import { ExternalLink, GraduationCap, Users } from 'lucide-react';
import SEO from '../components/SEO';
import FadeIn from '../components/FadeIn';
import DivisionForm from '../components/DivisionForm';
import divisions from '../data/divisions';

const div = divisions.find((d) => d.id === 'education');

const studentFormUrl = 'https://forms.gle/PbcdMtzjr4tXCQQ38';
const teacherFormUrl = 'https://forms.gle/ijHkWJqKtSeBrgiM6';

export default function EducationEnroll() {
  return (
    <div data-division="education">
      <SEO
        title="Enroll | IQMS STEM SEED PARKS | SerajUlMaymar"
        description="Enroll for tutoring at IQMS STEM SEED PARKS. Fill in your details and connect with our coordinator via WhatsApp or complete our official information forms."
      />

      <section className="division-surface" style={{ borderBottom: '1px solid var(--ivory-200)' }}>
        <div className="container section-spacing" style={{ maxWidth: 640 }}>
          <FadeIn>
            <p className="mono-label" style={{ color: 'var(--accent)', marginBottom: 12 }}>
              IQMS STEM SEED PARKS · ENROLLMENT
            </p>
            <h1 style={{ marginBottom: 8 }}>Enroll for Tutoring</h1>
            <p style={{ marginBottom: 24 }}>
              Complete the form below to connect directly with our coordinator on WhatsApp, or use our official Google Forms for structured student and teacher registration.
            </p>

            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 12,
                marginBottom: 32,
              }}
            >
              <a
                href={studentFormUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline"
                style={{ fontSize: '0.875rem', padding: '10px 18px' }}
              >
                <GraduationCap size={16} strokeWidth={1.5} />
                Student Form (Google Forms)
                <ExternalLink size={14} strokeWidth={1.5} />
              </a>
              <a
                href={teacherFormUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline"
                style={{ fontSize: '0.875rem', padding: '10px 18px' }}
              >
                <Users size={16} strokeWidth={1.5} />
                Teacher Form (Google Forms)
                <ExternalLink size={14} strokeWidth={1.5} />
              </a>
            </div>
          </FadeIn>

          <FadeIn>
            <DivisionForm config={div.formConfig} divisionName="Education" />
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
