import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Button from './Button';
import { WhatsAppIcon } from './WhatsAppButton';
import siteConfig from '../config/siteConfig';
import { academicLevels } from '../data/levels';
import { allFlatSubjects } from '../data/subjects';

export default function EnrollForm() {
  const [searchParams] = useSearchParams();

  // Initial values populated from URL query params if present
  const queryLevel = searchParams.get('level') || '';
  const querySubject = searchParams.get('subject') || '';

  const [formData, setFormData] = useState({
    studentName: '',
    parentName: '',
    phone: '',
    level: '',
    subject: '',
    customSubject: '',
    mode: 'Online', // Online, On-site, Either
    city: '',
    preferredTiming: 'Evening (5:00 PM – 9:00 PM)',
    notes: ''
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [generatedMessage, setGeneratedMessage] = useState('');
  const [whatsappUrl, setWhatsappUrl] = useState('');

  // Handle URL query parameters to pre-fill level and subject
  useEffect(() => {
    let matchedLevel = '';
    if (queryLevel) {
      const found = academicLevels.find(
        (l) => l.id.toLowerCase() === queryLevel.toLowerCase() || l.title.toLowerCase().includes(queryLevel.toLowerCase())
      );
      if (found) {
        matchedLevel = found.title;
      } else {
        matchedLevel = queryLevel;
      }
    }

    let matchedSubject = '';
    let customSub = '';
    if (querySubject) {
      const foundSub = allFlatSubjects.find(
        (s) => s.toLowerCase() === querySubject.toLowerCase()
      );
      if (foundSub) {
        matchedSubject = foundSub;
      } else {
        matchedSubject = 'Other Subject (Specify in notes)';
        customSub = querySubject;
      }
    }

    setFormData((prev) => ({
      ...prev,
      level: matchedLevel || prev.level,
      subject: matchedSubject || prev.subject,
      customSubject: customSub || prev.customSubject
    }));
  }, [queryLevel, querySubject]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear field error upon typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.studentName.trim()) {
      newErrors.studentName = 'Please enter the student full name.';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Please provide a valid WhatsApp or contact number.';
    } else if (formData.phone.replace(/[^0-9]/g, '').length < 8) {
      newErrors.phone = 'Please enter at least 8 to 11 digits.';
    }

    if (!formData.level) {
      newErrors.level = 'Please select the student academic level.';
    }

    if (!formData.subject) {
      newErrors.subject = 'Please choose a subject or select "Other".';
    }

    if (formData.subject === 'Other Subject (Specify in notes)' && !formData.customSubject.trim() && !formData.notes.trim()) {
      newErrors.customSubject = 'Please specify your required subject.';
    }

    // City is required if On-site or Either is chosen
    if ((formData.mode === 'On-site' || formData.mode === 'Either') && !formData.city.trim()) {
      newErrors.city = 'Please indicate your city for on-site tutor matching.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) {
      // Scroll to the first error
      const firstErrorKey = Object.keys(errors)[0];
      const el = document.getElementById(firstErrorKey);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    const resolvedSubject = formData.subject === 'Other Subject (Specify in notes)' && formData.customSubject
      ? `Other (${formData.customSubject.trim()})`
      : formData.subject;

    // Construct a well-formatted WhatsApp message
    const formattedMsg = [
      `🌟 *NEW TUTOR REQUEST - IQMS STEM SEED PARKS* 🌟`,
      `---------------------------------------`,
      `👤 *Student Name:* ${formData.studentName.trim()}`,
      formData.parentName.trim() ? `👨‍👩‍👦 *Parent/Guardian:* ${formData.parentName.trim()}` : null,
      `📱 *Contact/WhatsApp:* ${formData.phone.trim()}`,
      `🎓 *Academic Level:* ${formData.level}`,
      `📚 *Subject(s):* ${resolvedSubject}`,
      `💻 *Preferred Mode:* ${formData.mode}`,
      (formData.mode === 'On-site' || formData.mode === 'Either') ? `📍 *City / Area:* ${formData.city.trim()}` : null,
      `⏰ *Preferred Timing:* ${formData.preferredTiming}`,
      formData.notes.trim() ? `📝 *Additional Notes:* ${formData.notes.trim()}` : null,
      `---------------------------------------`,
      `Sent via IQMS STEM SEED PARKS Web Portal`
    ]
      .filter(Boolean)
      .join('\n');

    const waLink = siteConfig.getWhatsAppUrl(formattedMsg);
    setGeneratedMessage(formattedMsg);
    setWhatsappUrl(waLink);
    setSubmitted(true);

    // Open WhatsApp in a new tab
    window.open(waLink, '_blank', 'noopener,noreferrer');
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({
      studentName: '',
      parentName: '',
      phone: '',
      level: '',
      subject: '',
      customSubject: '',
      mode: 'Online',
      city: '',
      preferredTiming: 'Evening (5:00 PM – 9:00 PM)',
      notes: ''
    });
    setErrors({});
  };

  if (submitted) {
    return (
      <div 
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: 'var(--radius-xl)',
          padding: '2.5rem',
          border: '1px solid var(--color-success-border)',
          boxShadow: 'var(--shadow-lg)',
          textAlign: 'center'
        }}
      >
        <div 
          style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            backgroundColor: 'var(--color-success-bg)',
            color: 'var(--color-success)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.25rem auto'
          }}
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>

        <h3 style={{ color: 'var(--color-text-headline)', marginBottom: '0.75rem', fontWeight: 800 }}>
          Enrollment Submitted Successfully!
        </h3>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.98rem', maxWidth: '520px', margin: '0 auto 1.5rem auto' }}>
          We have generated your customized enrollment summary and opened WhatsApp so our academic coordinator can assign your qualified tutor right away.
        </p>

        {/* Formatted Message Preview */}
        <div 
          style={{
            textAlign: 'left',
            backgroundColor: '#F8FAFC',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-md)',
            padding: '1.25rem',
            margin: '1.5rem auto',
            maxWidth: '560px',
            fontSize: '0.88rem',
            lineHeight: 1.6,
            color: 'var(--color-text-body)',
            whiteSpace: 'pre-line',
            fontFamily: 'monospace'
          }}
        >
          {generatedMessage}
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap', marginTop: '1.75rem' }}>
          <Button
            href={whatsappUrl}
            variant="whatsapp"
            size="md"
          >
            <WhatsAppIcon size={18} color="#FFFFFF" />
            <span>Re-open WhatsApp Chat</span>
          </Button>

          <Button
            onClick={handleReset}
            variant="outline"
            size="md"
          >
            Submit Another Request
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: 'var(--radius-xl)',
        padding: '2.25rem',
        border: '1px solid var(--color-border)',
        boxShadow: 'var(--shadow-md)'
      }}
    >
      <div style={{ marginBottom: '1.75rem' }}>
        <h3 style={{ fontWeight: 800, marginBottom: '0.35rem' }}>
          Student Enrollment & Tutor Request
        </h3>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.92rem', margin: 0 }}>
          Complete this quick form. Upon submission, it instantly prepares your details and opens WhatsApp with our coordinator.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
        {/* Student Name */}
        <div>
          <label htmlFor="studentName" style={labelStyle}>
            Student Full Name <span style={{ color: 'var(--color-error)' }}>*</span>
          </label>
          <input
            id="studentName"
            name="studentName"
            type="text"
            value={formData.studentName}
            onChange={handleChange}
            placeholder="e.g. Ali Ahmed"
            style={inputStyle(errors.studentName)}
          />
          {errors.studentName && <span style={errorStyle}>{errors.studentName}</span>}
        </div>

        {/* Parent / Guardian Name */}
        <div>
          <label htmlFor="parentName" style={labelStyle}>
            Parent / Guardian Name <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', fontWeight: 400 }}>(Optional)</span>
          </label>
          <input
            id="parentName"
            name="parentName"
            type="text"
            value={formData.parentName}
            onChange={handleChange}
            placeholder="e.g. Tariq Ahmed"
            style={inputStyle()}
          />
        </div>

        {/* Phone / WhatsApp */}
        <div>
          <label htmlFor="phone" style={labelStyle}>
            WhatsApp / Mobile Number <span style={{ color: 'var(--color-error)' }}>*</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            placeholder="e.g. 0300 1234567"
            style={inputStyle(errors.phone)}
          />
          {errors.phone && <span style={errorStyle}>{errors.phone}</span>}
        </div>

        {/* Academic Level */}
        <div>
          <label htmlFor="level" style={labelStyle}>
            Academic Level / Class <span style={{ color: 'var(--color-error)' }}>*</span>
          </label>
          <select
            id="level"
            name="level"
            value={formData.level}
            onChange={handleChange}
            style={inputStyle(errors.level)}
          >
            <option value="">-- Select Academic Level --</option>
            {academicLevels.map((lvl) => (
              <option key={lvl.id} value={lvl.title}>
                {lvl.title} ({lvl.badge})
              </option>
            ))}
            <option value="Middle School (Grade 6-8)">Middle School (Grade 6-8)</option>
            <option value="Other Board / Certification">Other Board / Certification</option>
          </select>
          {errors.level && <span style={errorStyle}>{errors.level}</span>}
        </div>

        {/* Subject */}
        <div>
          <label htmlFor="subject" style={labelStyle}>
            Subject Needed <span style={{ color: 'var(--color-error)' }}>*</span>
          </label>
          <select
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            style={inputStyle(errors.subject)}
          >
            <option value="">-- Select Primary Subject --</option>
            {allFlatSubjects.map((sub) => (
              <option key={sub} value={sub}>
                {sub}
              </option>
            ))}
          </select>
          {errors.subject && <span style={errorStyle}>{errors.subject}</span>}
        </div>

        {/* Learning Mode */}
        <div>
          <label htmlFor="mode" style={labelStyle}>
            Preferred Learning Mode <span style={{ color: 'var(--color-error)' }}>*</span>
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem', marginTop: '0.25rem' }}>
            {['Online', 'On-site', 'Either'].map((modeOption) => (
              <button
                type="button"
                key={modeOption}
                onClick={() => {
                  setFormData((prev) => ({ ...prev, mode: modeOption }));
                  if (modeOption === 'Online' && errors.city) {
                    setErrors((prev) => ({ ...prev, city: '' }));
                  }
                }}
                style={{
                  padding: '0.65rem 0.5rem',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '0.88rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  border: formData.mode === modeOption ? '2px solid var(--color-teal-accent)' : '1px solid var(--color-border)',
                  backgroundColor: formData.mode === modeOption ? 'var(--color-teal-light)' : '#FFFFFF',
                  color: formData.mode === modeOption ? 'var(--color-teal-hover)' : 'var(--color-text-body)',
                  transition: 'all 0.15s ease'
                }}
              >
                {modeOption}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Conditional: If "Other Subject", show text field */}
      {formData.subject === 'Other Subject (Specify in notes)' && (
        <div style={{ marginTop: '1.25rem' }}>
          <label htmlFor="customSubject" style={labelStyle}>
            Please Specify the Subject / Topic <span style={{ color: 'var(--color-error)' }}>*</span>
          </label>
          <input
            id="customSubject"
            name="customSubject"
            type="text"
            value={formData.customSubject}
            onChange={handleChange}
            placeholder="e.g. A Level Further Mathematics, University Fluid Dynamics, etc."
            style={inputStyle(errors.customSubject)}
          />
          {errors.customSubject && <span style={errorStyle}>{errors.customSubject}</span>}
        </div>
      )}

      {/* Conditional: City field shown when On-site or Either is chosen */}
      {(formData.mode === 'On-site' || formData.mode === 'Either') && (
        <div style={{ marginTop: '1.25rem' }}>
          <label htmlFor="city" style={labelStyle}>
            City & Neighborhood (For Home/On-site Tutoring) <span style={{ color: 'var(--color-error)' }}>*</span>
          </label>
          <input
            id="city"
            name="city"
            type="text"
            value={formData.city}
            onChange={handleChange}
            placeholder="e.g. Islamabad F-10, Lahore DHA Phase 5, Karachi Clifton..."
            style={inputStyle(errors.city)}
          />
          {errors.city && <span style={errorStyle}>{errors.city}</span>}
        </div>
      )}

      {/* Preferred Timing */}
      <div style={{ marginTop: '1.25rem' }}>
        <label htmlFor="preferredTiming" style={labelStyle}>
          Preferred Class Timing
        </label>
        <select
          id="preferredTiming"
          name="preferredTiming"
          value={formData.preferredTiming}
          onChange={handleChange}
          style={inputStyle()}
        >
          <option value="Morning (9:00 AM – 1:00 PM)">Morning (9:00 AM – 1:00 PM)</option>
          <option value="Afternoon (2:00 PM – 5:00 PM)">Afternoon (2:00 PM – 5:00 PM)</option>
          <option value="Evening (5:00 PM – 9:00 PM)">Evening (5:00 PM – 9:00 PM) [Most Popular]</option>
          <option value="Night (8:00 PM – 11:00 PM)">Night (8:00 PM – 11:00 PM)</option>
          <option value="Weekends Only (Sat - Sun)">Weekends Only (Sat - Sun)</option>
          <option value="Flexible / Discuss with Tutor">Flexible / Discuss with Tutor</option>
        </select>
      </div>

      {/* Additional Notes */}
      <div style={{ marginTop: '1.25rem' }}>
        <label htmlFor="notes" style={labelStyle}>
          Any Specific Learning Goals or Requirements <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', fontWeight: 400 }}>(Optional)</span>
        </label>
        <textarea
          id="notes"
          name="notes"
          rows={3}
          value={formData.notes}
          onChange={handleChange}
          placeholder="e.g. Student needs exam revision for upcoming board exams, prefers a female tutor, or wants past-paper drill..."
          style={{
            ...inputStyle(),
            resize: 'vertical'
          }}
        />
      </div>

      {/* Action / Submit */}
      <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <Button
          type="submit"
          variant="whatsapp"
          size="lg"
          fullWidth
        >
          <WhatsAppIcon size={20} color="#FFFFFF" />
          <span>Submit & Connect on WhatsApp</span>
        </Button>
        <p style={{ textAlign: 'center', fontSize: '0.82rem', color: 'var(--color-text-muted)', margin: 0 }}>
          🔒 Your privacy is respected. No spam. You will be directly paired with our academic coordinator.
        </p>
      </div>
    </form>
  );
}

// Inline styling helpers
const labelStyle = {
  display: 'block',
  fontSize: '0.88rem',
  fontWeight: 600,
  color: 'var(--color-text-headline)',
  marginBottom: '0.4rem'
};

const inputStyle = (hasError = false) => ({
  width: '100%',
  padding: '0.7rem 0.95rem',
  borderRadius: 'var(--radius-md)',
  border: `1px solid ${hasError ? 'var(--color-error)' : 'var(--color-border)'}`,
  backgroundColor: hasError ? 'var(--color-error-bg)' : '#FFFFFF',
  color: 'var(--color-text-headline)',
  fontSize: '0.95rem',
  outline: 'none',
  transition: 'border-color 0.15s ease, box-shadow 0.15s ease'
});

const errorStyle = {
  display: 'block',
  color: 'var(--color-error)',
  fontSize: '0.8rem',
  marginTop: '0.35rem',
  fontWeight: 500
};
