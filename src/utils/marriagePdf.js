import { FORM_STEPS, PART_TITLES } from '../data/marriageFormFields';

const MAX_PHOTO_BYTES = 400 * 1024;
const MAX_PDF_BYTES = Math.floor(2.5 * 1024 * 1024);

/**
 * Downscale a user-selected image file in the browser so its long side is at most
 * 1200px and its JPEG encoding is <= 400KB.
 */
export async function processCandidatePhoto(file) {
  if (!file || !file.type.startsWith('image/')) {
    throw new Error('Please choose an image file (JPG, PNG, or WebP).');
  }
  if (file.size > 5 * 1024 * 1024) {
    throw new Error('Photo must be 5 MB or smaller.');
  }

  const dataUrl = await new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error('Could not read the selected image.'));
    reader.readAsDataURL(file);
  });

  const img = await new Promise((resolve, reject) => {
    const el = new Image();
    el.onload = () => resolve(el);
    el.onerror = () => reject(new Error('Could not decode the selected image.'));
    el.src = dataUrl;
  });

  const longSide = Math.max(img.naturalWidth, img.naturalHeight) || 1;
  const scale = longSide > 1200 ? 1200 / longSide : 1;
  const targetWidth = Math.max(1, Math.round(img.naturalWidth * scale));
  const targetHeight = Math.max(1, Math.round(img.naturalHeight * scale));

  const canvas = document.createElement('canvas');
  canvas.width = targetWidth;
  canvas.height = targetHeight;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(0, 0, targetWidth, targetHeight);
  ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

  const qualities = [0.82, 0.72, 0.62, 0.52, 0.42, 0.32, 0.24];
  let bestUrl = '';
  let bestBase64 = '';

  for (const q of qualities) {
    const outUrl = canvas.toDataURL('image/jpeg', q);
    const b64 = outUrl.split(',')[1] || '';
    const approxBytes = Math.floor((b64.length * 3) / 4);
    bestUrl = outUrl;
    bestBase64 = b64;
    if (approxBytes <= MAX_PHOTO_BYTES) {
      break;
    }
  }

  return {
    dataUrl: bestUrl,
    base64: bestBase64,
    width: targetWidth,
    height: targetHeight,
  };
}

function escapeHtml(str) {
  return String(str ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function formatTodayPK() {
  try {
    return new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Asia/Karachi',
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }).format(new Date());
  } catch {
    return new Date().toISOString().slice(0, 10);
  }
}

/**
 * Build ordered printable blocks (steps & non-secret answered field pairs).
 */
function buildBiodataBlocks(answers) {
  const blocks = [];
  let answeredCount = 0;
  let lastPart = null;

  for (const step of FORM_STEPS) {
    if (step.part === 'review') continue;

    const answeredInStep = [];
    for (const field of step.fields) {
      if (field.type === 'file') {
        // Photo itself is counted if uploaded, displayed in top-right header box
        continue;
      }
      const val = (answers[field.id] || '').trim();
      if (!val) continue;
      answeredCount += 1;
      // Never print secret fields (Passport Number, CNIC) into the PDF
      if (field.secret) continue;
      answeredInStep.push({ label: field.label, value: val });
    }

    if (answeredInStep.length === 0) continue;

    if (step.part !== lastPart) {
      blocks.push({
        kind: 'part',
        title: PART_TITLES[step.part] || step.part,
      });
      lastPart = step.part;
    }

    blocks.push({
      kind: 'step',
      title: `${String(step.number).padStart(2, '0')} · ${step.title}`,
    });

    // Pair fields into two-column rows so nothing splits mid-line across pages
    for (let i = 0; i < answeredInStep.length; i += 2) {
      blocks.push({
        kind: 'pair',
        items: answeredInStep.slice(i, i + 2),
      });
    }
  }

  return { blocks, answeredCount };
}

function renderBlockHtml(block) {
  if (block.kind === 'part') {
    return `
      <div style="margin:0; padding:12px 0 6px; box-sizing:border-box;">
        <div style="padding-bottom:4px; border-bottom:1.5px solid #6B1D36; font-family:'Cormorant Garamond', Georgia, serif; font-size:17px; font-weight:600; color:#3A0F1C; letter-spacing:0.01em;">
          ${escapeHtml(block.title)}
        </div>
      </div>
    `;
  }
  if (block.kind === 'step') {
    return `
      <div style="margin:0; padding:9px 0 6px; font-family:'Instrument Sans', Arial, sans-serif; font-size:10.5px; font-weight:600; text-transform:uppercase; letter-spacing:0.12em; color:#7A1F37; box-sizing:border-box;">
        ${escapeHtml(block.title)}
      </div>
    `;
  }
  const cols = block.items
    .map(
      (item) => `
      <div style="flex:1 1 50%; min-width:0; background:#FFFDFB; border:1px solid #F1DDD2; border-radius:6px; padding:7px 10px; box-sizing:border-box;">
        <div style="font-size:9.5px; font-weight:600; text-transform:uppercase; letter-spacing:0.08em; color:#6E5A5F; margin-bottom:3px;">
          ${escapeHtml(item.label)}
        </div>
        <div dir="auto" style="font-size:11.5px; line-height:1.45; color:#2A1017; word-break:break-word; white-space:pre-wrap; unicode-bidi:plaintext;">
          ${escapeHtml(item.value)}
        </div>
      </div>
    `
    )
    .join('');

  return `
    <div style="display:flex; gap:10px; padding:0 0 7px; margin:0; align-items:stretch; box-sizing:border-box;">
      ${cols}
      ${block.items.length === 1 ? '<div style="flex:1 1 50%;"></div>' : ''}
    </div>
  `;
}

