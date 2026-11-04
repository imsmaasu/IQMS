import React, { useState } from 'react';
import { MessageCircle, Check } from 'lucide-react';
import siteConfig from '../config/siteConfig';

/**
 * DivisionForm: reusable form component, configured per division.
 */
export default function DivisionForm({ config, divisionName = '' }) {
  const [values, setValues] = useState(
    Object.fromEntries(config.fields.map((f) => [f.name, '']))
  );
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [message, setMessage] = useState('');
  const [waUrl, setWaUrl] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const errs = {};
    config.fields.forEach((f) => {
      if (f.required && !values[f.name]?.trim()) {
        errs[f.name] = `${f.label} is required.`;
      }
      if (f.type === 'tel' && values[f.name]?.trim()) {
        const digits = values[f.name].replace(/[^0-9]/g, '');
        if (digits.length < 8) errs[f.name] = 'Enter at least 8 digits.';
      }
    });
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const lines = [
      `*${config.messagePrefix}*`,
      '=======================',
    ];

    config.fields.forEach((f) => {
      const val = values[f.name]?.trim();
      if (val) lines.push(`*${f.label}:* ${val}`);
    });

    lines.push('=======================');
    lines.push('Sent via serajulmaymar.com');

    const formatted = lines.join('\n');
    const url = siteConfig.getWhatsAppUrl(formatted);

    setMessage(formatted);
    setWaUrl(url);
    setSubmitted(true);

    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleReset = () => {
    setSubmitted(false);
    setValues(Object.fromEntries(config.fields.map((f) => [f.name, ''])));
    setErrors({});
  };

  /* Success state */
  if (submitted) {
    return (
      <div
        style={{
          border: '1px solid var(--ivory-200)',
          borderRadius: '2px',
          padding: '40px 32px',
          textAlign: 'center',
          background: 'var(--ivory-50)',
        }}
      >
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: '50%',
            background: 'var(--success-bg)',
            color: 'var(--success)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 16px',
          }}
        >
          <Check size={24} strokeWidth={2.5} />
        </div>

        <h3 style={{ marginBottom: 8 }}>Sent successfully</h3>
        <p style={{ maxWidth: 400, margin: '0 auto 24px' }}>
          Your {divisionName.toLowerCase()} request has been formatted and
          WhatsApp was opened. If it did not open, use the button below.
        </p>

        <div
          style={{
            textAlign: 'left',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.75rem',
            lineHeight: 1.8,
            background: '#fff',
            border: '1px solid var(--ivory-200)',
            borderRadius: '2px',
            padding: '20px',
            margin: '0 auto 24px',
            maxWidth: 500,
            whiteSpace: 'pre-line',
            color: 'var(--muted)',
          }}
        >
          {message}
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: 12, flexWrap: 'wrap' }}>
          <a href={waUrl} target="_blank" rel="noopener noreferrer" className="btn-whatsapp">
            <MessageCircle size={16} strokeWidth={1.5} />
            Open WhatsApp
          </a>
          <button onClick={handleReset} className="btn-outline">
            Submit Another
          </button>
        </div>
      </div>
    );
  }

  /* Form */
  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      style={{
        border: '1px solid var(--ivory-200)',
        borderRadius: '2px',
        padding: '32px',
        background: '#fff',
      }}
    >
      <h3 style={{ marginBottom: 4 }}>{config.title}</h3>
      <p style={{ fontSize: '0.875rem', marginBottom: 24 }}>
        Fill in the details below. On submit we will format the message and open
        WhatsApp so you can send it directly.
      </p>

      {config.fields.map((field) => (
        <div className="form-group" key={field.name}>
          <label className="form-label" htmlFor={field.name}>
            {field.label}
            {field.required ? (
              <span style={{ color: 'var(--error)', marginLeft: 4 }}>*</span>
            ) : (
              <span className="optional"> (optional)</span>
            )}
          </label>

          {field.type === 'select' ? (
            <select
              id={field.name}
              name={field.name}
              value={values[field.name]}
              onChange={handleChange}
              className={`form-input${errors[field.name] ? ' form-input--error' : ''}`}
            >
              <option value="">Select option</option>
              {field.options.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          ) : field.type === 'textarea' ? (
            <textarea
              id={field.name}
              name={field.name}
              value={values[field.name]}
              onChange={handleChange}
              placeholder={field.placeholder}
              rows={3}
              className={`form-input${errors[field.name] ? ' form-input--error' : ''}`}
            />
          ) : (
            <input
              id={field.name}
              name={field.name}
              type={field.type}
              value={values[field.name]}
              onChange={handleChange}
              placeholder={field.placeholder}
              className={`form-input${errors[field.name] ? ' form-input--error' : ''}`}
            />
          )}

          {errors[field.name] && (
            <span className="form-error">{errors[field.name]}</span>
          )}
        </div>
      ))}

      <button type="submit" className="btn-whatsapp" style={{ width: '100%', justifyContent: 'center', marginTop: 8 }}>
        <MessageCircle size={18} strokeWidth={1.5} />
        {config.submitLabel}
      </button>
    </form>
  );
}
