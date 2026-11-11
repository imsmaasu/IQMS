import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import {
  Check,
  AlertCircle,
  Download,
  MessageCircle,
  Upload,
  X,
  ArrowLeft,
  ArrowRight,
  RotateCcw,
} from 'lucide-react';
import siteConfig from '../config/siteConfig';
import marriageBureauCopy from '../data/marriageBureau';
import {
  FIELDS,
  FIELD_UI,
  FORM_STEPS,
  TOTAL_FIELDS_COUNT,
  REQUIRED_FIELDS,
  FIELD_STEP_MAP,
} from '../data/marriageFormFields';
import {
  processCandidatePhoto,
  generateBiodataPdf,
  triggerBlobDownload,
} from '../utils/marriagePdf';

const DRAFT_KEY = 'serajulmaymar_mb_draft_v1';
const SECRET_IDS = new Set(FIELDS.filter((f) => f.secret).map((f) => f.id));

function getMaxDate18() {
  const now = new Date();
  const y = now.getFullYear() - 18;
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const d = String(now.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function computeAgeFromIso(iso) {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso || '');
  if (!m) return -1;
  const y = Number(m[1]);
  const mo = Number(m[2]);
  const d = Number(m[3]);
  const dt = new Date(Date.UTC(y, mo - 1, d));
  if (dt.getUTCFullYear() !== y || dt.getUTCMonth() !== mo - 1 || dt.getUTCDate() !== d) {
    return -1;
  }
  const now = new Date();
  let age = now.getFullYear() - y;
  if (now.getMonth() + 1 < mo || (now.getMonth() + 1 === mo && now.getDate() < d)) {
    age -= 1;
  }
  return age;
}

function generateSubmissionId() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const bytes = new Uint8Array(8);
  window.crypto.getRandomValues(bytes);
  let code = '';
  for (let i = 0; i < 8; i++) {
    code += chars[bytes[i] % chars.length];
  }
  return `MB-${code}`;
}

function serializeRangeValue(val) {
  if (!val) return '';
  if (typeof val === 'string') return val.trim();
  const min = (val.min || '').trim();
  const max = (val.max || '').trim();
  if (!min && !max) return '';
  if (min && max) return `${min} to ${max}`;
  if (min) return `${min} to any`;
  return `any to ${max}`;
}

function isFieldAnswered(field, rawValues, photoState) {
  if (field.type === 'file') return Boolean(photoState?.base64);
  if (field.type === 'range') return Boolean(serializeRangeValue(rawValues[field.id]));
  const v = rawValues[field.id];
  return typeof v === 'string' ? v.trim().length > 0 : Boolean(v);
}

function validateSingleField(field, rawValues) {
  if (field.type === 'file') return '';

  const strVal =
    field.type === 'range'
      ? serializeRangeValue(rawValues[field.id])
      : String(rawValues[field.id] ?? '').trim();

  if (field.required && !strVal) {
    return `${field.label} is required.`;
  }
  if (!strVal) return '';

  if (strVal.length > 2000) {
    return 'Answer must be 2000 characters or fewer.';
  }

  if (field.type === 'date18') {
    const age = computeAgeFromIso(strVal);
    if (age < 18) return 'Registration is for adults, 18 or older';
    if (age > 100) return 'Enter a valid date of birth.';
  }

  if (field.type === 'tel') {
    const digits = strVal.replace(/\D/g, '');
    if (digits.length < 10 || digits.length > 15) {
      return 'Enter a valid phone number (10 to 15 digits).';
    }
  }

  if (field.type === 'email') {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(strVal)) {
      return 'Enter a valid email address.';
    }
  }

  if (field.type === 'num') {
    const n = Number(strVal);
    if (!Number.isFinite(n) || n < 0) {
      return 'Enter a valid non-negative number.';
    }
    if (field.max !== null && field.max !== undefined && n > field.max) {
      return `Enter a number up to ${field.max}.`;
    }
  }

  if (field.type === 'range' && FIELD_UI[field.id]?.numeric) {
    const obj = rawValues[field.id] || {};
    const minStr = String(obj.min ?? '').trim();
    const maxStr = String(obj.max ?? '').trim();
    for (const p of [minStr, maxStr]) {
      if (p) {
        const n = Number(p);
        if (!Number.isFinite(n) || n < 0) {
          return 'Enter valid non-negative numbers for Min and Max.';
        }
      }
    }
    if (minStr && maxStr && Number(minStr) > Number(maxStr)) {
      return 'Minimum age cannot exceed maximum age.';
    }
  }

  return '';
}

function buildInitialValues() {
  const obj = {};
  for (const f of FIELDS) {
    if (f.type === 'file') continue;
    obj[f.id] = f.type === 'range' ? { min: '', max: '' } : '';
  }
  return obj;
}