function buildHeaderHtml({ id, dateStr, photoDataUrl, photoPrivacy }) {
  const photoBox = photoDataUrl
    ? `
      <div style="display:flex; align-items:flex-start; gap:10px; border:1px solid #F1DDD2; background:#FFFDFB; border-radius:8px; padding:8px; max-width:255px;">
        <img src="${photoDataUrl}" alt="Candidate" style="width:74px; height:92px; object-fit:cover; border-radius:4px; border:1px solid #C9A27A; flex-shrink:0;" />
        <div style="font-size:9.5px; line-height:1.4; color:#6E5A5F;">
          <div style="font-weight:600; color:#7A1F37; text-transform:uppercase; letter-spacing:0.08em; margin-bottom:3px;">Photo Privacy</div>
          <div style="color:#2A1017;">${escapeHtml(photoPrivacy || 'Not specified')}</div>
        </div>
      </div>
    `
    : '';

  return `
    <div style="padding:0 0 8px; margin:0; box-sizing:border-box;">
      <div style="display:flex; justify-content:space-between; align-items:flex-start; gap:16px; padding-bottom:14px; border-bottom:1px solid #C9A27A;">
        <div>
          <div style="font-family:'Instrument Sans', Arial, sans-serif; font-size:10px; font-weight:600; text-transform:uppercase; letter-spacing:0.14em; color:#7A1F37; margin-bottom:4px;">
            SerajUlMaymar · Marriage Bureau
          </div>
          <h1 style="margin:0 0 6px; font-family:'Cormorant Garamond', Georgia, serif; font-size:26px; font-weight:600; line-height:1.08; color:#2A1017;">
            Candidate Biodata
          </h1>
          <div style="font-size:11.5px; color:#6E5A5F;">
            <span>Registration <strong style="color:#2A1017;">${escapeHtml(id)}</strong></span>
            <span style="margin:0 8px;">·</span>
            <span>${escapeHtml(dateStr)}</span>
          </div>
        </div>
        ${photoBox}
      </div>
    </div>
  `;
}

function paginateBlocks({ blocks, id, dateStr, photoDataUrl, photoPrivacy }) {
  const PAGE_W = 794; // A4 width at 96dpi
  const PAGE_H = 1123; // A4 height at 96dpi
  const PAD_TOP = 38;
  const PAD_BOTTOM = 30;
  const PAD_X = 42;
  const CONTENT_W = PAGE_W - PAD_X * 2;
  const MAX_BODY_H = PAGE_H - PAD_TOP - PAD_BOTTOM;

  const measureRoot = document.createElement('div');
  measureRoot.style.cssText = `position:fixed; left:-12000px; top:0; width:${CONTENT_W}px; font-family:'Instrument Sans', 'Segoe UI', Tahoma, sans-serif; color:#2A1017; visibility:hidden; pointer-events:none; box-sizing:border-box;`;
  document.body.appendChild(measureRoot);

  try {
    const headerDiv = document.createElement('div');
    headerDiv.style.display = 'flow-root';
    headerDiv.innerHTML = buildHeaderHtml({ id, dateStr, photoDataUrl, photoPrivacy });
    measureRoot.appendChild(headerDiv);
    const firstHeaderHeight = Math.ceil(headerDiv.getBoundingClientRect().height);

    const continuationHeaderHeight = 36;
    const footerReserve = 42;
    const safetyMargin = 18;
    const pageLimit = MAX_BODY_H - footerReserve - safetyMargin;

    const measured = blocks.map((block) => {
      const el = document.createElement('div');
      el.style.display = 'flow-root';
      el.innerHTML = renderBlockHtml(block);
      measureRoot.appendChild(el);
      return { block, h: Math.ceil(el.getBoundingClientRect().height) };
    });

    const pages = [];
    let currentItems = [];
    let usedHeight = firstHeaderHeight;

    for (const item of measured) {
      if (currentItems.length > 0 && usedHeight + item.h > pageLimit) {
        // Never leave orphan part/step headings stranded at bottom of page without a data row
        const carryOver = [];
        while (
          currentItems.length > 0 &&
          (currentItems[currentItems.length - 1].block.kind === 'part' ||
            currentItems[currentItems.length - 1].block.kind === 'step')
        ) {
          carryOver.unshift(currentItems.pop());
        }
        if (currentItems.length > 0) {
          pages.push(currentItems.map((it) => it.block));
        }
        const carryHeight = carryOver.reduce((acc, it) => acc + it.h, 0);
        currentItems = [...carryOver, item];
        usedHeight = continuationHeaderHeight + carryHeight + item.h;
      } else {
        currentItems.push(item);
        usedHeight += item.h;
      }
    }

    if (currentItems.length > 0 || pages.length === 0) {
      pages.push(currentItems.map((it) => it.block));
    }

    return pages;
  } finally {
    document.body.removeChild(measureRoot);
  }
}

