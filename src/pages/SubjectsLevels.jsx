import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import Card from '../components/Card';
import SectionHeading from '../components/SectionHeading';
import { WhatsAppIcon } from '../components/WhatsAppButton';
import siteConfig from '../config/siteConfig';
import { academicLevels } from '../data/levels';
import { subjectCatalog } from '../data/subjects';

export default function SubjectsLevels() {
  const [selectedFilter, setSelectedFilter] = useState('all');

  return (
    <div style={{ backgroundColor: 'var(--color-bg-page)', paddingBottom: '4rem' }}>
      {/* Header Banner */}
      <section 
        style={{
          background: 'linear-gradient(180deg, #F0FDFA 0%, var(--color-bg-page) 100%)',
          paddingTop: '3.5rem',
          paddingBottom: '3.5rem',
          borderBottom: '1px solid var(--color-border)',
          textAlign: 'center'
        }}
      >
        <div className="container" style={{ maxWidth: '820px' }}>
          <span className="badge badge-teal" style={{ marginBottom: '1rem' }}>
            Curriculum & Specializations
          </span>
          <h1 style={{ fontWeight: 800, color: 'var(--color-primary-navy)', marginBottom: '1rem' }}>
            Subjects & Academic Levels
          </h1>
          <p style={{ color: 'var(--color-text-body)', fontSize: '1.1rem', lineHeight: 1.6 }}>
            Explore our structured tutoring programs across national boards, international Cambridge pathways, competitive entrance exams, and university faculties.
          </p>
          <div style={{ marginTop: '1.5rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', backgroundColor: '#FFFFFF', padding: '0.5rem 1.25rem', borderRadius: 'var(--radius-full)', border: '1px solid var(--color-border)', fontSize: '0.88rem', color: 'var(--color-teal-hover)', fontWeight: 600 }}>
            <span>💡 All unlisted subjects, languages, and regional boards are available upon request.</span>
          </div>
        </div>
      </section>

      {/* Part 1: Organized by Academic Level */}
      <section className="section-padding" style={{ paddingTop: '3.5rem' }}>
        <div className="container">
          <SectionHeading
            tag="Curriculum Focus"
            title="Tutoring by Academic Level"
            subtitle="Select your tier below to view syllabus coverage, subject options, and request a specialist educator."
            centered={true}
          />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
            {academicLevels.map((lvl) => (
              <Card 
                key={lvl.id}
                id={lvl.id}
                style={{
                  padding: '2.25rem',
                  border: '1px solid var(--color-border)',
                  boxShadow: 'var(--shadow-sm)'
                }}
              >
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', alignItems: 'start' }}>
                  {/* Left Column: Level Summary & Highlights */}
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                      <span className="badge badge-teal">{lvl.badge}</span>
                      <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>{lvl.category}</span>
                    </div>

                    <h2 style={{ fontSize: '1.85rem', fontWeight: 800, marginBottom: '0.75rem', color: 'var(--color-primary-navy)' }}>
                      {lvl.title}
                    </h2>

                    <p style={{ color: 'var(--color-text-body)', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                      {lvl.summary}
                    </p>

                    <div style={{ marginBottom: '1.5rem' }}>
                      <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '0.65rem', color: 'var(--color-text-headline)' }}>
                        Target Grades & Streams:
                      </h4>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
                        {lvl.grades.map((grade) => (
                          <span 
                            key={grade}
                            style={{
                              fontSize: '0.82rem',
                              backgroundColor: 'var(--color-bg-subtle)',
                              padding: '0.25rem 0.65rem',
                              borderRadius: 'var(--radius-sm)',
                              color: 'var(--color-text-body)',
                              border: '1px solid var(--color-border)'
                            }}
                          >
                            {grade}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--color-text-headline)' }}>
                        Pedagogical Highlights:
                      </h4>
                      <ul style={{ listStyle: 'none', paddingLeft: 0, display: 'flex', flexDirection: 'column', gap: '0.45rem', fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>
                        {lvl.highlights.map((h, i) => (
                          <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                            <span style={{ color: 'var(--color-teal-accent)', fontWeight: 700, flexShrink: 0 }}>✓</span>
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Right Column: Key Subjects & Direct Enrollment Actions */}
                  <div 
                    style={{
                      backgroundColor: 'var(--color-bg-page)',
                      borderRadius: 'var(--radius-md)',
                      padding: '1.5rem',
                      border: '1px solid var(--color-border)'
                    }}
                  >
                    <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--color-primary-navy)' }}>
                      Common Subjects for {lvl.title}
                    </h3>
                    <p style={{ fontSize: '0.86rem', color: 'var(--color-text-muted)', marginBottom: '1.25rem' }}>
                      Click any subject below to request an educator with that topic pre-selected:
                    </p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', marginBottom: '1.5rem' }}>
                      {lvl.popularSubjects.map((subjectName) => (
                        <div 
                          key={subjectName}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            backgroundColor: '#FFFFFF',
                            padding: '0.65rem 0.85rem',
                            borderRadius: 'var(--radius-sm)',
                            border: '1px solid var(--color-border)'
                          }}
                        >
                          <span style={{ fontSize: '0.92rem', fontWeight: 600, color: 'var(--color-text-headline)' }}>
                            {subjectName}
                          </span>
                          <Link
                            to={`/enroll?level=${encodeURIComponent(lvl.title)}&subject=${encodeURIComponent(subjectName)}`}
                            style={{
                              fontSize: '0.82rem',
                              color: 'var(--color-teal-hover)',
                              fontWeight: 700,
                              textDecoration: 'none'
                            }}
                          >
                            Request Tutor →
                          </Link>
                        </div>
                      ))}
                    </div>

                    <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                      <Button
                        to={`/enroll?level=${encodeURIComponent(lvl.title)}`}
                        variant="primary"
                        size="md"
                        fullWidth
                      >
                        Request Tutor for {lvl.title}
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Part 2: Categorized Subject Catalog */}
      <section className="section-padding" style={{ backgroundColor: '#FFFFFF', borderTop: '1px solid var(--color-border)' }}>
        <div className="container">
          <SectionHeading
            tag="Full Subject Catalog"
            title="Browse by Subject Category"
            subtitle="Review subject details across sciences, programming, advanced engineering, and business."
            centered={true}
          />

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
            {subjectCatalog.map((cat, idx) => (
              <Card 
                key={idx}
                style={{
                  border: '1px solid var(--color-border)',
                  padding: '1.75rem'
                }}
              >
                <div style={{ marginBottom: '1rem' }}>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-primary-navy)', marginBottom: '0.4rem' }}>
                    {cat.category}
                  </h3>
                  <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', lineHeight: 1.5, margin: 0 }}>
                    {cat.description}
                  </p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1.25rem' }}>
                  {cat.subjects.map((sub) => (
                    <div 
                      key={sub.id}
                      style={{
                        paddingBottom: '1rem',
                        borderBottom: '1px solid var(--color-border)'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                        <span style={{ fontWeight: 700, fontSize: '0.98rem', color: 'var(--color-text-headline)' }}>
                          {sub.name}
                        </span>
                        <Link 
                          to={`/enroll?subject=${encodeURIComponent(sub.name)}`}
                          style={{
                            fontSize: '0.8rem',
                            fontWeight: 700,
                            color: 'var(--color-teal-accent)'
                          }}
                        >
                          Request →
                        </Link>
                      </div>
                      <p style={{ fontSize: '0.84rem', color: 'var(--color-text-muted)', marginBottom: '0.5rem', lineHeight: 1.5 }}>
                        {sub.description}
                      </p>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                        {sub.levels.map((lvl) => (
                          <span 
                            key={lvl}
                            style={{
                              fontSize: '0.72rem',
                              padding: '0.15rem 0.45rem',
                              backgroundColor: 'var(--color-bg-subtle)',
                              borderRadius: 'var(--radius-sm)',
                              color: 'var(--color-text-body)'
                            }}
                          >
                            {lvl}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>

          {/* Any other subject notice banner */}
          <div 
            style={{
              marginTop: '3rem',
              padding: '2rem',
              backgroundColor: 'var(--color-teal-light)',
              border: '1px solid var(--color-teal-border)',
              borderRadius: 'var(--radius-lg)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '1.5rem',
              flexWrap: 'wrap'
            }}
          >
            <div>
              <h4 style={{ color: 'var(--color-teal-hover)', fontWeight: 800, fontSize: '1.15rem', marginBottom: '0.25rem' }}>
                Don't see your specific subject or syllabus?
              </h4>
              <p style={{ color: 'var(--color-text-body)', fontSize: '0.92rem', margin: 0 }}>
                We maintain an extensive registry of vetted educators in specialized fields, languages, and regional boards. Let us know what you need!
              </p>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <Button
                to="/enroll?subject=Other"
                variant="primary"
                size="md"
              >
                Request Custom Subject
              </Button>
              <Button
                href={siteConfig.getWhatsAppUrl("Hello! I need a tutor for a specific subject not listed on the website.")}
                variant="whatsapp"
                size="md"
              >
                <WhatsAppIcon size={18} color="#FFFFFF" />
                <span>Ask on WhatsApp</span>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