function loadDraftFromSession() {
  try {
    const raw = window.sessionStorage.getItem(DRAFT_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object') return null;
    const base = buildInitialValues();
    for (const f of FIELDS) {
      if (f.type === 'file' || SECRET_IDS.has(f.id)) continue;
      if (parsed.values && parsed.values[f.id] !== undefined) {
        if (f.type === 'range' && typeof parsed.values[f.id] === 'object' && parsed.values[f.id]) {
          base[f.id] = {
            min: String(parsed.values[f.id].min || ''),
            max: String(parsed.values[f.id].max || ''),
          };
        } else if (typeof parsed.values[f.id] === 'string') {
          base[f.id] = parsed.values[f.id];
        }
      }
    }
    const step =
      Number.isInteger(parsed.step) && parsed.step >= 0 && parsed.step < FORM_STEPS.length
        ? parsed.step
        : 0;
    return { values: base, step };
  } catch {
    return null;
  }
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default function MarriageRegistration() {
  const initialDraft = useMemo(() => loadDraftFromSession(), []);
  const [values, setValues] = useState(() => initialDraft?.values || buildInitialValues());
  const [stepIdx, setStepIdx] = useState(() => initialDraft?.step || 0);
  const [errors, setErrors] = useState({});
  const [photo, setPhoto] = useState(null); // { dataUrl, base64, width, height, name }
  const [photoError, setPhotoError] = useState('');
  const [hp, setHp] = useState(''); // honeypot

  const [submitState, setSubmitState] = useState('idle'); // idle | sending | success | fallback
  const [submitBannerError, setSubmitBannerError] = useState('');
  const [activeId, setActiveId] = useState('');
  const [lastPdf, setLastPdf] = useState(null); // { blob, base64, filename }

  const firstInputAtRef = useRef(null);
  const pendingSubmissionIdRef = useRef(null);
  const formPanelRef = useRef(null);
  const warnedMissingConfigRef = useRef(false);

  const { scriptUrl, token } = siteConfig.marriageBureau;
  const isConfigured = Boolean(scriptUrl && token);

  useEffect(() => {
    if (!isConfigured && !warnedMissingConfigRef.current) {
      warnedMissingConfigRef.current = true;
      console.warn(
        '[MarriageBureau] VITE_MB_SCRIPT_URL or VITE_MB_TOKEN is missing. Running in fallback mode.'
      );
    }
  }, [isConfigured]);

  // Warn before closing tab while sending
  useEffect(() => {
    if (submitState !== 'sending') return undefined;
    const onBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = '';
    };
    window.addEventListener('beforeunload', onBeforeUnload);
    return () => window.removeEventListener('beforeunload', onBeforeUnload);
  }, [submitState]);

  // Debounced autosave to sessionStorage (skipping secret fields and photo)
  useEffect(() => {
    if (submitState === 'success') return undefined;
    const timer = setTimeout(() => {
      try {
        const safeValues = {};
        for (const f of FIELDS) {
          if (f.type === 'file' || SECRET_IDS.has(f.id)) continue;
          safeValues[f.id] = values[f.id];
        }
        window.sessionStorage.setItem(
          DRAFT_KEY,
          JSON.stringify({ values: safeValues, step: stepIdx })
        );
      } catch {
        // Ignore storage quota errors
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [values, stepIdx, submitState]);

  const markInteracted = useCallback(() => {
    if (!firstInputAtRef.current) {
      firstInputAtRef.current = Date.now();
    }
    // Answers changed -> reset any stale error banner
    if (submitBannerError) setSubmitBannerError('');
  }, [submitBannerError]);

  const handleFieldChange = (field, nextVal) => {
    markInteracted();
    pendingSubmissionIdRef.current = null;
    setValues((prev) => ({ ...prev, [field.id]: nextVal }));
    if (errors[field.id]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[field.id];
        return copy;
      });
    }
  };

  const handleRangeChange = (field, bound, val) => {
    markInteracted();
    pendingSubmissionIdRef.current = null;
    setValues((prev) => ({
      ...prev,
      [field.id]: {
        ...(typeof prev[field.id] === 'object' && prev[field.id] ? prev[field.id] : { min: '', max: '' }),
        [bound]: val,
      },
    }));
    if (errors[field.id]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[field.id];
        return copy;
      });
    }
  };

  const handlePhotoChange = async (e) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    markInteracted();
    setPhotoError('');
    try {
      const processed = await processCandidatePhoto(file);
      setPhoto({ ...processed, name: file.name });
    } catch (err) {
      setPhotoError(err.message || 'Could not process image.');
    }
  };

  const focusFieldById = (fieldId) => {
    requestAnimationFrame(() => {
      const el =
        document.getElementById(`field-${fieldId}`) ||
        document.getElementById(`field-${fieldId}-min`) ||
        document.querySelector(`[data-field-id="${fieldId}"] button, [data-field-id="${fieldId}"] input`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        el.focus({ preventScroll: true });
      }
    });
  };

  const jumpToStepAndField = (targetStepIdx, fieldId = null) => {
    setStepIdx(targetStepIdx);
    if (fieldId) {
      setTimeout(() => focusFieldById(fieldId), 60);
    } else if (formPanelRef.current) {
      formPanelRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const validateFieldsList = (fieldsToCheck) => {
    const nextErrs = {};
    for (const f of fieldsToCheck) {
      const msg = validateSingleField(f, values);
      if (msg) nextErrs[f.id] = msg;
    }
    return nextErrs;
  };

  const handleNextStep = () => {
    const currentStep = FORM_STEPS[stepIdx];
    const stepErrors = validateFieldsList(currentStep.fields);
    if (Object.keys(stepErrors).length > 0) {
      setErrors((prev) => ({ ...prev, ...stepErrors }));
      const firstBadId = currentStep.fields.find((f) => stepErrors[f.id])?.id;
      if (firstBadId) focusFieldById(firstBadId);
      return;
    }
    if (stepIdx < FORM_STEPS.length - 1) {
      setStepIdx((s) => s + 1);
      if (formPanelRef.current) {
        formPanelRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const handlePrevStep = () => {
    if (stepIdx > 0) {
      setStepIdx((s) => s - 1);
      if (formPanelRef.current) {
        formPanelRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const handleClearForm = () => {
    if (!window.confirm('Clear all entered details and start over?')) return;
    setValues(buildInitialValues());
    setErrors({});
    setPhoto(null);
    setPhotoError('');
    setStepIdx(0);
    setSubmitBannerError('');
    setSubmitState('idle');
    pendingSubmissionIdRef.current = null;
    firstInputAtRef.current = null;
    try {
      window.sessionStorage.removeItem(DRAFT_KEY);
    } catch {
      // Ignore
    }
  };

  // Statistics
  const totalAnswered = useMemo(() => {
    return FIELDS.reduce(
      (count, f) => count + (isFieldAnswered(f, values, photo) ? 1 : 0),
      0
    );
  }, [values, photo]);

  const missingRequiredFields = useMemo(() => {
    return REQUIRED_FIELDS.filter((f) => !isFieldAnswered(f, values, photo));
  }, [values, photo]);

  const stepStats = useMemo(() => {
    return FORM_STEPS.map((step) => {
      const answered = step.fields.filter((f) => isFieldAnswered(f, values, photo)).length;
      const reqMissing = step.fields.filter(
        (f) => f.required && !isFieldAnswered(f, values, photo)
      ).length;
      return {
        total: step.fields.length,
        answered,
        reqMissing,
      };
    });
  }, [values, photo]);

  const buildAnswersPayload = () => {
    const answers = {};
    for (const f of FIELDS) {
      if (f.type === 'file') continue;
      const v =
        f.type === 'range'
          ? serializeRangeValue(values[f.id])
          : String(values[f.id] ?? '').trim();
      if (v) answers[f.id] = v;
    }
    return answers;
  };

  const buildFullPrintableAnswers = () => {
    const all = {};
    for (const f of FIELDS) {
      if (f.type === 'file') continue;
      const v =
        f.type === 'range'
          ? serializeRangeValue(values[f.id])
          : String(values[f.id] ?? '').trim();
      if (v) all[f.id] = v;
    }
    return all;
  };

  const enterFallbackMode = (pdfResult) => {
    if (pdfResult?.blob) {
      triggerBlobDownload(pdfResult.blob, pdfResult.filename);
    }
    setSubmitState('fallback');
  };

  const handleSubmit = async (e, { forceFallbackCheck = true } = {}) => {
    if (e) e.preventDefault();
    if (submitState === 'sending') return;

    setSubmitBannerError('');

    // 1. Validate all 150 fields
    const allErrors = validateFieldsList(FIELDS);
    if (Object.keys(allErrors).length > 0) {
      setErrors(allErrors);
      const firstBadField = FIELDS.find((f) => allErrors[f.id]);
      if (firstBadField) {
        jumpToStepAndField(FIELD_STEP_MAP[firstBadField.id] ?? 0, firstBadField.id);
      }
      return;
    }

    // 2. Persistent submission id across retries
    const submissionId = pendingSubmissionIdRef.current || generateSubmissionId();
    pendingSubmissionIdRef.current = submissionId;
    setActiveId(submissionId);

    const answers = buildAnswersPayload();
    const elapsedMs = firstInputAtRef.current ? Date.now() - firstInputAtRef.current : 0;

    setSubmitState('sending');

    let pdfResult = lastPdf;
    try {
      if (!pdfResult || pdfResult.id !== submissionId) {
        const built = await generateBiodataPdf({
          id: submissionId,
          answers: buildFullPrintableAnswers(),
          photoDataUrl: photo?.dataUrl || null,
          hasPhoto: Boolean(photo?.base64),
        });
        pdfResult = { ...built, id: submissionId };
        setLastPdf(pdfResult);
      }
    } catch (err) {
      console.error('[MarriageBureau] PDF generation failed:', err);
      setSubmitState('idle');
      setSubmitBannerError('Could not prepare your registration document. Please try again.');
      return;
    }

    // Fallback immediately if receiver env vars are not configured
    if (!isConfigured && forceFallbackCheck) {
      enterFallbackMode(pdfResult);
      return;
    }

    const payload = {
      token,
      hp,
      id: submissionId,
      elapsedMs,
      answers,
      pdf: pdfResult.base64,
      photo: photo?.base64 || '',
    };

    const retryDelays = [0, 2000, 6000];
    let finalOutcome = 'network_fail';

    for (let attempt = 0; attempt < retryDelays.length; attempt++) {
      if (retryDelays[attempt] > 0) {
        await sleep(retryDelays[attempt]);
      }

      const controller = new AbortController();
      const timeoutHandle = setTimeout(() => controller.abort(), 90000);

      try {
        const response = await fetch(scriptUrl, {
          method: 'POST',
          redirect: 'follow',
          headers: { 'Content-Type': 'text/plain;charset=utf-8' },
          body: JSON.stringify(payload),
          signal: controller.signal,
        });
        clearTimeout(timeoutHandle);

        if (!response.ok) {
          throw new Error(`HTTP_${response.status}`);
        }

        let data;
        try {
          data = await response.json();
        } catch {
          throw new Error('UNREADABLE_JSON');
        }

        if (data && data.ok) {
          // Clear draft and show SUCCESS
          try {
            window.sessionStorage.removeItem(DRAFT_KEY);
          } catch {
            // Ignore
          }
          setActiveId(data.id && data.id !== 'MB-IGNORED' ? data.id : submissionId);
          setSubmitState('success');
          return;
        }

        const errCode = data?.error || 'server';

        if (errCode === 'validation') {
          setSubmitState('idle');
          const fieldId = data.field;
          const message = data.message || 'Please check this field.';
          if (fieldId && FIELD_STEP_MAP[fieldId] !== undefined) {
            setErrors((prev) => ({ ...prev, [fieldId]: message }));
            jumpToStepAndField(FIELD_STEP_MAP[fieldId], fieldId);
          } else {
            setSubmitBannerError(message);
          }
          return;
        }

        if (errCode === 'too_many') {
          setSubmitState('idle');
          setSubmitBannerError(
            'A registration with this phone number was just submitted. Please wait two minutes and try again.'
          );
          return;
        }

        if (errCode === 'too_fast') {
          if (!firstInputAtRef.current) {
            firstInputAtRef.current = Date.now();
          }
          setSubmitState('idle');
          setSubmitBannerError('Please review your answers and press Submit again.');
          return;
        }

        if (errCode === 'daily_cap' || errCode === 'busy') {
          setSubmitState('idle');
          setSubmitBannerError(
            "The bureau's form is busy right now. Please try again in a few minutes, or send your PDF on WhatsApp instead."
          );
          finalOutcome = 'busy_fallback_available';
          return;
        }

        // unauthorized / server / too_large / bad_json / bad_id / bad_answers / empty
        console.error('[MarriageBureau] Receiver returned error:', errCode);
        enterFallbackMode(pdfResult);
        return;
      } catch (err) {
        clearTimeout(timeoutHandle);
        console.warn(`[MarriageBureau] Attempt ${attempt + 1} failed:`, err?.message || err);
        finalOutcome = 'network_fail';
      }
    }

    if (finalOutcome === 'network_fail') {
      enterFallbackMode(pdfResult);
    }
  };

  const firstName = (values.p_candidateSFirstName || '').trim();
  const lastName = (values.p_candidateSLastName || '').trim();
  const candidateFullName = [firstName, lastName].filter(Boolean).join(' ') || 'Candidate';

  const successWhatsAppUrl = siteConfig.getWhatsAppUrl(
    `Hello, I have submitted the Marriage Bureau registration. Reference: ${activeId}. Name: ${candidateFullName}.`
  );
  const fallbackWhatsAppUrl = siteConfig.getWhatsAppUrl(
    `Hello, I have filled the Marriage Bureau registration form for ${candidateFullName}. I am attaching the PDF.`
  );

  // ── SUCCESS PANEL ──
  if (submitState === 'success') {
    return (
      <div className="mb-card mb-status-card mb-status-card--success" role="status" aria-live="polite">
        <div className="mb-status-icon mb-status-icon--sage">
          <Check size={26} strokeWidth={2} />
        </div>
        <p className="mb-eyebrow" style={{ color: 'var(--mb-sage-700)', marginBottom: 8 }}>
          REGISTRATION COMPLETE
        </p>
        <h3 className="mb-card-heading">Your registration has been received.</h3>
        <p className="mb-reference-line">
          Reference: <strong>{activeId}</strong>
        </p>
        <p style={{ maxWidth: 480, margin: '0 auto 28px', color: 'var(--mb-muted)' }}>
          Keep this reference number for your records. Our team in Karachi will review your details
          and follow up with you on WhatsApp.
        </p>

        <div className="mb-status-actions">
          {lastPdf?.blob && (
            <button
              type="button"
              className="mb-btn-outline"
              onClick={() => triggerBlobDownload(lastPdf.blob, lastPdf.filename)}
            >
              <Download size={16} strokeWidth={1.75} />
              Download your copy (PDF)
            </button>
          )}
          <a
            href={successWhatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mb-btn-primary"
          >
            <MessageCircle size={16} strokeWidth={1.75} />
            Message us on WhatsApp
          </a>
        </div>
      </div>
    );
  }

  // ── FALLBACK PANEL ──
  if (submitState === 'fallback') {
    return (
      <div className="mb-card mb-status-card" role="status" aria-live="polite">
        <div className="mb-status-icon mb-status-icon--rose">
          <AlertCircle size={26} strokeWidth={2} />
        </div>
        <p className="mb-eyebrow" style={{ color: 'var(--mb-rose-700)', marginBottom: 8 }}>
          SEND VIA WHATSAPP
        </p>
        <h3 className="mb-card-heading">
          We could not reach the bureau&apos;s server.
        </h3>
        <p style={{ maxWidth: 500, margin: '0 auto 24px', color: 'var(--mb-muted)' }}>
          Your PDF has been downloaded. Please send it to us on WhatsApp. Your entered answers are
          still kept below if you want to try sending again.
        </p>

        <div className="mb-status-actions" style={{ marginBottom: 18 }}>
          <a
            href={fallbackWhatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mb-btn-primary"
          >
            <MessageCircle size={16} strokeWidth={1.75} />
            Open WhatsApp
          </a>
          {lastPdf?.blob && (
            <button
              type="button"
              className="mb-btn-outline"
              onClick={() => triggerBlobDownload(lastPdf.blob, lastPdf.filename)}
            >
              <Download size={16} strokeWidth={1.75} />
              Download PDF again
            </button>
          )}
          <button
            type="button"
            className="mb-btn-ghost"
            onClick={() => handleSubmit(null, { forceFallbackCheck: false })}
          >
            Try sending again
          </button>
        </div>

        <button
          type="button"
          className="mb-link-button"
          onClick={() => setSubmitState('idle')}
        >
          Return to form review
        </button>
      </div>
    );
  }

  const currentStep = FORM_STEPS[stepIdx];
  const maxDate18 = getMaxDate18();

  const renderFieldInput = (field) => {
    const err = errors[field.id];
    const hint = FIELD_UI[field.id] || {};
    const errorId = err ? `err-${field.id}` : undefined;
    const baseInputClass = `mb-input${err ? ' mb-input--error' : ''}`;

    if (field.type === 'file') {
      return (
        <div className="mb-photo-field">
          {photo?.dataUrl ? (
            <div className="mb-photo-preview-wrap">
              <div className="mb-photo-arch-preview">
                <img src={photo.dataUrl} alt="Candidate photo preview" />
              </div>
              <div className="mb-photo-meta">
                <span className="mb-photo-filename">{photo.name || 'Candidate photo'}</span>
                <button
                  type="button"
                  className="mb-link-button"
                  onClick={() => {
                    setPhoto(null);
                    setPhotoError('');
                  }}
                >
                  <X size={14} strokeWidth={1.75} />
                  Remove photo
                </button>
              </div>
            </div>
          ) : (
            <label htmlFor={`field-${field.id}`} className="mb-file-drop">
              <Upload size={18} strokeWidth={1.5} />
              <span>Choose photo (JPG or PNG, max 5 MB)</span>
              <input
                id={`field-${field.id}`}
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                className="sr-only"
              />
            </label>
          )}
          {photoError && (
            <span className="mb-field-error" role="alert">
              {photoError}
            </span>
          )}
        </div>
      );
    }

    if (field.type === 'yn') {
      const currentVal = values[field.id] || '';
      return (
        <div
          className="mb-segmented"
          role="radiogroup"
          aria-labelledby={`label-${field.id}`}
          data-field-id={field.id}
        >
          {['Yes', 'No'].map((opt) => {
            const active = currentVal === opt;
            return (
              <button
                key={opt}
                type="button"
                role="radio"
                aria-checked={active}
                className={`mb-seg-btn${active ? ' is-active' : ''}`}
                onClick={() => handleFieldChange(field, opt)}
              >
                {opt}
              </button>
            );
          })}
          {currentVal && (
            <button
              type="button"
              className="mb-seg-clear"
              onClick={() => handleFieldChange(field, '')}
              aria-label={`Clear ${field.label}`}
            >
              Clear
            </button>
          )}
        </div>
      );
    }

    if (field.type === 'sel') {
      return (
        <select
          id={`field-${field.id}`}
          value={values[field.id] || ''}
          onChange={(e) => handleFieldChange(field, e.target.value)}
          aria-invalid={Boolean(err)}
          aria-describedby={errorId}
          className={`${baseInputClass} mb-select`}
        >
          <option value="">Select option</option>
          {field.options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      );
    }

    if (field.type === 'long') {
      return (
        <textarea
          id={`field-${field.id}`}
          value={values[field.id] || ''}
          rows={2}
          onChange={(e) => {
            handleFieldChange(field, e.target.value);
            e.target.style.height = 'auto';
            e.target.style.height = `${Math.max(76, e.target.scrollHeight)}px`;
          }}
          aria-invalid={Boolean(err)}
          aria-describedby={errorId}
          className={`${baseInputClass} mb-textarea`}
        />
      );
    }

    if (field.type === 'range') {
      const valObj =
        typeof values[field.id] === 'object' && values[field.id]
          ? values[field.id]
          : { min: '', max: '' };
      const inputType = hint.numeric ? 'number' : 'text';
      return (
        <div className="mb-range-pair" data-field-id={field.id}>
          <input
            id={`field-${field.id}-min`}
            type={inputType}
            min={hint.numeric ? '0' : undefined}
            value={valObj.min}
            placeholder={hint.minPlaceholder || 'Min'}
            aria-label={`${field.label} Min`}
            aria-invalid={Boolean(err)}
            aria-describedby={errorId}
            onChange={(e) => handleRangeChange(field, 'min', e.target.value)}
            className={baseInputClass}
          />
          <span className="mb-range-sep" aria-hidden="true">
            to
          </span>
          <input
            id={`field-${field.id}-max`}
            type={inputType}
            min={hint.numeric ? '0' : undefined}
            value={valObj.max}
            placeholder={hint.maxPlaceholder || 'Max'}
            aria-label={`${field.label} Max`}
            aria-invalid={Boolean(err)}
            aria-describedby={errorId}
            onChange={(e) => handleRangeChange(field, 'max', e.target.value)}
            className={baseInputClass}
          />
        </div>
      );
    }

    const htmlInputType =
      field.type === 'date18'
        ? 'date'
        : field.type === 'time'
        ? 'time'
        : field.type === 'num'
        ? 'number'
        : field.type === 'tel'
        ? 'tel'
        : field.type === 'email'
        ? 'email'
        : 'text';

    return (
      <input
        id={`field-${field.id}`}
        type={htmlInputType}
        value={values[field.id] || ''}
        max={field.type === 'date18' ? maxDate18 : field.max ?? undefined}
        min={field.type === 'num' ? field.min ?? 0 : undefined}
        step={field.type === 'num' ? hint.step || '1' : undefined}
        placeholder={hint.placeholder || ''}
        autoComplete={field.secret ? 'off' : undefined}
        data-lpignore={field.secret ? 'true' : undefined}
        aria-invalid={Boolean(err)}
        aria-describedby={errorId}
        onChange={(e) => handleFieldChange(field, e.target.value)}
        className={baseInputClass}
      />
    );
  };

  return (
    <div ref={formPanelRef} className="mb-reg-shell">
      {/* Dev-only fallback mode notice */}
      {import.meta.env.DEV && !isConfigured && (
        <div className="mb-dev-banner" role="note">
          Receiver not configured: running in fallback mode
        </div>
      )}

      {/* Panel Header Meta: Privacy + Required count + Overall counter + Clear */}
      <div className="mb-reg-meta-bar">
        <div>
          <p className="mb-privacy-line">{marriageBureauCopy.registration.privacyNotice}</p>
          <p className="mb-required-note">
            {marriageBureauCopy.registration.requiredNote}
          </p>
        </div>
        <div className="mb-meta-right">
          <span className="mb-overall-counter">
            <strong>{totalAnswered}</strong> of {TOTAL_FIELDS_COUNT} answered
          </span>
          <span className="mb-required-counter">
            {missingRequiredFields.length === 0
              ? 'All 12 required complete'
              : `${missingRequiredFields.length} required left`}
          </span>
          <button type="button" className="mb-link-button" onClick={handleClearForm}>
            <RotateCcw size={13} strokeWidth={1.75} />
            Clear form
          </button>
        </div>
      </div>

      {/* Mobile & Tablet compact top bar (< 1024px) */}
      <div className="mb-mobile-progress">
        <div className="mb-mobile-progress-row">
          <span className="mb-eyebrow" style={{ color: 'var(--mb-rose-700)' }}>
            Step {stepIdx + 1} of {FORM_STEPS.length} · {currentStep.title}
          </span>
          <span className="mb-mobile-count">
            {totalAnswered}/{TOTAL_FIELDS_COUNT}
          </span>
        </div>
        <div className="mb-progress-track" aria-hidden="true">
          <div
            className="mb-progress-fill"
            style={{ width: `${((stepIdx + 1) / FORM_STEPS.length) * 100}%` }}
          />
        </div>
        <div className="mb-mobile-step-pills" role="tablist" aria-label="Registration steps">
          {FORM_STEPS.map((s, idx) => (
            <button
              key={s.id}
              type="button"
              role="tab"
              aria-selected={idx === stepIdx}
              className={`mb-step-pill${idx === stepIdx ? ' is-current' : ''}`}
              onClick={() => jumpToStepAndField(idx)}
            >
              {idx + 1}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-reg-layout">
        {/* Sticky Desktop Left Stepper */}
        <aside className="mb-stepper" aria-label="Form steps">
          <nav>
            <ol className="mb-stepper-list">
              {FORM_STEPS.map((step, idx) => {
                const stat = stepStats[idx];
                const isCurrent = idx === stepIdx;
                const isReview = step.part === 'review';
                return (
                  <li key={step.id}>
                    <button
                      type="button"
                      onClick={() => jumpToStepAndField(idx)}
                      className={`mb-stepper-btn${isCurrent ? ' is-current' : ''}`}
                      aria-current={isCurrent ? 'step' : undefined}
                    >
                      <span className="mb-stepper-num">
                        {String(step.number).padStart(2, '0')}
                      </span>
                      <span className="mb-stepper-text">
                        <span className="mb-stepper-title">{step.title}</span>
                        <span className="mb-stepper-sub">
                          {isReview ? (
                            missingRequiredFields.length === 0
                              ? 'Ready to review'
                              : `${missingRequiredFields.length} required left`
                          ) : (
                            <>
                              {stat.answered} of {stat.total} answered
                              {stat.reqMissing > 0
                                ? ` · ${stat.reqMissing} required left`
                                : ''}
                            </>
                          )}
                        </span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>
          </nav>
        </aside>

        {/* Main Form Card */}
        <form onSubmit={handleSubmit} noValidate className="mb-card mb-form-card">
          {/* Honeypot: visually hidden off-screen, never display:none */}
          <div className="mb-hp-field" aria-hidden="true">
            <label htmlFor="mb-hp-website">Leave this field empty</label>
            <input
              id="mb-hp-website"
              type="text"
              name="company_website"
              tabIndex={-1}
              autoComplete="off"
              value={hp}
              onChange={(e) => setHp(e.target.value)}
            />
          </div>

          {currentStep.partTitle && (
            <div className="mb-part-banner">
              <span className="mb-eyebrow" style={{ color: 'var(--mb-champagne-700)' }}>
                {currentStep.part === 'personal' ? 'PART ONE' : 'PART TWO'}
              </span>
              <h3 className="mb-part-title">{currentStep.partTitle}</h3>
            </div>
          )}

          <div className="mb-step-header">
            <p className="mb-eyebrow" style={{ color: 'var(--mb-rose-700)' }}>
              STEP {String(currentStep.number).padStart(2, '0')} OF {FORM_STEPS.length}
            </p>
            <h4 className="mb-step-heading">{currentStep.title}</h4>
          </div>

          {submitBannerError && (
            <div className="mb-alert-banner" role="alert">
              <AlertCircle size={18} strokeWidth={1.75} />
              <div style={{ flex: 1 }}>
                <p style={{ margin: 0, color: 'var(--mb-ink)' }}>{submitBannerError}</p>
                {submitBannerError.includes('WhatsApp') && lastPdf?.blob && (
                  <button
                    type="button"
                    className="mb-link-button"
                    style={{ marginTop: 6 }}
                    onClick={() => enterFallbackMode(lastPdf)}
                  >
                    Send via WhatsApp instead
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Steps 1 – 9: Render R-rows */}
          {currentStep.part !== 'review' ? (
            <div className="mb-rows-stack">
              {currentStep.rows.map((row) => (
                <div key={row.row} className="mb-r-row">
                  {row.fields.map((field) => {
                    const err = errors[field.id];
                    const inputId =
                      field.type === 'range'
                        ? `field-${field.id}-min`
                        : field.type === 'yn'
                        ? undefined
                        : `field-${field.id}`;

                    return (
                      <div key={field.id} className="mb-field">
                        <label
                          id={`label-${field.id}`}
                          htmlFor={inputId}
                          className="mb-label"
                        >
                          <span>{field.label}</span>
                          {field.required && (
                            <>
                              <span className="mb-req-star" aria-hidden="true">
                                {' '}
                                *
                              </span>
                              <span className="sr-only"> Required</span>
                            </>
                          )}
                        </label>

                        {renderFieldInput(field)}

                        {field.secret && (
                          <span className="mb-secret-hint">
                            Sensitive · excluded from browser draft &amp; PDF
                          </span>
                        )}
                        {err && (
                          <span id={`err-${field.id}`} className="mb-field-error" role="alert">
                            {err}
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          ) : (
            /* Step 10: Review and submit */
            <div className="mb-review-wrap">
              <div className="mb-review-notice">
                <p style={{ margin: 0, color: 'var(--mb-ink)' }}>
                  {marriageBureauCopy.registration.privacyNotice}
                </p>
              </div>

              {missingRequiredFields.length === 0 ? (
                <div className="mb-req-status mb-req-status--ok">
                  <Check size={18} strokeWidth={2} />
                  <span>All required fields are complete</span>
                </div>
              ) : (
                <div className="mb-req-status mb-req-status--missing" role="alert">
                  <div className="mb-req-status-head">
                    <AlertCircle size={18} strokeWidth={2} />
                    <span>
                      {missingRequiredFields.length} required field
                      {missingRequiredFields.length === 1 ? '' : 's'} still missing:
                    </span>
                  </div>
                  <ul className="mb-missing-list">
                    {missingRequiredFields.map((f) => (
                      <li key={f.id}>
                        <span>{f.label}</span>
                        <button
                          type="button"
                          className="mb-link-button"
                          onClick={() => jumpToStepAndField(FIELD_STEP_MAP[f.id], f.id)}
                        >
                          Fix
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Answers grouped by step */}
              <div className="mb-review-groups">
                {FORM_STEPS.slice(0, 9).map((step, sIdx) => {
                  const stat = stepStats[sIdx];
                  const unanswered = stat.total - stat.answered;
                  return (
                    <section key={step.id} className="mb-review-group">
                      <div className="mb-review-group-head">
                        <div>
                          <h5>
                            {String(step.number).padStart(2, '0')} · {step.title}
                          </h5>
                          <span className="mb-review-counts">
                            {stat.answered} answered · {unanswered} unanswered
                          </span>
                        </div>
                        <button
                          type="button"
                          className="mb-link-button"
                          onClick={() => jumpToStepAndField(sIdx)}
                        >
                          Edit
                        </button>
                      </div>

                      <dl className="mb-review-dl">
                        {step.fields.map((field) => {
                          let displayVal = '—';
                          if (field.type === 'file') {
                            displayVal = photo?.dataUrl ? 'Photo attached' : '—';
                          } else if (field.type === 'range') {
                            displayVal = serializeRangeValue(values[field.id]) || '—';
                          } else {
                            const raw = String(values[field.id] ?? '').trim();
                            if (raw) {
                              displayVal = field.secret
                                ? 'Provided (excluded from PDF)'
                                : raw;
                            }
                          }
                          return (
                            <div key={field.id} className="mb-review-row">
                              <dt>{field.label}</dt>
                              <dd dir="auto">{displayVal}</dd>
                            </div>
                          );
                        })}
                      </dl>
                    </section>
                  );
                })}
              </div>
            </div>
          )}

          {/* Sending Progress Indicator */}
          {submitState === 'sending' && (
            <div className="mb-sending-box" role="status" aria-live="polite">
              <p style={{ margin: '0 0 10px', color: 'var(--mb-ink)', fontWeight: 500 }}>
                Sending your registration. This can take up to a minute on mobile data.
              </p>
              <div className="mb-sending-bar">
                <div className="mb-sending-bar-fill" />
              </div>
            </div>
          )}

          {/* Desktop Action Footer & Mobile Sticky Action Bar */}
          <div className="mb-form-actions">
            <button
              type="button"
              className="mb-btn-outline"
              onClick={handlePrevStep}
              disabled={stepIdx === 0 || submitState === 'sending'}
            >
              <ArrowLeft size={16} strokeWidth={1.75} />
              Back
            </button>

            <span className="mb-autosave-hint">{marriageBureauCopy.registration.autosaveNote}</span>

            {stepIdx < FORM_STEPS.length - 1 ? (
              <button
                key="mb-btn-next"
                type="button"
                className="mb-btn-primary"
                onClick={handleNextStep}
                disabled={submitState === 'sending'}
              >
                Next
                <ArrowRight size={16} strokeWidth={1.75} />
              </button>
            ) : (
              <button
                key="mb-btn-submit"
                type="submit"
                className="mb-btn-primary"
                disabled={submitState === 'sending'}
              >
                {submitState === 'sending' ? 'Sending...' : 'Submit registration'}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