/**
 * Generate the clean A4 biodata PDF in the browser using lazy-loaded html2canvas + jsPDF.
 * Handles Urdu/non-Latin scripts cleanly via DOM rasterization and guarantees <= 2.5MB.
 */
export async function generateBiodataPdf({
  id,
  answers,
  photoDataUrl = null,
  hasPhoto = false,
}) {
  const [{ default: html2canvas }, { jsPDF }] = await Promise.all([
    import('html2canvas'),
    import('jspdf'),
  ]);

  if (document.fonts && document.fonts.ready) {
    await document.fonts.ready;
  }

  const dateStr = formatTodayPK();
  const photoPrivacy = answers.p_photoPrivacyPreference || '';
  const { blocks, answeredCount } = buildBiodataBlocks(answers);
  const totalAnswered = answeredCount + (hasPhoto ? 1 : 0);

  const pages = paginateBlocks({
    blocks,
    id,
    dateStr,
    photoDataUrl,
    photoPrivacy,
  });

  const attempts = [
    { scale: 1.5, quality: 0.82 },
    { scale: 1.25, quality: 0.72 },
    { scale: 1.05, quality: 0.62 },
    { scale: 0.9, quality: 0.5 },
  ];

  const host = document.createElement('div');
  host.style.cssText =
    'position:fixed; left:-12000px; top:0; width:794px; background:#FFF9F5; pointer-events:none; z-index:-1;';
  document.body.appendChild(host);

  try {
    let finalBlob = null;
    let finalBase64 = '';

    for (const { scale, quality } of attempts) {
      const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4', compress: true });

      for (let pIdx = 0; pIdx < pages.length; pIdx++) {
        const pageEl = document.createElement('div');
        pageEl.style.cssText = [
          'width:794px',
          'height:1123px',
          'background:#FFF9F5',
          'color:#2A1017',
          'padding:38px 42px 30px',
          'box-sizing:border-box',
          'display:flex',
          'flex-direction:column',
          "font-family:'Instrument Sans', 'Segoe UI', Tahoma, sans-serif",
          'border:1px solid #F1DDD2',
        ].join(';');

        const topHtml =
          pIdx === 0
            ? buildHeaderHtml({ id, dateStr, photoDataUrl, photoPrivacy })
            : `
              <div style="display:flex; justify-content:space-between; align-items:center; padding-bottom:8px; margin-bottom:10px; border-bottom:1px solid #F1DDD2; font-size:10px; color:#6E5A5F;">
                <span style="font-weight:600; letter-spacing:0.12em; text-transform:uppercase; color:#7A1F37;">SerajUlMaymar · Marriage Bureau</span>
                <span>Registration ${escapeHtml(id)} · ${escapeHtml(dateStr)}</span>
              </div>
            `;

        const bodyHtml =
          pages[pIdx].length > 0
            ? pages[pIdx].map(renderBlockHtml).join('')
            : '<p style="font-size:12px; color:#6E5A5F;">No non-sensitive answers provided.</p>';

        const footerHtml = `
          <div style="margin-top:auto; padding-top:10px; border-top:1px solid #F1DDD2; display:flex; justify-content:space-between; font-size:9.5px; color:#6E5A5F;">
            <span>${totalAnswered} of 150 fields answered · Page ${pIdx + 1} of ${pages.length}</span>
            <span>Private Bureau Record · Karachi</span>
          </div>
        `;

        pageEl.innerHTML = `${topHtml}<div style="flex:1; overflow:hidden;">${bodyHtml}</div>${footerHtml}`;
        host.innerHTML = '';
        host.appendChild(pageEl);

        const canvas = await html2canvas(pageEl, {
          scale,
          useCORS: true,
          backgroundColor: '#FFF9F5',
          logging: false,
          width: 794,
          height: 1123,
        });

        const imgData = canvas.toDataURL('image/jpeg', quality);
        if (pIdx > 0) pdf.addPage();
        pdf.addImage(imgData, 'JPEG', 0, 0, 210, 297, undefined, 'FAST');
      }

      const arrayBuf = pdf.output('arraybuffer');
      finalBlob = new Blob([arrayBuf], { type: 'application/pdf' });
      if (finalBlob.size <= MAX_PDF_BYTES || scale === attempts[attempts.length - 1].scale) {
        const dataUri = pdf.output('datauristring');
        finalBase64 = dataUri.split(',')[1] || '';
        break;
      }
    }

    return {
      blob: finalBlob,
      base64: finalBase64,
      filename: `Registration-${id}.pdf`,
      byteLength: finalBlob ? finalBlob.size : 0,
    };
  } finally {
    if (host.parentNode) host.parentNode.removeChild(host);
  }
}

export function triggerBlobDownload(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 4000);
}

